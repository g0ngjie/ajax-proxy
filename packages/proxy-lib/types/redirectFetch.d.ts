import { IGlobalState } from "./types";
export declare const initRedirectFetchState: (state: IGlobalState) => IGlobalState;
export default function CustomFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
