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
            this.unvisibleButton.innerText = '阴影';
            document.body.appendChild(this.unvisibleButton);
            this.offButton = document.createElement('button');
            this.offButton.style.zIndex = '99';
            this.offButton.style.position = 'relative';
            this.offButton.style.fontSize = 'xxx-large';
            this.offButton.innerText = '关闭';
            document.body.appendChild(this.offButton);
            this.changeColorButton = document.createElement('button');
            this.changeColorButton.style.zIndex = '99';
            this.changeColorButton.style.position = 'relative';
            this.changeColorButton.style.fontSize = 'xxx-large';
            this.changeColorButton.innerText = '变色';
            document.body.appendChild(this.changeColorButton);
            this.resetButton = document.createElement('button');
            this.resetButton.style.zIndex = '99';
            this.resetButton.style.position = 'relative';
            this.resetButton.style.fontSize = 'xxx-large';
            this.resetButton.innerText = '还原';
            document.body.appendChild(this.resetButton);
        }
        return DomView;
    }());
    var Bussiness = /** @class */ (function () {
        function Bussiness() {
            this.selectedArray = [];
            this.isOff = new Set();
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
                _this.selectedArray = (event.dbIdArray.length > 0) ? event.dbIdArray : _this.selectedArray;
                _this.dom.resetButton.onclick = function () {
                    _this.viewer.clearThemingColors(_this.viewer.model);
                    _this.viewer.model.visibilityManager.setAllVisibility(true);
                    _this.isOff.forEach(function (v) {
                        _this.viewer.model.visibilityManager.setNodeOff(v, false);
                    });
                    _this.isOff = new Set();
                };
                _this.dom.unvisibleButton.onclick = function () {
                    for (var _i = 0, _a = _this.selectedArray; _i < _a.length; _i++) {
                        var d = _a[_i];
                        _this.viewer.model.visibilityManager.toggleVisibility(d);
                        // this.viewer.model.visibilityManager.hide(d)
                        // this.viewer.model.visibilityManager.show(d)
                    }
                };
                _this.dom.offButton.onclick = function () {
                    for (var _i = 0, _a = _this.selectedArray; _i < _a.length; _i++) {
                        var d = _a[_i];
                        if (_this.isOff.has(d)) {
                            _this.viewer.model.visibilityManager.setNodeOff(d, false);
                            _this.isOff["delete"](d);
                        }
                        else {
                            _this.viewer.model.visibilityManager.setNodeOff(d, true);
                            _this.isOff.add(d);
                        }
                    }
                };
                _this.dom.changeColorButton.onclick = function () {
                    for (var _i = 0, _a = _this.selectedArray; _i < _a.length; _i++) {
                        var d = _a[_i];
                        _this.viewer.setThemingColor(d, new THREE.Vector4(Math.random(), Math.random(), Math.random(), 0.5 + 0.5 * Math.random()));
                    }
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
