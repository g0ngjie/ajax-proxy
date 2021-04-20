
const __ajax_global_setting = {
    // 总开关
    globalSwitchOn: false,
    // 请求拦截
    proxy_routes: [],
    // 异常拦截
    err_list: [],
    originalXHR: window.XMLHttpRequest,
    myXHR: function () {
        const modifyResponse = () => {
            __ajax_global_setting.proxy_routes.forEach(({ switchOn = true, match, override = '' }) => {
                let matched = false;
                // 是否需要匹配
                if (switchOn && match)
                    // 判断是否匹配到
                    matched = this.responseURL.includes(match);
                if (matched) {
                    this.responseText = override;
                    this.response = override;
                }
            })
        }

        const xhr = new __ajax_global_setting.originalXHR;
        for (let attr in xhr) {
            if (attr === 'onreadystatechange') {
                xhr.onreadystatechange = (...args) => {
                    if (this.readyState == 4) {
                        // 请求成功
                        if (__ajax_global_setting.globalSwitchOn) {
                            // 开启拦截
                            modifyResponse();
                        }
                    }
                    this.onreadystatechange && this.onreadystatechange.apply(this, args);
                }
                continue;
            } else if (attr === 'onload') {
                xhr.onload = (...args) => {
                    // 请求成功
                    if (__ajax_global_setting.globalSwitchOn) {
                        // 开启拦截
                        modifyResponse();
                    }
                    this.onload && this.onload.apply(this, args);
                }
                continue;
            }

            if (typeof xhr[attr] === 'function') {
                this[attr] = xhr[attr].bind(xhr);
            } else {
                // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
                if (attr === 'responseText' || attr === 'response') {
                    Object.defineProperty(this, attr, {
                        get: () => this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
                        set: (val) => this[`_${attr}`] = val,
                        enumerable: true
                    });
                } else {
                    Object.defineProperty(this, attr, {
                        get: () => xhr[attr],
                        set: (val) => xhr[attr] = val,
                        enumerable: true
                    });
                }
            }
        }
    }
}

window.addEventListener("message", function (event) {
    const data = event.data;
    if (data.type === '__ajax_proxy' && data.to === 'core') {
        __ajax_global_setting[data.key] = data.value;
    }
    if (__ajax_global_setting.globalSwitchOn) {
        window.XMLHttpRequest = __ajax_global_setting.myXHR;
    } else {
        window.XMLHttpRequest = __ajax_global_setting.originalXHR;
    }
}, false);
