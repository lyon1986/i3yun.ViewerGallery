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

        let btn0 = document.createElement("button");
        btn0.innerText = "平移";
        btn0.style.top = "700px";
        btn0.onclick = () => {
            v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.PAN);
        };
        btn0.style.position = "absolute";
        btn0.style.zIndex = "99";
        btn0.className = "my-custom-ui";
        document.body.appendChild(btn0);

        let btn01 = document.createElement("button");
        btn01.innerText = "点空地方 旋转";
        btn01.style.top = "800px";
        btn01.onclick = () => {
            v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
        };
        btn01.style.position = "absolute";
        btn01.style.zIndex = "99";
        btn01.className = "my-custom-ui";
        document.body.appendChild(btn01);


        setTimeout(() => {
            let PPex_async = viewer_async.then((viewer) => {
                return viewer.loadExtension("Sippreep.Extensions.PickPlane.PickPlaneExtension");
            })

            PPex_async.then((api) => {
                let btn1 = document.createElement("button");
                btn1.innerText = "模式x- （默认的）";
                btn1.onclick = () => {
                    api.enableMode("x");
                    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
                };
                btn1.style.position = "absolute";
                btn1.style.zIndex = "99";
                btn1.className = "my-custom-ui";
                document.body.appendChild(btn1);


                let btn2 = document.createElement("button");
                btn2.style.top = "100px";
                btn2.innerText = "模式x+";
                btn2.onclick = () => {
                    api.enableMode("x");
                    api.reverseCut();
                    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
                };
                btn2.style.position = "absolute";
                btn2.style.zIndex = "99";
                btn2.className = "my-custom-ui";
                document.body.appendChild(btn2);

                let btn3 = document.createElement("button");
                btn3.style.top = "200px";
                btn3.innerText = "模式y-";
                btn3.onclick = () => {
                    api.enableMode("y");
                    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
                };
                btn3.style.position = "absolute";
                btn3.style.zIndex = "99";
                btn3.className = "my-custom-ui";
                document.body.appendChild(btn3);

                let btn4 = document.createElement("button");
                btn4.style.top = "300px";
                btn4.innerText = "模式y+";
                btn4.onclick = () => {
                    api.enableMode("y");
                    api.reverseCut();
                    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
                };
                btn4.style.position = "absolute";
                btn4.style.zIndex = "99";
                btn4.className = "my-custom-ui";
                document.body.appendChild(btn4);

                let btn5 = document.createElement("button");
                btn5.style.top = "400px";
                btn5.innerText = "模式z-";
                btn5.style.position = "absolute";
                btn5.style.zIndex = "99";
                btn5.onclick = () => {
                    api.enableMode("z");
                    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
                };
                btn5.className = "my-custom-ui";
                document.body.appendChild(btn5);

                let btn6 = document.createElement("button");
                btn6.style.top = "500px";
                btn6.innerText = "模式z+";
                btn6.style.position = "absolute";
                btn6.style.zIndex = "99";
                btn6.onclick = () => {
                    api.enableMode("z");
                    api.reverseCut();
                    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
                };
                btn6.className = "my-custom-ui";
                document.body.appendChild(btn6);

                let btn7 = document.createElement("button");
                btn7.style.top = "600px";
                btn7.innerText = "取消所有切面";
                btn7.style.position = "absolute";
                btn7.style.zIndex = "99";
                btn7.onclick = () => {
                    api.clearCut();
                    v.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.ROTATE);
                };
                btn7.className = "my-custom-ui";
                document.body.appendChild(btn7);

                let label = document.createElement("label");
                label.innerText = "左键 放置切面，  右键 取消一次切面， 中键 切换xyz模式，  左键按下时中键 翻转切面方向";
                label.style.position = "absolute";
                label.style.zIndex = "99";
                label.style.marginLeft = "600px"
                document.body.appendChild(label);
            });
        }, 1000);

    });

    //美化操作
    Promise.all([viewer_async, model_async]).then(([v, _]) => {
        v.setGroundReflection(true);
        v.setGroundShadow(true);
    });
})();