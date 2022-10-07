// console.log("Ajax proxy content.js")

import {
    initStorage,
    getStorage,
    NoticeTo,
    NoticeFrom,
    NoticeKey,
    StorageKey,
    noticeDocumentByContent,
    noticeServiceWorkerByContent,
    getStorageAll,
} from "@proxy/shared-utils";
import { CONNECT_NAME, INIT_CURRENT_TITLE, NOTICE_KEY_REFRESH_GLOBAL_STATE } from "./consts";

// 在页面上插入代码
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("document.js"));
document.documentElement.appendChild(script);

initStorage().then(() => {
    // 发送当前tab页 title
    noticeServiceWorkerByContent(INIT_CURRENT_TITLE, window.document.title)

    // document.js 资源加载
    script.addEventListener("load", () => {
        // 获取 全局开关、模式、拦截列表、重定向列表
        const data = getStorageAll();
        const getGlobalSwtich = data[StorageKey.GLOBAL_SWITCH] || false
        if (getGlobalSwtich) noticeDocumentByContent(NOTICE_KEY_REFRESH_GLOBAL_STATE, data)
    });

    // 长链接通信接收 service-worker -> document
    const port = chrome.runtime.connect({ name: CONNECT_NAME });
    // 接收service-worker 传来的信息，转发给 document.js
    port.onMessage.addListener(function (msg) {
        if (msg.from === NoticeFrom.SERVICE_WORKER && msg.to === NoticeTo.CONTENT) {
            const { GLOBAL_SWITCH, INTERCEPT_LIST, REDIRECT_LIST, MODE } = NoticeKey
            if ([GLOBAL_SWITCH, INTERCEPT_LIST, REDIRECT_LIST, MODE].includes(msg.key)) {
                // 注意：如果是全局开关开启的话，需要预先通知更新 mode模式
                if (
                    // 全局开关
                    msg.key === GLOBAL_SWITCH &&
                    // 开启状态下
                    msg.value
                ) {
                    const getMode = getStorage(StorageKey.MODE, 'interceptor')
                    // 通知 @proxy/lib 先更新 mode
                    // 如果不更新，lib里始终都是 拦截模式
                    noticeDocumentByContent(MODE, getMode)
                }
                noticeDocumentByContent(msg.key, msg.value)
            }
        }
    });

    // 接收lib 传来的信息 转发给 service-worker
    // 没有from 属性
    window.addEventListener(
        NoticeTo.CONTENT,
        function (event) {
            // 通知徽章上命中率需要变更
            noticeServiceWorkerByContent(NoticeKey.BADGE_STATUS, event.detail)
        },
        false
    );

})


