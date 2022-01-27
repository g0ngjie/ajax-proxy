<template>
  <div class="json-editor-container">
    <el-drawer size="60%" :visible.sync="drawer" :with-header="false">
      <vue-json-editor
        v-model="json"
        :expandedOnStart="true"
        mode="form"
        @json-change="onJsonChange"
      ></vue-json-editor>
      <div class="json-editor-drawer__footer">
        <el-button type="primary" style="width: 100px" @click="handleSubmit">{{
          $t("drawer.btn")
        }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>
 
<script>
import vueJsonEditor from "vue-json-editor";

export default {
  components: { vueJsonEditor },
  data() {
    return {
      drawer: false,
      json: {},
      cache: null,
    };
  },
  methods: {
    show(json) {
      this.cache = null;
      this.json = json;
      this.drawer = true;
    },
    onJsonChange(value) {
      this.cache = value;
    },
    handleSubmit() {
      this.$emit("change", this.cache || this.json);
      this.drawer = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.json-editor-container {
  width: 100%;
  height: 100%;
  /*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
  ::v-deep .el-drawer__body {
    overflow: auto;
  }
  /*2.隐藏滚动条，太丑了*/
  // ::v-deep .el-drawer__container ::-webkit-scrollbar {
  //   display: none;
  // }
  ::v-deep .jsoneditor-mode-form {
    border-color: teal !important;
  }
  ::v-deep .jsoneditor-menu {
    background-color: teal !important;
    border-bottom: 1px solid teal !important;
  }
  ::v-deep .json-editor-drawer__footer {
    position: absolute;
    bottom: 10px;
    left: 20px;
  }
}
</style>