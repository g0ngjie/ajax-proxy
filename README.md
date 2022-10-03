## Ajax Proxy

<!-- 原始项目已迁移 _main-history-20220127_ -->

[![](https://img.shields.io/chrome-web-store/v/jbikjaejnjfbloojafllmdiknfndgljo.svg?logo=Google%20Chrome&logoColor=white&color=red&style=flat-square)](https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo)
[![](https://img.shields.io/chrome-web-store/stars/jbikjaejnjfbloojafllmdiknfndgljo.svg?logo=Google%20Chrome&logoColor=white&color=red&style=flat-square)](https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo)

<!-- [![](https://img.shields.io/chrome-web-store/users/jbikjaejnjfbloojafllmdiknfndgljo.svg?logo=Google%20Chrome&logoColor=white&color=red&style=flat-square)](https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo) -->

<!-- Temporary badges for edge -->

[![](https://img.shields.io/badge/dynamic/json?label=edge%20add-on&style=flat-square&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Filadajdkobpmadjfpeginhngnneaoefi)](https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi)
[![](https://img.shields.io/badge/dynamic/json?label=rating&suffix=/5&style=flat-square&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Filadajdkobpmadjfpeginhngnneaoefi)](https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi)
[![](https://img.shields.io/badge/dynamic/json?label=users&style=flat-square&query=%24.activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Filadajdkobpmadjfpeginhngnneaoefi)](https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi)

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

## 源码使用方式

1. 下载对应版本的 [Source code](https://github.com/g0ngjie/ajax-proxy/releases) 解压
2. 浏览器打开 `开发者模式`
3. 加载源码中 `extensions` 目录

## 测试用例

下载 [Interceptor.test.json](https://github.com/g0ngjie/ajax-proxy/blob/main/Interceptor.test.json)

分别使用在 [掘金](https://juejin.cn/) 首页、[百度翻译](https://fanyi.baidu.com/) 两个网站测试

1. 掘金: 直接在首页查看效果；
2. 百度翻译: 随便翻译点内容即可；

## ajax proxy v2 新版本入口

- 体积小
- TS 重构

[Colibri](https://github.com/g0ngjie/colibri)

## ⭐ Stargazers

非常感谢您的支持!

[![Stargazers for ajax-proxy](https://reporoster.com/stars/g0ngjie/ajax-proxy)](https://github.com/g0ngjie/ajax-proxy/stargazers)
