## Ajax Proxy

原始项目已迁移 _main-history-20220127_

### 目录结构

extensions 为浏览器插件目录
vue 为视图文件所在目录

### 调试模式

1. 如果已经安装了 ajax-proxy 插件，因为 background.js 脚本常驻后台，会影响调试。需先卸载。
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

### 扩展使用方式

编译 vue 文件

```shell
# 在vue目录下运行build
npm run build
```

根目录下生成扩展文件

```shell
./zip.sh
```
