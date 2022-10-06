import { IGlobalState, IMatchInterceptorContent, IRequestMethod } from "./types";
declare function update<T = boolean>(global_switch_on: T): void;
declare function update<T = IMatchInterceptorContent[]>(matching_content: T): void;
declare function update<T = IGlobalState>(state: T): void;
declare function setGlobalSwitch(bool: boolean): void;
declare const _default: {
    update: typeof update;
    setGlobalSwitch: typeof setGlobalSwitch;
};
export default _default;
export type { IRequestMethod, IMatchInterceptorContent, };
