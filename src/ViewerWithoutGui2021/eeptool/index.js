/* eslint-disable no-undef */
///<reference types="@i3yun/viewer" />

let viewer;
// 添加插件文件 （有些插件是默认带的，不需要添加文件）
// Sippreep.Config.dependencies.push(
//   'http://api.aisanwei.cn/api/viewer.amarkups/dist/extensions/Sippreep.Extensions.AMarkups.js',
// );

Sippreep.Initializer().then(() => {
  viewer = new Sippreep.Viewing.Viewer3D(document.getElementById('SippreepViewer')); //👈←👈←👈←👈←
  const viewerStartErrorCode = viewer.start();
  // if (viewerStartErrorCode > 0) {
  //   console.error('Failed to create a Viewer: WebGL not supported.');
  //   return;
  // }
  // console.log('Initialization complete, loading a model next...');

  const url1 = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=';

  /**
   * url2 这部分数据是从`转换webApi接口`的返回中获取的
   *
   * ```ts
   * let mainFileID = res.manifest.derivatives.find((v) => {
   * return v.endsWith('.hf');
   * });
   * let url = `http://api.aisanwei.cn/api/Storge/Viewable?ID=` + mainFileID;
   * ```
   *
   */
  let url2 = 'jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf';
  viewer.loadModel(url1 + url2, {}, onSucceed, onFailed); //第二个参数，如果在加载多模型时候模型位置错乱，则需要填写，正常时不用管

  // let amarkups;
  let eeptool;
  function onSucceed(model) {
    console.log(`模型加载成功 ${model}`);
    /**
     * 您的业务内容一般写在这里（特殊情况如需要控制加载模型的相关，请与我们联系）
     */
    // viewer.getToolbar(false).getControl(`settingsTools`).setVisible(false);
    // 加载插件
    // amarkups = viewer.loadExtension('Sippreep.Extensions.AMarkups.AMarkupsExtension');
    // console.log(amarkups);
    eeptool = viewer.loadExtension('Sippreep.Extensions.EEPTools.EEPToolExtension');
    // 当前操控模式设置为平移
    eeptool.then((ext) => {
      ext.set3DCommand(Sippreep.Extensions.EEPTools.EEPToolCommand.PAN);
    });
  }
  function onFailed(error) {
    console.warn(error);
  }
});
