import { finalRedirectUrl, fmtURLToString, matchIgnoresAndRule } from "./common";
import { IGlobalState } from "./types";

// 状态
let globalState: IGlobalState

export default class CustomRedirectXHR extends XMLHttpRequest {

    // 请求协议
    method = 'ANY'

    constructor() {
        super();
        this.watchAndRedirect()
    }

    private watchAndRedirect() {
        const { open } = this
        const origin_XHR_open = open
        const origin_XHR_setRequestHeader = this.setRequestHeader
        this.open = (method: string,
            url: string | URL,
            async?: boolean,
            username?: string | null,
            password?: string | null,
        ) => {
            this.method = (method || "ANY").toUpperCase()
            for (let i = 0; i < globalState.redirector_matching_content.length; i++) {
                const {
                    switch_on = true,
                    domain = "",
                    method = "ANY",
                    filter_type,
                    redirect_url = "",
                    headers = [],
                    ignores = [],
                } = globalState.redirector_matching_content[i];
                if (switch_on) {
                    // 判断是否存在协议匹配
                    if (method && ![this.method, "ANY"].includes(method.toUpperCase())) return
                    // 规则判断
                    const currentUrl = fmtURLToString(url)
                    if (matchIgnoresAndRule(currentUrl, domain, filter_type, ignores)) {
                        url = finalRedirectUrl(currentUrl, domain, redirect_url, filter_type)

                        this.setRequestHeader = (name: string, value: string) => {
                            for (let k = 0; k < headers.length; k++) {
                                const header = headers[k];
                                // 如果匹配则修改
                                if (header.key === name) value = header.value
                                origin_XHR_setRequestHeader.apply(this, [name, value])
                            }
                        }
                        // 值取当前命中的第一个，后续再命中的忽略
                        break;
                    }

                }
            }
            origin_XHR_open.apply(this, [method, url, async !== undefined ? async : true, username, password])
        }
    }
}