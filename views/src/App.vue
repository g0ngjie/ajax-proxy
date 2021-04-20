<template>
  <div id="app">
    <div class="global-switch">
      <i class="el-icon-switch-button"></i>
      <el-switch v-model="switchOn" @change="handleSwitch" />
    </div>
    <Response v-if="switchOn" />
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
      chrome.storage &&
        chrome.storage.local.get("globalSwitchOn", (result) => {
          if (result.hasOwnProperty("globalSwitchOn"))
            this.switchOn = result.globalSwitchOn;
        });
    },
  },
  created() {
    this.initData();
  },
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
<style lang="scss" scoped>
.global-switch {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  i {
    font-size: 20px;
    font-weight: bold;
    color: #e84749;
    margin-right: 10px;
  }
}
</style>