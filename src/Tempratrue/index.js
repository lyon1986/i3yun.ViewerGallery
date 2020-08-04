var host = "http://bimdb.aisanwei.cn";
var sceneID = "P2006200001";
//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById("viewer1"));
//加载模型
var modelPromise = viewerPromise.then((viewer) => {
    return new Promise((s, f) => {
        if (viewer.model) {
            viewer.unloadModel(viewer.model);
        }
        var url = `${host}/api/UserSpace/ViewFile/${sceneID}?path=/3d.svf`;
        viewer.loadModel(url, null, s, f);
    });
});
var Markup3DPromise = viewerPromise.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.Markup.Markup3DExtension");
})
Promise.all([viewerPromise, modelPromise, Markup3DPromise]).then(([viewer, model, markup3d]) => {
    service = new Service();
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
    document.getElementById("ShowMark3D").onclick = () => {
            markup3d.getItems().clear();
            var elements = viewer.getSelection();
            elements.forEach(element => {
                var markupItem = markup3d.getItems().add();
                markupItem.anchor = element;
                markupItem.offset = new THREE.Vector3(0, 0, 10);
                markupItem.appearance.anchorColor = new THREE.Color(1, 1, 1);
                markupItem.appearance.offsetColor = new THREE.Color(1, 1, 1);
                markupItem.content = service.getMessage(element);
            });
        }
        //订阅服务温度颜色
    service.ElementColorChanged = (element, themingColor) => {
            viewer.setThemingColor(element, themingColor)
        }
        //设置视图最佳视角
    var state = service.getViewState();
    viewer.restoreState(state);
    //订阅视图选中项改变事件
    viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, () => {
        var elements = viewer.getSelection();
        document.getElementById("MySelectionValue").innerHTML = elements.length == 1 ? elements[0] : (elements.length + "项");
    });
    viewer.addEventListener(Sippreep.Viewing.OBJECT_TREE_CREATED_EVENT, () => {
        document.getElementById("SimulatedColors").click();
        viewer.select(service.ColorsElements[0]);
        document.getElementById("ShowMark3D").click();
    });
})


function Service() {
    //配置颜色（依次是红、绿、蓝）
    this.ThemingColors = [new THREE.Vector4(1, 0, 0, 1), new THREE.Vector4(0, 1, 0, 1), new THREE.Vector4(0, 0, 1, 1)];
    this.Other1Elements = [3399];
    this.Other2Elements = [2232, 2230];
    this.ColorsElements = [1525, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1558, 1564, 1565, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576];
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
    this.getMessage = function(element) {
        var image = "<img src='data:image/png;base64,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' />";
        var innerHTML = `<div class='my-markup3D'>${image}<div>编号${element}</div></div>`;
        //return innerHTML;
        var t = document.createElement("div");
        t.innerHTML = innerHTML;
        return t.firstChild;
    }
    this.getViewState = function() {
        var stateBase64 = "eyJ2aWV3cG9ydCI6eyJuYW1lIjoiIiwiZXllIjpbLTE0Mi44NzY3ODkyMzY0MTg5NCwxLjIzNjQzMDIyMjA1NTQ3NDgsODkuMDIyNDY5MTAxMjMzN10sInRhcmdldCI6Wy0yNi44NzAzMjAzODY0NjUwMjUsLTMuNTQzNzQ4MzUwNDgzNjI5NiwxMS41OTEzMjY3Nzg4MzcyN10sInVwIjpbMC41NTQzNjc5ODUzODQ1MjAzLC0wLjAyMjg0MzM2Mzc0Nzc5NTE1LDAuODMxOTU4MTIyNDUxNzIxOF0sIndvcmxkVXBWZWN0b3IiOlswLDAsMV0sInBpdm90UG9pbnQiOls4LjU0NzIzMTY0NDMwMDA0MSwyMy4yMjgwMjI1MDU0NDQxNDQsNDAuMTU5MjY4MzUxMjg2NDZdLCJkaXN0YW5jZVRvT3JiaXQiOjE1Mi4yMjk1Mzc2NTUyMjYsImFzcGVjdFJhdGlvIjoyLjA4NDY5MDU1Mzc0NTkyODQsInByb2plY3Rpb24iOiJwZXJzcGVjdGl2ZSIsImlzT3J0aG9ncmFwaGljIjpmYWxzZSwiZmllbGRPZlZpZXciOjQ1fX0=";
        return JSON.parse(atob(stateBase64));
    }
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}