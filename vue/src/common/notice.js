// 通知

import { NoticeKey } from "./enum";

// 发送给background.js
function noticeMsg(key, value) {
  if (chrome.runtime) {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: "__ajax_proxy",
      to: "background",
      key,
      value,
    });
  }
}

/**全局开关 */
export function noticeSwitchOn(value) {
  noticeMsg(NoticeKey.SWITCH, value);
}

/**同步路由列表 */
export function noticeRoutes(routes) {
  noticeMsg(NoticeKey.ROUTES, routes);
}

/**通知一下命中率 */
export function noticeBadge() {
  noticeMsg(NoticeKey.BADGE, null);
}

/**同步给core 模式 */
export function noticeMode(value) {
  noticeMsg(NoticeKey.MODE, value);
}

/**同步给cord 重定向列表 */
export function noticeRedirects(value) {
  noticeMsg(NoticeKey.REDIRECT, value);
}
