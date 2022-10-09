export declare function initStorage(): Promise<void>;
export declare function getStorage(key: string, defaultValue?: any): any;
/**不走缓存获取数据 */
export declare function getRealStorage(key: string, defaultValue?: any): Promise<any> | undefined;
export declare function setStorage(key: string, val: any): void;
export declare function removeStorage(key: string): void;
export declare function clearStorage(): void;
/**获取全部数据 */
export declare function getStorageAll(): Promise<{
    [key: string]: any;
}>;
