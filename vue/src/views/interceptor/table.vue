<template>
  <div class="response-container">
    <el-button type="primary" @click="handleCreate">{{
      $t("create")
    }}</el-button>
    <section class="tags">
      <Tag @initList="initList" ref="tag" />
    </section>
    <section class="tips">
      <el-alert :title="$t('errTips')" type="error" :closable="false" />
    </section>
    <Modal ref="modal" @putData="putData" @editData="editData" />
    <!-- 搜索栏 -->
    <section>
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('search.match.name')">
          <el-input
            v-model="searchForm.match"
            clearable
            :placeholder="$t('search.match.placeholder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('search.remark.name')">
          <el-input
            v-model="searchForm.remark"
            clearable
            :placeholder="$t('search.remark.placeholder')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">{{
            $t("search.btn.search")
          }}</el-button>
          <el-button @click="handleReset">{{
            $t("search.btn.reset")
          }}</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格 -->
    <el-table :data="tableData" stripe>
      <el-table-column :label="$t('table.columns.switch')" width="100">
        <template slot-scope="{ row }">
          <el-switch v-model="row.switchOn" @change="handleSwitch" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.columns.matchType')" width="100">
        <template slot-scope="{ row }">
          {{ $t("modal.form.filterType")[row.filterType || "normal"] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="match"
        :label="$t('table.columns.match')"
        show-overflow-tooltip
      />
      <el-table-column
        prop="override"
        :label="$t('table.columns.res')"
        show-overflow-tooltip
      />
      <el-table-column
        prop="remark"
        :label="$t('table.columns.remark')"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('table.columns.tag')"
        :formatter="fmtTag"
        show-overflow-tooltip
        width="100"
      />
      <el-table-column
        :label="$t('table.columns.hit')"
        align="center"
        width="100"
      >
        <template slot-scope="{ row }">
          <el-tag
            type="info"
            v-if="row.hit"
            closable
            @close="handleTagClose(row)"
          >
            {{ row.hit }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.columns.options')"
        align="center"
        width="220"
      >
        <template slot-scope="{ row }">
          <!-- 编辑 -->
          <el-button @click="handleEdit(row)" round plain>{{
            $t("table.btn.edit")
          }}</el-button>
          <!-- 删除 -->
          <el-button type="danger" round @click="handleDel(row)" plain>{{
            $t("table.btn.del")
          }}</el-button>
          <!-- 复制 -->
          <el-button type="primary" round @click="handleCopy(row)" plain>{{
            $t("table.btn.copy")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Modal from "./modal";
import { confirmFunc } from "@/common/index";
import { arrayToObject, deepClone, typeIs, uniqueId } from "@alrale/common-lib";
import { getRoutes, getTags, setRoutes } from "@/common/store";
import { noticeRoutes, noticeBadge } from "@/common/notice";
import Tag from "./tag";

export default {
  components: {
    Modal,
    Tag,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      // tag ORM
      tagMapping: {},
    };
  },
  methods: {
    // 删除hit
    handleTagClose(row) {
      delete row.hit;
      setRoutes(this.tableData);
      noticeBadge();
      this.initList();
    },
    // 父级刷新 tags
    initTags() {
      this.$refs.tag.initList();
    },
    // 获取tag名称
    fmtTag({ tagId }) {
      const map = this.tagMapping;
      if (typeIs(map) === "object" && tagId) {
        // 可能存在tag被删除找不到name
        return map[tagId]?.name;
      }
    },
    handleSearch() {
      const { match, remark } = this.searchForm;
      if (!match && !remark) {
        this.initList();
        return;
      }
      const newList = [];
      if (match) {
        this.tableData.forEach((item) => {
          if (item.match && item.match.includes(match)) newList.push(item);
        });
      }
      if (remark) {
        this.tableData.forEach((item) => {
          if (item.remark && item.remark.includes(remark)) newList.push(item);
        });
      }
      if (newList.length > 0) this.initList(newList);
      else this.initList();
    },
    handleReset() {
      this.searchForm = {};
      this.initList();
    },
    handleCreate() {
      this.$refs.modal.open();
    },
    handleEdit(row) {
      const newRow = deepClone(row);
      this.$refs.modal.open(newRow);
    },
    handleSwitch() {
      this.modifyNotice(this.tableData);
    },
    // 删除
    async handleDel({ id }) {
      const { ok } = await confirmFunc({ message: this.$t("confirMsg") });
      if (ok) {
        const newList = [];
        const routes = await getRoutes();
        routes.forEach((item) => {
          if (item.id != id) newList.push(item);
        });
        this.modifyNotice(newList);
        this.initList(newList);
      }
    },
    // 复制
    async handleCopy(row) {
      const routes = await getRoutes();
      let remark = row.remark || "";
      if (!remark.includes("[ -- copy -- ]"))
        remark = "[ -- copy -- ]  " + remark;
      routes.push({
        ...row,
        remark,
        switchOn: false,
        id: uniqueId(),
      });
      this.modifyNotice(routes);
      this.initList(routes);
    },
    putData(row) {
      this.tableData.push(row);
      this.modifyNotice(this.tableData);
    },
    async editData(row) {
      const routes = await getRoutes();
      const newList = [];
      routes.forEach((item) => {
        if (item.id == row.id) newList.push(row);
        else newList.push(item);
      });
      this.modifyNotice(newList);
      this.initList(newList);
    },
    // 通知
    modifyNotice(proxy_routes) {
      setRoutes(proxy_routes);
      noticeRoutes(proxy_routes);
    },
    async initList(tables) {
      // tag search 级联
      if (!tables) this.searchForm = {};
      const tags = await getTags();
      this.tagMapping = arrayToObject("id", tags);
      const routes = tables || (await getRoutes());
      if (typeIs(tags) === "array") {
        if (tags.length === 0) {
          this.tableData = routes;
          return;
        } else {
          // 如果不为启用状态，展示全部
          const emptyHits = [];
          for (let k = 0; k < tags.length; k++) {
            const { used } = tags[k];
            if (used) emptyHits.push(used);
          }
          if (emptyHits.length === 0) {
            this.tableData = routes;
            return;
          }
        }
        // 过滤 tag
        const newTables = [];
        for (let i = 0; i < routes.length; i++) {
          const routeData = routes[i];
          for (let j = 0; j < tags.length; j++) {
            const { used, id } = tags[j];
            if (used && routeData.tagId === id) {
              newTables.push(routeData);
              break;
            }
          }
        }
        this.tableData = newTables;
      } else this.tableData = routes;
    },
    // 监听 准备刷新
    listenerFix() {
      chrome.runtime &&
        chrome.runtime.onMessage.addListener(({ type, to }) => {
          if (type === "__ajax_proxy" && to === "page") this.initList();
        });
    },
  },
  mounted() {
    this.initList();
    this.listenerFix();
  },
};
</script>

<style lang="scss" scoped>
.response-container {
  padding: 0 10px;
}
.tips {
  margin: 10px 0;
}
.tags {
  margin: 10px 0;
}
</style>
