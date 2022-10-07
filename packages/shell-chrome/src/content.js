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
} from "@proxy/shared-utils";
import { CONNECT_NAME, INIT_CURRENT_TITLE } from "./consts";

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
        let mode, interceptors, redirectors;
        // 全局开关
        if (getStorage(StorageKey.GLOBAL_SWITCH, false)) {
            noticeDocumentByContent(NoticeKey.GLOBAL_SWITCH, true);
        }
        // 模式
        if (mode = getStorage(StorageKey.MODE, 'interceptor')) {
            noticeDocumentByContent(NoticeKey.MODE, mode)
        }
        // 拦截器列表
        if (interceptors = getStorage(StorageKey.INTERCEPT_LIST, [])) {
            noticeDocumentByContent(NoticeKey.INTERCEPT_LIST, interceptors)
        }
        // 重定向列表
        if (redirectors = getStorage(StorageKey.REDIRECT_LIST, [])) {
            noticeDocumentByContent(NoticeKey.REDIRECT_LIST, redirectors)
        }
    });

    // 长链接通信接收 service-worker -> document
    const port = chrome.runtime.connect({ name: CONNECT_NAME });
    // 接收service-worker 传来的信息，转发给 document.js
    port.onMessage.addListener(function (msg) {
        if (msg.from === NoticeFrom.SERVICE_WORKER && msg.to === NoticeTo.CONTENT) {
            const { GLOBAL_SWITCH, INTERCEPT_LIST, REDIRECT_LIST, MODE } = NoticeKey
            if ([GLOBAL_SWITCH, INTERCEPT_LIST, REDIRECT_LIST, MODE].includes(msg.key))
                noticeDocumentByContent(msg.key, msg.value)
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


