
// console.log("Ajax proxy service_worker.js")

import {
    Notice,
    NoticeKey,
} from "@proxy/shared-utils/lib/consts";
import { injectEventListener } from "./event";
import { noticeContent, noticePanels, useCurrentTitle } from "./notice";
import { initDefaultSth } from "./init";
import { chromeBadge } from "./badge";

// 接收content 和 panels 传来的信息
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === Notice.TYPE && msg.to === Notice.TO_SERVICE_WORKER) {
        const { key, value } = msg
        // 判断启用状态
        if (key === NoticeKey.GLOBAL_SWITCH) {
            chrome.action.setIcon({
                path: value ? "icons/128.png" : "icons/128g.png",
            });
            // 更新一下图标状态
            chromeBadge()
            noticeContent(key, value)
        }
        // 模式切换
        if (key === NoticeKey.MODE) {
            chromeBadge();
            noticeContent(key, value)
        }
        // FIXME: 需要增加一个 form 类型
        // 拦截器列表
        if (key === NoticeKey.INTERCEPT_LIST) {
            chromeBadge();
            noticeContent(key, value)
        }
        // 重定向列表
        if (key === NoticeKey.REDIRECT_LIST) {
            noticeContent(key, value)
        }
        // content -> service-worker -> panels
        // 页面加载初始化当前title [主动]
        if (key === NoticeKey.INIT_CURRENT_TITLE) {
            // 接收content转发给panels
            noticePanels(NoticeKey.GET_CURRENT_TITLE, value)
        }
        // 获取当前document.title [被动]
        // panels -> service-worker -> connect.port.sender.tab.title -> panels
        if (key === NoticeKey.GET_CURRENT_TITLE) {
            const title = useCurrentTitle()
            noticePanels(NoticeKey.GET_CURRENT_TITLE, title)
        }

        // 监听命中率
        if (key === NoticeKey.HIT_RATE) {
            chromeBadge(value);
        }
    }
});

// 设置默认项
initDefaultSth()

// 注册其他监听列表
injectEventListener()