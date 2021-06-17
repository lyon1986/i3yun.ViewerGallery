/* eslint-disable no-undef */
var host = 'http://bimdb.aisanwei.cn';
var token = 'eyJhbHQiOiJTSEExIiwidHlwIjoiSldUIn0=.eyJpc3MiOm51bGwsImV4cCI6bnVsbCwiYXVkIjpudWxsLCJpYXQiOm51bGwsIlVzZXJJRCI6Imx5b24wMDIiLCJUaW1lb3V0IjoiMjAzMS0xMS0xN1QwNjozODoyNi4wMDk0NzQxKzA4OjAwIiwiU2NvcGVzIjpbIlByb2plY3RSZWFkIl19.VbT+tp1FhvMADxzskWfhWVsT3CWmUdFNUIXFflEwrQOpiQnseUQKgxxOFpxCnIl6xdDI2uFtpJ0U5qxMw02P0ToSedsxYD/xhujPosrq2K41Q1R7hijmPQIeF99iR0HhIP4N3y9pm+nwiYOlHxI3OplVGDXN9s5kfMnbp/te+R8=';
var sceneID = 'P2006200001';
//创建三维视图
var viewerPromise = SippreepViewer.CreateViewer(document.getElementById('viewer1'));
//获取场景加载插件
var TidbLoaderExtensionPromise = viewerPromise.then((viewer) => {
  return viewer.loadExtension('Sippreep.Extensions.TidbLoader.TidbLoaderExtension');
});
/**
 * 加载模型
 * @type {Promise<Sippreep.Viewing.Model>}
 */
var modelPromise = TidbLoaderExtensionPromise.then((v) => {
  var v1 = v;
  v1.getConfig().host = host;
  v1.getConfig().token = token;
  return v1.loadScene(sceneID);
});