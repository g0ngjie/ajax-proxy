import { Notice } from "@proxy/shared-utils/lib/consts";
import { CONNECT_NAME } from "../consts";
import { createPanel } from "./panel";

/**
 * 可以定义多对多，但考虑此工具无需多个链接。
 * 多对多方式:
 *  current_port = {}
 *  ...
 *  current_port[tabId].postMessage()
 */
let current_port = null;
// 长链接
// 好处是可以实现无刷新更新拦截器代理
// 弊端是每一个新的tab页都会更新current_port，旧的长链会注销
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === CONNECT_NAME) {
        current_port = port;
    }
})

/**
 * 通知 service-worker -> panels
 */
export function noticePanels(key, value) {
    chrome.runtime.sendMessage({
        type: Notice.TYPE,
        to: Notice.TO_PANELS,
        key, value
    }).catch(err => { })
}

/**
 * 通知 service-worker -> content
 */
export function noticeContent(key, value) {
    // 长链接通信
    current_port?.postMessage({
        type: Notice.TYPE,
        to: Notice.TO_CONTENT,
        key,
        value,
    })
}

/**获取 port里 title */
export function useCurrentTitle() {
    return current_port?.sender?.tab?.title
}

/**
 * 系统通知
 * 当命中率过高时
 */
export function chromeNativeNotice({ title, message }) {
    const notification = new Notification(title, {
        icon: "icons/128.png",
        body: message,
    });
    notification.onclick = function () {
        createPanel();
        notification.close();
    };
}