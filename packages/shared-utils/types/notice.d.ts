import { NoticeKey } from "./consts";
/**
 * 通知 content -> document
 */
export declare function noticeDocumentByContent(key: NoticeKey, value: any): void;
/**
 * 通知 content -> service-worker
 * @param key
 * @param value
 */
export declare function noticeServiceWorkerByContent(key: NoticeKey | string, value: any): void;
/**
 * 通知 panels -> service-worker
 */
export declare function noticeServiceWorkerByPanels(key: any, value: any): void;
