import { getStore, setStore } from "./store";

const WIN_ID = "ajax-proxy:service-worker:panel:window_id";

/**获取所有windowId */
async function getAllWindowIds() {
    return new Promise((resolve) => {
        chrome.windows.getAll(function (targets) {
            const ids = targets.map((item) => item.id);
            resolve(ids);
        });
    });
}

/**创建视图 */
export async function createPanel() {
    const windowId = await getStore(WIN_ID, null);
    const _createFunc = function () {
        // https://developer.chrome.com/docs/extensions/reference/windows/
        chrome.windows.create(
            {
                url: "panels/index.html",
                type: "popup",
                width: 1300,
                height: 800,
                top: 100,
                left: 150,
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

/**关闭视图 */
export async function closePanel() {
    const windowId = await getStore(WIN_ID, null);
    if (windowId) {
        chrome.windows.remove(windowId);
        setStore(WIN_ID, null);
    }
}

/**全屏 */
export async function fullScreenPanel() {
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

/**修改 panels 窗口大小 */
export async function resizeWindow() {
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