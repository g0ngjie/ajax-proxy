import { IGlobalState } from "./types";
export declare const OriginXHR: {
    new (): XMLHttpRequest;
    prototype: XMLHttpRequest;
    readonly DONE: number;
    readonly HEADERS_RECEIVED: number;
    readonly LOADING: number;
    readonly OPENED: number;
    readonly UNSENT: number;
};
export declare const initInterceptorXHRState: (state: IGlobalState) => IGlobalState;
declare class CustomXHR extends XMLHttpRequest {
    responseText: string;
    response: any;
    status: number;
    statusText: string;
    method: string;
    private message_once_lock;
    constructor();
    private getMethod;
    private maybeNeedModifyRes;
    private overrideAttr;
    private watchAndOverride;
}
export default CustomXHR;
