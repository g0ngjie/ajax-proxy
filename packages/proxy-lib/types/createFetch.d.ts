import { IGlobalState } from "./types";
export declare const OriginFetch: ((input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) & typeof fetch;
export declare const initFetchState: (state: IGlobalState) => IGlobalState;
declare function CustomFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
export default CustomFetch;
