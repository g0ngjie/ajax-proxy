
import { setStorage, getStorage, StorageKey, getStorageAll } from "@proxy/shared-utils";

/**获取所有 */
export function getStoreAll() {
  const getData = getStorageAll()
  // FIXME: 后期再调整
  // 此处这么写，是为了兼容老数据
  // 后期可以优化，不做向下兼容。
  // 因为本来插件只是协助手段，并不会存在大量的需要操作接口的列表
  const { LANGUAGE, GLOBAL_SWITCH, INTERCEPT_LIST, REDIRECT_LIST, MODE, TAGS } = StorageKey

  return {
    ok: true,
    data: {
      lang: getData[LANGUAGE],
      globalSwitchOn: getData[GLOBAL_SWITCH],
      proxy_routes: getData[INTERCEPT_LIST],
      redirect: getData[REDIRECT_LIST],
      mode: getData[MODE],
      tags: getData[TAGS]
    }
  }
}

/**获取国际化 */
export function getLang() {
  return getStorage(StorageKey.LANGUAGE, 'en')
}

/**设置国际化 */
export function setLang(v) {
  setStorage(StorageKey.LANGUAGE, v)
}

/**同步全局开关 */
export function setGlobalSwitchOn(value) {
  setStorage(StorageKey.GLOBAL_SWITCH, value)
}

/**获取全局开关状态 */
export function getGlobalSwitchOn() {
  return getStorage(StorageKey.GLOBAL_SWITCH, false)
}

/**保存拦截路由列表 */
export function setInterceptorRoutes(value) {
  setStorage(StorageKey.INTERCEPT_LIST, value)
}

/**获取路由列表 */
export function getInterceptorRoutes() {
  return getStorage(StorageKey.INTERCEPT_LIST, [])
}

/**保存Tag列表 */
export function setTags(value) {
  setStorage(StorageKey.TAGS, value)
}

/**获取Tag列表 */
export function getTags() {
  return getStorage(StorageKey.TAGS, [])
}

/**同步模式状态 */
export function setMode(value) {
  setStorage(StorageKey.MODE, value)
}

/**获取模式 */
export function getMode() {
  return getStorage(StorageKey.MODE, "interceptor")
}

/**同步 重定向列表 */
export function setRedirects(value) {
  setStorage(StorageKey.REDIRECT_LIST, value)
}

/**获取 重定向列表 */
export function getRedirects() {
  return getStorage(StorageKey.REDIRECT_LIST, [])
}
