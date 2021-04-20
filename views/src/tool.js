import { MessageBox } from "element-ui";

/**
 * 确认弹窗
 * @returns
 */
export async function confirmFunc({
    message = "",
    title = "",
    confirmText,
    cancelText,
    type,
}) {
    const res = await MessageBox.confirm(message, title, {
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        type,
    }).catch(() => {
        return {
            ok: false
        };
    });
    return {
        ok: res === "confirm"
    };
}