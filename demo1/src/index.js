var host = "https://3idb.i3yun.top";
var token = "eyJhbHQiOiJTSEExIiwidHlwIjoiSldUIn0=.eyJpc3MiOm51bGwsImV4cCI6bnVsbCwiYXVkIjpudWxsLCJpYXQiOm51bGwsIlVzZXJJRCI6Imx5b24wMDIiLCJUaW1lb3V0IjoiMjAzMS0xMS0xN1QwMzozMjo0NS40NzcyNTU2KzA4OjAwIiwiU2NvcGVzIjpbIlByb2plY3RMaXN0IiwiUHJvamVjdFdyaXRlIiwiUHJvamVjdFJlYWQiXX0=.PWP0Gw6TZuhzaXTEalZabbqcAOS5U3S1pIADieLlL7gUu2JdFfjAbpUWlnHPgGWDDby1LwaxKjwX8oynXZ9MjNiNC1EmcNbqz2g/pPqCCaIPS4vA0TE72gLGPIygRGS04GSWdu4/MemF+m6WQsCc1EIU249Rmr6bCoRyHf27ugQ="
var sceneID = "P2006200001";
//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById("viewer1"));
//获取场景加载插件
var TidbLoaderExtensionPromise = viewerPromise.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.TidbLoader.TidbLoaderExtension");
});
//加载模型
var modelPromise = TidbLoaderExtensionPromise.then((v) => {
    //let v1 = <any>v as Sippreep.Extensions.TidbLoader.TidbLoaderExtension;
    window.v1 = v;
    v1.getConfig().host = host;
    v1.getConfig().token = token

    return new Promise((s, f) => {
        v1.loadScene(sceneID, () => {
            s()
        }, (e) => {
            f(e)
        });
    });
});
viewerPromise.then((viewer) => {
    service = new Service();
    service.ThemingColors = [new THREE.Vector4(1, 0, 0, 1), new THREE.Vector4(0, 1, 0, 1), new THREE.Vector4(0, 0, 1, 1)];
    service.Other1Elements = [2231, 2979, 2991, 2996, 3003];
    service.Other2Elements = [2154, 2156, 2164, 2166];
    service.ColorsElements = [2171, 2172, 2174, 2175, 2178, 2179, 2180, 2181, 2182, 2183];
    service.ElementColorChanged = (dbid, themingColor) => {
        viewer.clearThemingColors();
        viewer.setThemingColor(dbid, themingColor)
    }
    document.getElementById("Other1Elements").onclick = () => {
        viewer.isolate(service.Other1Elements)
        viewer.fitToView(service.Other1Elements);
    }
    document.getElementById("Other2Elements").onclick = () => {
        viewer.isolate(service.Other2Elements)
        viewer.fitToView(service.Other2Elements);
    }
    document.getElementById("ColorsElements").onclick = () => {
        viewer.isolate(service.ColorsElements)
        viewer.fitToView(service.ColorsElements);
    }
    document.getElementById("SimulatedColors").onclick = () => {
        service.SimulatedColors();
    }
})

function Service() {
    this.ThemingColors;
    this.ColorsElements;
    this.Other1Elements;
    this.Other2Elements;
    this.ElementColorChanged = function(dbid, themingColor) {

    }
    this.SimulatedColors = function() {
        var globe = window;
        if (globe.SimulatedHandle) {
            globe.SimulatedHandle = null;
        } else {
            globe.SimulatedHandle = () => {
                this.ElementColorChanged(this.ColorsElements[Random(0, this.ColorsElements.length - 1)], this.ThemingColors[Random(0, this.ThemingColors.length - 1)]);
                if (globe.SimulatedHandle)
                    setTimeout(globe.SimulatedHandle, 1000);
            }
            globe.SimulatedHandle();
        }
    }

}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}