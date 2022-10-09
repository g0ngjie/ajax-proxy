import { NoticeTo, NoticeFrom, NoticeKey } from "@proxy/shared-utils";
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

// 监听长链接 被断开
chrome.runtime.onConnect.addListener(function (port) {
    port.onDisconnect.addListener(function (port) {
        if (port.name === CONNECT_NAME) {
            current_port = null
            // 通知 panels 清空 title
            noticePanels(NoticeKey.GET_CURRENT_TITLE, "")
        }
    })
})

/**
 * 通知 service-worker -> panels
 */
export function noticePanels(key, value) {
    chrome.runtime.sendMessage({
        from: NoticeFrom.SERVICE_WORKER,
        to: NoticeTo.PANELS,
        key, value
    }).catch(err => { })
}

/**
 * 通知 service-worker -> content
 */
export function noticeContent(key, value) {
    try {
        // 长链接通信
        current_port?.postMessage({
            from: NoticeFrom.SERVICE_WORKER,
            to: NoticeTo.CONTENT,
            key,
            value,
        })
    } catch (error) {
        // catch err
        // error: Error: Attempting to use a disconnected port object
        // 当被操作页被关闭掉，而在操作面板上继续操作时，此时port通信断开，报异常
        // 一般不会走到这里，上有已经做 onDisconnect 监听
    }
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