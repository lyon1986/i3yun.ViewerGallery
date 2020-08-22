//创建三维视图
let viewerPromise = SippreepViewer.CreateViewer(document.getElementById("viewer1"));
/**
 * @type {Promise<Sippreep.Extensions.EEPTools.EEPToolExtension>}
 */
let toolPromise = viewerPromise.then(v => v.loadExtension("Sippreep.Extensions.EEPTools.EEPToolExtension"));
/**
 * @type { Promise<Sippreep.Extensions.PickPoint.PickPointExtension> }
 */
let pickPointPromise = viewerPromise.then(v => {
    return v.loadExtension("Sippreep.Extensions.PickPoint.PickPointExtension");
});
/**
 * @type {Promise<Sippreep.Extensions.Markup.Markup3DExtension>}
 */
let Markup3DPromise = viewerPromise.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.Markup.Markup3DExtension");
});
/**
 * @type {Promise<Sippreep.Extensions.ModelMan.ModelManExtension>}
 */
let modelManPromise = viewerPromise.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.ModelMan.ModelManExtension");
});

//场景配置
Promise.all([viewerPromise]).then(([viewer]) => {
    document.getElementById("updateScene").onclick = () => {
        let host = document.getElementById("DATABASE").value;
        let sceneID = document.getElementById("SCENEID").value;
        let sceneState = document.getElementById("sceneState");
        sceneState.innerHTML = "正在加载……";
        /**
         * @type { Promise<Sippreep.Viewing.Model> }
         */
        let modelPromise = new Promise((s, f) => {
            if (viewer.model) {
                viewer.unloadModel(viewer.model);
            }
            viewer.loadModel(`${host}/api/UserSpace/ViewFile/${sceneID}?path=/3d.svf`, null, s, f);
        });
        modelPromise.then((model) => {
            return new Promise((s, f) => model.getExternalIdMapping(s, f));
        }).then(e => {
            let objCount = 0;
            for (let key in e) {
                objCount++;
            }
            sceneState.innerHTML = `${objCount}个对象`;
        }).catch((e) => {
            sceneState.innerHTML = JSON.stringify(e);
        });
    };
    document.getElementById("updateScene").onclick();
});
//三维操控
Promise.all([viewerPromise, toolPromise]).then(([viewer, eeptool]) => {
    _eeptool = eeptool;
    let modeBTs = document.getElementsByClassName("ToolMode");
    for (let i = 0; i < modeBTs.length; i++) {
        modeBTs[i].onclick = (e) => {
            eeptool.set3DCommand(parseInt(e.target.getAttribute("data")));
        }
    }

    //订阅视图选中项改变事件
    viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
        let elements = viewer.getSelection();
        document.getElementById("MySelectionValue").innerHTML = elements.length == 1 ? ("ID:" + elements[0]) : (elements.length + "项");
    });
    viewer.addEventListener(Sippreep.Viewing.MODEL_ADDED_EVENT, () => {
        _eeptool.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
    });
});
//三维标记
Promise.all([pickPointPromise, Markup3DPromise, viewerPromise]).then(([pickPoint, markup3d, viewer]) => {
    /**
     * @type {(point: THREE.Vector3) => void)}
     */
    let pickHandle = null;
    /**
     * @type { Sippreep.Extensions.Markup.IMarkup3D}
     */
    let newMarkupItem = null;
    let orderNumber = 1000;
    /**
     * @type { Array<string>}
     */
    let selectNames = null;
    /**
     * 
     * @param {null|Sippreep.Extensions.Markup.IMarkup3D[]} ifNoSelect 
     */
    let getSelectItems = (ifNoSelect) => {
        if (selectNames && selectNames.length > 0) {
            return markup3d.getItems().toArray().filter((v) => {
                return selectNames.indexOf(v.tag) >= 0;
            })
        } else {
            return ifNoSelect;
        }
    };
    pickPoint.registerPointCallback((p) => {
        /**
         * 防止与碰撞物体重叠
         */
        let t = viewer.navigation.getEyeVector().normalize();
        pickHandle(p.sub(t.multiplyScalar(0.01)));
    });


    document.getElementById("selectNames").onchange = (e) => {
        if (e.target.value) {
            selectNames = e.target.value.split(',');
        } else {
            selectNames = null;
        }
    }
    document.getElementById("fitViewMarkup").onclick = (e) => {
        let getBox = () => {
            let box = new THREE.Box3();
            getSelectItems(markup3d.getItems().toArray()).forEach(v => {
                box.union(markup3d.getBox(v));
            });
            return box;
        };
        viewer.navigation.fitBounds(true, getBox());

        let showMarkItem = () => {
            let markItem = getSelectItems(markup3d.getItems().toArray())[0];
            if (markItem) {
                if (markItem.offset)
                    document.getElementById("item_offset").value = JSON.stringify(markItem.offset.toArray());
                else
                    document.getElementById("item_offset").value = null;

                if (markItem.contentOffset)
                    document.getElementById("item_contentOffset").value = JSON.stringify(markItem.contentOffset.toArray());
                else
                    document.getElementById("item_contentOffset").value = null;

                if (markItem.appearance.anchorColor)
                    document.getElementById("item_anchorColor").value = JSON.stringify(markItem.appearance.anchorColor.toArray());
                else
                    document.getElementById("item_anchorColor").value = null;

                if (markItem.appearance && markItem.appearance.offsetColor)
                    document.getElementById("item_offsetColor").value = JSON.stringify(markItem.appearance.offsetColor.toArray());
                else
                    document.getElementById("item_offsetColor").value = null;


            }
        };
        showMarkItem();
    }
    document.getElementById("updateMarkup").onclick = (e) => {
        getSelectItems(markup3d.getItems().toArray()).forEach(v => {
            ((value) => {
                if (value)
                    v.offset = new THREE.Vector3(...(JSON.parse(value)));
            })(document.getElementById("item_offset").value);
            ((value) => {
                if (value)
                    v.contentOffset = new THREE.Vector2(...(JSON.parse(value)));
            })(document.getElementById("item_contentOffset").value);
            ((value) => {
                if (value)
                    v.appearance.anchorColor = new THREE.Color(...(JSON.parse(value)));
            })(document.getElementById("item_anchorColor").value);
            ((value) => {
                if (value)
                    v.appearance.offsetColor = new THREE.Color(...(JSON.parse(value)));
            })(document.getElementById("item_offsetColor").value);
        })
    };
    document.getElementById("deleteMarkup").onclick = (e) => {
        let selectItems = getSelectItems(null);
        if (selectItems) {
            selectItems.forEach(v => {
                markup3d.getItems().remove(v);
            });
        } else {
            markup3d.getItems().clear();
        }
    }


    document.getElementById("newPoint").onclick = (e) => {
        if (newMarkupItem) {
            newMarkupItem = null;
        }
        pickPoint.enableMode();
        pickHandle = (p) => {
            orderNumber++;
            newMarkupItem = markup3d.getItems().add();
            newMarkupItem.tag = orderNumber.toString();

            let a = new Sippreep.Extensions.Markup.Point();
            a.value = p;
            newMarkupItem.anchor = a;

            var t = document.createElement("div");
            t.innerHTML = `<div style="background-color:rgba(255, 255, 255, 0.8);">编号：${newMarkupItem.tag}</div>`;
            newMarkupItem.content = t.firstChild;
        };
    };
    document.getElementById("newPolyline").onclick = (e) => {
        if (newMarkupItem && !checkType(newMarkupItem.anchor, Sippreep.Extensions.Markup.Polyline)) {
            newMarkupItem = null;
        }
        pickPoint.enableMode();

        pickHandle = (p) => {
            if (!newMarkupItem) {
                newMarkupItem = markup3d.getItems().add();
                orderNumber++;
                newMarkupItem.tag = orderNumber.toString();

                let a = new Sippreep.Extensions.Markup.Polyline();
                a.path = new Array();
                a.path.push(p);
                newMarkupItem.anchor = a;
                newMarkupItem.content = `<div style="background-color:rgba(255, 255, 255, 0.8);">编号：${newMarkupItem.tag}</div>`;
            } else {
                let a = newMarkupItem.anchor;
                a.path.push(p);
                newMarkupItem.anchor = a;
            }
        };
    };
    document.getElementById("newPolygon").onclick = (e) => {
        if (newMarkupItem && !checkType(newMarkupItem.anchor, Sippreep.Extensions.Markup.Polygon)) {
            newMarkupItem = null;
        }
        pickPoint.enableMode();

        pickHandle = (p) => {
            if (!newMarkupItem) {
                orderNumber++;
                newMarkupItem = markup3d.getItems().add();
                newMarkupItem.tag = orderNumber.toString();

                let a = new Sippreep.Extensions.Markup.Polygon();
                a.vertices = new Array();
                a.vertices.push(p);
                newMarkupItem.anchor = a;
                newMarkupItem.content = `<div style="background-color:rgba(255, 255, 255, 0.8);">编号：${newMarkupItem.tag}</div>`;

            } else {
                let a = newMarkupItem.anchor;
                a.vertices.push(p);
                newMarkupItem.anchor = a;
            }
        };
    };
    document.getElementById("exportTo2").onclick = (e) => {
        let convertArray = (list1, convert) => {
            let list2 = [];
            for (let item of list1) {
                list2.push(convert(item));
            }
            return list2;
        }
        let convertColor = (color) => { return { r: color.r, g: color.g, b: color.b }; }
        let convertVector2 = (vector2) => { return { x: vector2.x, y: vector2.y }; }
        let convertVector3 = (vector3) => { return { x: vector3.x, y: vector3.y, z: vector3.z }; }
        let convertAnchor = (anchor) => {
            if (anchor instanceof Sippreep.Extensions.Markup.Point)
                return { type: "Point", value: convertVector3(anchor.value) };
            else if (anchor instanceof Sippreep.Extensions.Markup.Polyline) {
                return { type: "Polyline", path: convertArray(anchor.path, convertVector3) };
            } else if (anchor instanceof Sippreep.Extensions.Markup.Polygon) {
                return { type: "Polygon", vertices: convertArray(anchor.vertices, convertVector3) };
            }
        }
        let convertAppearance = (app) => {
            let json = {};
            if (app.anchorColor)
                json.anchorColor = convertColor(app.anchorColor);
            if (app.offsetColor)
                json.offsetColor = convertColor(app.offsetColor);
            return json;
        }
        let convertItem = (item) => {
            let data = { anchor: convertAnchor(item.anchor) };
            data.anchorDbid = item.anchorDbid;
            if (item.offset)
                data.offset = convertVector3(item.offset);
            if (item.content)
                data.content = item.content;
            if (item.contentOffset)
                data.contentOffset = convertVector2(item.contentOffset);
            if (item.appearance) {
                data.appearance = convertAppearance(item.appearance);
            }
            data.tag = item.tag;
            return data;
        }
        let data = {};
        data.version = "1.0.0";
        data.items = convertArray(markup3d.getItems().toArray(), convertItem);
        document.getElementById("jsonData").value = JSON.stringify(data);
    };
    document.getElementById("importTo2").onclick = (e) => {
        let convertArray = (list1, convert) => {
            let list2 = [];
            for (let item of list1) {
                list2.push(convert(item));
            }
            return list2;
        }
        let convertColor = (json) => { return new THREE.Color(json.r, json.g, json.b); }
        let convertVector2 = (json) => { return new THREE.Vector2(json.x, json.y); }
        let convertVector3 = (json) => { return new THREE.Vector3(json.x, json.y, json.z); }
        let convertAnchor = (json) => {
            if (json.type == "Point") {
                return new Sippreep.Extensions.Markup.Point(convertVector3(json.value));
            } else if (json.type == "Polyline") {
                let line = new Sippreep.Extensions.Markup.Polyline();
                line.path = new Array();
                json.path.forEach(_ => {
                    line.path.push(convertVector3(_));
                });
                return line;
            } else if (json.type == "Polygon") {
                let line = new Sippreep.Extensions.Markup.Polygon();
                line.vertices = new Array();
                json.vertices.forEach(_ => {
                    line.vertices.push(convertVector3(_));
                });
                return line;
            }
        }
        let convertAppearance = (json, oldValue) => {
            if (!oldValue)
                oldValue = {};
            if (json.anchorColor)
                oldValue.anchorColor = convertColor(json.anchorColor);
            if (json.offsetColor)
                oldValue.offsetColor = convertColor(json.offsetColor);
            return oldValue;
        }
        let convertItem = (json) => {
            let itemData = markup3d.getItems().add();
            itemData.anchor = convertAnchor(json.anchor);
            itemData.anchorDbid = json.anchorDbid;
            if (json.offset)
                itemData.offset = convertVector3(json.offset);
            if (json.content)
                itemData.content = json.content;
            if (json.contentOffset)
                itemData.contentOffset = convertVector2(json.contentOffset);
            if (json.appearance) {
                itemData.appearance = convertAppearance(json.appearance, itemData.appearance);
            }
            itemData.tag = json.tag;
            return itemData;
        }
        let data = JSON.parse(document.getElementById("jsonData").value);
        convertArray(data.items, convertItem);
    };
});
//其他功能
Promise.all([viewerPromise, modelManPromise]).then(([viewer, modelMan]) => {
    document.getElementById("setTrans").onclick = (e) => {
        modelMan.GetManager().then((v) => {
            v.setTransparents((v.getAppearance(v.getDbids()[0]).transparent > 0) ? 0 : 0.5);
        });
    }
});


function checkType(value, valueType) {
    if (valueType) {
        if (value instanceof valueType) {
            return true;
        }
    }
    return false;
}