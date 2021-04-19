<template>
  <div id="app">
    <el-switch v-model="switchOn" @change="handleSwitch" />
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