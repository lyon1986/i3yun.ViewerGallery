/* eslint-disable no-undef */
'use strict';
///<reference types="@i3yun/viewer" />

let viewer;
let section;
Sippreep.Initializer().then(() => {
  viewer = new Sippreep.Viewing.Viewer3D(document.getElementById('SippreepViewer')); //ðâðâðâðâ
  const viewerStartErrorCode = viewer.start();

  const url1 = 'http://api.aisanwei.cn/api/Storge/Viewable?ID=';

  let url2 = 'jobs/ef819df5-ae58-4cb5-b558-61c49f75b6d8/output/main.hf';
  viewer.loadModel(url1 + url2, {}, onSucceed, onFailed); //ç¬¬äºä¸ªåæ°ï¼å¦æå¨å è½½å¤æ¨¡åæ¶åæ¨¡åä½ç½®éä¹±ï¼åéè¦å¡«åï¼æ­£å¸¸æ¶ä¸ç¨ç®¡

  function onSucceed(model) {
    console.log(`æ¨¡åå è½½æå ${model}`);

    pickPlane = viewer.loadExtension('Sippreep.Extensions.Sections.SectionExtension');
    console.log(pickPlane); // è¿æ¯ä¸ä¸ªpromise

    pickPlane.then((ext) => {
      console.log(ext); // è¿æ¯æä»¶
      ext.enableMode(Sippreep.Extensions.Sections.SectionMode.box);
      // ext.disableMode()
    });
  }
  function onFailed(error) {
    console.warn(error);
  }
});
