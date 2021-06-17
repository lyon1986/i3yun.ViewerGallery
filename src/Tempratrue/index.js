var host = 'http://bimdb.aisanwei.cn';
var token = 'eyJhbHQiOiJTSEExIiwidHlwIjoiSldUIn0=.eyJpc3MiOm51bGwsImV4cCI6bnVsbCwiYXVkIjpudWxsLCJpYXQiOm51bGwsIlVzZXJJRCI6Imx5b24wMDIiLCJUaW1lb3V0IjoiMjAzMS0xMS0xN1QwNjozODoyNi4wMDk0NzQxKzA4OjAwIiwiU2NvcGVzIjpbIlByb2plY3RSZWFkIl19.VbT+tp1FhvMADxzskWfhWVsT3CWmUdFNUIXFflEwrQOpiQnseUQKgxxOFpxCnIl6xdDI2uFtpJ0U5qxMw02P0ToSedsxYD/xhujPosrq2K41Q1R7hijmPQIeF99iR0HhIP4N3y9pm+nwiYOlHxI3OplVGDXN9s5kfMnbp/te+R8=';
var sceneID = 'P2006200001';
//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById('viewer1'));
//获取场景加载插件
var TidbLoaderExtensionPromise = viewerPromise.then((viewer) => {
  return viewer.loadExtension('Sippreep.Extensions.TidbLoader.TidbLoaderExtension');
});
/**
 * @type {Promise<Sippreep.Extensions.Markup.Markup3DExtension>}
 */
var Markup3DPromise = viewerPromise.then((viewer) => {
  return viewer.loadExtension('Sippreep.Extensions.Markup.Markup3DExtension');
});
/**
 * 加载模型
 * @type {Promise<Sippreep.Viewing.Model>}
 */
var modelPromise = TidbLoaderExtensionPromise.then((v) => {
  //let v1 = <any>v as Sippreep.Extensions.TidbLoader.TidbLoaderExtension;
  var v1 = v;
  v1.getConfig().host = host;
  v1.getConfig().token = token;
  return v1.loadScene(sceneID);
});
/**
 * 加载模型
 * @type {Promise<{ [key: string]: number; }>}
 */
var objectsPromise = modelPromise.then((m) => {
  return new Promise((s, f) => {
    m.getExternalIdMapping(s, f);
  });
});
Promise.all([viewerPromise, modelPromise, objectsPromise, Markup3DPromise]).then(([viewer, model, objects, markup3d]) => {
  viewerHelper = new ViewerHelper(viewer, model, objects);
  service = new Service();
  document.getElementById('AllElements').onclick = () => {
    viewerHelper.SetVisible(true);
    viewerHelper.SetLevel();
    viewer.fitToView();
  };
  document.getElementById('BuildingElements').onclick = (e) => {
    var buildingElements = viewerHelper.GetOther([].concat(service.Other2Elements, service.ColorsElements));

    viewerHelper.SetVisible(true, buildingElements);

    var buildingVisible = e.target.state1 = e.target.state1 ? false : true;
    viewerHelper.SetTrans(buildingVisible, buildingElements);
  };
  document.getElementById('Level1').onclick = (e) => {
    var data = e.target.getAttribute('data');
    var level = eval(`(${data})`);
    viewerHelper.SetLevel(level);
    viewer.fitToView();
  };
  document.getElementById('Level2').onclick = (e) => {
    var data = e.target.getAttribute('data');
    var level = eval(`(${data})`);
    viewerHelper.SetLevel(level);
    viewer.fitToView();
  };
  document.getElementById('Other2Elements').onclick = (e) => {
    var visible = e.target.state1 = e.target.state1 ? false : true;
    viewerHelper.SetVisible(!visible, service.Other2Elements);
    //viewer.fitToView(service.Other2Elements);
  };
  document.getElementById('ColorsElements').onclick = (e) => {
    var visible = e.target.state1 = e.target.state1 ? false : true;
    viewerHelper.SetVisible(!visible, service.ColorsElements);
    //viewer.fitToView(service.ColorsElements);
  };
  document.getElementById('SimulatedColors').onclick = () => {
    //document.getElementById("ColorsElements").click();
    service.SimulatedColors();
    viewerHelper.SetColor(null);
  };
  document.getElementById('ShowMark3D').onclick = () => {
    if (markup3d.getItems().toArray().length > 0)
      markup3d.getItems().clear();
    else {
      var elements = [].concat(service.LabelElements, service.Other2Elements);
      elements.forEach(element => {
        var markupItem = markup3d.getItems().add();
        markupItem.anchor = element;
        markupItem.offset = new THREE.Vector3(0, 0, 15);
        markupItem.content = service.getMessage(element);
        markupItem.contentOffset = new THREE.Vector2(-8, -8);
        markupItem.appearance.anchorColor = new THREE.Color(1, 1, 1);
        markupItem.appearance.offsetColor = new THREE.Color(1, 1, 1);
      });
    }
  };
  document.getElementById('saveState').onclick = (e) => {
    document.getElementById('loadState').setAttribute('data', viewerHelper.GetState());
    alert('保存视角成功');
  };
  document.getElementById('loadState').onclick = (e) => {
    viewerHelper.SetState(e.target.getAttribute('data'));
  };
  //订阅服务温度颜色
  service.ElementColorChanged = (element, themingColor) => {
    var showmarkUp3d = false;
    markup3d.getItems().toArray().forEach(v => {
      if (v.anchor == element) {
        showmarkUp3d = true;
        v.appearance.anchorColor = themingColor;
        v.appearance.offsetColor = themingColor;
        v.content.style.backgroundColor = `rgb(${themingColor.r * 255}, ${themingColor.g * 255}, ${themingColor.b * 255})`;
      }
    });
    if (showmarkUp3d) {
      viewerHelper.SetColor(null, [element]);
    } else
      viewerHelper.SetColor(new THREE.Vector4(themingColor.r, themingColor.g, themingColor.b, 1), [element]);

  };

  //订阅视图选中项改变事件
  viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
    var elements = viewer.getSelection();
    document.getElementById('MySelectionValue').innerHTML = elements.length == 1 ? elements[0] : (elements.length + '项');
  });



  document.getElementById('ShowMark3D').click();

  document.getElementById('SimulatedColors').click();



  //document.getElementById("BuildingElements").click();

  document.getElementById('Level2').click();

  //设置视图最佳视角
  document.getElementById('loadState').click();
});
/**
     * 
     * @param {Sippreep.Viewing.Viewer3D} viewer 
     * @param {Sippreep.Viewing.Model} model
     * @param {{ [key: string]: number; }} objects
     */
function ViewerHelper(viewer, model, objects) {
  this.SetVisible = function(isVisible, dbids) {
    if (dbids) {
      for (let dbid of dbids) {
        //model.visibilityManager.setVisibilityOnNode(dbid, isVisible);
        model.visibilityManager.setNodeOff(dbid, !isVisible);
      }
    } else {
      for (let name in objects) {
        //model.visibilityManager.setVisibilityOnNode(objects[name], isVisible);
        model.visibilityManager.setNodeOff(objects[name], !isVisible);
      }
    }
  };
  this.SetColor = function(color, dbids) {
    if (dbids) {
      for (let dbid of dbids) {
        viewer.setThemingColor(dbid, color);
      }
    } else {
      for (let name in objects) {
        viewer.setThemingColor(objects[name], color);
      }
    }
  };
  this.SetTrans = function(isTrans, dbids) {
    if (dbids) {
      for (let dbid of dbids) {
        isTrans ? model.visibilityManager.hide(dbid) : model.visibilityManager.show(dbid);
      }
    } else {
      for (let name in objects) {
        isTrans ? model.visibilityManager.hide(objects[name]) : model.visibilityManager.show(objects[name]);
      }
    }
  };
  this.SetLevel = function(value) {
    if (value)
      viewer.setCutPlanes([new THREE.Vector4(0, 0, 1, value.max), new THREE.Vector4(0, 0, -1, value.min)]);
    else
      viewer.setCutPlanes([]);
  };
  this.GetState = function() {
    var state = viewer.getState({ viewport: true });
    return btoa(JSON.stringify(state));
  };
  this.SetState = function(value) {
    var state = JSON.parse(atob(value));
    viewer.restoreState(state, { viewport: true });
  };
  this.GetOther = function(dbids) {
    var temp = [];
    for (let name in objects) {
      if (dbids && dbids.indexOf(objects[name]) < 0)
        temp.push(objects[name]);
    }
    return temp;
  };
}

function Service() {
  //配置颜色（依次是红、绿、蓝）
  this.ThemingColors = [new THREE.Color(1, 0, 0), new THREE.Color(0, 1, 0), new THREE.Color(0, 0, 1)];
  this.Other1Elements = [3399];
  this.Other2Elements = [2979, 2991, 2996, 3003];
  this.ColorsElements = [1564, 1565, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576];

  this.LabelElements = [1564, 1567, 1568, 1570, 1572, 1573];
  this.BuildingElements = [1, 1508, 2169, 1586, 1658, 2104, 2067, 2145, 1917, 1973, 2189, 2157, 140, 131];
  this.ElementColorChanged = function(element, themingColor) {

  };
  this.SimulatedColors = function() {
    var globe = window;
    if (globe.SimulatedHandle) {
      globe.SimulatedHandle = null;
      clearTimeout(globe.SimulatedHandler);
    } else {
      globe.SimulatedHandle = () => {
        for (var i = 0; i < this.ColorsElements.length; i++) {
          this.ElementColorChanged(this.ColorsElements[i], this.ThemingColors[Random(0, this.ThemingColors.length)]);
        }
        if (globe.SimulatedHandle)
          globe.SimulatedHandler = setTimeout(globe.SimulatedHandle, 1000);
      };
      globe.SimulatedHandle();
    }
  };
  this.getMessage = function(element) {
    var typestring = this.LabelElements.indexOf(element) > 0 ? '功能间' : '消防箱';
    var innerHTML = `<div class='my-markup3D'> ${document.getElementById('label').innerHTML}<div>编号：${element} 类型：${typestring}</div></div>`;
    var t = document.createElement('div');
    t.innerHTML = innerHTML;
    return t.firstChild;
  };
  this.getViewState = function() {
    var stateBase64 = 'eyJ2aWV3cG9ydCI6eyJuYW1lIjoiIiwiZXllIjpbLTE0Mi44NzY3ODkyMzY0MTg5NCwxLjIzNjQzMDIyMjA1NTQ3NDgsODkuMDIyNDY5MTAxMjMzN10sInRhcmdldCI6Wy0yNi44NzAzMjAzODY0NjUwMjUsLTMuNTQzNzQ4MzUwNDgzNjI5NiwxMS41OTEzMjY3Nzg4MzcyN10sInVwIjpbMC41NTQzNjc5ODUzODQ1MjAzLC0wLjAyMjg0MzM2Mzc0Nzc5NTE1LDAuODMxOTU4MTIyNDUxNzIxOF0sIndvcmxkVXBWZWN0b3IiOlswLDAsMV0sInBpdm90UG9pbnQiOls4LjU0NzIzMTY0NDMwMDA0MSwyMy4yMjgwMjI1MDU0NDQxNDQsNDAuMTU5MjY4MzUxMjg2NDZdLCJkaXN0YW5jZVRvT3JiaXQiOjE1Mi4yMjk1Mzc2NTUyMjYsImFzcGVjdFJhdGlvIjoyLjA4NDY5MDU1Mzc0NTkyODQsInByb2plY3Rpb24iOiJwZXJzcGVjdGl2ZSIsImlzT3J0aG9ncmFwaGljIjpmYWxzZSwiZmllbGRPZlZpZXciOjQ1fX0=';
    return JSON.parse(atob(stateBase64));
  };
}

function Random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function E(value) {
  return document.getElementById(value);
}