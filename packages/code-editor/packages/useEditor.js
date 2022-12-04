import ace from "ace-builds";
import "ace-builds/webpack-resolver"; // 在 webpack 环境中使用必须要导入
// 根据自己的需求按需引入
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai"; // 主题
import "ace-builds/src-noconflict/mode-javascript"; // 语言模式
import "ace-builds/src-noconflict/snippets/javascript"; //代码提示

// https://ace.c9.io/#nav=howto
// 初始化
export function useInit(container) {
    // 初始化
    const target = ace.edit(container, {
        maxLines: 20, // 最大行数，超过会自动出现滚动条
        minLines: 20, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 14, // 编辑器内字体大小
        theme: "ace/theme/monokai", // 主题
        mode: "ace/mode/javascript", // 默认设置的语言模式
        tabSize: 4, // 制表符设置为 4 个空格大小
    });
    target.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
    });

    // TODO: 自定义提示
    // customCompletions(target)

    return target;
}

// 自定义提示
function customCompletions(target) {
    target.completers.push({
        getCompletions: function (state, session, pos, prefix, callback) {
            if (prefix.length === 0) {
                callback(null, []);
                return;
            }
            callback(null, [
                { meta: 'todo', caption: 'AND', value: 'AND', score: 1 },
            ]);
        },
    });
}

// 默认内容
export function getDefaultContent() {
    const defaultContent =
        `
function setup(req, res, next) {
    // ...todo
    // type next = { override?: string, status?: string | number }
    // override === "" // use default override
    // status === ""   // use default customStatusCode
    next({ override: "", status: "" });
}
`
    return defaultContent
}
