import { IGlobalState, IMatchInterceptorContent, IMatchRedirectContent, IMode, IRequestMethod } from "./types";
import CreateXHR, { initInterceptorXHRState, OriginXHR } from "./createXHR";
import CreateFetch, { initInterceptorFetchState, OriginFetch } from "./createFetch";
import RedirectXHR, { initRedirectXHRState } from "./redirectXHR";
import RedirectFetch, { initRedirectFetchState } from "./redirectFetch";
import { warn } from "./common";

// 初始化共享状态
let globalState: IGlobalState = {
    // 全局状态开关
    global_on: false,
    // 模式
    mode: 'interceptor',
    // 拦截匹配内容
    interceptor_matching_content: [],
    // 重定向匹配
    redirector_matching_content: []
}

// 初始化状态
function initState() {
    // 初始化共享状态
    initInterceptorXHRState(globalState);
    initInterceptorFetchState(globalState);
    initRedirectXHRState(globalState);
    initRedirectFetchState(globalState);
    // 挂载实例
    // mountInstance(globalState.global_on, globalState.mode);
    // 默认为拦截器模式
    // changeMode();
}

/**切换模式 默认为 拦截器模式 */
function changeMode(mode: IMode = 'interceptor') {
    globalState.mode = mode
}

function mountInstance(bool: boolean = true, mode: IMode) {
    // 每次挂载时，需要预先重置一下引用
    window.XMLHttpRequest = OriginXHR
    window.fetch = OriginFetch
    if (bool) {
        if (mode === 'interceptor') {
            // 挂载拦截器
            window.XMLHttpRequest = CreateXHR
            window.fetch = CreateFetch
        } else if (mode === "redirector") {
            // 挂载重定向
            window.XMLHttpRequest = RedirectXHR
            window.fetch = RedirectFetch
        }
    }
}

function isIGlobalState(x: any): x is IGlobalState {
    return x &&
        x.hasOwnProperty("global_on") &&
        x.hasOwnProperty("mode")
}

function updateGlobalState(target: unknown) {
    if (isIGlobalState(target)) {
        // 替换全部
        globalState = target
        mountInstance(globalState.global_on, globalState.mode)
    } else warn("unknow type")
}

function isMode(x: any): x is IMode {
    return ["interceptor", "redirector"].includes(x)
}

function isArray(x: any): x is any[] {
    return x && Array.isArray(x)
}

function isInterceptors(x: any): x is IMatchInterceptorContent[] {
    if (isArray(x)) {
        for (let i = 0; i < x.length; i++) {
            const target = x[i];
            return target.hasOwnProperty("match_url") && target.hasOwnProperty("switch_on")
        }
    }
    return false
}

function isRedirectors(x: any): x is IMatchRedirectContent[] {
    if (isArray(x)) {
        for (let i = 0; i < x.length; i++) {
            const target = x[i];
            return target.hasOwnProperty("domain") &&
                target.hasOwnProperty("switch_on") &&
                target.hasOwnProperty("redirect_url")
        }
    }
    return false
}

/**全局开关 */
function update<T extends boolean>(global_switch_on: T): void
/**修改模式 */
function update<T extends IMode>(mode: T): void
/**修改拦截器 */
function update<T extends IMatchInterceptorContent[]>(interceptors: T): void
/**修改重定向 */
function update<T extends IMatchRedirectContent[]>(redirectors: T): void
/**修改全部属性 */
function update<T extends IGlobalState>(state: T): void
function update<unknow>(target: unknow) {
    // 全局开关
    if (typeof target === "boolean") setGlobalSwitch(target)
    // 修改模式
    else if (isMode(target)) changeMode(target)
    // 修改拦截器
    else if (isInterceptors(target)) globalState.interceptor_matching_content = target
    // 修改重定向
    else if (isRedirectors(target)) globalState.redirector_matching_content = target
    else updateGlobalState(target)
}

// 全局开关
function setGlobalSwitch(bool: boolean) {
    globalState.global_on = bool
    mountInstance(bool, globalState.mode)
}

initState()
export default {
    update,
    setGlobalSwitch,
}

export type {
    IRequestMethod,
    IMatchInterceptorContent,
    IMatchRedirectContent,
}