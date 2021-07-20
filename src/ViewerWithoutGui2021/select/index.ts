/* eslint-disable no-undef */
///<reference types="@i3yun/viewer" />

/**
 * 写完ts，别忘了tsc 本文件以生成js文件
 */

/**
 * DOM界面操作
 */
class DomView {
  private hint: HTMLElement
  fitToViewButton: HTMLElement
  constructor() {
    this.fitToViewButton = document.createElement('button')
    this.fitToViewButton.style.zIndex = '99'
    this.fitToViewButton.style.position = 'relative'
    this.fitToViewButton.style.fontSize = 'xxx-large'
    this.fitToViewButton.innerText = '定位部件'
    document.body.appendChild(this.fitToViewButton)

    this.hint = document.createElement('label')
    this.hint.style.zIndex = '99'
    this.hint.style.position = 'relative'
    this.hint.style.fontSize = 'xxx-large'
    this.hint.innerText = 'hinttt'
    document.body.appendChild(this.hint)
  }
  setText(t: string) {
    this.hint.innerText = '选择回调： 模型部件 ID = ' + t
  }

}
class Bussiness {
  viewer!: Sippreep.Viewing.Viewer3D
  dom!: DomView
  constructor() {
  }
  setViewer(v: Sippreep.Viewing.Viewer3D): Bussiness {
    this.viewer = v
    return this
  }
  setDom(d: DomView): Bussiness {
    this.dom = d
    return this
  }
  listen() {
    this.viewer.addEventListener(Sippreep.Viewing.SELECTION_CHANGED_EVENT, (event) => {
      console.log(event)
      this.dom.setText(event.dbIdArray.toString())
      this.dom.fitToViewButton.onclick = () => {
        this.viewer.fitToView(event.dbIdArray, undefined, true)
      }
    })
  }
}

let viewer: Sippreep.Viewing.Viewer3D;
Sippreep.Initializer().then(() => {
  viewer = new Sippreep.Viewing.Viewer3D(document.getElementById('viewer-element')!);
  // @ts-ignore
  const errorCode = viewer.start();
  // const modelUrl = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf'
  // const modelUrl = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=jobs/dc6803f8-6871-4adf-98b6-4a508f5aa6ba/output/main.hf'
  const modelUrl = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=jobs/525b8525-df81-4a65-9a97-f0197ac9c7c3/output/main.hf'
  viewer.loadModel(modelUrl, {/* 加载时参数 */ }, (m) => {
    console.log('模型加载成功');
    // 业务代码
    let dom = new DomView()
    let bussiness = new Bussiness().setViewer(viewer).setDom(dom)
    bussiness.listen()
  }, (error) => {
    console.warn(error);
  });
});

