var host = "https://3idb.i3yun.top";
var token = "eyJhbHQiOiJTSEExIiwidHlwIjoiSldUIn0=.eyJpc3MiOm51bGwsImV4cCI6bnVsbCwiYXVkIjpudWxsLCJpYXQiOm51bGwsIlVzZXJJRCI6Imx5b24wMDIiLCJUaW1lb3V0IjoiMjAzMS0xMS0xN1QwNjozODoyNi4wMDk0NzQxKzA4OjAwIiwiU2NvcGVzIjpbIlByb2plY3RSZWFkIl19.VbT+tp1FhvMADxzskWfhWVsT3CWmUdFNUIXFflEwrQOpiQnseUQKgxxOFpxCnIl6xdDI2uFtpJ0U5qxMw02P0ToSedsxYD/xhujPosrq2K41Q1R7hijmPQIeF99iR0HhIP4N3y9pm+nwiYOlHxI3OplVGDXN9s5kfMnbp/te+R8="
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
    var v1 = v;
    v1.getConfig().host = host;
    v1.getConfig().token = token
    var temp = v1.loadScene(sceneID);
    return temp;
});
Promise.all([viewerPromise, modelPromise]).then(([viewer, model]) => {
    service = new Service();
    //配置颜色（依次是红、绿、蓝）
    service.ThemingColors = [new THREE.Vector4(1, 0, 0, 1), new THREE.Vector4(0, 1, 0, 1), new THREE.Vector4(0, 0, 1, 1)];
    service.Other1Elements = [2231, 2979, 2991, 2996, 3003];
    service.Other2Elements = [2199, 2203, 2211];
    service.ColorsElements = [2171, 2172, 2174, 2175, 2178, 2179, 2180, 2181, 2182, 2183];
    //service.ColorsElements = [2199, 2203, 2211]
    service.ElementColorChanged = (element, themingColor) => {
        viewer.setThemingColor(element, themingColor)
    }

    document.getElementById("AllElements").onclick = () => {
        viewer.showAll()
        viewer.fitToView();
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
        document.getElementById("ColorsElements").click();
        service.SimulatedColors();
        viewer.clearThemingColors();
    }

    //设置最佳视角
    var stateBase64 = "eyJ2aWV3cG9ydCI6eyJuYW1lIjoiIiwiZXllIjpbLTE0Mi44NzY3ODkyMzY0MTg5NCwxLjIzNjQzMDIyMjA1NTQ3NDgsODkuMDIyNDY5MTAxMjMzN10sInRhcmdldCI6Wy0yNi44NzAzMjAzODY0NjUwMjUsLTMuNTQzNzQ4MzUwNDgzNjI5NiwxMS41OTEzMjY3Nzg4MzcyN10sInVwIjpbMC41NTQzNjc5ODUzODQ1MjAzLC0wLjAyMjg0MzM2Mzc0Nzc5NTE1LDAuODMxOTU4MTIyNDUxNzIxOF0sIndvcmxkVXBWZWN0b3IiOlswLDAsMV0sInBpdm90UG9pbnQiOls4LjU0NzIzMTY0NDMwMDA0MSwyMy4yMjgwMjI1MDU0NDQxNDQsNDAuMTU5MjY4MzUxMjg2NDZdLCJkaXN0YW5jZVRvT3JiaXQiOjE1Mi4yMjk1Mzc2NTUyMjYsImFzcGVjdFJhdGlvIjoyLjA4NDY5MDU1Mzc0NTkyODQsInByb2plY3Rpb24iOiJwZXJzcGVjdGl2ZSIsImlzT3J0aG9ncmFwaGljIjpmYWxzZSwiZmllbGRPZlZpZXciOjQ1fX0=";
    var state = JSON.parse(atob(stateBase64));
    viewer.restoreState(state);

    //订阅选中项改变事件
    viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
        document.getElementById("MySelectionValue").innerHTML = JSON.stringify(viewer.getSelection());
    });
})


function Service() {
    this.ThemingColors;
    this.ColorsElements;
    this.Other1Elements;
    this.Other2Elements;
    this.ElementColorChanged = function(element, themingColor) {

    }
    this.SimulatedColors = function() {
        var globe = window;
        if (globe.SimulatedHandle) {
            globe.SimulatedHandle = null;
            clearTimeout(globe.SimulatedHandler);
        } else {
            globe.SimulatedHandle = () => {
                for (var i = 0; i < this.ColorsElements.length; i++) {
                    this.ElementColorChanged(this.ColorsElements[i], this.ThemingColors[Random(0, this.ThemingColors.length)]);
                }
                if (globe.SimulatedHandle)
                    globe.SimulatedHandler = setTimeout(globe.SimulatedHandle, 1000);
            }
            globe.SimulatedHandle();
        }
    }
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}