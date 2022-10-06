// console.log("Ajax proxy document.js");

import lib from "@proxy/lib";
import { NoticeFrom, NoticeTo, NoticeKey } from "@proxy/shared-utils";

window.addEventListener(
    "message",
    function (event) {
        const data = event.data;
        let globalSwitch = false
        if (data.from === NoticeFrom.CONTENT && data.to === NoticeTo.DOCUMENT) {
            switch (data.key) {
                // 全局开关
                case NoticeKey.GLOBAL_SWITCH:
                    globalSwitch = data.value;
                    lib.setGlobalSwitch(globalSwitch)
                    break;
                // 模式切换
                case NoticeKey.MODE:
                    lib.update(data.value)
                    break;
                // 拦截器列表
                case NoticeKey.INTERCEPT_LIST:
                    lib.update(data.value)
                    break;
                // 重定向列表
                case NoticeKey.REDIRECT_LIST:
                    lib.update(data.value)
                    break;
            }
        }
    },
    false
);
