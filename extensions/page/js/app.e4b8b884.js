(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{0:function(t,e,a){t.exports=a("56d7")},"01b0":function(t,e,a){"use strict";a("6d04")},"0543":function(t,e,a){},1:function(t,e){},10:function(t,e){},"1e09":function(t,e,a){},2:function(t,e){},3:function(t,e){},"33b4":function(t,e,a){"use strict";a("6d68")},"357c":function(t,e,a){"use strict";a("ebbe")},4:function(t,e){},5:function(t,e){},"55ae":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var r=a("2b0e"),i=(a("357c"),a("a065"),a("2877")),o=Object(i.a)({},(function(){var t=this._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)}),[],!1,null,"1c6581ae",null).exports,n=a("8c4f"),s=a("ffb2");const l={LANG:"lang",SWITCH:"globalSwitchOn",ROUTES:"proxy_routes",TAGS:"tags",MODE:"mode",REDIRECT:"redirect"},c="globalSwitchOn",d="proxy_routes",p="badge",u="mode",h="redirect";function m(t){return new Promise(e=>{chrome.storage?chrome.storage.local.get(t,a=>{a.hasOwnProperty(t)?e({ok:!0,data:a[t]}):e({ok:!1})}):e({ok:!1})})}function f(t,e){chrome.storage&&chrome.storage.local.set({[t]:e})}function y(t){f(l.LANG,t)}function b(t){f(l.ROUTES,t)}async function g(){const{ok:t,data:e}=await m(l.ROUTES);return t?e:[]}function v(t){f(l.TAGS,t)}async function w(){const{ok:t,data:e}=await m(l.TAGS);return t?e:[]}function k(t){f(l.MODE,t)}function E(t){f(l.REDIRECT,t)}async function $(){const{ok:t,data:e}=await m(l.REDIRECT);return t?e:[]}var D={components:{vueJsonEditor:a("45a3").a},data:()=>({drawer:!1,json:{},cache:null}),methods:{show(t){this.cache=null,this.json=t,this.drawer=!0},onJsonChange(t){this.cache=t},handleSubmit(){this.$emit("change",this.cache||this.json),this.drawer=!1}}},x=(a("d2f8"),{components:{JsonEditor:Object(i.a)(D,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"json-editor-container"},[e("el-drawer",{attrs:{size:"60%",visible:t.drawer,"with-header":!1},on:{"update:visible":function(e){t.drawer=e}}},[e("vue-json-editor",{staticStyle:{height:"100%"},attrs:{expandedOnStart:!0,mode:"code"},on:{"json-change":t.onJsonChange},model:{value:t.json,callback:function(e){t.json=e},expression:"json"}}),e("div",{staticClass:"json-editor-drawer__footer"},[e("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("confirm")))])],1)],1)],1)}),[],!1,null,"16bc4ce8",null).exports},data:()=>({isShow:!1,form:{},title:"",isEdit:!1,tags:[]}),methods:{handleOpenJsonEditor(t){try{const e=JSON.parse(t);this.$refs.jsonEditor.show(e)}catch(t){this.$message.error(this.$t("msg.jsonFormatError"))}},handleJsonSubmit(t){this.form.override=JSON.stringify(t)},async open(t){this.tags=await w(),t?(this.isEdit=!0,this.title=this.$t("edit")):(this.isEdit=!1,this.title=this.$t("create")),this.isShow=!0,this.form=t||{remark:"",filterType:"normal"},this.$nextTick(()=>this.$refs.form.clearValidate())},handleClose(){this.isShow=!1},handleSubmit(){this.$refs.form.validate(t=>{t&&this.createData()})},createData(){this.isEdit?this.$emit("editData",this.form):this.$emit("putData",{...this.form,switchOn:!0,id:Object(s.uniqueId)()}),this.isShow=!1}}}),_=Object(i.a)(x,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"response-modal-container"},[e("el-dialog",{attrs:{title:t.title,visible:t.isShow,"before-close":t.handleClose,top:"1%",width:"80%"},on:{"update:visible":function(e){t.isShow=e}}},[e("el-form",{ref:"form",attrs:{model:t.form}},[e("el-form-item",{attrs:{label:t.$t("matchPath"),rules:[{required:!0,trigger:"change",message:t.$t("msg.pathNotEmpty")}],prop:"match"}},[e("el-input",{attrs:{placeholder:t.$t("placeholder.input")},model:{value:t.form.match,callback:function(e){t.$set(t.form,"match",e)},expression:"form.match"}},[e("el-select",{staticStyle:{width:"90px"},attrs:{slot:"prepend"},slot:"prepend",model:{value:t.form.filterType,callback:function(e){t.$set(t.form,"filterType",e)},expression:"form.filterType"}},[e("el-option",{attrs:{label:t.$t("normal"),value:"normal"}}),e("el-option",{attrs:{label:t.$t("regex"),value:"regex"}})],1)],1)],1),e("el-form-item",{attrs:{label:t.$t("remark")}},[e("el-input",{attrs:{placeholder:t.$t("placeholder.input")},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),e("el-form-item",{attrs:{label:t.$t("tag")}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:t.$t("placeholder.select"),clearable:""},model:{value:t.form.tagId,callback:function(e){t.$set(t.form,"tagId",e)},expression:"form.tagId"}},t._l(t.tags,(function(t,a){return e("el-option",{key:a,attrs:{label:t.name,value:t.id}})})),1)],1),e("el-form-item",{attrs:{label:t.$t("responseData"),rules:[{required:!0,trigger:"change",message:t.$t("msg.responseDataNotEmpty")}],prop:"override"}},[e("el-input",{attrs:{type:"textarea",rows:10,placeholder:t.$t("placeholder.input")},model:{value:t.form.override,callback:function(e){t.$set(t.form,"override",e)},expression:"form.override"}})],1),e("el-button",{attrs:{type:"primary",disabled:!t.form.override},on:{click:function(e){return t.handleOpenJsonEditor(t.form.override)}}},[t._v("JSON Editor")])],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.handleClose}},[t._v(t._s(t.$t("cancel")))]),e("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("confirm")))])],1)],1),e("JsonEditor",{ref:"jsonEditor",on:{change:t.handleJsonSubmit}})],1)}),[],!1,null,null,null).exports,N=(a("9e1f"),a("450d"),a("6ed5")),S=a.n(N);async function T({message:t="",title:e="",confirmText:a,cancelText:r,type:i}){return{ok:"confirm"===await S.a.confirm(t,e,{confirmButtonText:a,cancelButtonText:r,type:i}).catch(()=>({ok:!1}))}}function O(t,e){chrome.runtime&&chrome.runtime.sendMessage(chrome.runtime.id,{type:"__ajax_proxy",to:"background",key:t,value:e})}var C={data:()=>({dynamicTags:[],inputVisible:!1,inputValue:""}),methods:{async handleRemove({id:t}){const{ok:e}=await T({message:this.$t("msg.confirmDeletion")});if(!e)return;const a=[];this.dynamicTags.forEach(e=>{e.id!==t&&a.push(e)}),this.dynamicTags=a,await this.refreshRoutes(t),this.refreshData(a)},async refreshRoutes(t){b((await g()).map(e=>{const{tagId:a,...r}=e;return e.tagId&&e.tagId===t?r:e}))},handleTagStatus(t){t.used=!t.used,this.refreshData(this.dynamicTags)},showInput(){this.inputVisible=!0,this.$nextTick(t=>{this.$refs.saveTagInput.$refs.input.focus()})},refreshData(t){v(t),this.$emit("initList")},handleInputConfirm(){let t=this.inputValue;t&&this.dynamicTags.push({id:Object(s.uniqueId)(),name:t,used:!1}),this.inputVisible=!1,this.inputValue="",this.refreshData(this.dynamicTags)},async initList(){this.dynamicTags=await w()}},mounted(){this.initList()}},j=(a("33b4"),{components:{Modal:_,Tag:Object(i.a)(C,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"tag-container"},[t._l(t.dynamicTags,(function(a,r){return e("section",{key:r,staticClass:"tag-list"},[e("i",{staticClass:"el-icon-error",on:{click:function(e){return t.handleRemove(a)}}}),e("el-button",{attrs:{type:a.used?"primary":"",plain:""},on:{click:function(e){return t.handleTagStatus(a)}}},[t._v(t._s(a.name))])],1)})),t.inputVisible?e("el-input",{ref:"saveTagInput",staticStyle:{width:"100px"},on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm.apply(null,arguments)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):e("i",{staticClass:"el-icon-collection-tag",on:{click:t.showInput}})],2)}),[],!1,null,"34fb3156",null).exports},filters:{limitFilter:t=>t?t.length>2e3?t.slice(0,2e3)+"...":t:""},data:()=>({searchForm:{},tableData:[],tagMapping:{}}),methods:{handleTagClose(t){delete t.hit,b(this.tableData),O(p,null),this.initList()},initTags(){this.$refs.tag.initList()},fmtTag({tagId:t}){const e=this.tagMapping;var a;if("object"===Object(s.typeIs)(e)&&t)return null===(a=e[t])||void 0===a?void 0:a.name},handleSearch(){const{match:t,remark:e}=this.searchForm;if(!t&&!e)return void this.initList();const a=[];t&&this.tableData.forEach(e=>{e.match&&e.match.includes(t)&&a.push(e)}),e&&this.tableData.forEach(t=>{t.remark&&t.remark.includes(e)&&a.push(t)}),a.length>0?this.initList(a):this.initList()},handleReset(){this.searchForm={},this.initList()},handleCreate(){this.$refs.modal.open()},handleEdit(t){const e=Object(s.deepClone)(t);this.$refs.modal.open(e)},handleSwitch(){this.modifyNotice(this.tableData)},async handleDel({id:t}){const{ok:e}=await T({message:this.$t("msg.confirmDeletion")});if(e){const e=[];(await g()).forEach(a=>{a.id!=t&&e.push(a)}),this.modifyNotice(e),this.initList(e)}},async handleCopy(t){const e=await g();let a=t.remark||"";a.includes("[ -- copy -- ]")||(a="[ -- copy -- ]  "+a),e.push({...t,remark:a,switchOn:!1,id:Object(s.uniqueId)()}),this.modifyNotice(e),this.initList(e)},putData(t){this.tableData.push(t),this.modifyNotice(this.tableData)},async editData(t){const e=await g(),a=[];e.forEach(e=>{e.id==t.id?a.push(t):a.push(e)}),this.modifyNotice(a),this.initList(a)},modifyNotice(t){b(t),O(d,t)},async initList(t){t||(this.searchForm={});const e=await w();this.tagMapping=Object(s.arrayToObject)("id",e);const a=t||await g();if("array"===Object(s.typeIs)(e)){if(0===e.length)return void(this.tableData=a);{const t=[];for(let a=0;a<e.length;a++){const{used:r}=e[a];r&&t.push(r)}if(0===t.length)return void(this.tableData=a)}const t=[];for(let r=0;r<a.length;r++){const i=a[r];for(let a=0;a<e.length;a++){const{used:r,id:o}=e[a];if(r&&i.tagId===o){t.push(i);break}}}this.tableData=t}else this.tableData=a},listenerFix(){chrome.runtime&&chrome.runtime.onMessage.addListener(({type:t,to:e})=>{"__ajax_proxy"===t&&"page"===e&&this.initList()})}},mounted(){this.initList(),this.listenerFix()}}),L=(a("dcbc"),Object(i.a)(j,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"response-container"},[e("el-button",{attrs:{type:"primary"},on:{click:t.handleCreate}},[t._v(t._s(t.$t("create")))]),e("section",{staticClass:"tags"},[e("Tag",{ref:"tag",on:{initList:t.initList}})],1),e("Modal",{ref:"modal",on:{putData:t.putData,editData:t.editData}}),e("section",[e("el-form",{attrs:{inline:!0,model:t.searchForm}},[e("el-form-item",{attrs:{label:t.$t("path")}},[e("el-input",{attrs:{clearable:"",placeholder:t.$t("matchPath")},model:{value:t.searchForm.match,callback:function(e){t.$set(t.searchForm,"match",e)},expression:"searchForm.match"}})],1),e("el-form-item",{attrs:{label:t.$t("remark")}},[e("el-input",{attrs:{clearable:"",placeholder:t.$t("remark")},model:{value:t.searchForm.remark,callback:function(e){t.$set(t.searchForm,"remark",e)},expression:"searchForm.remark"}})],1),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:t.handleSearch}},[t._v(t._s(t.$t("searchTxt")))]),e("el-button",{on:{click:t.handleReset}},[t._v(t._s(t.$t("reset")))])],1)],1)],1),e("el-table",{attrs:{data:t.tableData,stripe:""}},[e("el-table-column",{attrs:{label:t.$t("status"),width:"100"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[e("el-switch",{on:{change:t.handleSwitch},model:{value:a.switchOn,callback:function(e){t.$set(a,"switchOn",e)},expression:"row.switchOn"}})]}}])}),e("el-table-column",{attrs:{label:t.$t("matchType"),width:"100"},scopedSlots:t._u([{key:"default",fn:function({row:e}){return[t._v(" "+t._s({normal:t.$t("normal"),regex:t.$t("regex")}[e.filterType||"normal"])+" ")]}}])}),e("el-table-column",{attrs:{prop:"match",label:t.$t("matchPath"),"show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"override",label:t.$t("responseData"),"show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[e("p",[t._v(t._s(t._f("limitFilter")(a.override)))])]}}])}),e("el-table-column",{attrs:{prop:"remark",label:t.$t("remark"),"show-overflow-tooltip":""}}),e("el-table-column",{attrs:{label:t.$t("tag"),formatter:t.fmtTag,"show-overflow-tooltip":"",width:"100"}}),e("el-table-column",{attrs:{label:t.$t("hit"),align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[a.hit?e("el-tag",{attrs:{type:"info",closable:""},on:{close:function(e){return t.handleTagClose(a)}}},[t._v(" "+t._s(a.hit)+" ")]):t._e()]}}])}),e("el-table-column",{attrs:{label:t.$t("handle"),align:"center",width:"270"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[e("el-button",{attrs:{round:"",plain:""},on:{click:function(e){return t.handleEdit(a)}}},[t._v(t._s(t.$t("edit")))]),e("el-button",{attrs:{type:"danger",round:"",plain:""},on:{click:function(e){return t.handleDel(a)}}},[t._v(t._s(t.$t("del")))]),e("el-button",{attrs:{type:"primary",round:"",plain:""},on:{click:function(e){return t.handleCopy(a)}}},[t._v(t._s(t.$t("copy")))])]}}])})],1)],1)}),[],!1,null,"5f0dfa33",null).exports),R={data:()=>({isShow:!1,form:{},title:"",isEdit:!1,tags:[]}),methods:{handleWhitelistAdd(){this.form.whitelist.push("")},handleDelWhite(t){this.form.whitelist.splice(t,1)},handleHeaderAdd(){this.form.headers.push({description:"",key:"",value:""})},handleDel(t){this.form.headers.splice(t,1)},async open(t){this.tags=await w(),t?(this.isEdit=!0,this.title=this.$t("edit"),t.whitelist||(t.whitelist=[])):(this.isEdit=!1,this.title=this.$t("create")),this.isShow=!0,this.form=t||{remark:"",headers:[],whitelist:[],filterType:"normal"},this.$nextTick(()=>this.$refs.form.clearValidate())},handleClose(){this.isShow=!1},handleSubmit(){this.$refs.form.validate(t=>{t&&this.createData()})},createData(){this.isEdit?this.$emit("editData",this.form):this.$emit("putData",{...this.form,switchOn:!0,id:Object(s.uniqueId)()}),this.isShow=!1}}},I={components:{Modal:Object(i.a)(R,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"response-modal-container"},[e("el-dialog",{attrs:{title:t.title,visible:t.isShow,"before-close":t.handleClose,top:"1%",width:"80%"},on:{"update:visible":function(e){t.isShow=e}}},[e("el-form",{ref:"form",attrs:{model:t.form}},[e("el-form-item",{attrs:{label:t.$t("domain"),rules:[{required:!0,trigger:"change",message:t.$t("msg.domainNotEmpty")}],prop:"domain"}},[e("el-input",{attrs:{placeholder:"http|https://foo.com"},model:{value:t.form.domain,callback:function(e){t.$set(t.form,"domain",e)},expression:"form.domain"}},[e("el-select",{staticStyle:{width:"90px"},attrs:{slot:"prepend"},slot:"prepend",model:{value:t.form.filterType,callback:function(e){t.$set(t.form,"filterType",e)},expression:"form.filterType"}},[e("el-option",{attrs:{label:t.$t("normal"),value:"normal"}}),e("el-option",{attrs:{label:t.$t("regex"),value:"regex"}})],1)],1)],1),e("el-form-item",{attrs:{label:t.$t("redirector"),rules:[{required:!0,trigger:"change",message:t.$t("msg.redirectNotEmpty")}],prop:"redirect"}},[e("el-input",{attrs:{placeholder:"http|https://foo2.com"},model:{value:t.form.redirect,callback:function(e){t.$set(t.form,"redirect",e)},expression:"form.redirect"}})],1),e("el-form-item",{attrs:{label:t.$t("updateRequestHeaders")}},[e("section",{staticStyle:{padding:"0 20px"}},[e("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"text"},on:{click:t.handleHeaderAdd}},[t._v("+"+t._s(t.$t("append")))]),e("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:24}},[e("el-col",{attrs:{span:7}},[t._v("Key")]),e("el-col",{attrs:{span:7}},[t._v("Value")]),e("el-col",{attrs:{span:7}},[t._v(t._s(t.$t("describe")))]),e("el-col",{attrs:{span:3}},[t._v(t._s(t.$t("option")))])],1),t._l(t.form.headers,(function(a,r){return e("el-row",{key:r,attrs:{gutter:24}},[e("el-col",{attrs:{span:7}},[e("el-form-item",{attrs:{rules:[{required:!0,message:t.$t("msg.keyNotEmpty"),trigger:"change"}],prop:`headers[${r}].key`}},[e("el-input",{attrs:{placeholder:t.$t("placeholder.input")},model:{value:t.form.headers[r].key,callback:function(e){t.$set(t.form.headers[r],"key",e)},expression:"form.headers[index].key"}})],1)],1),e("el-col",{attrs:{span:7}},[e("el-form-item",{attrs:{rules:[{required:!0,message:t.$t("msg.valueNotEmpty"),trigger:"change"}],prop:`headers[${r}].value`}},[e("el-input",{attrs:{placeholder:t.$t("placeholder.input")},model:{value:t.form.headers[r].value,callback:function(e){t.$set(t.form.headers[r],"value",e)},expression:"form.headers[index].value"}})],1)],1),e("el-col",{attrs:{span:7}},[e("el-form-item",[e("el-input",{attrs:{placeholder:t.$t("placeholder.input")},model:{value:t.form.headers[r].description,callback:function(e){t.$set(t.form.headers[r],"description",e)},expression:"form.headers[index].description"}})],1)],1),e("el-col",{attrs:{span:3}},[e("el-button",{staticClass:"text-btn-underline",attrs:{type:"text"},on:{click:function(e){return e.stopPropagation(),t.handleDel(r)}}},[t._v(t._s(t.$t("del")))])],1)],1)}))],2)]),e("el-form-item",{attrs:{label:t.$t("exclusionList")}},[e("section",{staticStyle:{padding:"0 20px"}},[e("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"text"},on:{click:t.handleWhitelistAdd}},[t._v("+"+t._s(t.$t("append")))]),t._l(t.form.whitelist,(function(a,r){return e("el-row",{key:r,staticStyle:{"margin-bottom":"5px"}},[e("el-form-item",{attrs:{rules:[{required:!0,message:t.$t("noEmpty"),trigger:"change"}],prop:`whitelist[${r}]`}},[e("el-input",{attrs:{placeholder:"http|https://foo.xxx"},model:{value:t.form.whitelist[r],callback:function(e){t.$set(t.form.whitelist,r,e)},expression:"form.whitelist[index]"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-delete"},on:{click:function(e){return e.stopPropagation(),t.handleDelWhite(r)}},slot:"append"})],1)],1)],1)}))],2)]),e("el-form-item",{attrs:{label:t.$t("remark")}},[e("el-input",{attrs:{type:"textarea",rows:5,placeholder:t.$t("placeholder.input")},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.handleClose}},[t._v(t._s(t.$t("cancel")))]),e("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("confirm")))])],1)],1)],1)}),[],!1,null,null,null).exports},data:()=>({tableData:[]}),methods:{handleCreate(){this.$refs.modal.open()},handleEdit(t){const e=Object(s.deepClone)(t);this.$refs.modal.open(e)},handleSwitch(){this.modifyNotice(this.tableData)},async handleDel({id:t}){const{ok:e}=await T({message:this.$t("msg.confirmDeletion")});if(e){const e=[];this.tableData.forEach(a=>{a.id!=t&&e.push(a)}),this.tableData=e,this.modifyNotice(e)}},async handleCopy(t){const e=await $();let a=t.remark||"";a.includes("[ -- copy -- ]")||(a="[ -- copy -- ]  "+a),e.push({...t,remark:a,switchOn:!1,id:Object(s.uniqueId)()}),this.modifyNotice(e),this.initList()},putData(t){this.tableData.push(t),this.modifyNotice(this.tableData)},async editData(t){const e=await $(),a=[];e.forEach(e=>{e.id==t.id?a.push(t):a.push(e)}),this.modifyNotice(a),this.initList(a)},modifyNotice(t){E(t),O(h,t)},async initList(){this.tableData=await $()}},mounted(){this.initList()}},J=(a("01b0"),Object(i.a)(I,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"request-container"},[e("el-button",{attrs:{type:"primary"},on:{click:t.handleCreate}},[t._v(t._s(t.$t("create")))]),e("Modal",{ref:"modal",on:{putData:t.putData,editData:t.editData}}),e("el-table",{staticStyle:{"margin-top":"20px"},attrs:{data:t.tableData,stripe:""}},[e("el-table-column",{attrs:{label:t.$t("status"),width:"100"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[e("el-switch",{on:{change:t.handleSwitch},model:{value:a.switchOn,callback:function(e){t.$set(a,"switchOn",e)},expression:"row.switchOn"}})]}}])}),e("el-table-column",{attrs:{label:t.$t("matchType"),width:"100"},scopedSlots:t._u([{key:"default",fn:function({row:e}){return[t._v(" "+t._s({normal:t.$t("normal"),regex:t.$t("regex")}[e.filterType||"normal"])+" ")]}}])}),e("el-table-column",{attrs:{prop:"domain",label:t.$t("domain"),"show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"redirect",label:t.$t("redirect"),"show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"remark",label:t.$t("remark"),"show-overflow-tooltip":""}}),e("el-table-column",{attrs:{label:t.$t("handle"),align:"center",width:"270"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[e("el-button",{attrs:{round:"",plain:""},on:{click:function(e){return t.handleEdit(a)}}},[t._v(t._s(t.$t("edit")))]),e("el-button",{attrs:{type:"danger",round:"",plain:""},on:{click:function(e){return t.handleDel(a)}}},[t._v(t._s(t.$t("del")))]),e("el-button",{attrs:{type:"primary",round:"",plain:""},on:{click:function(e){return t.handleCopy(a)}}},[t._v(t._s(t.$t("copy")))])]}}])})],1)],1)}),[],!1,null,"0a923e1e",null).exports),q=a("b625"),M=a("a925"),F=a("4897"),A=a.n(F),P=a("b2d6"),V=a.n(P),H=a("f0d9"),G=a.n(H),z=a("c87b"),W=a.n(z),U=a("c3ff"),B=a.n(U),K=a("8f86"),Y=a.n(K),Q=a("fcff"),X=a.n(Q),Z=a("dccd"),tt=a.n(Z);r.default.use(M.a);const et=new M.a({locale:"en",messages:{zh:{interceptor:"拦截器",redirector:"重定向",redirect:"重定向",create:"新增",edit:"编辑",del:"删除",copy:"复制",path:"路径",matchPath:"路径匹配",normal:"普通",regex:"正则",responseData:"响应数据",remark:"备注",tag:"标签",domain:"域名",updateRequestHeaders:"请求头修改",option:"选项",append:"添加",describe:"描述",exclusionList:"排除名单",noEmpty:"不能为空",confirm:"确 定",cancel:"取 消",searchTxt:"搜索",reset:"重置",status:"状态",matchType:"匹配类型",hit:"命中",handle:"操作",restore:"恢复",backup:"备份",msg:{pathNotEmpty:"请求路径不能为空",responseDataNotEmpty:"响应数据不能为空",domainNotEmpty:"域名信息不能为空",redirectNotEmpty:"重定向地址不能为空",keyNotEmpty:"key值不能为空",valueNotEmpty:"value值不能为空",jsonFormatError:"JSON格式错误",confirmDeletion:"确认删除?",noDataToDownload:"没有数据可以下载",overrideData:"上传成功原文件会被覆盖",readJsonErr:"读取异常，文件可能不是一个JSON",dataErr:"数据异常",importEmpty:"你导入了一个空列表"},placeholder:{select:"请选择",input:"请输入"},...G.a},en:{interceptor:"Interceptor",redirector:"Redirector",redirect:"Redirect",create:"Create",edit:"Edit",del:"Delete",copy:"Copy",path:"Match",matchPath:"Match",normal:"Normal",regex:"Regex",responseData:"ResponseText",remark:"Remark",tag:"Tag",domain:"Domain",updateRequestHeaders:"Request header modificatio",option:"Option",append:"Append",describe:"Description",exclusionList:"Exclusion lis",noEmpty:"Cannot be empty",confirm:"OK",cancel:"Cancel",searchTxt:"Search",reset:"Reset",status:"Status",matchType:"Match type",hit:"Hit",handle:"Options",restore:"Restore",backup:"Backup",msg:{pathNotEmpty:"match is required",responseDataNotEmpty:"response text is required",domainNotEmpty:"Domain name information cannot be empty",redirectNotEmpty:"The redirection address cannot be empty",keyNotEmpty:"key cannot be empty",valueNotEmpty:"value cannot be empty",jsonFormatError:"JSON format error",confirmDeletion:"Are you sure you want to delete?",noDataToDownload:"There is no data to download",overrideData:"If the upload is successful, the original file will be overwritten",readJsonErr:"Read exception. The file may not be a JSON",dataErr:"Data exception",importEmpty:"You imported an empty list"},placeholder:{select:"Please select",input:"Please input"},...V.a},tw:{interceptor:"攔截器",redirector:"重定向",redirect:"重定向",create:"新增",edit:"編輯",del:"删除",copy:"複製",path:"路徑",matchPath:"路徑匹配",normal:"普通",regex:"正則",responseData:"響應數據",remark:"備註",tag:"標籤",domain:"域名",updateRequestHeaders:"請求頭修改",option:"選項",append:"添加",describe:"描述",exclusionList:"排除名單",noEmpty:"不能為空",confirm:"確 定",cancel:"取 消",searchTxt:"蒐索",reset:"重置",status:"狀態",matchType:"匹配類型",hit:"命中",handle:"操作",restore:"恢復",backup:"備份",msg:{pathNotEmpty:"請求路徑不能為空",responseDataNotEmpty:"響應數據不能為空",domainNotEmpty:"域名資訊不能為空",redirectNotEmpty:"重定向地址不能為空",keyNotEmpty:"key值不能為空",valueNotEmpty:"value值不能為空",jsonFormatError:"JSON格式錯誤",confirmDeletion:"確認删除?",noDataToDownload:"沒有數據可以下載",overrideData:"上傳成功原檔案會被覆蓋",readJsonErr:"讀取异常，檔案可能不是一個JSON",dataErr:"數據异常",importEmpty:"你導入了一個空清單"},placeholder:{select:"請選擇",input:"請輸入"},...W.a},ja:{interceptor:"ブロッキング",redirector:"リダイレクト",redirect:"リダイレクト",create:"新規作成",edit:"編集",del:"削除",copy:"コピー",path:"パス",matchPath:"パスマッチング",normal:"通常",regex:"正則",responseData:"レスポンスデータ",remark:"コメント",tag:"タブ",domain:"ドメイン名",updateRequestHeaders:"要求ヘッダの変更",option:"オプション",append:"追加",describe:"説明",exclusionList:"除外リスト",noEmpty:"空にできません",confirm:"を選択します。",cancel:"キャンセル",searchTxt:"検索",reset:"リセット",status:"状態",matchType:"照合タイプ",hit:"ヒット",handle:"操作",restore:"リカバリ",backup:"バックアップ",msg:{pathNotEmpty:"要求パスは空にできません",responseDataNotEmpty:"応答データを空にすることはできません",domainNotEmpty:"ドメイン名情報は空にできません",redirectNotEmpty:"リダイレクトアドレスは空にできません",keyNotEmpty:"key値は空にできません",valueNotEmpty:"value値は空にできません",jsonFormatError:"JSON形式エラー",confirmDeletion:"削除の確認?",noDataToDownload:"ダウンロードできるデータがありません",overrideData:"アップロードに成功すると、元のファイルが上書きされます。",readJsonErr:"読み込み異常、ファイルがJSONでない可能性があります",dataErr:"データ異常",importEmpty:"空のリストをインポートしました"},placeholder:{select:"選択してください",input:"入力してください"},...B.a},fr:{interceptor:"Intercepteur",redirector:"Redirection",redirect:"Redirection",create:"Nouveau",edit:"Édition",del:"Supprimer",copy:"Copier",path:"Le chemin",matchPath:"Correspondance",normal:"Fréquent",regex:"Regular",responseData:"Données de réponse",remark:"Remarques",tag:"Étiquettes",domain:"Nom de domaine",updateRequestHeaders:"Modification de l'en - tête de la demande",option:"Options",append:"Ajouter",describe:"Description",exclusionList:"Liste d'exclusion",noEmpty:"Ne peut pas être vide",confirm:"C'est sûr.",cancel:"Annulation",searchTxt:"Recherche",reset:"Réinitialiser",status:"Statut",matchType:"Type de correspondance",hit:"Hit",handle:"Fonctionnement",restore:"Reprise",backup:"Sauvegarde",msg:{pathNotEmpty:"Le chemin de requête ne peut pas être vide",responseDataNotEmpty:"Les données de réponse ne peuvent pas être vides",domainNotEmpty:"Les informations sur le nom de domaine ne peuvent pas être vides",redirectNotEmpty:"L'adresse de redirection ne peut pas être vide",keyNotEmpty:"La valeur de la clé ne peut pas être vide",valueNotEmpty:"La valeur ne peut pas être vide",jsonFormatError:"Erreur de format json",confirmDeletion:"Confirmer la suppression?",noDataToDownload:"Aucune donnée à télécharger",overrideData:"Le fichier original sera écrasé si le téléchargement réussit",readJsonErr:"Exception de lecture, le fichier peut ne pas être un json",dataErr:"Données anormales",importEmpty:"Vous avez importé une liste vide"},placeholder:{select:"Veuillez sélectionner",input:"Veuillez entrer"},...Y.a},ko:{interceptor:"차단기",redirector:"방향을 바꾸다",redirect:"방향을 바꾸다",create:"신설",edit:"편집자",del:"삭제",copy:"복제하다",path:"경로",matchPath:"경로 일치",normal:"여간하다",regex:"정칙",responseData:"응답 데이터",remark:"비고",tag:"라벨",domain:"도메인 이름",updateRequestHeaders:"헤더 수정 요청",option:"옵션",append:"덧붙이다",describe:"묘사",exclusionList:"명단을 제외하다",noEmpty:"공백일 수 없습니다.",confirm:"확정하다",cancel:"취소",searchTxt:"수색하다",reset:"재설정",status:"컨디션",matchType:"일치 유형",hit:"명중하다",handle:"조작하다",restore:"되살리다",backup:"백업",msg:{pathNotEmpty:"요청 경로가 비어 있을 수 없습니다",responseDataNotEmpty:"응답 데이터는 비워둘 수 없습니다.",domainNotEmpty:"도메인 이름은 비워 둘 수 없습니다.",redirectNotEmpty:"주소 리디렉션은 비워 둘 수 없습니다.",keyNotEmpty:"키 값은 비워둘 수 없습니다.",valueNotEmpty:"value 값은 비워 둘 수 없습니다.",jsonFormatError:"JSON 형식 오류",confirmDeletion:"삭제 확인?",noDataToDownload:"다운로드할 데이터가 없습니다.",overrideData:"업로드에 성공한 원본 파일을 덮어씁니다",readJsonErr:"읽기 예외, 파일이 JSON이 아닐 수 있음",dataErr:"데이터 예외",importEmpty:"빈 목록을 가져왔습니다"},placeholder:{select:"선택하십시오.",input:"입력하십시오."},...X.a},ru:{interceptor:"перехватчик",redirector:"Перенаправление",redirect:"Перенаправление",create:"Добавить",edit:"редактор",del:"Удалить",copy:"копировать",path:"путь",matchPath:"согласование путей",normal:"обычный",regex:"регулярный",responseData:"данные ответа",remark:"Примечание",tag:"метка",domain:"доменное имя",updateRequestHeaders:"заголовок запроса",option:"Параметры",append:"Добавить",describe:"описание",exclusionList:"исключить список",noEmpty:"не может быть пустым",confirm:"определение",cancel:"отмена",searchTxt:"поиск",reset:"сбросить",status:"состояние",matchType:"Тип согласования",hit:"попадание",handle:"операция",restore:"восстановить",backup:"резервная копия",msg:{pathNotEmpty:"путь запроса не может быть пустым",responseDataNotEmpty:"данные ответа не могут быть пустыми",domainNotEmpty:"Информация о домене не может быть пустой",redirectNotEmpty:"адрес перенаправления не может быть пустым",keyNotEmpty:"значение key не может быть пустым",valueNotEmpty:"значение value не может быть пустым",jsonFormatError:"ошибка формата JSON",confirmDeletion:"Подтверждение удаления?",noDataToDownload:"Нет данных, которые можно загрузить",overrideData:"Файл будет перезаписан",readJsonErr:"Ошибка чтения файла может быть не JSON",dataErr:"аномалия данных",importEmpty:"вы импортировали пустой список"},placeholder:{select:"Выберите",input:"Введите пожалуйста"},...tt.a},ie:{interceptor:"Interceptor",redirector:"athdhírigh",redirect:"athdhírigh",create:"tógáil nua",edit:"eagar",del:"Scrios",copy:"cóipeáil",path:"ruta",matchPath:"Path matching",normal:"gnáth",regex:"rialta",responseData:"Sonraí freagra",remark:"ráitis",tag:"label",domain:"domain name",updateRequestHeaders:"Request header modification",option:"rogha",append:"Cuir leis",describe:"tuairisc",exclusionList:"Liosta eisiamh",noEmpty:"Ní féidir a bheith folamh",confirm:"cinneadh",cancel:"Cealaigh",searchTxt:"cuardaigh",reset:"Athshocraigh",status:"Stádas",matchType:"Cineál comhoiriúnach",hit:"Cruthaigh",handle:"oibríocht",restore:"athshlánú",backup:"cúltaca",msg:{pathNotEmpty:"Ní féidir conair an iarratais a bheith folamh",responseDataNotEmpty:"Ní féidir sonraí freagra a bheith folamh",domainNotEmpty:"Ní féidir eolas faoi ainm an fhearainn a bheith folamh",redirectNotEmpty:"Ní féidir seoladh athdhírithe a bheith folamh",keyNotEmpty:"Ní féidir an luach eochrach a bheith folamh",valueNotEmpty:"Ní féidir luach a bheith folamh",jsonFormatError:"Earráid fhormáide JSON",confirmDeletion:"deimhnigh scriosadh?",noDataToDownload:"Gan sonraí le híosluchtú",overrideData:"Má tá an t- uasluchtú rathúil, sárófar an bunchomhad",readJsonErr:"Reading exception. The file may not be a JSON",dataErr:"Eisceachta sonraí",importEmpty:"Iompórtáil tú liosta folamh"},placeholder:{select:"Roghnaigh le do thoil",input:"Iontráil le do thoil"},...V.a}}});A.a.i18n((t,e)=>et.t(t,e));var at=et;const rt=[{value:"en",label:"English"},{value:"zh",label:"简体中文"},{value:"tw",label:"繁體中文"},{value:"ja",label:"日本語"},{value:"fr",label:"Français"},{value:"ko",label:"한국어"},{value:"ru",label:"Русский"},{value:"ie",label:"Gaeilge"}];var it={components:{IntercepTable:L,RedirecTable:J},data:()=>({switchOn:!1,language:"",currentMode:"",Langs:rt}),methods:{linkToGithub(){window.open("https://github.com/g0ngjie/ajax-proxy","_blank")},async handleDownload(){const{ok:t,data:e}=await new Promise(t=>{if(chrome.storage){const{LANG:e,SWITCH:a,ROUTES:r,TAGS:i,MODE:o,REDIRECT:n}=l;chrome.storage.local.get([e,a,r,i,o,n],e=>{t({ok:!0,data:e})})}else t({ok:!1})});if(!t)return this.$message.warning(this.$t("msg.dataErr"));const{ok:a,data:r}=await async function({message:t="",title:e="",inputValue:a=""}){const{action:r,value:i}=await S.a.prompt(t,e,{inputValue:a}).catch(()=>({ok:!1}));return{ok:"confirm"===r,data:i}}({title:this.$t("backup"),inputValue:"backup"});if(!a)return;const{lang:i,proxy_routes:o,tags:n,mode:s,redirect:c}=e||{};if(0===(null==o?void 0:o.length))return this.$message.warning(this.$t("msg.noDataToDownload"));Object(q.a)(JSON.stringify({lang:i,proxy_routes:o,tags:n,mode:s,redirect:c}),r+".json")},handleUpload(t){let e=new FileReader;const{overrideData:a,readJsonErr:r}=this.$t("msg");e.onload=async t=>{try{let e=JSON.parse(t.target.result);const r=await g();if(!e)return;if(r.length>0){const{ok:t}=await T({message:a});t&&this.setStoreData(e)}else this.setStoreData(e)}catch(t){this.$message.error(r)}},e.readAsText(t.raw)},setStoreData({lang:t,proxy_routes:e,tags:a,mode:r,redirect:i}){const{importEmpty:o}=this.$t("msg");var n,l,c;"array"===Object(s.typeIs)(e)&&e.length>0?(b(e),null===(n=this.$refs.table)||void 0===n||n.initList()):this.$message.warning(o);"array"===Object(s.typeIs)(a)&&a.length>0&&(v(a),null===(l=this.$refs.table)||void 0===l||l.initTags());(t&&(y(t),this.initData()),r&&(k(r),this.currentMode),"array"===Object(s.typeIs)(i)&&i.length>0)&&(E(i),null===(c=this.$refs.redirecTable)||void 0===c||c.initList())},handleLangChange(t){this.$i18n.locale=t,y(t)},handleModeChange(t){O(u,t),k(t)},handleSwitch(t){O(c,t),function(t){f(l.SWITCH,t)}(t)},async initData(){this.switchOn=await async function(){const{ok:t,data:e}=await m(l.SWITCH);return!!t&&e}();const t=await async function(){const{ok:t,data:e}=await m(l.LANG);return t?e:"en"}();this.language=t,this.$i18n.locale=t,this.currentMode=await async function(){const{ok:t,data:e}=await m(l.MODE);return t?e:"interceptor"}()}},created(){this.initData()}},ot=(a("db5b"),Object(i.a)(it,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"app-container"},[e("div",{staticClass:"global-switch"},[e("section",[e("i",{staticClass:"el-icon-switch-button"}),e("el-switch",{on:{change:t.handleSwitch},model:{value:t.switchOn,callback:function(e){t.switchOn=e},expression:"switchOn"}})],1),e("section",[t.switchOn?e("section",[e("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"info",round:"",plain:""},on:{click:t.handleDownload}},[t._v(t._s(t.$t("backup")))]),e("el-upload",{staticStyle:{"margin-right":"20px"},attrs:{action:"","auto-upload":!1,"on-change":t.handleUpload,"show-file-list":!1}},[e("el-button",{attrs:{type:"info",round:""}},[t._v(t._s(t.$t("restore")))])],1),e("el-radio-group",{staticStyle:{"margin-right":"10px"},on:{change:t.handleModeChange},model:{value:t.currentMode,callback:function(e){t.currentMode=e},expression:"currentMode"}},[e("el-radio-button",{attrs:{label:"interceptor"}},[t._v(t._s(t.$t("interceptor")))]),e("el-radio-button",{attrs:{label:"redirector"}},[t._v(t._s(t.$t("redirector")))])],1),e("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"language"},on:{change:t.handleLangChange},model:{value:t.language,callback:function(e){t.language=e},expression:"language"}},t._l(t.Langs,(function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22"},on:{click:t.linkToGithub}},[e("path",{attrs:{d:"M20.48 503.72608c0 214.4256 137.4208 396.73856 328.94976 463.6672 25.8048 6.5536 21.87264-11.8784 21.87264-24.33024v-85.07392c-148.93056 17.44896-154.86976-81.1008-164.94592-97.52576-20.23424-34.52928-67.91168-43.33568-53.69856-59.76064 33.91488-17.44896 68.48512 4.42368 108.46208 63.61088 28.95872 42.88512 85.44256 35.6352 114.15552 28.4672a138.8544 138.8544 0 0 1 38.0928-66.7648c-154.25536-27.60704-218.60352-121.77408-218.60352-233.79968 0-54.31296 17.94048-104.2432 53.0432-144.54784-22.36416-66.43712 2.08896-123.24864 5.3248-131.6864 63.81568-5.7344 130.00704 45.6704 135.168 49.68448 36.2496-9.78944 77.57824-14.9504 123.82208-14.9504 46.4896 0 88.064 5.3248 124.5184 15.23712 12.288-9.4208 73.80992-53.53472 133.12-48.128 3.15392 8.43776 27.0336 63.93856 6.02112 129.4336 35.59424 40.38656 53.69856 90.76736 53.69856 145.24416 0 112.18944-64.7168 206.4384-219.42272 233.71776a140.0832 140.0832 0 0 1 41.7792 99.9424v123.4944c0.86016 9.87136 0 19.6608 16.50688 19.6608 194.31424-65.49504 334.2336-249.15968 334.2336-465.5104C1002.57792 232.48896 782.66368 12.77952 511.5904 12.77952 240.18944 12.65664 20.48 232.40704 20.48 503.72608z"}})])],1):t._e()])]),e("transition",{attrs:{name:"fade",mode:"out-in"}},[t.switchOn?e("section",[e("transition",{attrs:{name:"fade",mode:"out-in"}},["interceptor"===t.currentMode?e("IntercepTable",{ref:"table"}):e("RedirecTable",{ref:"redirecTable"})],1)],1):e("div",{staticClass:"closed-container"},[e("i",{staticClass:"el-icon-close-notification"})])])],1)}),[],!1,null,"edc10280",null).exports);r.default.use(n.a);var nt=new n.a({routes:[{path:"/",component:ot}]}),st=(a("0fb7"),a("f529")),lt=a.n(st),ct=(a("f4f9"),a("c2cc")),dt=a.n(ct),pt=(a("7a0f"),a("0f6c")),ut=a.n(pt),ht=(a("cbb5"),a("8bbc")),mt=a.n(ht),ft=(a("0fb4"),a("9944")),yt=a.n(ft),bt=(a("915d"),a("e04d")),gt=a.n(bt),vt=(a("f225"),a("89a9")),wt=a.n(vt),kt=(a("eca7"),a("3787")),Et=a.n(kt),$t=(a("425f"),a("4105")),Dt=a.n($t),xt=(a("0c67"),a("299c")),_t=a.n(xt),Nt=(a("5466"),a("ecdf")),St=a.n(Nt),Tt=(a("38a0"),a("ad41")),Ot=a.n(Tt),Ct=(a("3c52"),a("0d7b")),jt=a.n(Ct),Lt=(a("fe07"),a("6ac5")),Rt=a.n(Lt),It=(a("1951"),a("eedf")),Jt=a.n(It),qt=(a("6611"),a("e772")),Mt=a.n(qt),Ft=(a("1f1a"),a("4e4b")),At=a.n(Ft),Pt=(a("e960"),a("b35b")),Vt=a.n(Pt),Ht=(a("10cb"),a("f3ad")),Gt=a.n(Ht),zt=(a("a7cc"),a("df33")),Wt=a.n(zt);r.default.use(Wt.a),r.default.use(Gt.a),r.default.use(Vt.a),r.default.use(At.a),r.default.use(Mt.a),r.default.use(Jt.a),r.default.use(Rt.a),r.default.use(jt.a),r.default.use(Ot.a),r.default.use(St.a),r.default.use(_t.a),r.default.use(Dt.a),r.default.use(Et.a),r.default.use(wt.a),r.default.use(gt.a),r.default.use(yt.a),r.default.use(mt.a),r.default.use(ut.a),r.default.use(dt.a),r.default.prototype.$msgbox=S.a,r.default.prototype.$alert=S.a.alert,r.default.prototype.$confirm=S.a.confirm,r.default.prototype.$prompt=S.a.prompt,r.default.prototype.$message=lt.a;a("1e09");r.default.prototype.$ELEMENT={size:"mini"},r.default.config.productionTip=!1,new r.default({router:nt,i18n:at,render:t=>t(o)}).$mount("#app")},6:function(t,e){},"6d04":function(t,e,a){},"6d68":function(t,e,a){},7:function(t,e){},"7be5":function(t,e,a){},8:function(t,e){},9:function(t,e){},a065:function(t,e,a){"use strict";a("0543")},d2f8:function(t,e,a){"use strict";a("55ae")},db5b:function(t,e,a){"use strict";a("7be5")},dcbc:function(t,e,a){"use strict";a("f704")},ebbe:function(t,e,a){},f704:function(t,e,a){}},[[0,"runtime","npm.element-ui","npm.babel-runtime","npm.alrale","npm.async-validator","npm.browserify-sign","npm.browserify-aes","npm.elliptic","npm.hash-base","npm.asn1.js","npm.readable-stream","npm.hash.js","npm.vue-json-editor","npm.browserify-rsa","npm.bn.js","npm.buffer","npm.resize-observer-polyfill","npm.vue-i18n","npm.vue-router","npm.vue","vendors~app"]]]);