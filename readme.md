# BIMViewer

BIM轻量化平台是一个互联网三维可视化解决方案。包括BIM轻量化引擎和业务组件。

BIM轻量化引擎是……。包括BIM模型数据可视化组件、模型数据库、模型转换引擎。

BIM模型数据可视化组件（viewer）是……。

## 关键词、术语、专用语解释

- BIM轻量化引擎：提供模型转换，模型数据存储，模型数据可视功能的开放程序
- 模型数据库、3iDB：BIM轻量化引擎的重要组成部分，负责模型数据的存储
- 模型处理引擎、3iDT：提取原始模型的数据并转换
- 模型数据渲染组件、viewer：提供模型可视功能与操控等

## 使用指南

[希望以本项目作为开发交流平台](https://gitee.com/i3yun/ViewerGallery)

[可通过Issue提交问题](https://gitee.com/i3yun/ViewerGallery/issues),[新建一个问题](https://gitee.com/i3yun/ViewerGallery/issues/new)

[由我们的接口文件自动生成的二次开发文档](http://bimviewer.aisanwei.cn/docs/)

## 插件库

1. 模型加载器
2. 模型树浏览器
3. 三维操控器
4. 测量工具
5. 剖切工具
6. 模型管理
   1. 模型的隐藏
   2. 着色
   3. 透明
7. 三维标记
8. 拾取面
9. 拾取点

## 示例库

1. [三维操控](http://i3yun.gitee.io/viewergallery/src/EEPTool/index.html)  
    [源码](./src/EEPTool)
2. [新剖分](http://i3yun.gitee.io/viewergallery/src/NewSectionDemo/index.html)  
    [源码](./src/NewSectionDemo)  
3. [隐藏&透明&变色](http://i3yun.gitee.io/viewergallery/src/Visible&Transparent/index.html)  
    [源码](./src/Visible&Transparent)
4. [三维标记](http://i3yun.gitee.io/viewergallery/src/MarkupDemo/index.html)  
    [源码](./src/MarkupDemo)
5. [消防监控](http://i3yun.gitee.io/viewergallery/src/Temprature/index.html)  
    [源码](./src/Temprature)  
6. [进度模拟](http://i3yun.gitee.io/viewergallery/src/ConstructionProgress/index.html)  
    [源码](./src/ConstructionProgress)
7. [模型过滤](http://i3yun.gitee.io/viewergallery/src/ModelFilterDemo/index.html)  
    [源码](./src/ModelFilterDemo)

## 四步开始使用

1. 在html文件中添加SippreepViewer.bundle.js和一个div

    ``` html
    <script type="text/javascript" src="http://bimviewer.aisanwei.cn/viewer/SippreepViewer.bundle.js"></script>
    ```

    ``` html
    <div id="viewer1"> </div>
    ```

2. 在js文件中创建viewer

    ```js
    var viewerPromise = SippreepViewer.CreateViewer(document.getElementById("viewer1"));
    ```

3. 在js文件中加载viewer的插件

    ```js
    var TidbLoaderExtensionPromise = viewerPromise.then((viewer) => {return viewer.loadExtension("Sippreep.Extensions.TidbLoader.TidbLoaderExtension");});
    ```

4. 在js文件中使用插件的功能

    ```js
    var modelPromise = TidbLoaderExtensionPromise.then((v) => {
    var v1 = v;
    v1.getConfig().host = host;
    v1.getConfig().token = token
    return v1.loadScene(sceneID);
    });
    ```

[查看最小样例](./src/MinimumSample)

## 尾部
[![Fork me on Gitee](https://gitee.com/i3yun/ViewerGallery/widgets/widget_6.svg?color=76cf6e)](https://gitee.com/i3yun/ViewerGallery)  
[![i3yun/ViewerGallery](https://gitee.com/i3yun/ViewerGallery/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b)](https://gitee.com/i3yun/ViewerGallery)  