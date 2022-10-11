import {
    createPanel,
    closePanel,
    fullScreenPanel,
    resizeWindow,
} from "./panel";

// 监听图标点击事件
function onIconClickListener() {
    chrome.action.onClicked.addListener(function (tab) {
        createPanel();
    });
}

/**
 * 监听快捷键
 * 在manifest.json中定义 commands
 */
function onCommandListener() {
    // commands
    chrome.commands.onCommand.addListener(function (command) {
        switch (command) {
            case "open_panel":
                createPanel();
                break;
            case "close_panel":
                closePanel();
                break;
            case "full_screen":
                fullScreenPanel();
                break;
            case "resize_window":
                resizeWindow();
                break;
            default:
                break;
        }
    });
}

/**注册全部监听列表 */
export function injectEventListener() {
    // 监听图标点击事件
    onIconClickListener()
    // 监听快捷键
    onCommandListener()
}