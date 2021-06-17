var allGui = new dat.GUI({
  closeOnTop: true
});
allGui.domElement.parentNode.style.zIndex = '1';
window.allGui = allGui;

//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById('viewer1'));

/**
 * @type { Promise<Sippreep.Extensions.Modelfilter.ModelFilterExtension> }
 */
var modelFilterPromise = viewerPromise.then((viewer) => {
  return viewer.loadExtension('Sippreep.Extensions.ModelFilter.ModelFilterExtension');
});

/**
 * @type { Promise<Sippreep.Extensions.ModelMan.ModelManExtension> }
 */
var modelManPromise = viewerPromise.then((viewer) => {
  return viewer.loadExtension('Sippreep.Extensions.ModelMan.ModelManExtension');
});

viewerPromise.then((viewer) => {
  let guiFolder1 = allGui.addFolder('模型加载');
  let data = {
    host: 'http://bimdb.aisanwei.cn',
    sceneID: 'P2008280001',
    loadScene: (() => {
      let owner = data;
      /**
             * @type { Promise<Sippreep.Viewing.Model> }
             */
      let modelPromise = new Promise((s, f) => {
        if (viewer.model) viewer.unloadModel(viewer.model);
        viewer.loadModel(`${owner.host}/api/UserSpace/ViewFile/${owner.sceneID}?path=/3d.svf`, null, s, f);
      });
      modelPromise.then((model) => {
        return new Promise((s, f) => model.getExternalIdMapping(s, f));
      }).then(e => {
        owner.loadState = `${Object.keys(e).length}个对象`;
      }).catch((e) => {
        owner.loadState = JSON.stringify(e);
      }).finally(() => {
        guiFolder1.updateDisplay();
      });
    }),
    loadState: '',
  };
  for (let name in data)
    guiFolder1.add(data, name);
  guiFolder1.open();

});

Promise.all([viewerPromise, modelFilterPromise, modelManPromise]).then(([viewer, modelFilter, modelMan]) => {
  let guiFolder2 = allGui.addFolder('模型过滤');
  let gui3 = null;
  var data = {
    //只显示指定属性
    onlyFixNames: true,
    FixName: '工作集',
    showTran: true,
    loadAttrs: () => {
      let attrNames = data.onlyFixNames ? dataOptions.FixName : undefined;
      modelFilter.listProperties(attrNames).then((vs) => {
        if (gui3)
          allGui.removeFolder(gui3);
        gui3 = allGui.addFolder(`attrNames(${vs.length})`);
        gui3.open();
        var dataList = {};
        displayOption.start(displayOption);
        for (let v of vs) {
          if (!v.hidden) {
            dataList[v.attributeName] = ((_) => {
              return () => {
                data.FixName = _;
                data.loadValues();
                gui3.updateDisplay();
              };
            })(v.attributeName);
            gui3.add(dataList, v.attributeName);
            if (!displayOption.run(displayOption))
              break;
          }
        }
      });
    },
    loadValues: () => {
      let attrName = data.FixName;
      modelFilter.listPropertyValueWithObjectId(attrName).then((vs) => {
        if (gui3)
          allGui.removeFolder(gui3);
        gui3 = allGui.addFolder(`attrName ${attrName}(${vs.size})`);
        gui3.open();
        var dataList = {};
        displayOption.start(displayOption);
        for (let [key, value] of vs) {
          let name = `${key}(${value.length})`;
          dataList[name] = ((_) => {
            return () => {
              // viewer.isolate(value);
              // viewer.fitToView(value);
              modelMan.GetManager().then((m) => {
                if (data.showTran) {
                  m.setVisibles(true);
                  m.setTransparents(0, value);
                  m.setTransparents(0.5, value, true);
                  viewer.fitToView(value);
                } else {
                  m.setTransparents(0);
                  m.setVisibles(true, value);
                  m.setVisibles(false, value, true);
                  viewer.fitToView(value);
                }
              });
            };
          })(value);
          gui3.add(dataList, name);
          if (!displayOption.run(displayOption))
            break;
        }
      });
    },
    loadProperty: () => {
      let selectDbids = viewer.getSelection();
      if (selectDbids.length == 0) {
        alert('请选择模型');
        return;
      }
      let dbid = viewer.getSelection()[0];
      let attrNames = data.onlyFixNames ? dataOptions.FixName : undefined;
      modelFilter.listObjectProperties(dbid, attrNames).then((ps) => {
        if (gui3)
          allGui.removeFolder(gui3);

        gui3 = allGui.addFolder(`dbid ${dbid} (${ps.length})`);
        gui3.open();
        var dataList = {};
        displayOption.start(displayOption);
        for (let item of ps) {
          if (!item.hidden) {
            dataList[item.attributeName] = item.displayValue;
            gui3.add(dataList, item.attributeName);
            if (!displayOption.run(displayOption))
              break;
          }
        }
      });
    },
  };
  var dataOptions = {
    FixName: '工作集,空间类型名称,空间类型编码,空间位置编码,分类编码,分类名称,系统编码,系统编码名称,这个不存在,Category'.split(',')
  };

  for (let name in data) {
    let t = guiFolder2.add(data, name);
    if (dataOptions[name]) {
      t.options(dataOptions[name]);
    }
  }

});
/**
 * 显示的数量太大，通过时间限制可显示的数量
 */
let displayOption = {
  time: 5000,
  begin: (+new Date()),
  run: (displayOption) => {
    displayOption.end = +new Date();
    if (displayOption.end - displayOption.begin < displayOption.time)
      return true;
    return false;
  },
  start: (displayOption) => {
    displayOption.begin = +new Date();
  }
};