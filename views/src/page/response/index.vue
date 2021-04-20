<template>
  <div class="response-container">
    <el-button type="primary" @click="handleCreate">新建</el-button>
    <section class="tips">
      <el-alert
        title="接口响应拦截，注意风险把控"
        type="error"
        :closable="false"
      />
    </section>
    <Modal ref="modal" @putData="putData" @editData="editData" />
    <el-table :data="tableData" stripe>
      <el-table-column label="switch" width="80">
        <template slot-scope="{ row }">
          <el-switch v-model="row.switchOn" @change="handleSwitch" />
        </template>
      </el-table-column>
      <el-table-column prop="match" label="match" show-overflow-tooltip />
      <el-table-column prop="override" label="override" show-overflow-tooltip />
      <el-table-column prop="remark" label="remark" show-overflow-tooltip />
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="{ row }">
          <el-button @click="handleEdit(row)" plain>编辑</el-button>
          <el-button type="danger" @click="handleDel(row)" plain
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Modal from "./modal";
import { confirmFunc } from "../../tool";
import { deepClone } from "@alrale/common-lib";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      tableData: [
        {
          switchOn: true,
          match: "/api/login",
          override: `{ ok: true, message: '登录成功', data: {} }`,
        },
      ],
    };
  },
  methods: {
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
    async handleDel({ id }) {
      const { ok } = await confirmFunc({ message: "确认删除" });
      if (ok) {
        const newList = [];
        this.tableData.forEach((item) => {
          if (item.id != id) newList.push(item);
        });
        this.tableData = newList;
        this.modifyNotice(newList);
      }
    },
    putData(row) {
      this.tableData.push(row);
      this.modifyNotice(this.tableData);
    },
    editData(row) {
      const newList = [];
      this.tableData.forEach((item) => {
        if (item.id == row.id) newList.push(row);
        else newList.push(item);
      });
      this.tableData = newList;
      this.modifyNotice(newList);
    },
    // 通知
    modifyNotice(proxy_routes) {
      chrome.storage && chrome.storage.local.set({ proxy_routes });
      chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "__ajax_proxy",
        to: "background",
        key: "proxy_routes",
        value: proxy_routes,
      });
    },
    initList() {
      chrome.storage &&
        chrome.storage.local.get("proxy_routes", (result) => {
          if (result.proxy_routes) this.tableData = result.proxy_routes;
        });
    },
  },
  created() {
    this.initList();
  },
};
</script>

<style lang="scss" scoped>
.tips {
  margin: 10px 0;
}
</style>