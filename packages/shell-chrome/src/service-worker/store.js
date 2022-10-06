
// 这里面不需要初始化initStorage
// 因为shared-utils 里，env 有判断window，会导致报错
// 解决service-worker里不存在 window的问题
// 同步数据
export function setStore(k, v) {
    chrome.storage.local.set({ [k]: v });
}

// 获取数据
export function getStore(key, defaultValue = null) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, (result) => {
            if (result.hasOwnProperty(key)) resolve(result[key]);
            else resolve(defaultValue);
        });
    });
}