import { useAction } from "./env";

/**设置徽章 */
export function setBadge(count: number | undefined) {
    if (useAction) {
        chrome.action.setBadgeBackgroundColor({ color: "#006d75" });
        if (count) {
            chrome.action.setBadgeText({ text: `+${count}` });
        } else {
            chrome.action.setBadgeText({ text: "" });
        }
    }
}

/**Tab栏图片启用禁用状态 */
export function setTabIcon(enable: boolean) {
    if (useAction) {
        chrome.action.setIcon({
            path: enable ? "/icons/128.png" : "/icons/128g.png",
        });
    }
}