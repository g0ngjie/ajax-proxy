

enum Color {
    BLACK = "#1f1f1f",
    GRAY = "#434343",
    GREEN = "#5b8c00",
    ORANGE = "#fa8c16",
    RED = "#ff4d4f",
    WHITE = "#fafafa",
    BLUE = '#1475b2',
    /** log green */
    LIME = '#42c02e',
}

interface Log {
    title: string,
    content: string,
    backgroundColor: string,
}

function log(e: Log): void {
    const args: string[] = ["%c ".concat(e.title, " %c ").concat(e.content, " "), "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat("#606060", ";"), "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(e.backgroundColor, ";")];
    console.log(...args)
}

/**
 * 声明
 */
export function printDeclare() {
    log({ title: 'Colibri', content: `Ajax Proxy v2`, backgroundColor: Color.BLUE })
}