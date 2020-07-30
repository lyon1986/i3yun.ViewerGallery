//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById("viewer1"));

//场景配置
Promise.all([viewerPromise]).then(([viewer]) => {
    document.getElementById("updateScene").onclick = () => {
        var host = document.getElementById("DATABASE").value;
        var sceneID = document.getElementById("SCENEID").value;
        var sceneState = document.getElementById("sceneState");
        sceneState.innerHTML = "正在加载……";
        /**
         * @type { Promise<Sippreep.Viewing.Model> }
         */
        var modelPromise = new Promise((s, f) => {
            if (viewer.model) {
                viewer.unloadModel(viewer.model);
            }
            viewer.loadModel(`${host}/api/UserSpace/ViewFile/${sceneID}?path=/3d.svf`, null, s, f);
        });
        modelPromise.then((model) => {
            return new Promise((s, f) => {
                model.getExternalIdMapping((e) => {
                    var guidMap = new Map();
                    var dbidMap = new Map();
                    for (var key in e) {
                        if (key.length > 0) {
                            guidMap.set(key, e[key]);
                            dbidMap.set(e[key], e);
                        }
                    }
                    sceneState.innerHTML = `${guidMap.size}个对象`;
                    s(guidMap);
                    PublishEvent("SceneLoaded");
                }, f);
            });
        }).catch((e) => {
            sceneState.innerHTML = JSON.stringify(e);
        });
    };

});

//进度模拟
Promise.all([viewerPromise]).then(([viewer]) => {
    service = new Service(viewer);
    SubscribeEvent("SceneLoaded", () => {
        service.InitData();
    });

    document.getElementById("init").onclick = () => {
        service.InitData();
    }
    document.getElementById("start").onclick = () => {
        service.SimulatedColors(document.getElementById("RangeState"));
    }
    document.getElementById("FPS").onchange = (e) => {
        service.FPS = parseInt(e.target.value);
    }
    document.getElementById("SumTime").onchange = (e) => {
        service.SumTime = parseInt(e.target.value);
    }
    document.getElementById("RandomRange").onchange = (e) => {
        service.RandomRange = e.target.checked;
        service.InitData();
    }
    document.getElementById("RandomOrder").onchange = (e) => {
        service.RandomOrder = e.target.checked
        service.InitData();
    }
    document.getElementById("FinishedSetTransparent").onchange = (e) => {
        service.FinishedSetTransparent = e.target.checked;
    }
    document.getElementById("RangeValue").onchange = (e) => {
            service.SetProgress(e.target.value / 100);
        }
        //订阅视图选中项改变事件
    viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
        var elements = viewer.getSelection();
        document.getElementById("MySelectionValue").innerHTML = elements.length == 1 ? (`${elements[0]}的进度${service.GetProgress(elements[0])}`) : (elements.length + "项");
    });
})


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
    this.dbidColors = [new THREE.Vector4(1, 0, 0, 1 - 0.1), new THREE.Vector4(1, 0, 0, 1 - 0.3), new THREE.Vector4(1, 0, 0, 1 - 0.5), new THREE.Vector4(1, 0, 0, 1 - 0.7), new THREE.Vector4(1, 0, 0, 1 - 0.9)];
    /**
     * @type {{ Range: { min: number, max: number }, DBidRange: { min: number, max: number }, DBids:number[] }[]}
     */
    this.Datas = null;
    this.RangeValue = 0;
    this.FPS = 5;
    this.SumTime = 20;


    this.SetProgress = (value) => {
        this.RangeValue = value;
        this.UpdateProgress();
    }
    this.UpdateProgress = () => {
        var value = this.RangeValue;
        /**
         * @type {{ Range: { min: number, max: number }, DBidRange: { min: number, max: number }, DBids:number[] }[]}
         */
        var datas = this.Datas;
        // var blueColor = new THREE.Color(0, 1, 0);
        // viewer.impl.fadeMaterial.color = blueColor;
        viewer.model.clearThemingColors();
        datas.forEach(data => {
            let rangeValue = (value - data.Range.min) / (data.Range.max - data.Range.min) * (data.DBidRange.max - data.DBidRange.min) + data.DBidRange.min;
            data.DBids.forEach(dbid => {
                viewer.model.visibilityManager.setNodeOff(dbid, rangeValue <= 0);
                if (rangeValue < 1) {
                    //var color = new THREE.Vector4(1, 0, 0, 1 - rangeValue);
                    var color = this.dbidColors[parseInt((this.dbidColors.length) * rangeValue)];
                    viewer.model.setThemingColor(dbid, color, true);
                }
                if (rangeValue >= 1 && this.FinishedSetTransparent)
                    viewer.model.visibilityManager.hide(dbid);
                else
                    viewer.model.visibilityManager.show(dbid);
            })
        });
    }

    this.SimulatedColors = function(element) {
        var globe = this;
        if (!globe.Datas)
            globe.InitData();
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

                element.innerHTML = `进度${(globe.RangeValue * this.SumTime).toFixed(1)}/${this.SumTime} FPS${this.FPS} 对象数量${globe.Datas.length}`;
                if (globe.SimulatedHandle)
                    globe.SimulatedHandler = setTimeout(globe.SimulatedHandle, 1000 / this.FPS);
            }
            globe.SimulatedHandle();
        }
    }
    this.InitData = function() {
        var tree = viewer.model.getInstanceTree();
        var root = tree.getRootId();
        var dbids = [];
        tree.enumNodeChildren(root, (dbid) => {
            dbids.push(dbid);
        }, false);
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
            tree.enumNodeChildren(id, (childId) => {
                getLeafNodeIdsRec(childId, leafIds)
                    ++childCount
            }, false);

            if (childCount === 0) {
                leafIds.push(id)
            }
        }
        this.Datas = [];
        dbids.forEach((dbid, i) => {
            var r = 0;
            if (this.RandomRange)
                r = Random(0, 10);
            var dbidChilds = [];
            getLeafNodeIdsRec(dbid, dbidChilds);
            dbidChilds.forEach(child => {
                this.Datas.push({
                    Range: { min: (i - r) / dbids.length, max: (i + 1) / dbids.length },
                    DBidRange: { min: 0, max: 1 },
                    DBids: [child]
                });
            })

        })

        this.RangeValue = 0;
    }
    this.GetProgress = (dbid) => {
        /**
         * @type {{ Range: { min: number, max: number }, DBidRange: { min: number, max: number }, DBids:number[] }[]}
         */
        var datas = this.Datas;
        if (datas) {
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].DBids.indexOf(dbid) >= 0) {
                    var data = datas[i];
                    var value = this.RangeValue;
                    let rangeValue = (value - data.Range.min) / (data.Range.max - data.Range.min) * (data.DBidRange.max - data.DBidRange.min) + data.DBidRange.min;
                    return rangeValue;
                }
            }
        }
    }
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function PublishEvent(eventName) {
    const event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, true, true);
    document.dispatchEvent(event);
}

function SubscribeEvent(eventName, callback) {
    document.addEventListener(eventName, callback);
}