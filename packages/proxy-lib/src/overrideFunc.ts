

const errLog = function (...args: any[]) {
    console.log("%c[AjaxProxy][error]: ", "color: #ff4d4f", ...args)
}

type Ctx = {
    req: {
        url: string
        method: string
    }
    res: {
        status: string
        customStatus: string
    }
}

type Next = {
    override?: string
    status?: string | number
}

function isNext(x: any): x is Next {
    return !!x && (x.override || x.status)
}

export function getCtx(
    url: string,
    method: string,
    status: string | number,
    customStatus: string
): Ctx {
    return {
        req: { url, method },
        res: { status: status.toString(), customStatus },
    }
}

export function execSetup(ctx: Ctx, funcText: string): Promise<Next> {
    return new Promise(resolve => {
        try {
            let override = ""
            const source = ';(' + funcText + ')'
            const execFunc = window.eval(source)
            const type = typeof execFunc
            if (type === "function") {
                if (!funcText.includes('next({')) {
                    errLog("The structure of 'next' is incorrect [code 1]")
                    return resolve({ override: "", status: ctx.res.customStatus })
                }
                override = execFunc(ctx.req, ctx.res, (next: Next) => {
                    if (isNext(next)) {
                        // 默认status
                        if (!next.status) next.status = ctx.res.customStatus
                        // 默认响应值
                        if (!next.override) next.override = ""
                        return resolve(next)
                    }
                    errLog("The structure of 'next' is incorrect [code 2]")
                    resolve({ override: "", status: ctx.res.customStatus })
                })
            } else {
                errLog("Please enter a correct 'function' [code 3]")
                resolve({ override: "", status: ctx.res.customStatus })
            }
            return override
        } catch (error) {
            errLog(error)
            resolve({ override: "", status: ctx.res.customStatus })
        }
    })
}