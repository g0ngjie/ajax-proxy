<template>
  <div class="app-container">
    <div class="global-switch">
      <section>
        <i class="el-icon-switch-button"></i>
        <el-switch v-model="switchOn" @change="handleSwitch" />
      </section>
      <section>
        <section v-if="switchOn">
          <!-- 备份 -->
          <el-button
            style="margin-right: 10px"
            type="info"
            round
            plain
            @click="handleDownload"
            >{{ $t("toolbar.backup") }}</el-button
          >
          <!-- 数据恢复 -->
          <el-upload
            action
            :auto-upload="false"
            :on-change="handleUpload"
            :show-file-list="false"
            style="margin-right: 20px"
          >
            <el-button type="info" round>{{ $t("toolbar.restore") }}</el-button>
          </el-upload>
          <!-- 模式选择 -->
          <el-radio-group
            style="margin-right: 10px"
            v-model="currentMode"
            @change="handleModeChange"
          >
            <el-radio-button label="interceptor">{{
              $t("document.interceptor")
            }}</el-radio-button>
            <el-radio-button label="redirector">{{
              $t("document.redirector")
            }}</el-radio-button>
          </el-radio-group>
          <!-- 国际化 -->
          <el-radio-group v-model="language" @change="handleLangChange">
            <el-radio-button label="en">En</el-radio-button>
            <el-radio-button label="zh">汉</el-radio-button>
          </el-radio-group>
        </section>
      </section>
    </div>
    <transition name="fade" mode="out-in">
      <section v-if="switchOn">
        <transition name="fade" mode="out-in">
          <IntercepTable v-if="currentMode === 'interceptor'" ref="table" />
          <RedirecTable v-else ref="redirecTable" />
        </transition>
      </section>
      <div v-else class="closed-container">
        <i class="el-icon-close-notification"></i>
      </div>
    </transition>
  </div>
</template>
<script>
import IntercepTable from "./interceptor/table";
import RedirecTable from "./redirector/table";
import {
  getLang,
  setLang,
  setGlobalSwitchOn,
  getGlobalSwitchOn,
  getRoutes,
  setRoutes,
  getStoreAll,
  setTags,
  setMode,
  getMode,
  setRedirects,
} from "@/common/store";
import { noticeSwitchOn, noticeMode } from "@/common/notice";
import { confirmFunc, promptFunc } from "@/common";
import { typeIs } from "@alrale/common-lib";
import { simpleDownload } from "@alrale/downloads";
export default {
  components: {
    IntercepTable,
    RedirecTable,
  },
  data() {
    return {
      switchOn: false,
      language: "",
      currentMode: "",
    };
  },
  methods: {
    // 下载
    async handleDownload() {
      const { ok, data } = await getStoreAll();
      // 数据异常
      if (!ok) return this.$message.warning(this.$t("toolbar.data_err"));
      const { ok: isOk, data: value } = await promptFunc({
        // 备份
        title: this.$t("toolbar.backup"),
        inputValue: "backup",
      });
      if (!isOk) return;
      const { lang, proxy_routes, tags, mode, redirect } = data || {};
      if (proxy_routes?.length === 0)
        // 没有数据可以下载
        return this.$message.warning(this.$t("toolbar.no_down_data"));
      simpleDownload(
        JSON.stringify(
          { lang, proxy_routes, tags, mode, redirect },
          null,
          "\t"
        ),
        `${value}.json`
      );
    },
    // 上传
    handleUpload(file) {
      let reader = new FileReader();
      const {
        // 上传成功原文件会被覆盖
        override_data,
        // 读取异常，文件可能不是一个JSON
        read_err,
      } = this.$t("toolbar");
      reader.onload = async (e) => {
        try {
          let _json = JSON.parse(e.target.result);
          const routes = await getRoutes();
          if (!_json) return;
          if (routes.length > 0) {
            // 如果存在
            const { ok } = await confirmFunc({
              message: override_data,
            });
            if (ok) this.setStoreData(_json);
          } else this.setStoreData(_json);
        } catch (err) {
          this.$message.error(read_err);
        }
      };
      reader.readAsText(file.raw);
    },
    setStoreData({ lang, proxy_routes, tags, mode, redirect }) {
      const {
        // 你导入了一个空列表
        import_empty,
      } = this.$t("toolbar");
      // 设置拦截列表
      if (typeIs(proxy_routes) === "array" && proxy_routes.length > 0) {
        setRoutes(proxy_routes);
        this.$refs.table?.initList();
      } else this.$message.warning(import_empty);
      // 设置标签列表
      if (typeIs(tags) === "array" && tags.length > 0) {
        setTags(tags);
        this.$refs.table?.initTags();
      }
      // 设置语言
      if (lang) {
        setLang(lang);
        this.initData();
      }
      // 设置当前模式
      if (mode) {
        setMode(mode);
        this.currentMode;
      }
      // 设置重定向列表
      if (typeIs(redirect) === "array" && redirect.length > 0) {
        setRedirects(redirect);
        this.$refs.redirecTable?.initList();
      }
    },
    // 国际化
    handleLangChange(name) {
      this.$i18n.locale = name;
      setLang(name);
    },
    // 代理模式
    handleModeChange(name) {
      noticeMode(name);
      setMode(name);
    },
    handleSwitch(bool) {
      // 同步
      noticeSwitchOn(bool);
      // 数据处理
      setGlobalSwitchOn(bool);
    },
    async initData() {
      // 获取 开关状态
      this.switchOn = await getGlobalSwitchOn();
      // 初始化国际化
      const lang = await getLang();
      this.language = lang;
      this.$i18n.locale = lang;
      this.currentMode = await getMode();
    },
  },
  created() {
    this.initData();
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  // 过渡动画
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .global-switch {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    section {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        font-weight: bold;
        color: #e84749;
        margin-right: 10px;
      }
    }
  }
  .closed-container {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 50px;
      color: #666;
    }
  }
}
</style>
