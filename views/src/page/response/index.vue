<template>
  <div class="response-container">
    <el-button type="primary" @click="handleCreate">新建</el-button>
    <section class="tips">
      <el-alert title="根据请求URL返回响应数据" type="info" :closable="false" />
    </section>
    <Modal ref="modal" />
    <el-table :data="tableData" stripe>
      <el-table-column label="switch">
        <template slot-scope="{ row }">
          <el-switch v-model="row.switchOn" />
        </template>
      </el-table-column>
      <el-table-column prop="match" label="match" show-overflow-tooltip />
      <el-table-column prop="override" label="override" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import Modal from "./modal";
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
  },
};
</script>

<style lang="scss" scoped>
.tips {
  margin: 10px 0;
}
</style>