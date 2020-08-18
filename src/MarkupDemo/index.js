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
            return new Promise((s, f) => model.getExternalIdMapping(s, f));
        }).then(e => {
            var objCount = 0;
            for (var key in e) {
                objCount++;
            }
            sceneState.innerHTML = `${objCount}个对象`;
        }).catch((e) => {
            sceneState.innerHTML = JSON.stringify(e);
        });
    };
    document.getElementById("updateScene").onclick();
});
/**
 * @type {Promise<Sippreep.Extensions.EEPTools.EEPToolExtension>}
 */
var toolPromise = viewerPromise.then(v => v.loadExtension("Sippreep.Extensions.EEPTools.EEPToolExtension"));
Promise.all([viewerPromise, toolPromise]).then(([viewer, eeptool]) => {
    _eeptool = eeptool;
    var modeBTs = document.getElementsByClassName("ToolMode");
    for (let i = 0; i < modeBTs.length; i++) {
        modeBTs[i].onclick = (e) => {
            eeptool.set3DCommand(parseInt(e.target.getAttribute("data")));
        }
    }

    //订阅视图选中项改变事件
    viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
        var elements = viewer.getSelection();
        document.getElementById("MySelectionValue").innerHTML = elements.length == 1 ? ("ID:" + elements[0]) : (elements.length + "项");
    });
    viewer.addEventListener(Sippreep.Viewing.MODEL_ADDED_EVENT, () => {
        _eeptool.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
    });
});

/**
 * @type { Promise<Sippreep.Extensions.PickPoint.PickPointExtension> }
 */
var pickPointPromise = viewerPromise.then(v => {
    return v.loadExtension("Sippreep.Extensions.PickPoint.PickPointExtension");
});
/**
 * @type {Promise<Sippreep.Extensions.Markup.Markup3DExtension>}
 */
var Markup3DPromise = viewerPromise.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.Markup.Markup3DExtension");
});
Promise.all([pickPointPromise, Markup3DPromise]).then(([pickPoint, markup3d]) => {
    pickPoint.registerPointCallback((p) => {
        var markupItem = markup3d.getItems().add();
        markupItem.anchor = p;
        markupItem.content = `<div style="background-color:rgba(255, 255, 255, 0.8);">编号：${markupItem.id}</div>`;
        // markupItem.offset = new THREE.Vector3(0, 0, 15);
        // markupItem.content = service.getMessage(element);
        // markupItem.contentOffset = new THREE.Vector2(-8, -8);
        // markupItem.appearance.anchorColor = new THREE.Color(1, 1, 1);
        // markupItem.appearance.offsetColor = new THREE.Color(1, 1, 1);
    });
    document.getElementById("pickPoint").onclick = (e) => {
        pickPoint.enableMode();
    };
    console.log(["拾取点", ]);
});