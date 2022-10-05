// console.log("Colibri document.js");

import lib from "@colibri/lib.v2";
import { Notice, NoticeKey } from "@colibri/shared-utils";

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
                case NoticeKey.FIX_PROXY:
                    lib.fixProxy()
            }
        }
    },
    false
);