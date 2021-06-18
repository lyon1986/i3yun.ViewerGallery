/* eslint-disable no-undef */
//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById('viewer1'));
var servicePromise = viewerPromise.then((v) => new Service(v));
//场景配置
Promise.all([viewerPromise, servicePromise]).then(([viewer, service]) => {
  document.getElementById('updateScene').onclick = () => {
    var host = document.getElementById('DATABASE').value; // http://bimdb.aisanwei.cn
    var sceneID = document.getElementById('SCENEID').value; // P2006200001
    var sceneState = document.getElementById('sceneState');
    sceneState.innerHTML = '正在加载……';
    var modelPromise = service.loadModel(host, sceneID);
    modelPromise
      .then((model) => {
        return service.getObjs();
      })
      .then((e) => {
        var objCount = 0;
        for (var key in e) {
          objCount++;
        }
        sceneState.innerHTML = `${objCount}个对象`;
        PublishEvent('SceneLoaded');
      })
      .catch((e) => {
        sceneState.innerHTML = JSON.stringify(e);
      });
  };
  document.getElementById('updateScene').onclick();
});
//进度模拟
Promise.all([viewerPromise]).then(([viewer]) => {
  service = new Service(viewer);
  SubscribeEvent('SceneLoaded', () => {
    service.InitData();
  });

  document.getElementById('init').onclick = () => {
    service.InitData();
  };
  document.getElementById('start').onclick = () => {
    service.SimulatedColors(document.getElementById('RangeState'));
  };
  document.getElementById('FPS').onchange = (e) => {
    service.FPS = parseInt(e.target.value);
  };
  document.getElementById('SumTime').onchange = (e) => {
    service.SumTime = parseInt(e.target.value);
  };
  document.getElementById('RandomRange').onchange = (e) => {
    service.RandomRange = e.target.checked;
    service.InitData();
  };
  document.getElementById('RandomOrder').onchange = (e) => {
    service.RandomOrder = e.target.checked;
    service.InitData();
  };
  document.getElementById('FinishedSetTransparent').onchange = (e) => {
    service.FinishedSetTransparent = e.target.checked;
  };
  document.getElementById('RangeValue').onchange = (e) => {
    service.SetProgress(e.target.value / 100);
  };
  //订阅视图选中项改变事件
  viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
    var elements = viewer.getSelection();
    document.getElementById('MySelectionValue').innerHTML =
      elements.length == 1 ? `${elements[0]}的进度${service.GetProgress(elements[0])}` : elements.length + '项';
  });
});

/**
 *
 * @param {Sippreep.Viewing.Viewer3D} viewer
 */
function Service(viewer) {
  this.FinishedSetTransparent = false;
  this.RandomOrder = false;
  this.RandomRange = false;
  //配置颜色（依次是红、绿、蓝）
  this.ThemingColors = [new THREE.Vector4(1, 0, 0, 1), new THREE.Vector4(0, 1, 0, 1), new THREE.Vector4(0, 0, 1, 1)];
  this.RangeValue = 0;
  this.FPS = 5;
  this.SumTime = 20;
  /**
   * @type {{ Range: { min: number, max: number }, DBidRange: { min: number, max: number }, DBids:number[],DbidRangeValue:number,RangeValue:number }[]}
   */
  this.Datas = null;

  this.SetProgress = (value) => {
    this.RangeValue = value;
    this.UpdateProgress();
  };
  this.UpdateProgress = () => {
    var value = this.RangeValue;
    var datas = Datas;
    // var blueColor = new THREE.Color(0, 1, 0);
    // viewer.impl.fadeMaterial.color = blueColor;
    datas.forEach((data) => {
      let rangeValue =
        ((value - data.Range.min) / (data.Range.max - data.Range.min)) * (data.DBidRange.max - data.DBidRange.min) +
        data.DBidRange.min;
      data.RangeValue = value;
      data.DbidRangeValue = rangeValue;

      //viewer.model.clearThemingColors();
      data.DBids.forEach((dbid) => {
        //设置可见状态
        viewer.model.visibilityManager.setNodeOff(dbid, rangeValue <= 0);

        //设置颜色
        if (rangeValue < 1 && rangeValue >= 0) {
          //颜色值（rgba）
          var color = new THREE.Vector4(1, 0, 1, 1 - rangeValue - ((1 - rangeValue) % (1 / 4)));
          //var color = this.dbidColors[parseInt((this.dbidColors.length) * rangeValue)];
          viewer.model.setThemingColor(dbid, color, true);
        } else {
          viewer.model.setThemingColor(dbid, null, true);
        }

        //设置透明状态
        if (rangeValue >= 1 && this.FinishedSetTransparent) viewer.model.visibilityManager.hide(dbid);
        else viewer.model.visibilityManager.show(dbid);
      });
    });
  };

  this.SimulatedColors = function (element) {
    var globe = this;
    if (globe.SimulatedHandle) {
      globe.SimulatedHandle = null;
      clearTimeout(globe.SimulatedHandler);
    } else {
      if (globe.RangeValue >= 1) {
        globe.RangeValue = 0;
      }
      globe.SimulatedHandle = () => {
        globe.RangeValue += 1 / (this.SumTime * this.FPS);
        if (globe.RangeValue >= 1) {
          globe.SimulatedColors();
        }
        globe.UpdateProgress();

        element.innerHTML = `进度${(globe.RangeValue * this.SumTime).toFixed(1)}/${this.SumTime} FPS${
          this.FPS
        } 对象数量${Datas.length}`;
        if (globe.SimulatedHandle) globe.SimulatedHandler = setTimeout(globe.SimulatedHandle, 1000 / this.FPS);
      };
      globe.SimulatedHandle();
    }
  };
  this.InitData = function () {
    var tree = viewer.model.getInstanceTree();
    var root = tree.getRootId();
    var dbids = [];
    tree.enumNodeChildren(
      root,
      (dbid) => {
        dbids.push(dbid);
      },
      false,
    );
    var dbids = dbids.reverse();

    //模型顺序随机
    if (this.RandomOrder) {
      var temp = dbids;
      dbids = [];
      while (temp.length > 0) {
        var i = Random(0, temp.length - 1);
        dbids.push(temp[i]);
        temp.splice(i, 1);
      }
    }

    const getLeafNodeIdsRec = (id, leafIds) => {
      let childCount = 0;
      tree.enumNodeChildren(
        id,
        (childId) => {
          getLeafNodeIdsRec(childId, leafIds);
          ++childCount;
        },
        false,
      );

      if (childCount === 0) {
        leafIds.push(id);
      }
    };
    Datas = [];
    dbids.forEach((dbid, i) => {
      var r = 0;
      if (this.RandomRange) r = Random(0, 10);
      var dbidChilds = [];
      getLeafNodeIdsRec(dbid, dbidChilds);
      dbidChilds.forEach((child) => {
        Datas.push({
          Range: { min: (i - r) / dbids.length, max: (i + 1) / dbids.length },
          DBidRange: { min: 0, max: 1 },
          DBids: [child],
        });
      });
    });

    this.RangeValue = 0;
  };
  this.GetProgress = (dbid) => {
    var datas = Datas;
    if (datas) {
      for (let i = 0; i < datas.length; i++) {
        if (datas[i].DBids.indexOf(dbid) >= 0) {
          return datas[i].DbidRangeValue;
        }
      }
    }
  };
  /**
   * 加载模型
   * @type { (host:string, ID:string) => Promise<Sippreep.Viewing.Model> }
   *
   * host = http://bimdb.aisanwei.cn
   * ID = P2006200001
   */
  this.loadModel = (host, ID) => {
    return new Promise((s, f) => {
      if (viewer.model) {
        viewer.unloadModel(viewer.model);
      }
      // http://bimdb.aisanwei.cn/api/UserSpace/ViewFile/P2006200001?path=/3d.svf
      var url = `${host}/api/UserSpace/ViewFile/${ID}?path=/3d.svf`;
      viewer.loadModel(url, null, s, f);
    });
  };
  /**
   * 所有对象集合
   * @type { () => Promise<{ [key: string]: number; }> }
   */
  this.getObjs = () => {
    return new Promise((s, f) => {
      viewer.model.getExternalIdMapping((e) => {
        s(e);
      }, f);
    });
  };
}

function Random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function PublishEvent(eventName) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, true);
  document.dispatchEvent(event);
}

function SubscribeEvent(eventName, callback) {
  document.addEventListener(eventName, callback);
}
