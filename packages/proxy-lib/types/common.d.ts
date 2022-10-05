import { IFilterType } from "./types";
export declare function maybeMatching(url: string, match: string, type?: IFilterType): boolean;
export declare function notice(url: string, match_url: string, method: string): void;
export declare const warn: (...args: any[]) => void;
