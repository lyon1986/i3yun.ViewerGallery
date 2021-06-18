/* eslint-disable no-undef */
'use strict';
///<reference types="@i3yun/viewer" />

let viewer;
let model1, model2;

Sippreep.Initializer().then(() => {
  viewer = new Sippreep.Viewing.Viewer3D(document.getElementById('SippreepViewer')); //👈←👈←👈←👈←
  const viewerStartErrorCode = viewer.start();
  const url1 = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=';
  const url2 = 'jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf';
  const url3 = 'jobs/3dad1303-cd01-4014-94ca-322064fbe155/output/main.hf';
  viewer.loadModel(url1 + url2, { globalOffset: { x: 0, y: 0, z: -10 } }, onSucceed1, onFailed); //第二个参数，如果在加载多模型时候模型位置错乱，则需要填写，正常时不用管
  viewer.loadModel(url1 + url3, {}, onSucceed2, onFailed); //第二个参数，如果在加载多模型时候模型位置错乱，则需要填写，正常时不用管

  function onSucceed1(model) {
    model1 = model;
    console.log('模型序号=');
    console.log(1);
    console.log(model1);
  }
  function onSucceed2(model) {
    model2 = model;
    console.log('模型序号=');
    console.log(2);
    console.log(model2);
  }
  function onFailed(error) {
    console.warn(error);
  }
});

function onMyPosition() {
  let dbid = model2.getRootId();
  // console.log('rootID=');
  // console.log(dbid); // 1
  let fragIdsArray = [];
  let it = model2.getData().instanceTree;
  // console.log('it=');
  // console.log(it);
  window.it = it;
  it.enumNodeFragments(
    dbid,
    (fragId) => {
      // console.log('fragId=');
      // console.log(fragId);
      fragIdsArray.push(fragId);
    },
    true,
  );
  // console.log('fragIdsArray=');
  // console.log(fragIdsArray);
  fragIdsArray.forEach((fragId) => {
    let fragProxy = viewer.impl.getFragmentProxy(model2, fragId);
    fragProxy.getAnimTransform();
    fragProxy.position.x -= 10;
    fragProxy.position.y -= 10;
    fragProxy.position.z -= 10;
    fragProxy.updateAnimTransform();
  });
  viewer.impl.sceneUpdated(true);
}

/**
 * q = cos(theta/2) + A*sin(theta/2)
 * A是单位旋转轴，theta是旋转角度
 * q的第一项 cos(theta/2) 是w值，后一项 A*sin(theta/2) 是 (x,y,z)
 * 似乎是右手螺旋，大拇指指向旋转轴正方向，四指开始旋转
 */
function onMyRotation() {
  let dbid = model2.getRootId();
  let fragIdsArray = [];
  let it = model2.getData().instanceTree;
  window.it = it;
  it.enumNodeFragments(
    dbid,
    (fragId) => {
      fragIdsArray.push(fragId);
    },
    true,
  );

  fragIdsArray.forEach((fragId) => {
    let fragProxy = viewer.impl.getFragmentProxy(model2, fragId);
    fragProxy.getAnimTransform();
    console.log(fragProxy.quaternion);

    // fragProxy.quaternion.w = 0.707;
    // fragProxy.quaternion.x = 0.707;
    // fragProxy.quaternion.y = 0;
    // fragProxy.quaternion.z = 0;
    fragProxy.quaternion.w = 0.707;
    fragProxy.quaternion.x = 0;
    fragProxy.quaternion.y = 0.707;
    fragProxy.quaternion.z = 0;
    fragProxy.updateAnimTransform();
  });
  viewer.impl.sceneUpdated(true);
}

function onMyScale() {
  let dbid = model2.getRootId();
  let fragIdsArray = [];
  let it = model2.getData().instanceTree;
  window.it = it;
  it.enumNodeFragments(
    dbid,
    (fragId) => {
      fragIdsArray.push(fragId);
    },
    true,
  );
  fragIdsArray.forEach((fragId) => {
    let fragProxy = viewer.impl.getFragmentProxy(model2, fragId);
    fragProxy.getAnimTransform();
    fragProxy.scale.x /= 2;
    // fragProxy.scale.y /= 2;
    // fragProxy.scale.z /= 2;
    fragProxy.updateAnimTransform();
  });
  viewer.impl.sceneUpdated(true);
}
