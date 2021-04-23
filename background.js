// 接收page传来的信息，转发给content.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "__ajax_proxy" && msg.to === "background") {
    if (msg.key === "notice") {
      msg.value && chromeNotice(msg.value);
    } else if (msg.key === "badge") {
      // 统计一下
      chromeBadge();
    } else {
      // 统计一下
      chromeBadge();
      chrome.storage.local.get(["globalSwitchOn", "proxy_routes"], (result) => {
        if (result.hasOwnProperty("globalSwitchOn")) {
          if (result.globalSwitchOn) {
            postMessage({
              type: "__ajax_proxy",
              to: "content",
              key: "globalSwitchOn",
              value: result.globalSwitchOn,
            });
            chrome.browserAction.setIcon({ path: "/images/16.png" });
          } else {
            chrome.browserAction.setIcon({ path: "/images/16g.png" });
          }
        }
        if (result.proxy_routes) {
          postMessage({
            type: "__ajax_proxy",
            to: "content",
            key: "proxy_routes",
            value: result.proxy_routes,
          });
        }
      });
    }
  }
  chrome.tabs.query({}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { ...msg, to: "content" });
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.windows.create({
    url: "page/index.html",
    type: "popup",
    width: 1200,
    height: 600,
    top: 100,
  });
});

// 设置默认icon
chrome.storage.local.get("globalSwitchOn", (result) => {
  if (result.hasOwnProperty("globalSwitchOn")) {
    if (result.globalSwitchOn) {
      chrome.browserAction.setIcon({ path: "/images/16.png" });
    } else {
      chrome.browserAction.setIcon({ path: "/images/16g.png" });
    }
  }
});

// 通知
function chromeNotice({ title, message }) {
  new Notification(title, {
    icon: "images/48.png",
    body: message,
  });
}

// badge
function chromeBadge() {
  chrome.browserAction.setBadgeBackgroundColor({ color: "#F56C6C" });
  chrome.storage.local.get(["globalSwitchOn", "proxy_routes"], (result) => {
    if (result.hasOwnProperty("globalSwitchOn")) {
      if (result.globalSwitchOn) {
        if (result.proxy_routes) {
          const routes = result.proxy_routes || [];
          let count = 0;
          debugger;
          let text = "";
          routes.forEach((item) => {
            if (item.switchOn && item.hit) count += item.hit;
          });
          if (count) text = count + "";
          else text = "";
          chrome.browserAction.setBadgeText({ text });
        } else chrome.browserAction.setBadgeText({ text: "" });
      } else chrome.browserAction.setBadgeText({ text: "" });
    }
  });
}
// 初始化
chromeBadge();
