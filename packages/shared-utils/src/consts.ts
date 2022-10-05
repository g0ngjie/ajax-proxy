/**storage enums */
export enum StorageKey {
  LANGUAGE = 'colibri:storage:language',
  /**主题 */
  THEME = 'colibri:storage:theme',
  /**全局开关 */
  GLOBAL_SWITCH = 'colibri:storage:global-switch',
  /**拦截列表 */
  INTERCEPT_LIST = 'colibri:storage:intercept-list',
  /**终端声明 */
  TERMINAL_DECLARE = 'colibri:storage:terminal-declare',
}

/**通知 */
export enum Notice {
  /**唯一通知类型 */
  TYPE = 'colibri:notice:type',
  /**通知 content */
  TO_CONTENT = 'colibri:notice:content',
  /**通知 popup */
  TO_POPUP = 'colibri:notice:popup',
  /**通知 document */
  TO_DOCUMENT = 'colibri:notice:document',
  /**通知 background */
  TO_BACKGROUND = 'colibri:notice:background',
}

/**通知Key */
export enum NoticeKey {
  /**全局开关 */
  GLOBAL_SWITCH = 'colibri:notice:global-switch',
  /**拦截数据列表 */
  INTERCEPT_LIST = 'colibri:notice:intercept-list',
  /**徽章状态 */
  BADGE_STATUS = 'colibri:notice:badge-status',
  /**命中率 */
  HIT_RATE = 'colibri:notice:hit-rate',
  /**修复代理 */
  FIX_PROXY = 'colibri:notice:fix-proxy',
}

/**主题 */
export const Theme = {
  /**黑色 */
  DARK: "dark",
  /**白色 */
  LIGHT: "light"
}