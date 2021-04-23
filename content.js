// 在页面上插入代码
const script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", chrome.extension.getURL("core.js"));
document.documentElement.appendChild(script);

script.addEventListener("load", () => {
  chrome.storage.local.get(["globalSwitchOn", "proxy_routes"], (result) => {
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
  });
});

// 接收background.js传来的信息，转发给core
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "__ajax_proxy" && msg.to === "content") {
    if (msg.key === "globalSwitchOn")
      postMessage({
        type: "__ajax_proxy",
        to: "core",
        key: "globalSwitchOn",
        value: msg.value,
      });
    else if (msg.key === "proxy_routes")
      postMessage({
        type: "__ajax_proxy",
        to: "core",
        key: "proxy_routes",
        value: msg.value,
      });
  }
});

// 接收core.js转发给page
window.addEventListener(
  "core_notice",
  function (event) {
    // debugger;
    chrome.runtime &&
      chrome.runtime.sendMessage({
        type: "__ajax_proxy",
        to: "page",
        ...event.detail,
      });
  },
  false
);
