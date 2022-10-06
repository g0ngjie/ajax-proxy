
// 和徽章相关的函数

import { StorageKey } from "@proxy/shared-utils/lib/consts";
import { chromeNativeNotice } from "./notice";
import { getStore, setStore } from "./store";

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
export async function chromeBadge(data) {
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