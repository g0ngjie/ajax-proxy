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
        <!-- 域名 -->
        <el-form-item
          :label="$t('modal.form.domain.name')"
          :rules="[
            {
              required: true,
              trigger: 'change',
              message: $t('modal.form.domain.msg'),
            },
          ]"
          prop="domain"
        >
          <el-input
            v-model="form.domain"
            :placeholder="$t('modal.form.domain.placeholder')"
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
        <!-- 重定向 -->
        <el-form-item
          :label="$t('modal.form.redirect.name')"
          :rules="[
            {
              required: true,
              trigger: 'change',
              message: $t('modal.form.redirect.msg'),
            },
          ]"
          prop="redirect"
        >
          <el-input
            v-model="form.redirect"
            :placeholder="$t('modal.form.redirect.placeholder')"
          ></el-input>
        </el-form-item>
        <!-- 请求头 -->
        <el-form-item :label="$t('modal.form.headers.name')">
          <section style="padding: 0 20px">
            <!-- 新增槽 -->
            <el-button
              style="margin-bottom: 10px"
              size="mini"
              type="text"
              @click="handleHeaderAdd"
              >+{{ $t("modal.form.headers.append") }}</el-button
            >
            <el-row :gutter="24" style="margin-bottom: 10px">
              <el-col :span="7">{{ $t("modal.form.headers.key") }}</el-col>
              <el-col :span="7">{{ $t("modal.form.headers.value") }}</el-col>
              <el-col :span="7">{{
                $t("modal.form.headers.description")
              }}</el-col>
              <el-col :span="3">{{ $t("modal.form.headers.option") }}</el-col>
            </el-row>
            <el-row
              :gutter="24"
              v-for="(item, index) in form.headers"
              :key="index"
            >
              <el-col :span="7">
                <!-- key -->
                <el-form-item
                  :rules="[
                    {
                      required: true,
                      message: $t('modal.form.headers.keyMsg'),
                      trigger: 'change',
                    },
                  ]"
                  :prop="`headers[${index}].key`"
                >
                  <el-input
                    v-model="form.headers[index].key"
                    :placeholder="$t('modal.form.placeholder')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <!-- value -->
                <el-form-item
                  :rules="[
                    {
                      required: true,
                      message: $t('modal.form.headers.valueMsg'),
                      trigger: 'change',
                    },
                  ]"
                  :prop="`headers[${index}].value`"
                >
                  <el-input
                    v-model="form.headers[index].value"
                    :placeholder="$t('modal.form.placeholder')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <!-- description -->
                <el-form-item>
                  <el-input
                    v-model="form.headers[index].description"
                    :placeholder="$t('modal.form.placeholder')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button
                  type="text"
                  class="text-btn-underline"
                  @click.stop="handleDel(index)"
                  >{{ $t("modal.form.headers.delete") }}</el-button
                >
              </el-col>
            </el-row>
          </section>
        </el-form-item>
        <!-- 白名单列表 -->
        <el-form-item :label="$t('modal.form.whitelist')">
          <section style="padding: 0 20px">
            <!-- 新增槽 -->
            <el-button
              style="margin-bottom: 10px"
              size="mini"
              type="text"
              @click="handleWhitelistAdd"
              >+{{ $t("modal.form.headers.append") }}</el-button
            >
            <el-row
              v-for="(item, index) in form.whitelist"
              :key="index"
              style="margin-bottom: 5px"
            >
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: $t('modal.form.noEmpty'),
                    trigger: 'change',
                  },
                ]"
                :prop="`whitelist[${index}]`"
              >
                <el-input
                  :placeholder="$t('modal.form.placeholder')"
                  v-model="form.whitelist[index]"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-delete"
                    @click.stop="handleDelWhite(index)"
                  />
                </el-input>
              </el-form-item>
            </el-row>
          </section>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item :label="$t('modal.form.remark.name')">
          <el-input
            type="textarea"
            :rows="5"
            v-model="form.remark"
            :placeholder="$t('modal.form.placeholder')"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("modal.btn.cancel") }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{
          $t("modal.btn.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uniqueId } from "@alrale/common-lib";
import { getTags } from "@/common/store";

export default {
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
    // 白名单添加
    handleWhitelistAdd() {
      this.form.whitelist.push("");
    },
    // 删除白名单
    handleDelWhite(index) {
      this.form.whitelist.splice(index, 1);
    },
    // 请求头添加
    handleHeaderAdd() {
      this.form.headers.push({
        description: "",
        key: "",
        value: "",
      });
    },
    // 删除header行
    handleDel(index) {
      this.form.headers.splice(index, 1);
    },
    // 模态展示
    async open(row) {
      // 获取标签
      this.tags = await getTags();
      if (row) {
        this.isEdit = true;
        // 编辑
        this.title = this.$t("modal.title.edit");
        // 兼容版本迭代，旧数据未存在白名单
        if (!row.whitelist) row.whitelist = [];
      } else {
        this.isEdit = false;
        // 新增
        this.title = this.$t("modal.title.create");
      }
      this.isShow = true;
      this.form = row || {
        remark: "",
        headers: [],
        whitelist: [],
        filterType: "normal",
      };
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
