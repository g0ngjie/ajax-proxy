import { finalRedirectUrl, matchIgnoresAndRule, maybeMatching, notice } from "./common";
import { IGlobalState } from "./types";

// 共享状态
let globalState: IGlobalState
const OriginFetch = window.fetch.bind(window)
// 初始化共享状态
export const initFetchState = (state: IGlobalState) => globalState = state

export default function CustomFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    let fetchMethod: string | undefined | "ANY" = "ANY"
    if (init) {
        fetchMethod = init.method?.toUpperCase() || "ANY"
    }
    return OriginFetch(input, init).then((response: Response) => {
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
                if (method && ![fetchMethod, "ANY"].includes(method.toUpperCase())) break
                if (matchIgnoresAndRule(input.toString(), domain, filter_type, ignores)) {
                    input = finalRedirectUrl(input.toString(), domain, redirect_url, filter_type)

                    if (init) {
                        for (let j = 0; j < headers.length; j++) {
                            const { key, value } = headers[j];
                            if (init?.headers && key in init?.headers) {
                                const newHeaders = new Headers(init.headers)
                                newHeaders.append(key, value)
                                init.headers = newHeaders
                            }
                        }
                    }
                    // 值取当前命中的第一个，后续再命中的忽略
                    break;
                }
            }
        }
        return response
    });
}
