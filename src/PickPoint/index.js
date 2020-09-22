let databaseHost = "http://bimdb.aisanwei.cn";
let token = "eyJhbHQiOiJTSEExIiwidHlwIjoiSldUIn0=.eyJpc3MiOm51bGwsImV4cCI6bnVsbCwiYXVkIjpudWxsLCJpYXQiOm51bGwsIlVzZXJJRCI6Imx5b24wMDIiLCJUaW1lb3V0IjoiMjAzMS0xMS0xN1QwNjozODoyNi4wMDk0NzQxKzA4OjAwIiwiU2NvcGVzIjpbIlByb2plY3RSZWFkIl19.VbT+tp1FhvMADxzskWfhWVsT3CWmUdFNUIXFflEwrQOpiQnseUQKgxxOFpxCnIl6xdDI2uFtpJ0U5qxMw02P0ToSedsxYD/xhujPosrq2K41Q1R7hijmPQIeF99iR0HhIP4N3y9pm+nwiYOlHxI3OplVGDXN9s5kfMnbp/te+R8="
let sceneID = "P2006200001";
//创建三维视图
let viewerPromise = SippreepViewer.CreateViewer(document.getElementById("用于显示三维的区域"));

//获取场景加载插件
let TidbLoaderExtensionPromise = viewerPromise.then((viewer) => {
    return viewer.loadExtension("Sippreep.Extensions.TidbLoader.TidbLoaderExtension");
});
/**
 * 加载模型
 * @type {Promise<Sippreep.Viewing.Model>}
 */
TidbLoaderExtensionPromise.then((v) => {
    let v_config = v.getConfig();
    v_config.host = databaseHost;
    v_config.token = token
    return v.loadScene(sceneID);
});

viewerPromise.then((viewer) => {
    //注册鼠标点击事件
    document.getElementById("用于显示三维的区域").addEventListener("click", (e) => {
        let ans = get3DPoint(e, viewer);
        if (ans) console.log(["鼠标点击了三维中的坐标=", ans.x, ans.y, ans.z]);
    });
});

alert("点击三维区域，三维坐标输出在F12控制台");

get3DPoint = (e, viewer) => {
    if (!e.normalizedX) addNormalized(e);
    /**
     * 射线碰撞结果 
     * viewer.impl.hitTestViewport
     * 第一个参数是一个三维向量，第三个分量固定为1
     * 第二个参数表示 是否忽略透明部件
     * 碰撞结果携带有包括碰撞点在内的一些信息
     */
    let result = viewer.impl.hitTestViewport(new THREE.Vector3(e.normalizedX, e.normalizedY, 1), true);
    if (result)
        return result.intersectPoint;
    else
        return null;
};
/**
 * 计算出归一化后的鼠标二维点击位置
 */
addNormalized = (e) => {
    //console.log([e,e.clientX,e.clientY,e.target.clientWidth,e.target.clientHeight]);
    let nX = (e.clientX / e.target.clientWidth) * 2 - 1;
    let nY = (e.clientY / e.target.clientHeight) * 2 - 1;
    e.normalizedX = nX;
    e.normalizedY = -nY; //坐标系不同，所以要调整一下
    return e;
};