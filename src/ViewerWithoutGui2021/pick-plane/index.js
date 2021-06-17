/* eslint-disable no-undef */
///<reference types="@i3yun/viewer" />

let viewer;
let pickPlane;
Sippreep.Initializer().then(() => {
  viewer = new Sippreep.Viewing.Viewer3D(document.getElementById('SippreepViewer')); //👈←👈←👈←👈←
  const viewerStartErrorCode = viewer.start();

  const url1 = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=';

  let url2 = 'jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf';
  viewer.loadModel(url1 + url2, {}, onSucceed, onFailed); //第二个参数，如果在加载多模型时候模型位置错乱，则需要填写，正常时不用管

  function onSucceed(model) {
    pickPlane = viewer.loadExtension('Sippreep.Extensions.PickPlane.PickPlaneExtension');
    console.log(pickPlane); // 这是一个promise

    pickPlane.then((ext) => {
      console.log(ext); // 这是插件
      ext.enableMode(Sippreep.Extensions.PickPlane.PickPlaneMode.NegativeDirectionOfX);
      ext.registerPlaneCallback((p, v4) => {
        /*
        // console.log(p);
        let planes = viewer.getCutPlanes();
        planes.push(new THREE.Vector4(p.normal.x, p.normal.y, p.normal.z, p.constant));
        viewer.setCutPlanes(planes);
        // viewer.setCutPlanes([]);
        */
        let planes = viewer.getCutPlanes();
        planes.push(v4);
        viewer.setCutPlanes(planes);
      });
    });
  }
  function onFailed(error) {
    console.warn(error);
  }
});
