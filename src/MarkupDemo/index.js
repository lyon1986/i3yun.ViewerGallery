//创建三维视图
let viewerPromise = SippreepViewer.CreateViewer(document.getElementById("viewer1"));

/**
 * 场景配置
 */
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
            //卸载可能存在的旧模型
            if (viewer.model) {
                viewer.unloadModel(viewer.model);
            }
            /**
             * 加载新模型
             * 这个模型好像位置偏了？
             */
            viewer.loadModel(`${host}/api/UserSpace/ViewFile/${sceneID}?path=/3d.svf`, {
                globalOffset: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }, s, f);
        });
        modelPromise.then((model) => {
            //模型加载完成 等待模型数据加载
            return new Promise((s, f) => model.getExternalIdMapping(s, f));
        }).then(e => {
            //模型数据加载完成 数一数部件数
            let objCount = 0;
            for (let key in e) {
                objCount++;
            }
            sceneState.innerHTML = `${objCount}个对象`;
        }).catch((e) => {
            sceneState.innerHTML = JSON.stringify(e);
        });
    };
    //自动触发一次
    document.getElementById("updateScene").onclick();
});

/**
 * 三维操控
 */
/**
 * @type {Promise<Sippreep.Extensions.EEPTools.EEPToolExtension>}
 */
let toolPromise = viewerPromise.then(v => v.loadExtension("Sippreep.Extensions.EEPTools.EEPToolExtension"));
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

/**
 * 三维标记
 */
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
Promise.all([pickPointPromise, Markup3DPromise, viewerPromise]).then(([pickPoint, markup3dApi, viewer]) => {
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
            return markup3dApi.getItems().toArray().filter((v) => {
                return selectNames.indexOf(v.tag) >= 0;
            })
        } else {
            return ifNoSelect;
        }
    };
    /**
     * 防止与碰撞物体重叠
     */
    pickPoint.registerPointCallback((p) => {
        let t = viewer.navigation.getEyeVector().normalize();
        pickHandle(p.sub(t.multiplyScalar(0.01))); //在视线方向减一厘米         
    });

    document.getElementById("selectNames").onchange = (e) => {
        selectNames = (e.target.value) ? e.target.value.split(',') : null;
    }
    document.getElementById("fitViewMarkup").onclick = (e) => {
        let getBox = () => {
            let box = new THREE.Box3();
            getSelectItems(markup3dApi.getItems().toArray()).forEach(v => {
                box.union(markup3dApi.getBox(v));
            });
            return box;
        };

        viewer.navigation.fitBounds(true, getBox());
        let markItem = getSelectItems(markup3dApi.getItems().toArray())[0];
        if (markItem) {
            document.getElementById("item_offset").value = (markItem.offset) ? JSON.stringify(markItem.offset.toArray()) : null;
            document.getElementById("item_contentOffset").value = (markItem.contentOffset) ? JSON.stringify(markItem.contentOffset.toArray()) : null;
            document.getElementById("item_anchorColor").value = (markItem.appearance.anchorColor) ? JSON.stringify(markItem.appearance.anchorColor.toArray()) : null;
            document.getElementById("item_offsetColor").value = (markItem.appearance && markItem.appearance.offsetColor) ? JSON.stringify(markItem.appearance.offsetColor.toArray()) : null;
        }
    }
    document.getElementById("updateMarkup").onclick = (e) => {
        getSelectItems(markup3dApi.getItems().toArray()).forEach(v => {
            let value;
            value = document.getElementById("item_offset").value;
            if (value) v.offset = new THREE.Vector3(...(JSON.parse(value))); //将[1,2,3]转成THREE.Vector3类型
            value = document.getElementById("item_contentOffset").value;
            if (value) v.contentOffset = new THREE.Vector2(...(JSON.parse(value)));
            value = document.getElementById("item_anchorColor").value;
            if (value) v.appearance.anchorColor = new THREE.Color(...(JSON.parse(value)));
            value = document.getElementById("item_offsetColor").value;
            if (value) v.appearance.offsetColor = new THREE.Color(...(JSON.parse(value)));
        })
    };
    document.getElementById("deleteMarkup").onclick = (e) => {
        let selectItems = getSelectItems(null);
        if (selectItems) {
            selectItems.forEach(v => {
                markup3dApi.getItems().remove(v);
            });
        } else {
            markup3dApi.getItems().clear();
        }
    }
    document.getElementById("newPoint").onclick = (e) => {
        newMarkupItem = null;
        pickPoint.enableMode();
        pickHandle = (p) => {
            orderNumber++;
            newMarkupItem = markup3dApi.getItems().add();
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
                newMarkupItem = markup3dApi.getItems().add();
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
                newMarkupItem = markup3dApi.getItems().add();
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

        let data = customExport.exportTo(markup3dApi);
        document.getElementById("jsonData").value = JSON.stringify(data);
    };
    document.getElementById("importTo2").onclick = (e) => {
        let jsonDataOffset = document.getElementById("jsonDataOffset").value;
        let dataOffset = jsonDataOffset ? JSON.parse(jsonDataOffset) : undefined;

        let dataString = document.getElementById("jsonData").value;
        let data = dataString ? JSON.parse(dataString) : customData;

        customExport.importTo(markup3dApi, data, dataOffset);
    };
    document.getElementById("exportTo").onclick = (e) => {
        document.getElementById("jsonData").value = markup3dApi.exportItems();
    };
    document.getElementById("importTo").onclick = (e) => {
        markup3dApi.importItems(document.getElementById("jsonData").value);
    };
});

/**
 * 辅助功能
 */
/**
 * @type {Promise<Sippreep.Extensions.ModelMan.ModelManExtension>}
 */
let modelManPromise = viewerPromise.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.ModelMan.ModelManExtension");
});
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