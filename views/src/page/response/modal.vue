<template>
  <div class="response-modal-container">
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
          prop="match"
        >
          <el-input v-model="form.match" placeholder="请输入"></el-input>
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
          prop="override"
        >
          <el-input
            type="textarea"
            :rows="3"
            show-word-limit
            v-model="form.override"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            :rows="3"
            show-word-limit
            v-model="form.remark"
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
import { uniqueId } from "@alrale/common-lib";

export default {
  data() {
    return {
      isShow: false,
      form: {},
      title: "",
      isEdit: false,
    };
  },
  methods: {
    // 模态展示
    open(row) {
      if (row) {
        this.isEdit = true;
        this.title = "编辑";
      } else {
        this.isEdit = false;
        this.title = "新增";
      }
      this.isShow = true;
      this.form = row || {};
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
      if (this.isEdit) this.$emit("editData", this.form);
      else
        this.$emit("putData", { ...this.form, switchOn: true, id: uniqueId() });
      this.isShow = false;
    },
  },
};
</script>