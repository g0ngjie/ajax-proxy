<template>
  <div class="response-modal-container">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      :before-close="handleClose"
      top="1%"
      width="80%"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          :label="$t('modal.form.match.name')"
          :rules="[
            {
              required: true,
              trigger: 'change',
              message: $t('modal.form.match.msg'),
            },
          ]"
          prop="match"
        >
          <el-input
            v-model="form.match"
            :placeholder="$t('modal.form.placeholder')"
          >
            <el-select
              style="width: 90px;"
              v-model="form.filterType"
              slot="prepend"
            >
              <el-option
                :label="$t('modal.form.filterType.normal')"
                value="normal"
              ></el-option>
              <el-option
                :label="$t('modal.form.filterType.regex')"
                value="regex"
              ></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('modal.form.remark.name')">
          <el-input
            v-model="form.remark"
            :placeholder="$t('modal.form.placeholder')"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('modal.form.tag.name')">
          <el-select
            v-model="form.tagId"
            :placeholder="$t('modal.form.tag.placeholder')"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="(item, index) in tags"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('modal.form.res.name')"
          :rules="[
            {
              required: true,
              trigger: 'change',
              message: $t('modal.form.res.msg'),
            },
          ]"
          prop="override"
        >
          <el-input
            type="textarea"
            :rows="10"
            v-model="form.override"
            :placeholder="$t('modal.form.placeholder')"
          >
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          :disabled="!form.override"
          @click="handleOpenJsonEditor(form.override)"
          >JSON Editor</el-button
        >
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("modal.btn.cancel") }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{
          $t("modal.btn.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <JsonEditor ref="jsonEditor" @change="handleJsonSubmit" />
  </div>
</template>

<script>
import { uniqueId } from "@alrale/common-lib";
import { getTags } from "@/common/store";
import JsonEditor from "./jsonEdit";

export default {
  components: { JsonEditor },
  data() {
    return {
      isShow: false,
      form: {},
      title: "",
      isEdit: false,
      tags: [],
    };
  },
  methods: {
    // 打开编辑器
    handleOpenJsonEditor(jsonStr) {
      try {
        const _json = JSON.parse(jsonStr);
        this.$refs.jsonEditor.show(_json);
      } catch (error) {
        this.$message.error(this.$t("modal.msg.not_json"));
      }
    },
    handleJsonSubmit(json) {
      this.form.override = JSON.stringify(json);
    },
    // 模态展示
    async open(row) {
      // 获取标签
      this.tags = await getTags();
      if (row) {
        this.isEdit = true;
        // 编辑
        this.title = this.$t("modal.title.edit");
      } else {
        this.isEdit = false;
        // 新增
        this.title = this.$t("modal.title.create");
      }
      this.isShow = true;
      this.form = row || { remark: "", filterType: "normal" };
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
