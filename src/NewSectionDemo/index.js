/**
 * 包含四个插件
 *  
 * 包含一些功能
 *  
 */

let TidbLoaderName = "Sippreep.Extensions.TidbLoader.TidbLoaderExtension";
let toolExtensionName = "Sippreep.Extensions.EEPTools.EEPToolExtension";
let PickPlaneExtensionName = "Sippreep.Extensions.PickPlane.PickPlaneExtension";
let viewerDiv = document.getElementById("viewer1");
/**
 * 异步初始化过程
 */
let viewer_async = SippreepViewer.CreateViewer(document.getElementById("viewer1"));
//场景配置
Promise.all([viewer_async]).then(([viewer]) => {
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
                    var count = 0;
                    for (var key in e) {
                        count++;
                    }
                    sceneState.innerHTML = `${count}个对象`;
                    s(e);
                }, f);
            });
        }).catch((e) => {
            sceneState.innerHTML = JSON.stringify(e);
        });
    };
    document.getElementById("updateScene").click();
});
//三维操控
let toolExtensionPromise = viewer_async.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.EEPTools.EEPToolExtension");
});
Promise.all([toolExtensionPromise]).then(([eeptool]) => {
    var modeBTs = document.getElementsByClassName("ToolMode");
    for (let i = 0; i < modeBTs.length; i++) {
        modeBTs[i].onclick = (e) => {
            eeptool.set3DCommand(parseInt(e.target.getAttribute("data")));
        }
    }
});
/**
 * @type{Promise<Sippreep.Extensions.PickPlane.PickPlaneExtension>}
 */
let PPex_async = Promise.all([viewer_async]).then(([viewer]) => {
    return viewer.loadExtension(PickPlaneExtensionName);
});
var _eeptool;
//绑定Tool按钮
Promise.all([viewer_async, toolExtensionPromise]).then(([viewer, eeptool]) => {
    _eeptool = eeptool;
    var modeBTs = document.getElementsByClassName("toolMode");
    for (let i = 0; i < modeBTs.length; i++) {
        modeBTs[i].onclick = (e) => {
            //Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE
            eeptool.set3DCommand(parseInt(e.target.getAttribute("data")));
        }
    }
    //订阅视图选中项改变事件
    viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
        var elements = viewer.getSelection();
        document.getElementById("MySelectionValue").innerHTML = elements.length == 1 ? ("ID:" + elements[0]) : (elements.length + "项");
    });
});
//绑定剖分按钮
Promise.all([viewer_async, PPex_async]).then(([v, api]) => {
    document.getElementById("clearPlanes").onclick = () => {
        v.setCutPlanes([]);
    }
    document.getElementById("clearLastPlane").onclick = () => {
        let ans = v.getCutPlanes();
        ans.pop();
        v.setCutPlanes(ans);
    }
    var modeBTs = document.getElementsByClassName("PickMode");
    for (let i = 0; i < modeBTs.length; i++) {
        modeBTs[i].onclick = (e) => {
            //Sippreep.Extensions.PickPlane.PickPlaneMode.HitFace
            api.enableMode(parseInt(e.target.getAttribute("data")));
        }
    }

    api.registerPlaneCallback((p) => {
        if (p) {
            var planes = v.getCutPlanes();
            planes.push(new THREE.Vector4(p.normal.x, p.normal.y, p.normal.z, p.constant));
            v.setCutPlanes(planes);
        }
    });
});