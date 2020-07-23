/**
 * 包含四个插件
 *  
 * 包含一些功能
 *  
 */

//let DATABASE = "http://172.16.40.25:6098";
let DATABASE = "http://39.105.69.54:6098";
let TOKEN = "eyJhbHQiOiJTSEExIiwidHlwIjoiSldUIn0=.eyJpc3MiOm51bGwsImV4cCI6bnVsbCwiYXVkIjpudWxsLCJpYXQiOm51bGwsIlVzZXJJRCI6IlVTRTIwMjAwNDAxMTY1NTI2IiwiVGltZW91dCI6IjIwNDctMTEtMzBUMTA6NTM6NDYuNzg3NzUxMyswODowMCIsIlNjb3BlcyI6WyJQcm9qZWN0UmVhZCJdfQ==.lCzg8kBJZUVWyxTtLd0mNK8xJ00Igm6TN9fYhAIOlwwzUyCzNv4d2e4BBpx9+yphuiKzEJsu5Ft382gBF7A9Q9UpJ1iZCfe0GZ/P/1l/SLjWQwoJMLrLVvCc6975x/256FRTqQPEGZv3Cj/hpLuPdwTnvLerCv7QukmwYSfULGE="
let SCENEID = "P2006230032";
let TidbLoaderName = "Sippreep.Extensions.TidbLoader.TidbLoaderExtension";
let toolExtensionName = "Sippreep.Extensions.EEPTools.EEPToolExtension";
let PickPlaneExtensionName = "Sippreep.Extensions.PickPlane.PickPlaneExtension";
let viewerDiv = document.getElementById("viewer1");
/**
 * 异步初始化过程
 */
let viewer_async = SippreepViewer.CreateViewer(viewerDiv);
/**
 * @type{Promise<Sippreep.Extensions.TidbLoader.TidbLoaderExtension>}
 */
let TidbLoaderExtension_async = viewer_async.then((viewer) => {
    return viewer.loadExtension(TidbLoaderName);
});
/**
 * @type{Promise<Sippreep.Extensions.EEPTools.EEPToolExtension>}
 */
let EEPToolExtension_async = viewer_async.then((viewer) => {
    return viewer.loadExtension(toolExtensionName);
});
let model_async = TidbLoaderExtension_async.then((v) => {
    v.getConfig().host = DATABASE;
    v.getConfig().token = TOKEN;
    return v.loadScene(SCENEID);
});
/**
 * @type{Promise<Sippreep.Extensions.PickPlane.PickPlaneExtension>}
 */
let PPex_async = Promise.all([model_async, viewer_async]).then(([model, viewer]) => {
    return new Promise((s, f) => {
        setTimeout(() => {
            viewer.loadExtension(PickPlaneExtensionName).then((e) => s(e), (e) => f(e));
        }, 1000);
    })
});
//绑定Tool按钮
Promise.all([model_async, EEPToolExtension_async]).then(([_, v]) => {
    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
    document.getElementById("toolMode1").onclick = () => {
        v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.PAN);
    }
    document.getElementById("toolMode2").onclick = () => {
        v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
    }
    document.getElementById("toolMode3").onclick = () => {
        v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROAM);
    }
});
//绑定剖分按钮
Promise.all([viewer_async, PPex_async]).then(([viewer, api]) => {
    document.getElementById("clearPlanes").onclick = () => {
        viewer.setCutPlanes([]);
    }
    document.getElementById("clearLastPlane").onclick = () => {
        let ans = viewer.getCutPlanes();
        ans.pop();
        viewer.setCutPlanes(ans);
    }
    document.getElementById("planeMode1").onclick = () => {
        api.enableMode(Sippreep.Extensions.PickPlane.PickPlaneMode.PositiveDirectionOfX);
    }
    document.getElementById("planeMode2").onclick = () => {
        api.enableMode(Sippreep.Extensions.PickPlane.PickPlaneMode.NegativeDirectionOfX);
    }
    document.getElementById("planeMode3").onclick = () => {
        api.enableMode(Sippreep.Extensions.PickPlane.PickPlaneMode.PositiveDirectionOfY);
    }
    document.getElementById("planeMode4").onclick = () => {
        api.enableMode(Sippreep.Extensions.PickPlane.PickPlaneMode.NegativeDirectionOfY);
    }
    document.getElementById("planeMode5").onclick = () => {
        api.enableMode(Sippreep.Extensions.PickPlane.PickPlaneMode.PositiveDirectionOfZ);
    }
    document.getElementById("planeMode6").onclick = () => {
        api.enableMode(Sippreep.Extensions.PickPlane.PickPlaneMode.NegativeDirectionOfZ);
    }
    api.registerPlaneCallback((p) => {
        var planes = viewer.getCutPlanes();
        planes.push(new THREE.Vector4(p.normal.x, p.normal.y, p.normal.z, p.constant));
        viewer.setCutPlanes(planes);
    });
});
//美化操作
Promise.all([viewer_async, model_async]).then(([v, _]) => {
    v.setGroundReflection(true);
    v.setGroundShadow(true);
});