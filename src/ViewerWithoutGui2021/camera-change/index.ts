/* eslint-disable no-undef */
///<reference types="@i3yun/viewer" />
namespace demo2021cameraChange {
  /**
   * DOM界面操作
   */
  class DomView {
    unvisibleButton: HTMLElement
    offButton: HTMLElement
    changeColorButton: HTMLElement
    resetButton: HTMLElement
    constructor() {
      this.unvisibleButton = document.createElement('button')
      this.unvisibleButton.style.zIndex = '99'
      this.unvisibleButton.style.position = 'relative'
      this.unvisibleButton.style.fontSize = 'xxx-large'
      this.unvisibleButton.innerText = '阴影'
      document.body.appendChild(this.unvisibleButton)

      this.offButton = document.createElement('button')
      this.offButton.style.zIndex = '99'
      this.offButton.style.position = 'relative'
      this.offButton.style.fontSize = 'xxx-large'
      this.offButton.innerText = '关闭'
      document.body.appendChild(this.offButton)

      this.changeColorButton = document.createElement('button')
      this.changeColorButton.style.zIndex = '99'
      this.changeColorButton.style.position = 'relative'
      this.changeColorButton.style.fontSize = 'xxx-large'
      this.changeColorButton.innerText = '变色'
      document.body.appendChild(this.changeColorButton)

      this.resetButton = document.createElement('button')
      this.resetButton.style.zIndex = '99'
      this.resetButton.style.position = 'relative'
      this.resetButton.style.fontSize = 'xxx-large'
      this.resetButton.innerText = '还原'
      document.body.appendChild(this.resetButton)

    }
  }
  class Bussiness {
    viewer!: Sippreep.Viewing.Viewer3D
    dom!: DomView
    selectedArray: number[] = []
    isOff: Set<number> = new Set()
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
        this.selectedArray = (event.dbIdArray.length > 0) ? event.dbIdArray : this.selectedArray

        this.dom.resetButton.onclick = () => {
          this.viewer.clearThemingColors(this.viewer.model)
          this.viewer.model.visibilityManager.setAllVisibility(true)
          this.isOff.forEach((v) => {
            this.viewer.model.visibilityManager.setNodeOff(v, false);
          })
          this.isOff = new Set()
        }
        this.dom.unvisibleButton.onclick = () => {
          for (const d of this.selectedArray) {
            this.viewer.model.visibilityManager.toggleVisibility(d)
            // this.viewer.model.visibilityManager.hide(d)
            // this.viewer.model.visibilityManager.show(d)
          }
        }
        this.dom.offButton.onclick = () => {
          for (const d of this.selectedArray) {
            if (this.isOff.has(d)) {
              this.viewer.model.visibilityManager.setNodeOff(d, false);
              this.isOff.delete(d)
            } else {
              this.viewer.model.visibilityManager.setNodeOff(d, true);
              this.isOff.add(d)
            }
          }

        }
        this.dom.changeColorButton.onclick = () => {
          for (const d of this.selectedArray) {
            this.viewer.setThemingColor(d, new THREE.Vector4(Math.random(), Math.random(), Math.random(), 0.5 + 0.5 * Math.random()))
          }
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


}