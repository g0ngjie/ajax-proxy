"use strict";

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8082,
    https: false,
    hot: true, // 开启热模块加载
    disableHostCheck: true, // 启用 host 访问
    // proxy: {},
  },
};