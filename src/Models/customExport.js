customExport = (function() {
  let toFixed = (n, f) => {
    return parseFloat(n.toFixed(f));
  };
  let exportForArray = (list1, exportFor) => {
    let list2 = [];
    for (let item of list1) {
      list2.push(exportFor(item));
    }
    return list2;
  };
  let exportForColor = (color) => {
    return exportForArray(color.toArray(), (_) => toFixed(_, 2));
    //color.toArray()
    //return { r: color.r, g: color.g, b: color.b }; 
  };
  let exportForVector2 = (vector2) => {
    return exportForArray(vector2.toArray(), (_) => toFixed(_, 2));
    //return vector2.toArray();
    //return { x: vector2.x, y: vector2.y }; 
  };
  let exportForVector3 = (vector3) => {
    return exportForArray(vector3.toArray(), (_) => toFixed(_, 2));
    //return vector3.toArray();
    //return { x: vector3.x, y: vector3.y, z: vector3.z }; 
  };
  let importForArray = (list1, importFor) => {
    let list2 = [];
    for (let item of list1) {
      list2.push(importFor(item));
    }
    return list2;
  };
  let importForColor = (json) => {
    if (json instanceof Array)
      return new THREE.Color().fromArray(json);
    return new THREE.Color(json.r, json.g, json.b);
  };
  let importForVector2 = (json) => {
    if (json instanceof Array)
      return new THREE.Vector2().fromArray(json);
    return new THREE.Vector2(json.x, json.y);
  };
  let importForVector3 = (json) => {
    if (json instanceof Array)
      return new THREE.Vector3().fromArray(json);
    return new THREE.Vector3(json.x, json.y, json.z);
  };

  return {
    exportTo: (markup3d, offsetData) => {

      let exportForAnchor = (anchor) => {
        if (anchor instanceof Sippreep.Extensions.Markup.Point)
          return { type: 'Point', value: exportForVector3(anchor.value.add(offset)) };
        else if (anchor instanceof Sippreep.Extensions.Markup.Polyline) {
          return { type: 'Polyline', path: exportForArray(anchor.path, (_) => exportForVector3(_.add(offset))) };
        } else if (anchor instanceof Sippreep.Extensions.Markup.Polygon) {
          return { type: 'Polygon', vertices: exportForArray(anchor.vertices, (_) => exportForVector3(_.add(offset))) };
        }
      };
      let exportForAppearance = (app) => {
        let json = {};
        if (app.anchorColor)
          json.anchorColor = exportForColor(app.anchorColor);
        if (app.offsetColor)
          json.offsetColor = exportForColor(app.offsetColor);
        return json;
      };
      let exportForItem = (item) => {
        let data = { anchor: exportForAnchor(item.anchor) };
        data.anchorDbid = item.anchorDbid;
        if (item.offset)
          data.offset = exportForVector3(item.offset);
        if (item.content)
          data.content = item.content;
        if (item.contentOffset)
          data.contentOffset = exportForVector2(item.contentOffset);
        if (item.appearance) {
          data.appearance = exportForAppearance(item.appearance);
        }
        data.tag = item.tag;
        return data;
      };

      let offset = offsetData ? importForVector3(offsetData) : new THREE.Vector3(0, 0, 0);
      let data = {};
      data.version = '1.0.0';
      data.items = exportForArray(markup3d.getItems().toArray(), exportForItem);
      return data;
    },
    importTo: (markup3d, data, offsetData) => {

      let importForAnchor = (json) => {
        if (json.type == 'Point') {
          return new Sippreep.Extensions.Markup.Point(importForVector3(json.value).add(offset));
        } else if (json.type == 'Polyline') {
          let line = new Sippreep.Extensions.Markup.Polyline();
          line.path = [];
          json.path.forEach(_ => {
            line.path.push(importForVector3(_).add(offset));
          });
          return line;
        } else if (json.type == 'Polygon') {
          let line = new Sippreep.Extensions.Markup.Polygon();
          line.vertices = [];
          json.vertices.forEach(_ => {
            line.vertices.push(importForVector3(_).add(offset));
          });
          return line;
        }
      };
      let importForAppearance = (json, oldValue) => {
        if (!oldValue)
          oldValue = {};
        if (json.anchorColor)
          oldValue.anchorColor = importForColor(json.anchorColor);
        if (json.offsetColor)
          oldValue.offsetColor = importForColor(json.offsetColor);
        //oldValue.anchorRadiusCoefficient = 0.5;
        return oldValue;
      };
      let importForItem = (json) => {
        let itemData = markup3d.getItems().add();
        itemData.anchor = importForAnchor(json.anchor);
        itemData.anchorDbid = json.anchorDbid;
        if (json.offset)
          itemData.offset = importForVector3(json.offset);
        if (json.content)
          itemData.content = json.content;
        if (json.contentOffset)
          itemData.contentOffset = importForVector2(json.contentOffset);
        if (json.appearance) {
          itemData.appearance = importForAppearance(json.appearance, itemData.appearance);
        }
        itemData.tag = json.tag;
        return itemData;
      };
      let offset = offsetData ? importForVector3(offsetData) : new THREE.Vector3(0, 0, 0);

      importForArray(data.items, importForItem);
    }
  };
})();