///<reference types="@i3yun/viewer" />

let viewer;
Sippreep.Initializer().then(() => {
  let htmlDivElement = document.getElementById('SippreepViewer');
  viewer = new Sippreep.Viewing.GuiViewer3D(htmlDivElement);
  const errorCode = viewer.start();
  if (errorCode > 0) {
    console.error('Failed to create a Viewer: WebGL not supported.');
    return;
  }
  console.log('Initialization complete, loading a model next...');

  let url1 = `http://api.aisanwei.cn/api/Storge/Viewable?ID=`;
  let url2 = `jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf`;
  viewer.loadModel(url1 + url2, {}, onSucceed, onFailed);
  function onSucceed(model) {
    console.log(model);
  }
  function onFailed(error) {
    console.warn(error);
  }
});
