<template>
  <div class="request-modal-container">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="700px"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item
          label="词槽:"
          :rules="[
            {
              required: true,
              message: '词槽不能为空，请输入',
              trigger: 'change',
            },
            { min: 1, max: 50, message: '词槽名称字符数应在1-50之间' },
          ]"
          prop="intent"
        >
          <el-input
            v-model="form.intent"
            placeholder="请输入词槽"
            :maxlength="50"
            show-word-limit
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input
            style="width: 500px"
            type="textarea"
            :rows="3"
            :maxlength="100"
            show-word-limit
            placeholder="请输入描述"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      form: {},
      title: "",
    };
  },
  methods: {
    // 模态展示
    open(id) {
      // 如果id存在，则编辑
      this.title = id ? "编辑" : "新增";
      this.isShow = true;
      this.form = {};
      this.$nextTick(() => this.$refs.form.clearValidate());
    },
    // 模态关闭
    handleClose() {
      this.isShow = false;
    },
    // 表单提交
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) this.createSlot();
      });
    },
  },
};
</script>

<style>
</style>