import { target } from "./env";
import { NoticeFrom, NoticeTo, NoticeKey } from "./consts";

const useRuntime = typeof target.chrome !== "undefined" && typeof target.chrome.runtime !== "undefined";

/**
 * 通知 content -> document
 */
export function noticeDocumentByContent(key: NoticeKey, value) {
    window.postMessage({
        from: NoticeFrom.CONTENT,
        to: NoticeTo.DOCUMENT,
        key,
        value,
    });
}

/**
 * 通知 content -> service-worker
 * @param key
 * @param value
 */
export function noticeServiceWorkerByContent(key: NoticeKey | string, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage({
            from: NoticeFrom.CONTENT,
            to: NoticeTo.SERVICE_WORKER,
            key,
            value,
        }).catch(err => {
            // 离线状态 或 网页未加载成功情况下，content_script 未加载，导致没有接收方
            // 会导致：Error: Could not establish connection. Receiving end does not exist.
        });
    }
}

/**
 * 通知 panels -> service-worker
 */
export function noticeServiceWorkerByPanels(key, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage(target.chrome.runtime.id, {
            from: NoticeFrom.PANELS,
            to: NoticeTo.SERVICE_WORKER,
            key, value
        }).catch(err => {
            // 离线状态 或 网页未加载成功情况下，content_script 未加载，导致没有接收方
            // 会导致：Error: Could not establish connection. Receiving end does not exist.
        })
    }
}
