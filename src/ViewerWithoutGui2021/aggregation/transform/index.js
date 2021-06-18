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
  }
  function onSucceed2(model) {
    model2 = model;
  }
  function onFailed(error) {
    console.warn(error);
  }
});

//=============
//对模型操作前，请确保模型加载完成（推荐在模型加载完成事件后操作而不是模型加载成功回调）
//=============

function onMyPosition(m = model2, dx = -10, dy = -1, dz = -10) {
  let fragIdsArray = [];
  //如果模型没有加载完成，这里instanceTree可能为空
  m.getData().instanceTree.enumNodeFragments(
    m.getRootId(),
    (fragId) => {
      fragIdsArray.push(fragId);
    },
    true,
  );
  fragIdsArray.forEach((fragId) => {
    let fragProxy = viewer.impl.getFragmentProxy(m, fragId);
    fragProxy.getAnimTransform();
    fragProxy.position.x += dx;
    fragProxy.position.y += dy;
    fragProxy.position.z += dz;
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
function onMyRotation(m = model2, ax = 0, ay = 1, az = 0, degree = 15 /*单位是度*/) {
  let dbid = m.getRootId();
  let fragIdsArray = [];
  let it = m.getData().instanceTree;
  it.enumNodeFragments(
    dbid,
    (fragId) => {
      fragIdsArray.push(fragId);
    },
    true,
  );

  let qua = axisAndDegreeToQuaternion(ax, ay, az, degree);

  fragIdsArray.forEach((fragId) => {
    let fragProxy = viewer.impl.getFragmentProxy(m, fragId);
    fragProxy.getAnimTransform();
    let ans = quaMulti(fragProxy.quaternion, qua);
    fragProxy.quaternion.w = ans.w;
    fragProxy.quaternion.x = ans.x;
    fragProxy.quaternion.y = ans.y;
    fragProxy.quaternion.z = ans.z;
    fragProxy.updateAnimTransform();
  });
  viewer.impl.sceneUpdated(true);
}

function onMyScale() {
  let dbid = model2.getRootId();
  let fragIdsArray = [];
  let it = model2.getData().instanceTree;
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

/**
 * 由单位旋转轴和旋转角度计算四元数
 * @param {*} a_x
 * @param {*} a_y
 * @param {*} a_z
 * @param {*} degree
 * @returns
 */
function axisAndDegreeToQuaternion(ax = 0, ay = 1, az = 0, degree = 15) {
  let cos = Math.cos((degree * Math.PI) / 360);
  let sin = Math.sin((degree * Math.PI) / 360);
  let w = cos;
  let x = ax * sin;
  let y = ay * sin;
  let z = az * sin;
  return { w: w, x: x, y: y, z: z };
}
/**
 * 两个四元数相乘
 * @param {*}} q
 * @param {*} p
 * @returns
 */
function quaMulti(q = { w: 1, x: 0, y: 0, z: 0 }, p = { w: 1, x: 0, y: 0, z: 0 }) {
  let w = q.w * p.w - q.x * p.x - q.y * p.y - q.z * p.z;
  let x = q.x * p.w + q.w * p.x - q.z * p.y + q.y * p.z;
  let y = q.y * p.w + q.z * p.x + q.w * p.y - q.x * p.z;
  let z = q.z * p.w - q.y * p.x + q.x * p.y + q.w * p.z;
  return { w: w, x: x, y: y, z: z };
}
