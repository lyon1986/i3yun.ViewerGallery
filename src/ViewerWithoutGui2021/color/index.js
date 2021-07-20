/* eslint-disable no-undef */
///<reference types="@i3yun/viewer" />
var demo2021color;
(function (demo2021color) {
    /**
     * DOM界面操作
     */
    var DomView = /** @class */ (function () {
        function DomView() {
            this.fitToViewButton = document.createElement('button');
            this.fitToViewButton.style.zIndex = '99';
            this.fitToViewButton.style.position = 'relative';
            this.fitToViewButton.style.fontSize = 'xxx-large';
            this.fitToViewButton.innerText = '定位部件';
            document.body.appendChild(this.fitToViewButton);
            this.hint = document.createElement('label');
            this.hint.style.zIndex = '99';
            this.hint.style.position = 'relative';
            this.hint.style.fontSize = 'xxx-large';
            this.hint.innerText = 'hinttt';
            document.body.appendChild(this.hint);
        }
        DomView.prototype.setText = function (t) {
            this.hint.innerText = '选择回调： 模型部件 ID = ' + t;
        };
        return DomView;
    }());
    var Bussiness = /** @class */ (function () {
        function Bussiness() {
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
                _this.dom.setText(event.dbIdArray.toString());
                _this.dom.fitToViewButton.onclick = function () {
                    _this.viewer.fitToView(event.dbIdArray, undefined, true);
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
