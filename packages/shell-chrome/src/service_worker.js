
// console.log("Ajax proxy service_worker.js")

import {
    Notice,
    NoticeKey,
    StorageKey,
    CONNECT_NAME,
} from "@proxy/shared-utils/lib/consts";

const WIN_ID = "ajax-proxy:service-worker:panel:window_id";



let last_port = null;
// 长链接
// 好处是可以实现无刷新更新拦截器代理
// 弊端是每一个新的tab页都会更新last_port，旧的长链会注销
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === CONNECT_NAME) {
        last_port = port;
    }
})

/**
 * 通知 service-worker -> panels
 */
function noticePanels(key, value) {
    chrome.runtime.sendMessage({
        type: Notice.TYPE,
        to: Notice.TO_PANELS,
        key, value
    }).catch(err => { })
}

/**
 * 通知 service-worker -> content
 */
function noticeContent(key, value) {
    // 长链接通信
    last_port?.postMessage({
        type: Notice.TYPE,
        to: Notice.TO_CONTENT,
        key,
        value,
    })
}

// 这里面不需要初始化initStorage
// 因为shared-utils 里，env 有判断window，会导致报错
// 解决service-worker里不存在 window的问题
// 同步数据
function setStore(k, v) {
    chrome.storage.local.set({ [k]: v });
}

// 获取数据
function getStore(key, defaultValue = null) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, (result) => {
            if (result.hasOwnProperty(key)) resolve(result[key]);
            else resolve(defaultValue);
        });
    });
}

// 接收content 和 panels 传来的信息
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === Notice.TYPE && msg.to === Notice.TO_SERVICE_WORKER) {
        const { key, value } = msg
        // 判断启用状态
        if (key === NoticeKey.GLOBAL_SWITCH) {
            chrome.action.setIcon({
                path: value ? "icons/128.png" : "icons/128g.png",
            });
            // 更新一下图标状态
            chromeBadge()
            noticeContent(key, value)
        }
        // 模式切换
        if (key === NoticeKey.MODE) {
            chromeBadge();
            noticeContent(key, value)
        }
        // FIXME: 需要增加一个 form 类型
        // 拦截器列表
        if (key === NoticeKey.INTERCEPT_LIST) {
            chromeBadge();
            noticeContent(key, value)
        }
        // 重定向列表
        if (key === NoticeKey.REDIRECT_LIST) {
            noticeContent(key, value)
        }
        // content -> service-worker -> panels
        // 页面加载初始化当前title [主动]
        if (key === NoticeKey.INIT_CURRENT_TITLE) {
            // 接收content转发给panels
            noticePanels(NoticeKey.GET_CURRENT_TITLE, value)
        }
        // 获取当前document.title [被动]
        // panels -> service-worker -> connect.port.sender.tab.title -> panels
        if (key === NoticeKey.GET_CURRENT_TITLE) {
            const title = last_port?.sender?.tab?.title
            noticePanels(NoticeKey.GET_CURRENT_TITLE, title)
        }

        // 监听命中率
        if (key === NoticeKey.HIT_RATE) {
            chromeBadge(value);
        }
    }
});

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
    const windowId = await getStore(WIN_ID, null);
    const _createFunc = function () {
        chrome.windows.create(
            {
                // 如果是本地环境运行，请修改url地址为实际vue请求地址
                // 例如：http://localhost:8082
                url: "panels/index.html",
                // url: "http://localhost:8082",
                type: "popup",
                width: 1300,
                height: 800,
                top: 100,
            },
            function (target) {
                // bugfix: id undefined 问题
                if (target) setStore(WIN_ID, target.id);
            }
        );
    };
    if (!windowId) {
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
    const windowId = await getStore(WIN_ID, null);
    if (windowId) {
        chrome.windows.remove(windowId);
        setStore(WIN_ID, null);
    }
}

// 全屏
async function fullScreenPanel() {
    const windowId = await getStore(WIN_ID, null);
    if (windowId) {
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

// 修改 panels 窗口大小
async function resizeWindow() {
    const windowId = await getStore(WIN_ID, null);
    if (windowId) {
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

// 监听图标点击事件
chrome.action.onClicked.addListener(function (tab) {
    createPanel();
});

// 设置默认icon
getStore(StorageKey.GLOBAL_SWITCH, false).then(bool => {
    if (bool) chrome.action.setIcon({ path: "icons/128.png" });
    else chrome.action.setIcon({ path: "icons/128g.png" });
})

// 系统通知
// 当命中率过高时
function chromeNativeNotice({ title, message }) {
    const notification = new Notification(title, {
        icon: "icons/128.png",
        body: message,
    });
    notification.onclick = function () {
        createPanel();
        notification.close();
    };
}

// 同步 命中率
async function syncRoutesAsHit(routes, match_url, method) {
    const list = routes || [];
    // 总命中率
    let counter = 0;
    for (let i = 0; i < list.length; i++) {
        const target = list[i];
        if (target.switch_on) {
            if (
                target.match_url === match_url &&
                (target.method === "ANY" || target.method === method)
            ) {
                const totalHit = target.hit ? target.hit + 1 : 1;
                target.hit = totalHit;
                counter += totalHit;

                // 这里开始统计某个接口命中次数是否存在过多
                const LIMIT = 100;
                // 命中次数 太多，通知一下
                let tooHigh = totalHit === LIMIT;
                // 每隔20次提醒一下
                if (!tooHigh && totalHit > LIMIT) {
                    tooHigh = (totalHit - LIMIT) % 20 === 0;
                }
                if (tooHigh) {
                    const message = [target.match_url, target.remark || ""].join("\n");
                    const lang = await getStore(StorageKey.LANGUAGE, "en");
                    const i18n = {
                        en: "Too many interceptions",
                        zh: "拦截次数过多",
                    };
                    chromeNativeNotice({
                        title: i18n[lang] || i18n.en,
                        message,
                    });
                }
            } else if (target.hit) {
                counter += target.hit;
            }
        }
    }
    // 更新本地拦截列表
    setStore(StorageKey.INTERCEPT_LIST, list);
    return counter;
}


// badge 右下角小徽章设置
async function chromeBadge(data) {
    const { match_url, method } = data || {}
    const globalSwitchOn = await getStore(StorageKey.GLOBAL_SWITCH, false);
    console.log("[debug]globalSwitchOn:", globalSwitchOn)
    if (!globalSwitchOn) {
        chrome.action.setBadgeText({ text: "" });
        return;
    }
    // 判断模式
    const mode = await getStore(StorageKey.MODE, 'interceptor');
    console.log("[debug]mode:", mode)
    // 如果是重定向
    if (mode === "redirector") {
        chrome.action.setBadgeBackgroundColor({ color: "#006d75" });
        chrome.action.setBadgeText({ text: "R" });
        return;
    }
    // 拦截器模式颜色
    chrome.action.setBadgeBackgroundColor({ color: "#F56C6C" });
    const interceptList = await getStore(StorageKey.INTERCEPT_LIST, []);
    console.log("[debug]interceptList:", interceptList)
    // 如果没有需要拦截的数据时，设置默认值
    if (interceptList.length === 0) {
        chrome.action.setBadgeText({ text: "" });
        return;
    }

    if (!match_url) return
    const counter = await syncRoutesAsHit(interceptList, match_url, method)
    if (counter) chrome.action.setBadgeText({ text: `+${counter}` });
    else chrome.action.setBadgeText({ text: "" });
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