import { target } from './env'

// chrome.storage.sync.set 大于8,192字节的数据时，会报错 -> QUOTA_BYTES_PER_ITEM quota exceeded
// chrome.storage.local.set可以包含5242880
const useStorage = typeof target.chrome !== 'undefined' && typeof target.chrome.storage !== 'undefined'

let storageData

export function initStorage(): Promise<void> {
  return new Promise((resolve) => {
    if (useStorage) {
      target.chrome.storage.local.get(null, result => {
        storageData = result
        resolve()
      })
    } else {
      storageData = {}
      resolve()
    }
  })
}

export function getStorage(key: string, defaultValue: any = null) {
  checkStorage()
  if (useStorage) {
    return getDefaultValue(storageData[key], defaultValue)
  } else {
    try {
      return getDefaultValue(JSON.parse(localStorage.getItem(key) as any), defaultValue)
    } catch (e) { }
  }
}

/**不走缓存获取数据 */
export function getRealStorage(key: string, defaultValue: any = null) {
  if (useStorage) {
    return new Promise(resolve => {
      target.chrome.storage.local.get(key, result => {
        if (result.hasOwnProperty(key)) resolve(getDefaultValue(result[key], defaultValue))
        else resolve(defaultValue);
      })
    })
  } else {
    try {
      const result = getDefaultValue(JSON.parse(localStorage.getItem(key) as any), defaultValue)
      return Promise.resolve(result)
    } catch (e) { }
  }
}

export function setStorage(key: string, val: any) {
  checkStorage()
  if (useStorage) {
    storageData[key] = val
    target.chrome.storage.local.set({ [key]: val })
  } else {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) { }
  }
}

export function removeStorage(key: string) {
  checkStorage()
  if (useStorage) {
    delete storageData[key]
    target.chrome.storage.local.remove([key])
  } else {
    try {
      localStorage.removeItem(key)
    } catch (e) { }
  }
}

export function clearStorage() {
  checkStorage()
  if (useStorage) {
    storageData = {}
    target.chrome.storage.local.clear()
  } else {
    try {
      localStorage.clear()
    } catch (e) { }
  }
}

function checkStorage() {
  if (!storageData) {
    throw new Error('Storage wasn\'t initialized with \'init()\'')
  }
}

function getDefaultValue(value, defaultValue) {
  if (value == null) {
    return defaultValue
  }
  return value
}

/**获取全部数据 */
export function getStorageAll() {
  checkStorage()
  if (useStorage) {
    return storageData
  } else {
    if (JSON.stringify(localStorage) === '{}') return {}
    const data = Object.keys(localStorage).reduce(function (obj, str) {
      try {
        obj[str] = JSON.parse(localStorage.getItem(str) as any)
      } catch (e) {
        obj[str] = localStorage.getItem(str)
      }
      return obj
    }, {});
    return data
  }
}