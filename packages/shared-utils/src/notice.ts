import { target } from "./env";
import { Notice, NoticeKey } from "./consts";

const useTabs = typeof target.chrome !== "undefined" && typeof target.chrome.tabs !== "undefined";
const useRuntime = typeof target.chrome !== "undefined" && typeof target.chrome.runtime !== "undefined";

interface IChromeTab {
    active: boolean;
    audible: boolean;
    autoDiscardable: boolean;
    discarded: boolean;
    favIconUrl: string;
    groupId: number;
    height: number;
    highlighted: boolean;
    id: number;
    incognito: boolean;
    index: number;
    mutedInfo: {
        muted: boolean;
    };
    pinned: boolean;
    selected: boolean;
    status: string;
    title?: string, // 同 url
    url?: string, // 非正常: edge://extensions/ 返回 undefined
    width: number;
    windowId: number;
}

/**
 * 通知 popup -> content
 * @param key 
 * @param value 
 */
export function noticeContentByPopup(key: NoticeKey, value) {
    if (useTabs) {
        target.chrome.tabs.query({ active: true, currentWindow: true }, (tabs: IChromeTab[]) => {
            const tab = tabs[0];
            // 这里校验一下是否当前为一个正常的页面
            // 非正常: edge://extensions/ url: undefined
            // if (tab.url) ...
            target.chrome.tabs.sendMessage(tab.id, {
                type: Notice.TYPE,
                to: Notice.TO_CONTENT,
                key,
                value,
            }).catch(err => {
                // 离线状态 或 网页未加载成功情况下，content_script 未加载，导致没有接收方
                // 会导致：Error: Could not establish connection. Receiving end does not exist.
            });
        });
    }
}

/**
 * 通知 content -> document
 */
export function noticeDocumentByContent(key: NoticeKey, value) {
    window.postMessage({
        type: Notice.TYPE,
        to: Notice.TO_DOCUMENT,
        key,
        value,
    });
}

/**
 * 通知 content -> service-worker
 * @param key
 * @param value
 */
export function noticeServiceWorkerByContent(key: NoticeKey, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage({
            type: Notice.TYPE,
            to: Notice.TO_SERVICE_WORKER,
            key,
            value,
        }).catch(err => { });
    }
}

/**
 * 通知 panels -> service-worker
 */
export function noticeServiceWorkerByPanels(key, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage(target.chrome.runtime.id, {
            type: Notice.TYPE,
            to: Notice.TO_SERVICE_WORKER,
            key, value
        }).catch(err => { })
    }
}
