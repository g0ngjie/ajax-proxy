## Ajax Proxy

原始项目已迁移 _main-history-20220127_

## 安装

[Edge 版本](https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi)

[Chrome 版本](https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo)

## 效果展示

可视化编辑响应数据

![interceptor](https://github.com/g0ngjie/ajax-proxy/wiki/images/interceptor-1.png)

![zhihu](https://github.com/g0ngjie/ajax-proxy/wiki/images/zhihu-ajaxproxy.png)

## 注意

1. 设置一个新的**拦截**或**重定向**功能时，需要重新刷新一下页面

## 常见问题

1. 数据拦截不起作用
   - 方法 1: 可以通过切换 `interceptor` 和 `redirector` 来刷新 Ajax 引用问题
     ![issues_checked](https://github.com/g0ngjie/ajax-proxy/wiki/images/issues_checked.png)
   - 方法 2: 可以在开发者工具的`网络（network）`里面，通过 ☑️ 禁用缓存
     ![issues_disabled_cache](https://github.com/g0ngjie/ajax-proxy/wiki/images/issues_disabled_cache.png)

## 目录结构

extensions 为浏览器插件目录
vue 为视图文件所在目录

## 调试模式

1. 如果已经安装了 ajax-proxy 插件，因为 background.js 脚本常驻后台，会影响调试，需先卸载原有插件。
   运行 vue 文件夹的项目，并修改 extensions 文件夹下，background.js 里视图 url 地址。如下

```js
async function createPanel() {
  ...
  const _createFunc = function () {
    chrome.windows.create(
      {
        // 如果是本地环境运行，请修改url地址为实际vue请求地址
        // 例如：http://localhost:8082
        // url: "page/index.html",
        url: "http://localhost:8082",
        type: "popup",
        width: 1230,
        height: 720,
        top: 100,
      },
      function (target) {
        setStore(WIN_ID, target.id);
      }
    );
  };
  ...
}
```

2. 浏览器打开开发人员模式，选择加载解压缩的扩展，选择 extensions 文件夹即可

## 扩展使用方式

编译 vue 文件

```shell
# 在vue目录下运行build
npm run build
```

根目录下生成扩展文件

> 开发环境为 Linux，如 Windows 用户无需用此方式

```shell
./zip.sh
```

## 测试用例

下载 [Interceptor.test.json](https://github.com/g0ngjie/ajax-proxy/blob/main/Interceptor.test.json)

分别使用在 [掘金](https://juejin.cn/) 首页、[百度翻译](https://fanyi.baidu.com/) 两个网站测试

1. 掘金: 直接在首页查看效果；
2. 百度翻译: 随便翻译点内容即可；

## ajax proxy v2 新版本入口

- 轻量级
- TS 重构
- 无需刷新即可使用
- 支持根据协议类型拦截

[Colibri](https://github.com/g0ngjie/colibri)
