//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById("viewer1"));
var servicePromise = viewerPromise.then((v) => {
    return new Service(v);
});

//场景配置
Promise.all([servicePromise]).then(([service]) => {
    document.getElementById("updateScene").onclick = () => {
        var host = document.getElementById("DATABASE").value;
        var ID = document.getElementById("SCENEID").value;
        var sceneState = document.getElementById("sceneState");
        sceneState.innerHTML = "正在加载……";
        var modelPromise = document.getElementById("dbType").value == "I3DB" ?
            service.loadModel(host, ID) : service.loadModelForFamily(host, ID);
        modelPromise.then(() => {
            return service.getObjs();
        }).then(e => {
            var objCount = 0;
            for (var key in e) {
                if (key.length > 0) {
                    objCount++;
                }
            }
            sceneState.innerHTML = `${objCount}个对象`;
        }).catch((e) => {
            sceneState.innerHTML = JSON.stringify(e);
        });
    };
    document.getElementById("updateScene").onclick();
});
//对象状态模拟
Promise.all([viewerPromise, servicePromise]).then(([viewer, service]) => {
    toggleFun = (records, fun) => {
        var dbids = viewer.getSelection();
        if (dbids.length > 0) {
            dbids.forEach(element => {
                var index = records.indexOf(element);
                if (index < 0) {
                    records.push(element);
                } else {
                    records.splice(index, 1);
                }
                fun(element, index < 0);
            });
        } else {
            if (records.length > 0) {
                records.forEach(element => {
                    fun(element, false)
                });
                records.splice(0, records.length);
            } else {
                service.getObjs().then(e => {
                    for (var key in e) {
                        fun(e[key], true);
                        records.push(e[key]);
                    }
                });
            }
        }
    };
    var hides = [];
    document.getElementById("objHide").onclick = () => {
        toggleFun(hides, service.setHide);
    }

    var objTrans = []
    document.getElementById("objTrans").onclick = (e) => {
        toggleFun(objTrans, service.setTran);
    }

    var objReds = [];

    document.getElementById("objRed").onclick = (e) => {
        toggleFun(objReds, service.setColor);
    }

    //订阅视图选中项改变事件
    viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
        var elements = viewer.getSelection();
        if (elements.length == 1) {
            service.getObjs().then(e => {
                for (var key in e) {
                    if (e[key] == elements[0]) {
                        document.getElementById("selectionState").innerHTML = `{dbid:${elements[0]},unique:${key}}`;
                    }
                }
            });
        } else {
            document.getElementById("selectionState").innerHTML = (elements.length + "项");
        }
    });
});
//辅助功能
Promise.all([viewerPromise, servicePromise]).then(([viewer, service]) => {
    function isInteger(obj) {
        return obj % 1 === 0
    }
    document.getElementById("findObj").onclick = () => {
        var ID = document.getElementById("obj_value").value;

        service.getObjs().then(e => {
            if (isInteger(ID)) {
                var dbid = parseInt(ID);
                // for (var key in e) {
                //     service.setHide(e[key], e[key] != dbid);
                // }
                viewer.select(dbid);
                viewer.fitToView([dbid]);

            } else {
                // for (var key in e) {
                //     service.setHide(e[key], key != ID);
                // }
                viewer.select(e[ID]);
                viewer.fitToView([e[ID]]);
            }
        });
    }
})

function Service(viewer) {
    /**
     * 加载模型
     * @type { (url:string) => Promise<Sippreep.Viewing.Model> }
     */
    this.loadModel = (host, ID) => {
            return new Promise((s, f) => {
                if (viewer.model) {
                    viewer.unloadModel(viewer.model);
                }
                var url = `${host}/api/UserSpace/ViewFile/${ID}?path=/3d.svf`;
                viewer.loadModel(url, null, s, f);
            });
        }
        /**
         * 加载族模型
         * @type { (url:string) => Promise<Sippreep.Viewing.Model> }
         */
    this.loadModelForFamily = (host, ID) => {
            return new Promise((s, f) => {
                if (viewer.model) {
                    viewer.unloadModel(viewer.model);
                }
                var url = `${host}/api/Revit/ViewFile/?ID=${ID}&Path=/3d.svf`;
                viewer.loadModel(url, null, s, f);
            });
        }
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
        }
        /**
         * 启用对象隐藏
         * @type { (dbid:number, value:boolean) =>void }
         */
    this.setHide = (dbid, value) => {
            viewer.model.visibilityManager.setNodeOff(dbid, value);
        }
        /**
         * 启用对象透明
         * @type { (dbid:number, value:boolean) =>void }
         */
    this.setTran = (dbid, value) => {
            if (value)
                viewer.model.visibilityManager.hide(dbid);
            else
                viewer.model.visibilityManager.show(dbid);
        }
        /**
         * 启用对象颜色
         * @type { (dbid:number, value:boolean) =>void }
         */
    this.setColor = (dbid, value) => {
            if (value) {
                viewer.setThemingColor(dbid, this.color);
            } else {
                viewer.setThemingColor(dbid, null);
            }
        }
        /**
         * 启用对象颜色的值
         */
    this.color = new THREE.Vector4(1, 0, 0, 1);
}