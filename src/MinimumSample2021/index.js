/* eslint-disable no-undef */
///<reference types="@i3yun/viewer" />

let viewer;
// 添加插件文件
// Sippreep.Config.dependencies.push(
//   'http://api.aisanwei.cn/api/viewer.amarkups/dist/extensions/Sippreep.Extensions.AMarkups.js',
// );
Sippreep.Initializer().then(() => {
  viewer = new Sippreep.Viewing.Viewer3D(document.getElementById('viewer-element'));
  // viewer = new Sippreep.Viewing.GuiViewer3D(document.getElementById('viewer-element'));
  const errorCode = viewer.start();
  // if (errorCode > 0) {
  //   console.error('Failed to create a Viewer: WebGL not supported.');
  //   return;
  // }
  // console.log('Initialization complete, loading a model next...');


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
  const modelUrl1 = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=';
  let modelUrl2 = 'jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf';
  viewer.loadModel(modelUrl1 + modelUrl2, {/* 加载时参数 */ }, (m) => {
    console.log('模型加载成功');
    // 业务代码
  }, (error) => {
    console.warn(error);
  });
});
