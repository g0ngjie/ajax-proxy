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

// 同步数据
function setStore(k, v) {
  chrome.storage.local.set({ [k]: v });
}

// 获取数据
function getStore(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      if (result.hasOwnProperty(key)) resolve({ ok: true, data: result[key] });
      else resolve({ ok: false });
    });
  });
}

const WIN_ID = "__windowId";

// 获取所有windowId
async function getAllWindowIds() {
  return new Promise((resolve) => {
    chrome.windows.getAll(function (targets) {
      const ids = targets.map((item) => item.id);
      resolve(ids);
    });
  });
}

// 创建视图
async function createPanel() {
  const { ok, data: windowId } = await getStore(WIN_ID);
  const _createFunc = function () {
    chrome.windows.create(
      {
        url: "page/index.html",
        type: "popup",
        width: 1200,
        height: 600,
        top: 100,
      },
      function (target) {
        setStore(WIN_ID, target.id);
      }
    );
  };
  if (!ok || !windowId) {
    _createFunc();
  } else {
    // 获取所有窗口id，判断cacheId是否存在
    // 如果已经存在则置前
    const ids = await getAllWindowIds();
    const exist = ids.some((item) => item === windowId);
    if (exist) {
      chrome.windows.update(windowId, { focused: true });
      return;
    }
    // 不存在，则重新创建，刷新cacheId
    _createFunc();
  }
}

// 关闭试图
async function closePanel() {
  const { ok, data: windowId } = await getStore(WIN_ID);
  if (ok && windowId) {
    chrome.windows.remove(windowId);
    setStore(WIN_ID, "");
  }
}

// 全屏
async function fullScreenPanel() {
  const { ok, data: windowId } = await getStore(WIN_ID);
  if (ok) {
    chrome.windows.getCurrent(function (current) {
      if (current.id === windowId) {
        switch (current.state) {
          case "fullscreen":
            chrome.windows.update(current.id, { state: "normal" });
            break;
          default:
            chrome.windows.update(current.id, { state: "fullscreen" });
            break;
        }
      }
    });
  }
}

async function resizeWindow() {
  const { ok, data: windowId } = await getStore(WIN_ID);
  if (ok) {
    chrome.windows.getCurrent(function (current) {
      // normal", "minimized", "maximized", or "fullscreen"
      const conf = {
        normal: "maximized",
        maximized: "fullscreen",
        fullscreen: "normal",
      };
      if (current.id === windowId)
        chrome.windows.update(current.id, { state: conf[current.state] });
    });
  }
}

// 监听
chrome.browserAction.onClicked.addListener(function (tab) {
  createPanel();
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

// commands
chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case "open_panel":
      createPanel();
      break;
    case "close_panel":
      closePanel();
      break;
    case "full_screen":
      fullScreenPanel();
      break;
    case "resize_window":
      resizeWindow();
      break;
    default:
      break;
  }
});
