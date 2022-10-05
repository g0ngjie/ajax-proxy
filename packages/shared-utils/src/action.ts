import { target } from "./env";

const useAction = typeof target.chrome !== "undefined" && typeof target.chrome.action !== "undefined";

/**设置徽章 */
export function setBadge(count: number | undefined) {
    if (useAction) {
        target.chrome.action.setBadgeBackgroundColor({ color: "#006d75" });
        if (count) {
            target.chrome.action.setBadgeText({ text: `+${count}` });
        } else {
            target.chrome.action.setBadgeText({ text: "" });
        }
    }
}

/**Tab栏图片启用禁用状态 */
export function setTabIcon(enable: boolean) {
    if (useAction) {
        target.chrome.action.setIcon({
            path: enable ? "/icons/128.png" : "/icons/128g.png",
        });
    }
}