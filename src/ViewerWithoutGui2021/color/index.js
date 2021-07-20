/* eslint-disable no-undef */
///<reference types="@i3yun/viewer" />
var demo2021color;
(function (demo2021color) {
    /**
     * DOM界面操作
     */
    var DomView = /** @class */ (function () {
        function DomView() {
            this.unvisibleButton = document.createElement('button');
            this.unvisibleButton.style.zIndex = '99';
            this.unvisibleButton.style.position = 'relative';
            this.unvisibleButton.style.fontSize = 'xxx-large';
            this.unvisibleButton.innerText = '切换成阴影';
            document.body.appendChild(this.unvisibleButton);
            this.offButton = document.createElement('button');
            this.offButton.style.zIndex = '99';
            this.offButton.style.position = 'relative';
            this.offButton.style.fontSize = 'xxx-large';
            this.offButton.innerText = '切换显示';
            document.body.appendChild(this.offButton);
            this.changeColorButton = document.createElement('button');
            this.changeColorButton.style.zIndex = '99';
            this.changeColorButton.style.position = 'relative';
            this.changeColorButton.style.fontSize = 'xxx-large';
            this.changeColorButton.innerText = '切换颜色';
            document.body.appendChild(this.changeColorButton);
            this.clearColorButton = document.createElement('button');
            this.clearColorButton.style.zIndex = '99';
            this.clearColorButton.style.position = 'relative';
            this.clearColorButton.style.fontSize = 'xxx-large';
            this.clearColorButton.innerText = '清除自定义的颜色';
            document.body.appendChild(this.clearColorButton);
        }
        return DomView;
    }());
    var Bussiness = /** @class */ (function () {
        function Bussiness() {
            this.selectedArray = [];
        }
        Bussiness.prototype.setViewer = function (v) {
            this.viewer = v;
            return this;
        };
        Bussiness.prototype.setDom = function (d) {
            this.dom = d;
            return this;
        };
        Bussiness.prototype.listen = function () {
            var _this = this;
            this.viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, function (event) {
                console.log(event);
                _this.selectedArray = event.dbIdArray;
                _this.dom.unvisibleButton.onclick = function () {
                    _this.viewer.model.visibilityManager.toggleVisibility(_this.selectedArray);
                };
            });
        };
        return Bussiness;
    }());
    var viewer;
    Sippreep.Initializer().then(function () {
        viewer = new Sippreep.Viewing.Viewer3D(document.getElementById('viewer-element'));
        // @ts-ignore
        var errorCode = viewer.start();
        // const modelUrl = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf'
        // const modelUrl = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=jobs/dc6803f8-6871-4adf-98b6-4a508f5aa6ba/output/main.hf'
        var modelUrl = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=jobs/525b8525-df81-4a65-9a97-f0197ac9c7c3/output/main.hf';
        viewer.loadModel(modelUrl, { /* 加载时参数 */}, function (m) {
            console.log('模型加载成功');
            // 业务代码
            var dom = new DomView();
            var bussiness = new Bussiness().setViewer(viewer).setDom(dom);
            bussiness.listen();
        }, function (error) {
            console.warn(error);
        });
    });
})(demo2021color || (demo2021color = {}));
