declare type Ctx = {
    req: {
        url: string;
        method: string;
    };
    res: {
        status: string;
        customStatus: string;
    };
};
declare type Next = {
    override?: string;
    status?: string | number;
};
export declare function getCtx(url: string, method: string, status: string | number, customStatus: string): Ctx;
export declare function execSetup(ctx: Ctx, funcText: string): Promise<Next>;
export {};
