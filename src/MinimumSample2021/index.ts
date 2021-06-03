///<reference types="@i3yun/viewer" />

let viewer: Sippreep.Viewing.Viewer3D;
Sippreep.Initializer().then(() => {
  let htmlDivElement = document.getElementById('SippreepViewer')!;
  viewer = new Sippreep.Viewing.GuiViewer3D(htmlDivElement);
  //@ts-ignore
  const errorCode = viewer.start();
  if (errorCode > 0) {
    console.error('Failed to create a Viewer: WebGL not supported.');
    return;
  }
  console.log('Initialization complete, loading a model next...');
});
