export default {
  document: {
    interceptor: "Interceptor",
    redirector: "Redirector",
  },
  modal: {
    title: {
      create: "Create",
      edit: "Edit",
    },
    form: {
      match: {
        name: "Match URL",
        msg: "match is required",
      },
      filterType: {
        normal: "Normal",
        regex: "Regex",
      },
      res: {
        name: "ResponseText",
        msg: "response text is required",
      },
      remark: {
        name: "Remark",
      },
      tag: {
        name: "Tag",
        placeholder: "Please select",
      },
      placeholder: "Please input",
      domain: {
        name: "Domain",
        msg: "Domain name information cannot be empty",
        placeholder: "http|https://foo.com",
      },
      redirect: {
        name: "Redirect",
        msg: "The redirection address cannot be empty",
        placeholder: "http|https://foo2.com",
      },
      headers: {
        name: "Headers",
        key: "Key",
        value: "Value",
        option: "Option",
        append: "Append",
        delete: "Delete",
        keyMsg: "key cannot be empty",
        valueMsg: "value cannot be empty",
        description: "Description",
      },
      whitelist: "Whitelist",
      noEmpty: "Cannot be empty",
    },
    btn: {
      confirm: "OK",
      cancel: "Cancel",
    },
    msg: {
      not_json: "JSON format error",
    },
  },
  drawer: {
    btn: "OK",
  },
  errTips:
    "All responseText will be resident in the browser background; pay attention to risk control, and remember to close it if you don't use it~",
  create: "Create",
  search: {
    match: {
      name: "match",
      placeholder: "match",
    },
    remark: {
      name: "remark",
      placeholder: "remark",
    },
    btn: {
      search: "Search",
      reset: "Reset",
    },
  },
  table: {
    columns: {
      switch: "switch",
      match: "match",
      matchType: "Match type",
      res: "responseText",
      remark: "remark",
      tag: "Tag",
      hit: "Hit",
      domain: "Domain",
      redirect: "Redirect",
      options: "options",
    },
    btn: {
      del: "Delete",
      edit: "Edit",
      copy: "Copy",
    },
  },
  confirMsg: "Are you sure you want to delete?",
  toolbar: {
    restore: "Restore",
    backup: "Backup",
    no_down_data: "There is no data to download",
    override_data:
      "If the upload is successful, the original file will be overwritten",
    import_empty: "You imported an empty list",
    read_err: "Read exception. The file may not be a JSON",
    data_err: "Abnormal data",
  },
  chrome: {
    notice: "The percentage of hits is a little high",
  },
};
