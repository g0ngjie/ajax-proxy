// 在页面上插入代码
const script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", browser.extension.getURL("core.js"));
document.documentElement.appendChild(script);

script.addEventListener("load", () => {
  browser.storage.local.get(
    ["globalSwitchOn", "proxy_routes", "mode", "redirect"],
    (result) => {
      if (result.hasOwnProperty("globalSwitchOn")) {
        postMessage({
          type: "__ajax_proxy",
          to: "core",
          key: "globalSwitchOn",
          value: result.globalSwitchOn,
        });
      }
      if (result.proxy_routes) {
        postMessage({
          type: "__ajax_proxy",
          to: "core",
          key: "proxy_routes",
          value: result.proxy_routes,
        });
      }
      if (result.mode) {
        postMessage({
          type: "__ajax_proxy",
          to: "core",
          key: "mode",
          value: result.mode,
        });
      }
      if (result.redirect) {
        postMessage({
          type: "__ajax_proxy",
          to: "core",
          key: "redirect",
          value: result.redirect,
        });
      }
    }
  );
});

// 接收background.js传来的信息，转发给core
browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "__ajax_proxy" && msg.to === "content") {
    const _isInclude = [
      "globalSwitchOn",
      "proxy_routes",
      "mode",
      "redirect",
    ].includes(msg.key);
    if (_isInclude)
      postMessage({
        type: "__ajax_proxy",
        to: "core",
        key: msg.key,
        value: msg.value,
      });
  }
});

// 接收core传来的信息,转发给background
window.addEventListener(
  "core_notice",
  function (event) {
    if (browser.runtime) {
      // 转发给background
      browser.runtime.sendMessage({
        type: "__ajax_proxy",
        to: "background",
        key: "badge",
        ...event.detail,
      });
    }
  },
  false
);
