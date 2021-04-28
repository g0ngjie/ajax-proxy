// 全局配置
const __globalSetting = {
  // 总开关
  globalSwitchOn: false,
  // 二选一 response | request
  mode: "interceptor",
};

const __ajax_global_setting = {
  // 请求拦截
  proxy_routes: [],
  originalXHR: window.XMLHttpRequest,
  myXHR: function () {
    let pageScriptEventDispatched = false;
    const modifyResponse = () => {
      __ajax_global_setting.proxy_routes.forEach(
        ({ switchOn = true, match, override = "" }) => {
          let matched = false;
          // 是否需要匹配
          if (switchOn && match)
            // 判断是否匹配到
            matched = this.responseURL.includes(match);
          if (matched) {
            this.responseText = override;
            this.response = override;

            if (!pageScriptEventDispatched) {
              // 通知到 content 命中统计
              window.dispatchEvent(
                new CustomEvent("core_notice", {
                  detail: { url: this.responseURL, match },
                })
              );
              pageScriptEventDispatched = true;
            }
          }
        }
      );
    };

    const xhr = new __ajax_global_setting.originalXHR();
    for (let attr in xhr) {
      if (attr === "onreadystatechange") {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState == 4) {
            // 请求成功
            if (__globalSetting.globalSwitchOn) {
              // 开启拦截
              modifyResponse();
            }
          }
          this.onreadystatechange && this.onreadystatechange.apply(this, args);
        };
        continue;
      } else if (attr === "onload") {
        xhr.onload = (...args) => {
          // 请求成功
          if (__globalSetting.globalSwitchOn) {
            // 开启拦截
            modifyResponse();
          }
          this.onload && this.onload.apply(this, args);
        };
        continue;
      }

      if (typeof xhr[attr] === "function") {
        this[attr] = xhr[attr].bind(xhr);
      } else {
        // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
        if (attr === "responseText" || attr === "response") {
          Object.defineProperty(this, attr, {
            get: () =>
              this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
            set: (val) => (this[`_${attr}`] = val),
            enumerable: true,
          });
        } else {
          Object.defineProperty(this, attr, {
            get: () => xhr[attr],
            set: (val) => (xhr[attr] = val),
            enumerable: true,
          });
        }
      }
    }
  },

  originalFetch: window.fetch.bind(window),
  myFetch: function (...args) {
    return __ajax_global_setting.originalFetch(...args).then((response) => {
      let txt = undefined;
      __ajax_global_setting.proxy_routes.forEach(
        ({ switchOn = true, match, override = "" }) => {
          let matched = false;
          // 是否需要匹配
          if (switchOn && match)
            // 判断是否匹配到
            matched = response.url.includes(match);
          if (matched) {
            // 通知到 content 命中统计
            window.dispatchEvent(
              new CustomEvent("core_notice", {
                detail: { url: response.url, match },
              })
            );
            txt = override;
          }
        }
      );

      if (txt !== undefined) {
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(txt));
            controller.close();
          },
        });
        const newResponse = new Response(stream, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
        const proxy = new Proxy(newResponse, {
          get: function (target, name) {
            switch (name) {
              case "ok":
              case "redirected":
              case "type":
              case "url":
              case "useFinalURL":
              case "body":
              case "bodyUsed":
                return response[name];
            }
            return target[name];
          },
        });

        for (let key in proxy) {
          if (typeof proxy[key] === "function") {
            proxy[key] = proxy[key].bind(newResponse);
          }
        }
        return proxy;
      } else {
        return response;
      }
    });
  },
};

// 重定向 配置
const __redirectSetting = {
  rules: [],
};

function _xhrRedirect(xhr) {
  const oldXHROpen = xhr.prototype.open;
  const oldXHRSetHeader = xhr.prototype.setRequestHeader;
  if (__globalSetting.globalSwitchOn) {
    for (let i = 0; i < __redirectSetting.rules.length; i++) {
      const {
        switchOn = true,
        domain = "",
        redirect = "",
        headers = [],
      } = __redirectSetting.rules[i];
      if (switchOn) {
        window.XMLHttpRequest.prototype.open = function (_, url) {
          if (url.startsWith(domain)) {
            const [, router] = url.split(domain);
            url = url.replace(domain, redirect) + router;

            this.setRequestHeader = function (header, value) {
              for (let j = 0; j < headers.length; j++) {
                const _header = headers[j];
                if (_header.key === header) value = _header.value;
              }
              oldXHRSetHeader.apply(this, arguments);
            };
          }
          return oldXHROpen.apply(this, arguments);
        };
      }
    }
  }
}

window.addEventListener(
  "message",
  function (event) {
    const data = event.data;
    if (data.type === "__ajax_proxy" && data.to === "core") {
      switch (data.key) {
        case "globalSwitchOn":
          __globalSetting.globalSwitchOn = data.value;
          break;
        case "proxy_routes":
          __ajax_global_setting.proxy_routes = data.value;
          break;
        case "mode":
          __globalSetting.mode = data.value;
          break;
        case "redirect":
          __redirectSetting.rules = data.value;
          break;
        default:
          break;
      }
    }
    if (__globalSetting.globalSwitchOn) {
      // 判断 响应拦截 or 请求重定向 redirect
      if (__globalSetting.mode === "interceptor") {
        window.XMLHttpRequest = __ajax_global_setting.myXHR;
        window.fetch = __ajax_global_setting.myFetch;
      } else {
        // 请求重定向
        _xhrRedirect(window.XMLHttpRequest);
      }
    } else {
      window.XMLHttpRequest = __ajax_global_setting.originalXHR;
      window.fetch = __ajax_global_setting.originalFetch;
    }
  },
  false
);
