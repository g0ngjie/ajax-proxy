<template>
  <div class="response-container">
    <el-button type="primary" @click="handleCreate">{{
      $t("create")
    }}</el-button>
    <section class="tags">
      <Tag @initList="initList" ref="tag" />
    </section>
    <Modal ref="modal" @putData="putData" @editData="editData" />
    <!-- 搜索栏 -->
    <section>
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('path')">
          <el-input
            v-model="searchForm.match"
            clearable
            :placeholder="$t('matchPath')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('remark')">
          <el-input
            v-model="searchForm.remark"
            clearable
            :placeholder="$t('remark')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">{{
            $t("searchTxt")
          }}</el-button>
          <el-button @click="handleReset">{{ $t("reset") }}</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格 -->
    <el-table :data="tableData" stripe>
      <el-table-column :label="$t('status')" width="80">
        <template slot-scope="{ row }">
          <el-switch v-model="row.switchOn" @change="handleSwitch" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('matchType')" width="90">
        <template slot-scope="{ row }">
          {{
            { normal: $t("normal"), regex: $t("regex") }[
              row.filterType || "normal"
            ]
          }}
        </template>
      </el-table-column>
      <el-table-column label="Method" width="90">
        <template slot-scope="{ row }">
          {{ row.method || "ANY" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="statusCode"
        :label="$t('statusCode')"
        show-overflow-tooltip
        width="100"
      >
        <template slot-scope="{ row }">
          {{ row.statusCode || 200 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="match"
        :label="$t('matchPath')"
        show-overflow-tooltip
      />
      <el-table-column
        prop="remark"
        :label="$t('remark')"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('tag')"
        :formatter="fmtTag"
        show-overflow-tooltip
        width="100"
      />
      <el-table-column :label="$t('hit')" align="center" width="70">
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
      <el-table-column :label="$t('handle')" align="center" width="270">
        <template slot-scope="{ row }">
          <!-- 编辑 -->
          <el-button @click="handleEdit(row)" plain>{{ $t("edit") }}</el-button>
          <!-- 删除 -->
          <el-button type="danger" @click="handleDel(row)" plain>{{
            $t("del")
          }}</el-button>
          <!-- 复制 -->
          <el-button type="primary" @click="handleCopy(row)" plain>{{
            $t("copy")
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
import { useInterceptorRoutes, useTags } from "@/common/store";
import { noticeInterceptorRoutes, noticeBadge } from "@/common/notice";
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
      useInterceptorRoutes.set(this.tableData);
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
      const { ok } = await confirmFunc({
        message: this.$t("msg.confirmDeletion"),
      });
      if (ok) {
        const newList = [];
        const routes = useInterceptorRoutes.get();
        routes.forEach((item) => {
          if (item.id != id) newList.push(item);
        });
        this.modifyNotice(newList);
        this.initList(newList);
      }
    },
    // 复制
    async handleCopy(row) {
      const routes = useInterceptorRoutes.get();
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
      const routes = useInterceptorRoutes.get();
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
      useInterceptorRoutes.set(proxy_routes);
      noticeInterceptorRoutes(proxy_routes);
    },
    async initList(tables) {
      // tag search 级联
      if (!tables) this.searchForm = {};
      const tags = useTags.get();
      this.tagMapping = arrayToObject("id", tags);
      const routes = tables || useInterceptorRoutes.get();
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
        chrome.runtime.onMessage.addListener(({ type, to, key }) => {
          if (type === "__ajax_proxy" && to === "page") {
            if (key === "hit") this.initList();
          }
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
.tags {
  margin: 10px 0 20px 0;
}
</style>
