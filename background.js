
// 接收page传来的信息，转发给content.js
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === '__ajax_proxy' && msg.to === 'background') {
    chrome.storage.local.get(['globalSwitchOn', 'routes'], (result) => {
      if (result.hasOwnProperty('globalSwitchOn')) {
        if (result.globalSwitchOn) {
          postMessage({ type: '__ajax_proxy', to: 'content', key: 'globalSwitchOn', value: result.globalSwitchOn });
          // chrome.runtime.sendMessage(chrome.runtime.id, {
          //   type: "__ajax_proxy",
          //   to: "content",
          //   key: "globalSwitchOn",
          //   value: result.globalSwitchOn,
          // });
          chrome.browserAction.setIcon({ path: "/images/16.png" });
        } else {
          chrome.browserAction.setIcon({ path: "/images/16g.png" });
        }
      }
    });
  }
  chrome.tabs.query({ }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { ...msg, to: 'content' });
  })
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.windows.create({
    url: "page/index.html",
    type: "popup"
  })
});