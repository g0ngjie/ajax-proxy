import { StorageKey } from "@proxy/shared-utils/lib/consts";
import { chromeBadge } from "./badge";
import { getStore } from "./store";


/**设置默认项 */
export function initDefaultSth() {
    // 设置默认icon
    getStore(StorageKey.GLOBAL_SWITCH, false).then(bool => {
        if (bool) chrome.action.setIcon({ path: "icons/128.png" });
        else chrome.action.setIcon({ path: "icons/128g.png" });
    })

    // 初始化徽章状态
    chromeBadge()
}