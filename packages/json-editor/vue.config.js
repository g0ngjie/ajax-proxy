
module.exports = {
    publicPath: './',
    runtimeCompiler: true,
    // 修改 src 为 examples
    pages: {
        index: {
            entry: "examples/main.js",
            template: "public/index.html",
            filename: "index.html",
        },
    },
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto"
        });
    },
}