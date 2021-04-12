<template>
  <div id="app">
    <el-tabs v-model="currentTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="请求拦截" name="request"> <Request /> </el-tab-pane>
      <el-tab-pane label="相应拦截" name="response"> <Response /></el-tab-pane>
      <el-tab-pane label="全局抓取" name="global"> <GlobalTemp /> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Request from "./page/request/index";
import Response from "./page/response/index";
import GlobalTemp from "./page/global/index";
export default {
  components: {
    Request,
    Response,
    GlobalTemp,
  },
  data() {
    return {
      currentTab: "request",
    };
  },
  methods: {
    handleClick({ name }) {
      console.log("[debug]name:", name);
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