<br>

<p align="center">
<h1 align="center">Ajax Proxy</h1>
</p>

<br>

<p align="center">
<a href="https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo" target="__blank"><img src="https://img.shields.io/chrome-web-store/v/jbikjaejnjfbloojafllmdiknfndgljo.svg?logo=Google%20Chrome&logoColor=white&color=red&style=flat-square" alt="chrome web store"></a>
<a href="https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo" target="__blank"><img src="https://img.shields.io/chrome-web-store/stars/jbikjaejnjfbloojafllmdiknfndgljo.svg?logo=Google%20Chrome&logoColor=white&color=red&style=flat-square" alt="chrome rating"></a>
<!-- Temporary badges for edge -->
<a href="https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi" target="__blank"><img src="https://img.shields.io/badge/dynamic/json?label=edge%20add-on&style=flat-square&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Filadajdkobpmadjfpeginhngnneaoefi" alt="edge addons"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi" target="__blank"><img src="https://img.shields.io/badge/dynamic/json?label=users&style=flat-square&query=%24.activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Filadajdkobpmadjfpeginhngnneaoefi" alt="edge users"></a>
</p>

> `Ajax Proxy` 是一款基于 `Chromium` 内核的浏览器插件，面向开发者的工具，主要用于 Web 端接口数据的修改。

## 适用场景

- 当需要 `mock` 数据时
- 当我们在开发或者生产阶段需要验证一些 **异常场景** 或者 **临界值** 时
- 当开发阶段数据频繁变更，导致页面无法正常联调时
<!-- - 当 ... ... -->

<!-- 原始项目已迁移 _main-history-20220127_ -->

## 安装

[Edge 版本](https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi)

[Chrome 版本](https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo)

## 效果展示

可视化编辑响应数据

<!-- ![interceptor](https://github.com/g0ngjie/ajax-proxy/wiki/images/interceptor-1.png) -->

![operation.gif](media/operation.gif)

![zhihu](https://github.com/g0ngjie/ajax-proxy/wiki/images/zhihu-ajaxproxy.png)

## 常见问题

1. 数据拦截不起作用
   - 方法 1: 可以通过切换 `interceptor` 和 `redirector` 来刷新 Ajax 引用问题
     ![issues_checked](https://github.com/g0ngjie/ajax-proxy/wiki/images/issues_checked.png)
   - 方法 2: 可以在开发者工具的`网络（network）`里面，通过 ☑️ 禁用缓存
     ![issues_disabled_cache](https://github.com/g0ngjie/ajax-proxy/wiki/images/issues_disabled_cache.png)

## 目录结构

extensions 为浏览器插件目录
vue 为视图文件所在目录

## 源码使用方式

1. 下载对应版本的 [Source code](https://github.com/g0ngjie/ajax-proxy/releases) 解压
2. 浏览器打开 `开发者模式`
3. 加载源码中 `extensions` 目录

## 测试用例

下载 [Interceptor.test.json](https://github.com/g0ngjie/ajax-proxy/blob/main/Interceptor.test.json)

分别使用在 [掘金](https://juejin.cn/) 首页、[百度翻译](https://fanyi.baidu.com/) 两个网站测试

1. 掘金: 直接在首页查看效果；
2. 百度翻译: 随便翻译点内容即可；
3. 也可以直接在[Swagger](https://petstore.swagger.io/)中测试

## ajax proxy v2 新版本入口

- 体积小
- TS 重构

[Colibri](https://github.com/g0ngjie/colibri)

## ⭐ Stargazers

非常感谢您的支持!

[![Stargazers for ajax-proxy](https://reporoster.com/stars/g0ngjie/ajax-proxy)](https://github.com/g0ngjie/ajax-proxy/stargazers)
