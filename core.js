const __ajax_global_setting = {
  // 总开关
  globalSwitchOn: false,
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
            if (__ajax_global_setting.globalSwitchOn) {
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
          if (__ajax_global_setting.globalSwitchOn) {
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

window.addEventListener(
  "message",
  function (event) {
    const data = event.data;
    if (data.type === "__ajax_proxy" && data.to === "core") {
      __ajax_global_setting[data.key] = data.value;
    }
    if (__ajax_global_setting.globalSwitchOn) {
      window.XMLHttpRequest = __ajax_global_setting.myXHR;
      window.fetch = __ajax_global_setting.myFetch;
    } else {
      window.XMLHttpRequest = __ajax_global_setting.originalXHR;
      window.fetch = __ajax_global_setting.originalFetch;
    }
  },
  false
);

const oldXHROpen = window.XMLHttpRequest.prototype.open;
const oldXHRSetHeader = window.XMLHttpRequest.prototype.setRequestHeader;

/**
window.XMLHttpRequest.prototype.open = function (_, url) {
  const startUrl = "https://bt-web-gateway-test.beantechyun.cn";
  if (url.startsWith(startUrl)) {
    const [, router] = url.split(url, startUrl);
    url = url.replace(startUrl, "https://bt-web-gateway-pre.beantechyun.cn");
    // url = 'http://localhost:8090/bux-thirdsystem-api/action/v1/query-by-id'
    const _self = this;
    this.setRequestHeader = function (header, value) {
      console.log("[debug]header1:", header);
      console.log("[debug]value:1", value);
      if (header === "sss") value = 1;
      oldXHRSetHeader.apply(this, arguments);
    };
  } else if (url.startsWith("http://") || url.startsWith("https://")) {
    // do nothing with the url
  } else if (url.startsWith("//")) {
    url = "https:" + url;
  } else if (url.startsWith("/")) {
    url = "https://site2.com" + url;
  } else if (url.startsWith(".")) {
    url = "https://site2.com" + url.replace("./", "/");
  } else {
    url = "https://site2.com" + url;
  }
  return oldXHROpen.apply(this, arguments);
};
 */
