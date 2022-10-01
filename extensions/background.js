const WIN_ID = "__windowId";
const ROUTES_KEY = "proxy_routes";
const GLOBAL_WTITCH_ON = "globalSwitchOn";
const MODE = "mode";
const LANG = "lang";

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

// page事件分发
async function pageEventDispatch(msg) {
  const { key, match, value } = msg;
  // 统计一下
  if (key === "badge") chromeBadge(match);
  if (key === "proxy_routes") {
    chromeBadge(match);
    noticeContent(key, value);
  }
  if (key === "globalSwitchOn") {
    chromeBadge(match);
    if (value) chrome.action.setIcon({ path: "/images/128.png" });
    else chrome.action.setIcon({ path: "/images/128g.png" });
    noticeContent(key, value);
  }
  if (key === "mode") {
    chromeBadge();
    noticeContent(key, value);
  }
  if (key === "redirect") {
    noticeContent(key, value);
  }
}

// 接收page传来的信息，转发给content.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "__ajax_proxy" && msg.to === "background") {
    pageEventDispatch(msg);
  }
});

function noticeContent(key, value) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: '__ajax_proxy',
      to: "content",
      key,
      value,
    });
  });
}

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
        // 如果是本地环境运行，请修改url地址为实际vue请求地址
        // 例如：http://localhost:8082
        url: "page/index.html",
        // url: "http://localhost:8082",
        type: "popup",
        width: 1230,
        height: 720,
        top: 100,
      },
      function (target) {
        // bugfix: id undefined 问题
        if (target) setStore(WIN_ID, target.id);
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
chrome.action.onClicked.addListener(function (tab) {
  createPanel();
});

// 设置默认icon
chrome.storage.local.get("globalSwitchOn", (result) => {
  if (result.hasOwnProperty("globalSwitchOn")) {
    if (result.globalSwitchOn) {
      chrome.action.setIcon({ path: "/images/128.png" });
    } else {
      chrome.action.setIcon({ path: "/images/128g.png" });
    }
  }
});

// 通知
function chromeNotice({ title, message }) {
  const notification = new Notification(title, {
    icon: "images/128.png",
    body: message,
  });
  notification.onclick = function () {
    createPanel();
    notification.close();
  };
}

// 同步一下 命中率
async function syncRoutesAsHit(routes, match) {
  const list = routes || [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.switchOn && item.match === match) {
      item.hit = item.hit ? item.hit + 1 : 1;
      const LIMIT = 100;
      // 命中次数 太多，通知一下
      let tooHigh = item.hit === LIMIT;
      // 每隔10次提醒一下
      if (!tooHigh && item.hit > LIMIT) {
        tooHigh = (item.hit - LIMIT) % 20 === 0;
      }
      if (tooHigh) {
        const message = [item.match, item.remark || ""].join("\n");
        const { ok, data } = await getStore(LANG);
        let _lang;
        if (!ok || !data) _lang = "en";
        else _lang = data;
        const i18n = {
          en: "The percentage of hits is a little high",
          zh: "命中率多少有点高了",
        };
        chromeNotice({
          title: i18n[_lang] || i18n.en,
          message,
        });
      }
    }
  }
  setStore(ROUTES_KEY, list);
  return list;
}

// badge
async function chromeBadge(match) {
  const { ok: gOk, data: globalSwitchOn } = await getStore(GLOBAL_WTITCH_ON);
  if (!gOk || !globalSwitchOn) {
    chrome.action.setBadgeText({ text: "" });
    return;
  }
  // 判断模式
  const { ok: mOk, data: mode } = await getStore(MODE);
  if (mOk && mode === "redirector") {
    chrome.action.setBadgeBackgroundColor({ color: "#006d75" });
    chrome.action.setBadgeText({ text: "R" });
    return;
  }
  chrome.action.setBadgeBackgroundColor({ color: "#F56C6C" });
  const { ok: rOk, data: proxy_routes } = await getStore(ROUTES_KEY);
  if (!rOk || !proxy_routes) {
    chrome.action.setBadgeText({ text: "" });
    return;
  }
  let routes;
  if (match) {
    routes = await syncRoutesAsHit(proxy_routes, match);
    // 接收content转发给page
    chrome.runtime.sendMessage({
      type: "__ajax_proxy",
      to: "page",
      match,
    });
  } else routes = proxy_routes || [];
  let count = 0;
  let text = "";
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (item.switchOn && item.hit) count += item.hit;
  }
  if (count) text = "+" + count;
  else text = "";
  chrome.action.setBadgeText({ text });
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
