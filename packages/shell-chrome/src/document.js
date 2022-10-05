// console.log("Ajax proxy document.js");

import lib from "@proxy/lib";
import { Notice, NoticeKey } from "@proxy/shared-utils";

window.addEventListener(
    "message",
    function (event) {
        const data = event.data;
        let globalSwitch = false
        if (data.type === Notice.TYPE && data.to === Notice.TO_DOCUMENT) {
            switch (data.key) {
                case NoticeKey.GLOBAL_SWITCH:
                    globalSwitch = data.value;
                    lib.setGlobalSwitch(globalSwitch)
                    break;
                case NoticeKey.INTERCEPT_LIST:
                    lib.update(data.value)
                    break;
            }
        }
    },
    false
);