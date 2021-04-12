<template>
  <div class="global-modal-container">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          label="请求路径:"
          :rules="[
            {
              required: true,
              message: '不能为空',
              trigger: 'change',
            },
          ]"
          prop="url"
        >
          <el-input v-model="form.url" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item
          label="响应数据:"
          :rules="[
            {
              required: true,
              message: '不能为空',
              trigger: 'change',
            },
          ]"
          prop="response"
        >
          <el-input
            type="textarea"
            :rows="3"
            show-word-limit
            v-model="form.response"
            placeholder="请输入"
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
        if (valid) this.createData();
      });
    },
    createData() {
      console.log("[debug]this.form:", this.form);
    },
  },
};
</script>