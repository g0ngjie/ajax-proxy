<template>
  <div id="app">
    <el-switch v-model="switchOn" @change="handleSwitch" />
    <Response v-if="switchOn" :routes="proxy_routes" />
  </div>
</template>
<script>
import Response from "./page/response/index";
export default {
  components: {
    Response,
  },
  data() {
    return {
      switchOn: false,
      proxy_routes: [],
    };
  },
  methods: {
    handleSwitch(bool) {
      // 发送给background.js
      chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "__ajax_proxy",
        to: "background",
        key: "globalSwitchOn",
        value: bool,
      });
      chrome.storage && chrome.storage.local.set({ globalSwitchOn: bool });
    },
    initData() {
      chrome.storage && chrome.storage.local.get(["globalSwitchOn", "proxy_routes"], (result) => {
        if (result.hasOwnProperty("globalSwitchOn"))
          this.switchOn = result.globalSwitchOn;
        if (result.proxy_routes) this.proxy_routes = result.proxy_routes;
      });
    },
  },
  created() {},
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>