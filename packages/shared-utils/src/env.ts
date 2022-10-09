
export const useAction = typeof chrome !== "undefined" && typeof chrome.action !== "undefined";

export const useRuntime = typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined";

export const useStorage = typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined'
