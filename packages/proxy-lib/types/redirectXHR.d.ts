import { IGlobalState } from "./types";
export declare const initRedirectXHRState: (state: IGlobalState) => IGlobalState;
export default class CustomRedirectXHR extends XMLHttpRequest {
    method: string;
    constructor();
    private watchAndRedirect;
}
