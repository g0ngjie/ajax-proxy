export default {
  document: {
    interceptor: "拦截器",
    redirector: "重定向",
  },
  modal: {
    title: {
      create: "新增",
      edit: "编辑",
    },
    form: {
      match: {
        name: "路径匹配",
        msg: "请求路径不能为空",
      },
      filterType: {
        normal: "普通",
        regex: "正则",
      },
      res: {
        name: "响应数据",
        msg: "响应数据不能为空",
      },
      remark: {
        name: "备注",
      },
      tag: {
        name: "标签",
        placeholder: "请选择",
      },
      placeholder: "请输入",
      domain: {
        name: "域名",
        msg: "域名信息不能为空",
        placeholder: "http|https://foo.com",
      },
      redirect: {
        name: "重定向",
        msg: "重定向地址不能为空",
        placeholder: "http|https://foo2.com",
      },
      headers: {
        name: "请求头",
        key: "Key",
        value: "Value",
        option: "选项",
        append: "添加",
        delete: "删除",
        keyMsg: "key值不能为空",
        valueMsg: "value值不能为空",
        description: "描述",
      },
      whitelist: "白名单",
      noEmpty: "不能为空",
    },
    btn: {
      confirm: "确 定",
      cancel: "取 消",
    },
    msg: {
      not_json: "JSON格式错误",
    },
  },
  drawer: {
    btn: "确定",
  },
  errTips:
    "所有responseText会常驻浏览器后台；注意风险把控，不用的话记得关闭哦~",
  create: "新增",
  search: {
    match: {
      name: "路径",
      placeholder: "路径匹配",
    },
    remark: {
      name: "备注",
      placeholder: "备注",
    },
    btn: {
      search: "搜索",
      reset: "重置",
    },
  },
  table: {
    columns: {
      switch: "状态",
      match: "路径匹配",
      matchType: "匹配类型",
      res: "响应数据",
      remark: "备注",
      tag: "标签",
      hit: "命中",
      domain: "域名",
      redirect: "重定向",
      options: "操作",
    },
    btn: {
      del: "删除",
      edit: "编辑",
      copy: "复制",
    },
  },
  confirMsg: "确认删除?",
  toolbar: {
    restore: "恢复",
    backup: "备份",
    no_down_data: "没有数据可以下载",
    override_data: "上传成功原文件会被覆盖",
    import_empty: "你导入了一个空列表",
    read_err: "读取异常，文件可能不是一个JSON",
    data_err: "数据异常",
  },
  chrome: {
    notice: "命中率多少有点高了",
  },
};
