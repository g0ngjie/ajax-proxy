import { IGlobalState, IMatchInterceptorContent, IRequestMethod } from "./types";
import CreateXHR, { initXHRState, OriginXHR } from "./createXHR";
import CreateFetch, { initFetchState, OriginFetch } from "./createFetch";
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

function initState() {
    // 初始化共享状态
    initXHRState(globalState);
    initFetchState(globalState);
    mountInstance(globalState.global_on)
}

function mountInstance(bool: boolean = true) {
    if (bool) {
        window.XMLHttpRequest = CreateXHR
        window.fetch = CreateFetch
    } else {
        window.XMLHttpRequest = OriginXHR
        window.fetch = OriginFetch
    }
}

function isIGlobalState(target: any) {
    return target.hasOwnProperty("global_on") && target.hasOwnProperty("matching_content")
}

function updateGlobalState(target: unknown) {
    if (isIGlobalState(target)) {
        globalState = target as IGlobalState
        mountInstance(globalState.global_on)
    } else warn("unknow type")
}

// 修改共享状态
function update<T = boolean>(global_switch_on: T): void
function update<T = IMatchInterceptorContent[]>(matching_content: T): void
function update<T = IGlobalState>(state: T): void
function update<unknow>(target: unknow) {
    if (typeof target === "boolean") {
        setGlobalSwitch(target)
    } else if (Array.isArray(target)) {
        globalState.interceptor_matching_content = target
    } else updateGlobalState(target)
}

// 全局开关
function setGlobalSwitch(bool: boolean) {
    globalState.global_on = bool
    mountInstance(bool)
}

initState()
export default {
    update,
    setGlobalSwitch,
}

export type {
    IRequestMethod,
    IMatchInterceptorContent,
}