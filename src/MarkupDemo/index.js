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
            viewer.loadModel(`${host}/api/UserSpace/ViewFile/${sceneID}?path=/3d.svf`, { globalOffset: { x: 0, y: 0, z: 0 } }, s, f);
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
        // let jsonDataOffset = document.getElementById("jsonDataOffset").value;
        // let dataOffset = jsonDataOffset ? JSON.parse(jsonDataOffset) : undefined;
        //let data = customExport.exportTo(markup3d, dataOffset);

        let data = customExport.exportTo(markup3d);
        document.getElementById("jsonData").value = JSON.stringify(data);
    };
    document.getElementById("importTo2").onclick = (e) => {
        let jsonDataOffset = document.getElementById("jsonDataOffset").value;
        let dataOffset = jsonDataOffset ? JSON.parse(jsonDataOffset) : undefined;

        let dataString = document.getElementById("jsonData").value;
        let data = dataString ? JSON.parse(dataString) : customData;

        customExport.importTo(markup3d, data, dataOffset);
    };
    document.getElementById("exportTo").onclick = (e) => {
        document.getElementById("jsonData").value = markup3d.exportItems();
    };
    document.getElementById("importTo").onclick = (e) => {
        markup3d.importItems(document.getElementById("jsonData").value);
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