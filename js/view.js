// 创建自定义面板，同一个插件可以创建多个自定义面板
// 几个参数依次为：panel标题、图标（其实设置了也没地方显示）、要加载的页面、加载成功后的回调
chrome.devtools.panels.create('AjaxProxy', 'images/128.png', 'page/index.html', function (panel) {
	console.log('自定义面板创建成功！'); // 注意这个log一般看不到
});
