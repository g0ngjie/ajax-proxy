
import { setStorage, getStorage, getRealStorage, StorageKey, getStorageAll } from "@proxy/shared-utils";

/**获取所有 */
export function getStoreAll() {
  const getData = getStorageAll()
  const { LANGUAGE, GLOBAL_SWITCH, INTERCEPT_LIST, REDIRECT_LIST, MODE, TAGS } = StorageKey
  return {
    ok: true,
    data: {
      language: getData[LANGUAGE],
      globalSwitch: getData[GLOBAL_SWITCH],
      interceptors: getData[INTERCEPT_LIST],
      redirectors: getData[REDIRECT_LIST],
      mode: getData[MODE],
      tags: getData[TAGS]
    }
  }
}

/**多语言设置 */
export const useLang = {
  get() {
    return getStorage(StorageKey.LANGUAGE, 'en')
  },
  set(value) {
    setStorage(StorageKey.LANGUAGE, value)
  }
}

/**同步全局开关 */
export const useGLobalSwitch = {
  get() {
    return getStorage(StorageKey.GLOBAL_SWITCH, false)
  },
  set(value) {
    setStorage(StorageKey.GLOBAL_SWITCH, value)
  }
}

/**拦截路由列表 */
export const useInterceptorRoutes = {
  getReal() {
    return getRealStorage(StorageKey.INTERCEPT_LIST, [])
  },
  get() {
    return getStorage(StorageKey.INTERCEPT_LIST, [])
  },
  set(value) {
    setStorage(StorageKey.INTERCEPT_LIST, value)
  }
}

/**Tag列表 */
export const useTags = {
  get() {
    return getStorage(StorageKey.TAGS, [])
  },
  set(value) {
    setStorage(StorageKey.TAGS, value)
  }
}

/**模式状态 */
export const useMode = {
  get() {
    return getStorage(StorageKey.MODE, "interceptor")
  },
  set(value) {
    setStorage(StorageKey.MODE, value)
  }
}

/**重定向列表 */
export const useRedirects = {
  get() {
    return getStorage(StorageKey.REDIRECT_LIST, [])
  },
  set(value) {
    setStorage(StorageKey.REDIRECT_LIST, value)
  }
}
