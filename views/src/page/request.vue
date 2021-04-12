<template>
  <div class="request-container">
    <el-button type="primary" @click="handleCreate">Create</el-button>
    <Modal ref="modal" />
  </div>
</template>

<script>
import Modal from "./modal";
export default {
  components: {
    Modal,
  },
  methods: {
    handleCreate() {
      this.$refs.modal.open();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>