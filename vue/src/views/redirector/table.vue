<template>
  <div class="request-container">
    <el-button type="primary" @click="handleCreate">{{
      $t("create")
    }}</el-button>

    <Modal ref="modal" @putData="putData" @editData="editData" />

    <!-- 表格 -->
    <el-table :data="tableData" stripe style="margin-top: 20px">
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
        prop="domain"
        :label="$t('table.columns.domain')"
        show-overflow-tooltip
      />
      <el-table-column
        prop="redirect"
        :label="$t('table.columns.redirect')"
        show-overflow-tooltip
      />
      <el-table-column
        prop="remark"
        :label="$t('table.columns.remark')"
        show-overflow-tooltip
      />
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
import { deepClone, uniqueId } from "@alrale/common-lib";
import { getRedirects, setRedirects } from "@/common/store";
import { noticeRedirects } from "@/common/notice";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      tableData: [],
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
      const { ok } = await confirmFunc({ message: this.$t("confirMsg") });
      if (ok) {
        const newList = [];
        this.tableData.forEach((item) => {
          if (item.id != id) newList.push(item);
        });
        this.tableData = newList;
        this.modifyNotice(newList);
      }
    },
    // 复制
    async handleCopy(row) {
      const list = await getRedirects();
      let remark = row.remark || "";
      if (!remark.includes("[ -- copy -- ]"))
        remark = "[ -- copy -- ]  " + remark;
      list.push({
        ...row,
        remark,
        switchOn: false,
        id: uniqueId(),
      });
      this.modifyNotice(list);
      this.initList();
    },
    putData(row) {
      this.tableData.push(row);
      this.modifyNotice(this.tableData);
    },
    async editData(row) {
      const list = await getRedirects();
      const newList = [];
      list.forEach((item) => {
        if (item.id == row.id) newList.push(row);
        else newList.push(item);
      });
      this.modifyNotice(newList);
      this.initList(newList);
    },
    // 通知
    modifyNotice(redirects) {
      setRedirects(redirects);
      noticeRedirects(redirects);
    },
    async initList() {
      this.tableData = await getRedirects();
    },
  },
  mounted() {
    this.initList();
  },
};
</script>

<style lang="scss" scoped>
.request-container {
  padding: 0 10px;
}
</style>
