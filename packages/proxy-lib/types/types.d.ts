/**请求协议 */
export declare type IRequestMethod = "ANY" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
/**规则 */
export declare type IFilterType = "normal" | "regex";
/**模式 */
export declare type IMode = "interceptor" | "redirector";
/**全局状态结构体 */
export declare type RefGlobalState<T = IGlobalState> = {
    value: T;
};
declare type CommonContent = {
    /**是否需要匹配 */
    switch_on: boolean;
    /**匹配规则 */
    filter_type?: IFilterType;
    /**请求协议 */
    method?: IRequestMethod;
    /**备注 */
    remarks?: string;
};
/**拦截器对象 */
export declare type IMatchInterceptorContent = {
    /**匹配目标URL */
    match_url: string;
    /**需要覆盖的内容 */
    override?: string;
    /**命中率 */
    hit?: number;
    /**标题 */
    label?: string;
    /**状态码 */
    status_code?: string;
} & CommonContent;
/**重定向头部结构体 */
export declare type IRedirectHeader = {
    key: string;
    value: string;
    description?: string;
};
/**重定向对象结构体 */
export declare type IMatchRedirectContent = {
    /**域名 */
    domain: string;
    /**重定向地址 */
    redirect_url: string;
    /**请求头 */
    headers?: IRedirectHeader[];
    /**忽略名单 */
    ignores?: string[];
} & CommonContent;
export declare type IGlobalState = {
    /**全局开关 */
    global_on: boolean;
    /**模式 */
    mode: IMode;
    /**拦截规则列表 */
    interceptor_matching_content: IMatchInterceptorContent[];
    /**重定向规则列表 */
    redirector_matching_content: IMatchRedirectContent[];
};
export {};
