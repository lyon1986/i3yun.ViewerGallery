/// <reference path="../../src/viewer/SippreepViewer.d.ts" />
/// <reference path="../../src/Sippreep.d.ts" />
/// <reference path="../../src/extensions/Sippreep.Extensions.TidbLoader.d.ts" />
/// <reference path="../../src/extensions/Sippreep.Extensions.EEPTools.d.ts" />
/// <reference path="../../src/extensions/Sippreep.Extensions.PickPlane.d.ts" />



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

/**
 * 异步初始化过程
 */
(function main_fast() {
    let viewer_async = SippreepViewer.CreateViewer(document.getElementById("viewer1"));

    let TidbLoaderExtension_async = viewer_async.then((viewer) => {
        return viewer.loadExtension("Sippreep.Extensions.TidbLoader.TidbLoaderExtension");
    });

    let EEPToolExtension_async = viewer_async.then((viewer) => {
        return viewer.loadExtension("Sippreep.Extensions.EEPTools.EEPToolExtension");
    });


    let model_async = TidbLoaderExtension_async.then((v) => {
        v.getConfig().host = DATABASE;
        v.getConfig().token = TOKEN;
        return v.loadScene(SCENEID);
    });

    Promise.all([model_async, EEPToolExtension_async]).then(([_, v]) => {
        v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
        setTimeout(() => {

            let PPex_async = viewer_async.then((viewer) => {
                return viewer.loadExtension("Sippreep.Extensions.PickPlane.PickPlaneExtension");
            })

            PPex_async.then((api) => {
                let btn1 = document.createElement("button");
                btn1.innerText = "模式x- （默认的）";
                btn1.onclick = () => {
                    api.enableMode("x");
                };
                btn1.style.position = "absolute";
                btn1.style.zIndex = "99";
                document.body.appendChild(btn1);


                let btn2 = document.createElement("button");
                btn2.style.top = "50px";
                btn2.innerText = "模式x+";
                btn2.onclick = () => {
                    api.enableMode("x");
                    api.reverseCut();
                };
                btn2.style.position = "absolute";
                btn2.style.zIndex = "99";
                document.body.appendChild(btn2);

                let btn3 = document.createElement("button");
                btn3.style.top = "100px";
                btn3.innerText = "模式y-";
                btn3.onclick = () => {
                    api.enableMode("y");
                };
                btn3.style.position = "absolute";
                btn3.style.zIndex = "99";
                document.body.appendChild(btn3);

                let btn4 = document.createElement("button");
                btn4.style.top = "150px";
                btn4.innerText = "模式y+";
                btn4.onclick = () => {
                    api.enableMode("y");
                    api.reverseCut();
                };
                btn4.style.position = "absolute";
                btn4.style.zIndex = "99";
                document.body.appendChild(btn4);

                let btn5 = document.createElement("button");
                btn5.style.top = "200px";
                btn5.innerText = "模式z-";
                btn5.style.position = "absolute";
                btn5.style.zIndex = "99";
                btn5.onclick = () => {
                    api.enableMode("z");
                };
                document.body.appendChild(btn5);

                let btn6 = document.createElement("button");
                btn6.style.top = "250px";
                btn6.innerText = "模式z+";
                btn6.style.position = "absolute";
                btn6.style.zIndex = "99";
                btn6.onclick = () => {
                    api.enableMode("z");
                    api.reverseCut();
                };
                document.body.appendChild(btn6);

                let btn7 = document.createElement("button");
                btn7.style.top = "300px";
                btn7.innerText = "取消所有切面";
                btn7.style.position = "absolute";
                btn7.style.zIndex = "99";
                btn7.onclick = () => {
                    api.clearCut();
                };
                document.body.appendChild(btn7);
            });
        }, 1000);

    });

    //美化操作
    Promise.all([viewer_async, model_async]).then(([v, _]) => {
        v.setGroundReflection(true);
        v.setGroundShadow(true);
    });
})();