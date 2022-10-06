import { IMatchInterceptorContent, IMatchRedirectContent } from "./types";
import { Notice } from "@proxy/shared-utils";

// match_url规则匹配
export function maybeMatching(
    url: string,
    match: string,
    type: IMatchInterceptorContent['filter_type'] = "normal"
) {
    let matched = false;
    switch (type) {
        // 普通匹配规则
        case "normal":
            matched = url.includes(match);
            break;
        // 正则匹配规则
        case "regex":
            try {
                url.match(new RegExp(match, "i")) && (matched = true);
            } catch (error) { }
            break;
    }
    return matched;
}

/**
 * 规则过滤
 * 域名判断
 * 规则类型判断
 * 忽略列表判断
 */
// 再根据规则匹配m
export function matchIgnoresAndRule(
    url: string,
    match: string,
    type: IMatchRedirectContent['filter_type'] = "normal",
    ignores: IMatchRedirectContent['ignores']
) {
    let matched = false;
    // 先判断是否白名单过滤
    const findOne = ignores?.find((target) => url.includes(target));
    // 白名单过滤掉
    if (findOne) return matched;
    matched = maybeMatching(url, match, type);
    return matched;
}

function isURLObject(x: unknown): x is URL {
    return x &&
        (x as any).hasOwnProperty('host') &&
        (x as any).hasOwnProperty('hash')
}

/**格式化URL 返回 string */
export function fmtURLToString(url: string | URL) {
    if (isURLObject(url)) return url.toString()
    else return url
}

/**获取重定向URL */
export function finalRedirectUrl(
    url: string,
    match: string,
    redirect_url: string,
    type: IMatchRedirectContent['filter_type'] = "normal"
) {
    let finalUrl = url;
    switch (type) {
        // 普通替换
        case "normal":
            finalUrl = url.replace(match, redirect_url);
            break;
        // 正则替换
        case "regex":
            finalUrl = url.replace(new RegExp(match, "i"), redirect_url);
            break;
    }
    return finalUrl;
}

// 通知到 content 命中统计
export function notice(url: string, match_url: string, method: string) {
    window.dispatchEvent(
        new CustomEvent(Notice.TO_CONTENT, {
            detail: {
                value: {
                    url, match_url, method
                }
            },
        })
    );
}

export const warn = (...args: any[]) => console.warn(...args)