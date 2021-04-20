
// 在页面上插入代码
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', chrome.extension.getURL('core.js'));
document.documentElement.appendChild(script);

script.addEventListener('load', () => {
  chrome.storage.local.get(['globalSwitchOn', 'proxy_routes'], (result) => {
    if (result.hasOwnProperty('globalSwitchOn')) {
      if (result.globalSwitchOn) chrome.browserAction.setIcon({ path: "/images/16.png" });
      else chrome.browserAction.setIcon({ path: "/images/16g.png" });
      postMessage({ type: '__ajax_proxy', to: 'core', key: 'globalSwitchOn', value: result.globalSwitchOn });
    }
    if (result.proxy_routes) {
      postMessage({ type: '__ajax_proxy', to: 'core', key: 'proxy_routes', value: result.proxy_routes });
    }
  });
});

// 接收background.js传来的信息，转发给core
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === '__ajax_proxy' && msg.to === 'content') {
    if (msg.key === 'globalSwitchOn')
      postMessage({ type: '__ajax_proxy', to: 'core', key: 'globalSwitchOn', value: msg.value });
    else
      postMessage({ type: '__ajax_proxy', to: 'core', key: 'proxy_routes', value: msg.value });
  }
});
