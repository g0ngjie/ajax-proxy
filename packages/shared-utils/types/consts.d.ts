/**storage enums */
export declare enum StorageKey {
    LANGUAGE = "ajax-proxy:storage:language",
    /**全局开关 */
    GLOBAL_SWITCH = "ajax-proxy:storage:global-switch",
    /**拦截列表 */
    INTERCEPT_LIST = "ajax-proxy:storage:intercept-list",
    /**重定向列表 */
    REDIRECT_LIST = "ajax-proxy:storage:redirect-list",
    /**模式 */
    MODE = "ajax-proxy:storage:mode",
    /**标签 */
    TAGS = "ajax-proxy:storage:tags"
}
/**通知 */
export declare enum Notice {
    /**唯一通知类型 */
    TYPE = "ajax-proxy:notice:type",
    /**通知 content */
    TO_CONTENT = "ajax-proxy:notice:content",
    /**通知 panels */
    TO_PANELS = "ajax-proxy:notice:panels",
    /**通知 document */
    TO_DOCUMENT = "ajax-proxy:notice:document",
    /**通知 service-worker */
    TO_SERVICE_WORKER = "ajax-proxy:notice:service-worker"
}
/**通知Key */
export declare enum NoticeKey {
    /**全局开关 */
    GLOBAL_SWITCH = "ajax-proxy:notice:global-switch",
    /**拦截数据列表 */
    INTERCEPT_LIST = "ajax-proxy:notice:intercept-list",
    /**重定向列表 */
    REDIRECT_LIST = "ajax-proxy:notice:redirect-list",
    /**获取当前title */
    GET_CURRENT_TITLE = "ajax-proxy:notice:get-current-title",
    /**
     * 首次设置document.title
     * 该枚举只在 content 和 service-worker 中使用
     */
    INIT_CURRENT_TITLE = "ajax-proxy:notice:init-current-title",
    /**徽章状态 */
    BADGE_STATUS = "ajax-proxy:notice:badge-status",
    /**命中率 */
    HIT_RATE = "ajax-proxy:notice:hit-rate",
    /**模式 */
    MODE = "ajax-proxy:notice:mode"
}
