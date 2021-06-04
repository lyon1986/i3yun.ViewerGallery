///<reference types="@i3yun/viewer" />

let viewer;
Sippreep.Config.dependencies.push(
  'http://api.aisanwei.cn/api/viewer.amarkups/dist/extensions/Sippreep.Extensions.AMarkups.js',
);
Sippreep.Initializer().then(() => {
  let htmlDivElement = document.getElementById('SippreepViewer');
  viewer = new Sippreep.Viewing.GuiViewer3D(htmlDivElement);
  const errorCode = viewer.start();
  // if (errorCode > 0) {
  //   console.error('Failed to create a Viewer: WebGL not supported.');
  //   return;
  // }
  // console.log('Initialization complete, loading a model next...');

  const url1 = `http://api.aisanwei.cn/api/Storge/Viewable?ID=`;

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
  let url2 = `jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf`;
  viewer.loadModel(url1 + url2, {}, onSucceed, onFailed);
  function onSucceed(model) {
    console.log(`模型加载成功 ${model}`);
    /**
     * 您的业务内容一般写在这里（特殊情况如需要控制加载模型的相关，请与我们联系）
     */
    // viewer.getToolbar(false).getControl(`settingsTools`).setVisible(false);
    viewer.loadExtension('Sippreep.Extensions.AMarkups.AMarkupsExtension');
  }
  function onFailed(error) {
    console.warn(error);
  }
});
