<br>

<h1 align="center">Ajax Proxy</h1>

<br>

<h4 align="center">A browser plugin based on Chromium kernel · Tools for Developers · For the modification of web-side interface data</h4>

<p align="center">
  <a href="https://github.com/g0ngjie/ajax-proxy/blob/master/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/g0ngjie/ajax-proxy"/>
  </a>
  <a href="https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo" target="__blank">
    <img src="https://img.shields.io/chrome-web-store/v/jbikjaejnjfbloojafllmdiknfndgljo.svg?logo=Google%20Chrome&logoColor=white&color=red&style=flat-square" alt="chrome web store">
  </a>
  <a href="https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo" target="__blank">
    <img src="https://img.shields.io/chrome-web-store/stars/jbikjaejnjfbloojafllmdiknfndgljo.svg?logo=Google%20Chrome&logoColor=white&color=red&style=flat-square" alt="chrome rating">
  </a>
  <!-- Temporary badges for edge -->
  <a href="https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi" target="__blank">
    <img src="https://img.shields.io/badge/dynamic/json?label=edge%20add-on&style=flat-square&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Filadajdkobpmadjfpeginhngnneaoefi" alt="edge addons">
  </a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi" target="__blank">
    <img src="https://img.shields.io/badge/dynamic/json?label=users&style=flat-square&query=%24.activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Filadajdkobpmadjfpeginhngnneaoefi" alt="edge users">
  </a>
</p>

<div align="center">
<strong>

[English](README.md) | [简体中文](README.zh.md)

</strong>
</div>

## When to use

- When the required data does not meet the desired effect and `Mock` is required
- When we need to verify some **exception scenarios** or **boundary values** during the development or production phase
- When data changes frequently during the development phase, resulting in the interface not working properly
- When 404 appears on the interface

## Installation

[Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/ajax-proxy/iladajdkobpmadjfpeginhngnneaoefi)

[Google Chrome](https://chrome.google.com/webstore/detail/ajax-proxy/jbikjaejnjfbloojafllmdiknfndgljo)

## Examples

Video: [https://www.youtube.com/watch?v=F\_\_7LXBqnvQ](https://www.youtube.com/watch?v=F__7LXBqnvQ)

<!-- ![interceptor](https://github.com/g0ngjie/ajax-proxy/wiki/images/interceptor-1.png) -->

![operation.gif](media/operation.gif)

![zhihu](https://github.com/g0ngjie/ajax-proxy/wiki/images/zhihu-ajaxproxy.png)

## FAQ

1. Data interception does not work
   - You can switch between `interceptor` and `redirector` to solve the Ajax referencing problem
     ![issues_checked](https://github.com/g0ngjie/ajax-proxy/wiki/images/issues_checked.png)
   - You can select the `Network` section in Developer Tools and disable caching by checking ☑️
     ![issues_disabled_cache](https://github.com/g0ngjie/ajax-proxy/wiki/images/issues_disabled_cache.png)

## Monorepo

| Package                                           | Description                              |
| ------------------------------------------------- | ---------------------------------------- |
| [@proxy/compatibility](./packages/compatibility/) | Old Data Compatibility Library           |
| [@proxy/lib](./packages/proxy-lib/)               | Manipulating the Ajax Core Logic Library |
| [@proxy/shared-utils](./packages/shared-utils/)   | Public Class Libraries                   |
| [@proxy/shell-chrome](./packages/shell-chrome/)   | Browser Extension Library                |
| [@proxy/vue-panels](./packages/vue-panels/)       | Application Operator Panel               |

## Use of source code

1. Download the corresponding version of [Source code](https://github.com/g0ngjie/ajax-proxy/releases) and unzip it
2. Open `Developer mode` in your browser
3. Then just load the unpacked folder

## Testing

You can test it directly in [Swagger](https://petstore.swagger.io/)

## ⭐ Stargazers

Thank you very much for your support!

[![Stargazers for ajax-proxy](https://reporoster.com/stars/g0ngjie/ajax-proxy)](https://github.com/g0ngjie/ajax-proxy/stargazers)

## License

Ajax Proxy is [MIT licensed](LICENSE).
