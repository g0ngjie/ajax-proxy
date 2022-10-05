// 通知

import { noticeServiceWorkerByPanels, NoticeKey } from "@proxy/shared-utils";

/**全局开关 */
export function noticeSwitchOn(value) {
  noticeServiceWorkerByPanels(NoticeKey.GLOBAL_SWITCH, value)
}

/**同步拦截路由列表 */
export function noticeInterceptorRoutes(routes) {
  noticeServiceWorkerByPanels(NoticeKey.INTERCEPT_LIST, routes)
}

/**通知一下命中率 */
export function noticeBadge() {
  noticeServiceWorkerByPanels(NoticeKey.BADGE_STATUS, null)
}

/**同步给core 模式 */
export function noticeMode(value) {
  noticeServiceWorkerByPanels(NoticeKey.MODE, value)
}

/**同步给cord 重定向列表 */
export function noticeRedirects(value) {
  noticeServiceWorkerByPanels(NoticeKey.REDIRECT_LIST, value)
}

/**获取当前title */
export function noticeGetCurrentTitle() {
  noticeServiceWorkerByPanels(NoticeKey.GET_CURRENT_TITLE)
}