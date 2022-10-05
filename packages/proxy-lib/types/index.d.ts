import { IGlobalState, IMatchContent, IRequestMethod } from "./types";
declare function update<T = boolean>(global_switch_on: T): void;
declare function update<T = IMatchContent[]>(matching_content: T): void;
declare function update<T = IGlobalState>(state: T): void;
declare function setGlobalSwitch(bool: boolean): void;
declare function fixProxy(): void;
declare const _default: {
    update: typeof update;
    setGlobalSwitch: typeof setGlobalSwitch;
    fixProxy: typeof fixProxy;
};
export default _default;
export type { IRequestMethod, IMatchContent, };
