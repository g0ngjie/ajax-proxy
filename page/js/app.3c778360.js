(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"0b8c":function(e,t,r){"use strict";r("8c18")},1:function(e,t){},10:function(e,t){},"1e09":function(e,t,r){},2:function(e,t){},3:function(e,t){},"3a2c":function(e,t,r){},"3a5b":function(e,t,r){"use strict";r("3a2c")},4:function(e,t){},"4d21":function(e,t,r){},5:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=(r("034f"),r("3a5b"),r("2877")),o=Object(n.a)({},(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)}),[],!1,null,"1c6581ae",null).exports,i=r("8c4f"),s=r("1da1"),c=(r("96cf"),r("5530")),l=(r("b0c0"),r("ac1f"),r("466d"),r("159b"),r("caad"),r("2532"),r("ffb2")),u=r("ade3"),d=(r("d3b7"),"lang"),m="globalSwitchOn",f="proxy_routes",p="tags",h="mode",b="redirect",g="globalSwitchOn",v="proxy_routes",k="badge",w="mode",y="redirect";function x(e){return new Promise((function(t){chrome.storage?chrome.storage.local.get(e,(function(r){r.hasOwnProperty(e)?t({ok:!0,data:r[e]}):t({ok:!1})})):t({ok:!1})}))}function $(e,t){chrome.storage&&chrome.storage.local.set(Object(u.a)({},e,t))}function _(){return O.apply(this,arguments)}function O(){return(O=Object(s.a)(regeneratorRuntime.mark((function e(){var t,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(d);case 2:if(t=e.sent,r=t.ok,a=t.data,!r){e.next=7;break}return e.abrupt("return",a);case 7:return e.abrupt("return","en");case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e){$(d,e)}function R(){return D.apply(this,arguments)}function D(){return(D=Object(s.a)(regeneratorRuntime.mark((function e(){var t,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(m);case 2:if(t=e.sent,r=t.ok,a=t.data,!r){e.next=7;break}return e.abrupt("return",a);case 7:return e.abrupt("return",!1);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){$(f,e)}function C(){return T.apply(this,arguments)}function T(){return(T=Object(s.a)(regeneratorRuntime.mark((function e(){var t,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(f);case 2:if(t=e.sent,r=t.ok,a=t.data,!r){e.next=7;break}return e.abrupt("return",a);case 7:return e.abrupt("return",[]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e){$(p,e)}function M(){return I.apply(this,arguments)}function I(){return(I=Object(s.a)(regeneratorRuntime.mark((function e(){var t,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(p);case 2:if(t=e.sent,r=t.ok,a=t.data,!r){e.next=7;break}return e.abrupt("return",a);case 7:return e.abrupt("return",[]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(e){$(h,e)}function N(){return J.apply(this,arguments)}function J(){return(J=Object(s.a)(regeneratorRuntime.mark((function e(){var t,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(h);case 2:if(t=e.sent,r=t.ok,a=t.data,!r){e.next=7;break}return e.abrupt("return",a);case 7:return e.abrupt("return","interceptor");case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e){$(b,e)}function q(){return F.apply(this,arguments)}function F(){return(F=Object(s.a)(regeneratorRuntime.mark((function e(){var t,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(b);case 2:if(t=e.sent,r=t.ok,a=t.data,!r){e.next=7;break}return e.abrupt("return",a);case 7:return e.abrupt("return",[]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var z={components:{vueJsonEditor:r("45a3").a},data:function(){return{drawer:!1,json:{},cache:null}},methods:{show:function(e){this.cache=null,this.json=e,this.drawer=!0},onJsonChange:function(e){this.cache=e},handleSubmit:function(){this.$emit("change",this.cache||this.json),this.drawer=!1}}},A=(r("59e9"),{components:{JsonEditor:Object(n.a)(z,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"json-editor-container"},[r("el-drawer",{attrs:{size:"60%",visible:e.drawer,"with-header":!1},on:{"update:visible":function(t){e.drawer=t}}},[r("vue-json-editor",{attrs:{expandedOnStart:!0,mode:"form"},on:{"json-change":e.onJsonChange},model:{value:e.json,callback:function(t){e.json=t},expression:"json"}}),r("div",{staticClass:"json-editor-drawer__footer"},[r("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("drawer.btn")))])],1)],1)],1)}),[],!1,null,"a65d8a0a",null).exports},data:function(){return{isShow:!1,form:{},title:"",isEdit:!1,tags:[]}},methods:{handleOpenJsonEditor:function(e){try{var t=JSON.parse(e);this.$refs.jsonEditor.show(t)}catch(e){this.$message.error(this.$t("modal.msg.not_json"))}},handleJsonSubmit:function(e){this.form.override=JSON.stringify(e)},open:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,M();case 2:t.tags=r.sent,e?(t.isEdit=!0,t.title=t.$t("modal.title.edit")):(t.isEdit=!1,t.title=t.$t("modal.title.create")),t.isShow=!0,t.form=e||{remark:""},t.$nextTick((function(){return t.$refs.form.clearValidate()}));case 7:case"end":return r.stop()}}),r)})))()},handleClose:function(){this.isShow=!1},handleSubmit:function(){var e=this;this.$refs.form.validate((function(t){t&&e.createData()}))},createData:function(){this.isEdit?this.$emit("editData",this.form):this.$emit("putData",Object(c.a)(Object(c.a)({},this.form),{},{switchOn:!0,id:Object(l.uniqueId)()})),this.isShow=!1}}}),P=Object(n.a)(A,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"response-modal-container"},[r("el-dialog",{attrs:{title:e.title,visible:e.isShow,"before-close":e.handleClose,top:"1%",width:"80%"},on:{"update:visible":function(t){e.isShow=t}}},[r("el-form",{ref:"form",attrs:{model:e.form}},[r("el-form-item",{attrs:{label:e.$t("modal.form.match.name"),rules:[{required:!0,trigger:"change",message:e.$t("modal.form.match.msg")}],prop:"match"}},[r("el-input",{attrs:{placeholder:e.$t("modal.form.placeholder")},model:{value:e.form.match,callback:function(t){e.$set(e.form,"match",t)},expression:"form.match"}})],1),r("el-form-item",{attrs:{label:e.$t("modal.form.remark.name")}},[r("el-input",{attrs:{placeholder:e.$t("modal.form.placeholder")},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),r("el-form-item",{attrs:{label:e.$t("modal.form.tag.name")}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:e.$t("modal.form.tag.placeholder"),clearable:""},model:{value:e.form.tagId,callback:function(t){e.$set(e.form,"tagId",t)},expression:"form.tagId"}},e._l(e.tags,(function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:e.id}})})),1)],1),r("el-form-item",{attrs:{label:e.$t("modal.form.res.name"),rules:[{required:!0,trigger:"change",message:e.$t("modal.form.res.msg")}],prop:"override"}},[r("el-input",{attrs:{type:"textarea",rows:10,placeholder:e.$t("modal.form.placeholder")},model:{value:e.form.override,callback:function(t){e.$set(e.form,"override",t)},expression:"form.override"}})],1),r("el-button",{attrs:{type:"primary",disabled:!e.form.override},on:{click:function(t){return e.handleOpenJsonEditor(e.form.override)}}},[e._v("JSON Editor")])],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.handleClose}},[e._v(e._s(e.$t("modal.btn.cancel")))]),r("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("modal.btn.confirm")))])],1)],1),r("JsonEditor",{ref:"jsonEditor",on:{change:e.handleJsonSubmit}})],1)}),[],!1,null,null,null).exports,H=(r("9e1f"),r("450d"),r("6ed5")),K=r.n(H);function B(e){return U.apply(this,arguments)}function U(){return(U=Object(s.a)(regeneratorRuntime.mark((function e(t){var r,a,n,o,i,s,c,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.message,a=void 0===r?"":r,n=t.title,o=void 0===n?"":n,i=t.confirmText,s=t.cancelText,c=t.type,e.next=3,K.a.confirm(a,o,{confirmButtonText:i,cancelButtonText:s,type:c}).catch((function(){return{ok:!1}}));case 3:return l=e.sent,e.abrupt("return",{ok:"confirm"===l});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(e){return G.apply(this,arguments)}function G(){return(G=Object(s.a)(regeneratorRuntime.mark((function e(t){var r,a,n,o,i,s,c,l,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.message,a=void 0===r?"":r,n=t.title,o=void 0===n?"":n,i=t.inputValue,s=void 0===i?"":i,e.next=3,K.a.prompt(a,o,{inputValue:s}).catch((function(){return{ok:!1}}));case 3:return c=e.sent,l=c.action,u=c.value,e.abrupt("return",{ok:"confirm"===l,data:u});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(e,t){chrome.runtime&&chrome.runtime.sendMessage(chrome.runtime.id,{type:"__ajax_proxy",to:"background",key:e,value:t})}var W=r("15fd"),X=(r("d81d"),{data:function(){return{dynamicTags:[],inputVisible:!1,inputValue:""}},methods:{handleRemove:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=e.id,r.next=3,B({message:t.$t("confirMsg")});case 3:if(n=r.sent,n.ok){r.next=7;break}return r.abrupt("return");case 7:return o=[],t.dynamicTags.forEach((function(e){e.id!==a&&o.push(e)})),t.dynamicTags=o,r.next=12,t.refreshRoutes(a);case 12:t.refreshData(o);case 13:case"end":return r.stop()}}),r)})))()},refreshRoutes:function(e){return Object(s.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C();case 2:r=t.sent,S(r.map((function(t){t.tagId;var r=Object(W.a)(t,["tagId"]);return t.tagId&&t.tagId===e?r:t})));case 5:case"end":return t.stop()}}),t)})))()},handleTagStatus:function(e){e.used=!e.used,this.refreshData(this.dynamicTags)},showInput:function(){var e=this;this.inputVisible=!0,this.$nextTick((function(t){e.$refs.saveTagInput.$refs.input.focus()}))},refreshData:function(e){E(e),this.$emit("initList")},handleInputConfirm:function(){var e=this.inputValue;e&&this.dynamicTags.push({id:Object(l.uniqueId)(),name:e,used:!1}),this.inputVisible=!1,this.inputValue="",this.refreshData(this.dynamicTags)},initList:function(){var e=this;return Object(s.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,M();case 2:e.dynamicTags=t.sent;case 3:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.initList()}}),Z=(r("c1aa"),{components:{Modal:P,Tag:Object(n.a)(X,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tag-container"},[e._l(e.dynamicTags,(function(t,a){return r("section",{key:a,staticClass:"tag-list"},[r("i",{staticClass:"el-icon-error",on:{click:function(r){return e.handleRemove(t)}}}),r("el-button",{attrs:{type:t.used?"primary":"",plain:""},on:{click:function(r){return e.handleTagStatus(t)}}},[e._v(e._s(t.name))])],1)})),e.inputVisible?r("el-input",{ref:"saveTagInput",staticStyle:{width:"100px"},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleInputConfirm(t)}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}):r("i",{staticClass:"el-icon-collection-tag",on:{click:e.showInput}})],2)}),[],!1,null,"69b000c3",null).exports},data:function(){return{searchForm:{},tableData:[],tagMapping:{}}},methods:{handleTagClose:function(e){delete e.hit,S(this.tableData),Q(k,null),this.initList()},initTags:function(){this.$refs.tag.initList()},fmtTag:function(e){var t,r=e.tagId,a=this.tagMapping;if("object"===Object(l.typeIs)(a)&&r)return null===(t=a[r])||void 0===t?void 0:t.name},handleSearch:function(){var e=this.searchForm,t=e.match,r=e.remark;if(t||r){var a=[];t&&this.tableData.forEach((function(e){e.match&&e.match.includes(t)&&a.push(e)})),r&&this.tableData.forEach((function(e){e.remark&&e.remark.includes(r)&&a.push(e)})),a.length>0?this.initList(a):this.initList()}else this.initList()},handleReset:function(){this.searchForm={},this.initList()},handleCreate:function(){this.$refs.modal.open()},handleEdit:function(e){var t=Object(l.deepClone)(e);this.$refs.modal.open(t)},handleSwitch:function(){this.modifyNotice(this.tableData)},handleDel:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=e.id,r.next=3,B({message:t.$t("confirMsg")});case 3:if(n=r.sent,!n.ok){r.next=13;break}return o=[],r.next=9,C();case 9:r.sent.forEach((function(e){e.id!=a&&o.push(e)})),t.modifyNotice(o),t.initList(o);case 13:case"end":return r.stop()}}),r)})))()},handleCopy:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,C();case 2:a=r.sent,(n=e.remark||"").includes("[ -- copy -- ]")||(n="[ -- copy -- ]  "+n),a.push(Object(c.a)(Object(c.a)({},e),{},{remark:n,switchOn:!1,id:Object(l.uniqueId)()})),t.modifyNotice(a),t.initList(a);case 8:case"end":return r.stop()}}),r)})))()},putData:function(e){this.tableData.push(e),this.modifyNotice(this.tableData)},editData:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,C();case 2:a=r.sent,n=[],a.forEach((function(t){t.id==e.id?n.push(e):n.push(t)})),t.modifyNotice(n),t.initList(n);case 7:case"end":return r.stop()}}),r)})))()},modifyNotice:function(e){S(e),Q(v,e)},initList:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n,o,i,s,c,u,d,m,f,p,h;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e||(t.searchForm={}),r.next=3,M();case 3:if(a=r.sent,t.tagMapping=Object(l.arrayToObject)("id",a),r.t0=e,r.t0){r.next=10;break}return r.next=9,C();case 9:r.t0=r.sent;case 10:if(n=r.t0,"array"!==Object(l.typeIs)(a)){r.next=41;break}if(0!==a.length){r.next=17;break}return t.tableData=n,r.abrupt("return");case 17:for(o=[],i=0;i<a.length;i++)(s=a[i].used)&&o.push(s);if(0!==o.length){r.next=22;break}return t.tableData=n,r.abrupt("return");case 22:c=[],u=0;case 24:if(!(u<n.length)){r.next=38;break}d=n[u],m=0;case 27:if(!(m<a.length)){r.next=35;break}if(f=a[m],p=f.used,h=f.id,!p||d.tagId!==h){r.next=32;break}return c.push(d),r.abrupt("break",35);case 32:m++,r.next=27;break;case 35:u++,r.next=24;break;case 38:t.tableData=c,r.next=42;break;case 41:t.tableData=n;case 42:case"end":return r.stop()}}),r)})))()},listenerFix:function(){var e=this;chrome.runtime&&chrome.runtime.onMessage.addListener((function(t){var r=t.type,a=t.to;"__ajax_proxy"===r&&"page"===a&&e.initList()}))}},mounted:function(){this.initList(),this.listenerFix()}}),ee=(r("d2b2"),Object(n.a)(Z,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"response-container"},[r("el-button",{attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("create")))]),r("section",{staticClass:"tags"},[r("Tag",{ref:"tag",on:{initList:e.initList}})],1),r("section",{staticClass:"tips"},[r("el-alert",{attrs:{title:e.$t("errTips"),type:"error",closable:!1}})],1),r("Modal",{ref:"modal",on:{putData:e.putData,editData:e.editData}}),r("section",[r("el-form",{attrs:{inline:!0,model:e.searchForm}},[r("el-form-item",{attrs:{label:e.$t("search.match.name")}},[r("el-input",{attrs:{clearable:"",placeholder:e.$t("search.match.placeholder")},model:{value:e.searchForm.match,callback:function(t){e.$set(e.searchForm,"match",t)},expression:"searchForm.match"}})],1),r("el-form-item",{attrs:{label:e.$t("search.remark.name")}},[r("el-input",{attrs:{clearable:"",placeholder:e.$t("search.remark.placeholder")},model:{value:e.searchForm.remark,callback:function(t){e.$set(e.searchForm,"remark",t)},expression:"searchForm.remark"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.handleSearch}},[e._v(e._s(e.$t("search.btn.search")))]),r("el-button",{on:{click:e.handleReset}},[e._v(e._s(e.$t("search.btn.reset")))])],1)],1)],1),r("el-table",{attrs:{data:e.tableData,stripe:""}},[r("el-table-column",{attrs:{label:e.$t("table.columns.switch"),width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-switch",{on:{change:e.handleSwitch},model:{value:a.switchOn,callback:function(t){e.$set(a,"switchOn",t)},expression:"row.switchOn"}})]}}])}),r("el-table-column",{attrs:{prop:"match",label:e.$t("table.columns.match"),"show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"override",label:e.$t("table.columns.res"),"show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"remark",label:e.$t("table.columns.remark"),"show-overflow-tooltip":""}}),r("el-table-column",{attrs:{label:e.$t("table.columns.tag"),formatter:e.fmtTag,"show-overflow-tooltip":"",width:"100"}}),r("el-table-column",{attrs:{label:e.$t("table.columns.hit"),align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[a.hit?r("el-tag",{attrs:{type:"info",closable:""},on:{close:function(t){return e.handleTagClose(a)}}},[e._v(" "+e._s(a.hit)+" ")]):e._e()]}}])}),r("el-table-column",{attrs:{label:e.$t("table.columns.options"),align:"center",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-button",{attrs:{round:"",plain:""},on:{click:function(t){return e.handleEdit(a)}}},[e._v(e._s(e.$t("table.btn.edit")))]),r("el-button",{attrs:{type:"danger",round:"",plain:""},on:{click:function(t){return e.handleDel(a)}}},[e._v(e._s(e.$t("table.btn.del")))]),r("el-button",{attrs:{type:"primary",round:"",plain:""},on:{click:function(t){return e.handleCopy(a)}}},[e._v(e._s(e.$t("table.btn.copy")))])]}}])})],1)],1)}),[],!1,null,"2b5aaa9f",null).exports),te=(r("a434"),{data:function(){return{isShow:!1,form:{},title:"",isEdit:!1,tags:[]}},methods:{handleHeaderAdd:function(){this.form.headers.push({description:"",key:"",value:""})},handleDel:function(e){this.form.headers.splice(e,1)},open:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,M();case 2:t.tags=r.sent,e?(t.isEdit=!0,t.title=t.$t("modal.title.edit")):(t.isEdit=!1,t.title=t.$t("modal.title.create")),t.isShow=!0,t.form=e||{remark:"",headers:[]},t.$nextTick((function(){return t.$refs.form.clearValidate()}));case 7:case"end":return r.stop()}}),r)})))()},handleClose:function(){this.isShow=!1},handleSubmit:function(){var e=this;this.$refs.form.validate((function(t){t&&e.createData()}))},createData:function(){this.isEdit?this.$emit("editData",this.form):this.$emit("putData",Object(c.a)(Object(c.a)({},this.form),{},{switchOn:!0,id:Object(l.uniqueId)()})),this.isShow=!1}}}),re={components:{Modal:Object(n.a)(te,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"response-modal-container"},[r("el-dialog",{attrs:{title:e.title,visible:e.isShow,"before-close":e.handleClose,top:"1%",width:"80%"},on:{"update:visible":function(t){e.isShow=t}}},[r("el-form",{ref:"form",attrs:{model:e.form}},[r("el-form-item",{attrs:{label:e.$t("modal.form.domain.name"),rules:[{required:!0,trigger:"change",message:e.$t("modal.form.domain.msg")}],prop:"domain"}},[r("el-input",{attrs:{placeholder:e.$t("modal.form.domain.placeholder")},model:{value:e.form.domain,callback:function(t){e.$set(e.form,"domain",t)},expression:"form.domain"}})],1),r("el-form-item",{attrs:{label:e.$t("modal.form.redirect.name"),rules:[{required:!0,trigger:"change",message:e.$t("modal.form.redirect.msg")}],prop:"redirect"}},[r("el-input",{attrs:{placeholder:e.$t("modal.form.redirect.placeholder")},model:{value:e.form.redirect,callback:function(t){e.$set(e.form,"redirect",t)},expression:"form.redirect"}})],1),r("el-form-item",{attrs:{label:e.$t("modal.form.headers.name")}},[r("section",{staticStyle:{padding:"0 20px"}},[r("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"text"},on:{click:e.handleHeaderAdd}},[e._v("+"+e._s(e.$t("modal.form.headers.append")))]),r("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:24}},[r("el-col",{attrs:{span:7}},[e._v(e._s(e.$t("modal.form.headers.key")))]),r("el-col",{attrs:{span:7}},[e._v(e._s(e.$t("modal.form.headers.value")))]),r("el-col",{attrs:{span:7}},[e._v(e._s(e.$t("modal.form.headers.description")))]),r("el-col",{attrs:{span:3}},[e._v(e._s(e.$t("modal.form.headers.option")))])],1),e._l(e.form.headers,(function(t,a){return r("el-row",{key:a,staticClass:"complex-row",attrs:{gutter:24}},[r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{rules:[{required:!0,message:e.$t("modal.form.headers.keyMsg"),trigger:"change"}],prop:"headers["+a+"].key"}},[r("el-input",{attrs:{placeholder:e.$t("modal.form.placeholder")},model:{value:e.form.headers[a].key,callback:function(t){e.$set(e.form.headers[a],"key",t)},expression:"form.headers[index].key"}})],1)],1),r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{rules:[{required:!0,message:e.$t("modal.form.headers.valueMsg"),trigger:"change"}],prop:"headers["+a+"].value"}},[r("el-input",{attrs:{placeholder:e.$t("modal.form.placeholder")},model:{value:e.form.headers[a].value,callback:function(t){e.$set(e.form.headers[a],"value",t)},expression:"form.headers[index].value"}})],1)],1),r("el-col",{attrs:{span:7}},[r("el-form-item",[r("el-input",{attrs:{placeholder:e.$t("modal.form.placeholder")},model:{value:e.form.headers[a].description,callback:function(t){e.$set(e.form.headers[a],"description",t)},expression:"form.headers[index].description"}})],1)],1),r("el-col",{attrs:{span:3}},[r("el-button",{staticClass:"text-btn-underline",attrs:{type:"text"},on:{click:function(t){return t.stopPropagation(),e.handleDel(a)}}},[e._v(e._s(e.$t("modal.form.headers.delete")))])],1)],1)}))],2)]),r("el-form-item",{attrs:{label:e.$t("modal.form.remark.name")}},[r("el-input",{attrs:{type:"textarea",rows:5,placeholder:e.$t("modal.form.placeholder")},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.handleClose}},[e._v(e._s(e.$t("modal.btn.cancel")))]),r("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("modal.btn.confirm")))])],1)],1)],1)}),[],!1,null,null,null).exports},data:function(){return{tableData:[]}},methods:{handleCreate:function(){this.$refs.modal.open()},handleEdit:function(e){var t=Object(l.deepClone)(e);this.$refs.modal.open(t)},handleSwitch:function(){this.modifyNotice(this.tableData)},handleDel:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=e.id,r.next=3,B({message:t.$t("confirMsg")});case 3:n=r.sent,n.ok&&(o=[],t.tableData.forEach((function(e){e.id!=a&&o.push(e)})),t.tableData=o,t.modifyNotice(o));case 6:case"end":return r.stop()}}),r)})))()},handleCopy:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,q();case 2:a=r.sent,(n=e.remark||"").includes("[ -- copy -- ]")||(n="[ -- copy -- ]  "+n),a.push(Object(c.a)(Object(c.a)({},e),{},{remark:n,switchOn:!1,id:Object(l.uniqueId)()})),t.modifyNotice(a),t.initList();case 8:case"end":return r.stop()}}),r)})))()},putData:function(e){this.tableData.push(e),this.modifyNotice(this.tableData)},editData:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,q();case 2:a=r.sent,n=[],a.forEach((function(t){t.id==e.id?n.push(e):n.push(t)})),t.modifyNotice(n),t.initList(n);case 7:case"end":return r.stop()}}),r)})))()},modifyNotice:function(e){V(e),Q(y,e)},initList:function(){var e=this;return Object(s.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q();case 2:e.tableData=t.sent;case 3:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.initList()}},ae=(r("e7e5"),Object(n.a)(re,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"request-container"},[r("el-button",{attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("create")))]),r("Modal",{ref:"modal",on:{putData:e.putData,editData:e.editData}}),r("el-table",{staticStyle:{"margin-top":"20px"},attrs:{data:e.tableData,stripe:""}},[r("el-table-column",{attrs:{label:e.$t("table.columns.switch"),width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-switch",{on:{change:e.handleSwitch},model:{value:a.switchOn,callback:function(t){e.$set(a,"switchOn",t)},expression:"row.switchOn"}})]}}])}),r("el-table-column",{attrs:{prop:"domain",label:e.$t("table.columns.domain"),"show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"redirect",label:e.$t("table.columns.redirect"),"show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"remark",label:e.$t("table.columns.remark"),"show-overflow-tooltip":""}}),r("el-table-column",{attrs:{label:e.$t("table.columns.options"),align:"center",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[r("el-button",{attrs:{round:"",plain:""},on:{click:function(t){return e.handleEdit(a)}}},[e._v(e._s(e.$t("table.btn.edit")))]),r("el-button",{attrs:{type:"danger",round:"",plain:""},on:{click:function(t){return e.handleDel(a)}}},[e._v(e._s(e.$t("table.btn.del")))]),r("el-button",{attrs:{type:"primary",round:"",plain:""},on:{click:function(t){return e.handleCopy(a)}}},[e._v(e._s(e.$t("table.btn.copy")))])]}}])})],1)],1)}),[],!1,null,"69414e98",null).exports),ne=r("b625"),oe={components:{IntercepTable:ee,RedirecTable:ae},data:function(){return{switchOn:!1,language:"",currentMode:""}},methods:{handleDownload:function(){var e=this;return Object(s.a)(regeneratorRuntime.mark((function t(){var r,a,n,o,i,s,c,l,u,g,v,k;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(e){if(chrome.storage){var t=d,r=m,a=f,n=p,o=h,i=b;chrome.storage.local.get([t,r,a,n,o,i],(function(t){e({ok:!0,data:t})}))}else e({ok:!1})}));case 2:if(r=t.sent,a=r.ok,n=r.data,a){t.next=7;break}return t.abrupt("return",e.$message.warning(e.$t("toolbar.data_err")));case 7:return t.next=9,Y({title:e.$t("toolbar.backup"),inputValue:"backup"});case 9:if(o=t.sent,i=o.ok,s=o.data,i){t.next=14;break}return t.abrupt("return");case 14:if(l=(c=n||{}).lang,u=c.proxy_routes,g=c.tags,v=c.mode,k=c.redirect,0!==u.length){t.next=17;break}return t.abrupt("return",e.$message.warning(e.$t("toolbar.no_down_data")));case 17:Object(ne.a)(JSON.stringify({lang:l,proxy_routes:u,tags:g,mode:v,redirect:k},null,"\t"),"".concat(s,".json"));case 18:case"end":return t.stop()}}),t)})))()},handleUpload:function(e){var t=this,r=new FileReader,a=this.$t("toolbar"),n=a.override_data,o=a.read_err;r.onload=function(){var e=Object(s.a)(regeneratorRuntime.mark((function e(r){var a,i,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=JSON.parse(r.target.result),e.next=4,C();case 4:if(i=e.sent,a){e.next=7;break}return e.abrupt("return");case 7:if(!(i.length>0)){e.next=15;break}return e.next=10,B({message:n});case 10:s=e.sent,s.ok&&t.setStoreData(a),e.next=16;break;case 15:t.setStoreData(a);case 16:e.next=21;break;case 18:e.prev=18,e.t0=e.catch(0),t.$message.error(o);case 21:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t){return e.apply(this,arguments)}}(),r.readAsText(e.raw)},setStoreData:function(e){var t,r,a,n=e.lang,o=e.proxy_routes,i=e.tags,s=e.mode,c=e.redirect,u=this.$t("toolbar").import_empty;"array"===Object(l.typeIs)(o)&&o.length>0?(S(o),null===(t=this.$refs.table)||void 0===t||t.initList()):this.$message.warning(u);"array"===Object(l.typeIs)(i)&&i.length>0&&(E(i),null===(r=this.$refs.table)||void 0===r||r.initTags());(n&&(j(n),this.initData()),s&&(L(s),this.currentMode),"array"===Object(l.typeIs)(c)&&c.length>0)&&(V(c),null===(a=this.$refs.redirecTable)||void 0===a||a.initList())},handleLangChange:function(e){this.$i18n.locale=e,j(e)},handleModeChange:function(e){Q(w,e),L(e)},handleSwitch:function(e){Q(g,e),function(e){$(m,e)}(e)},initData:function(){var e=this;return Object(s.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,R();case 2:return e.switchOn=t.sent,t.next=5,_();case 5:return r=t.sent,e.language=r,e.$i18n.locale=r,t.next=10,N();case 10:e.currentMode=t.sent;case 11:case"end":return t.stop()}}),t)})))()}},created:function(){this.initData()}},ie=(r("0b8c"),Object(n.a)(oe,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"global-switch"},[r("section",[r("i",{staticClass:"el-icon-switch-button"}),r("el-switch",{on:{change:e.handleSwitch},model:{value:e.switchOn,callback:function(t){e.switchOn=t},expression:"switchOn"}})],1),r("section",[e.switchOn?r("section",[r("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"info",round:"",plain:""},on:{click:e.handleDownload}},[e._v(e._s(e.$t("toolbar.backup")))]),r("el-upload",{staticStyle:{"margin-right":"20px"},attrs:{action:"","auto-upload":!1,"on-change":e.handleUpload,"show-file-list":!1}},[r("el-button",{attrs:{type:"info",round:""}},[e._v(e._s(e.$t("toolbar.restore")))])],1),r("el-radio-group",{staticStyle:{"margin-right":"10px"},on:{change:e.handleModeChange},model:{value:e.currentMode,callback:function(t){e.currentMode=t},expression:"currentMode"}},[r("el-radio-button",{attrs:{label:"interceptor"}},[e._v(e._s(e.$t("document.interceptor")))]),r("el-radio-button",{attrs:{label:"redirector"}},[e._v(e._s(e.$t("document.redirector")))])],1),r("el-radio-group",{on:{change:e.handleLangChange},model:{value:e.language,callback:function(t){e.language=t},expression:"language"}},[r("el-radio-button",{attrs:{label:"en"}},[e._v("En")]),r("el-radio-button",{attrs:{label:"zh"}},[e._v("汉")])],1)],1):e._e()])]),r("transition",{attrs:{name:"fade",mode:"out-in"}},[e.switchOn?r("section",[r("transition",{attrs:{name:"fade",mode:"out-in"}},["interceptor"===e.currentMode?r("IntercepTable",{ref:"table"}):r("RedirecTable",{ref:"redirecTable"})],1)],1):r("div",{staticClass:"closed-container"},[r("i",{staticClass:"el-icon-close-notification"})])])],1)}),[],!1,null,"5b4792ed",null).exports);a.default.use(i.a);var se=new i.a({routes:[{path:"/",component:ie}]}),ce=(r("0fb7"),r("f529")),le=r.n(ce),ue=(r("f4f9"),r("c2cc")),de=r.n(ue),me=(r("7a0f"),r("0f6c")),fe=r.n(me),pe=(r("cbb5"),r("8bbc")),he=r.n(pe),be=(r("0fb4"),r("9944")),ge=r.n(be),ve=(r("915d"),r("e04d")),ke=r.n(ve),we=(r("f225"),r("89a9")),ye=r.n(we),xe=(r("eca7"),r("3787")),$e=r.n(xe),_e=(r("425f"),r("4105")),Oe=r.n(_e),je=(r("0c67"),r("299c")),Re=r.n(je),De=(r("5466"),r("ecdf")),Se=r.n(De),Ce=(r("38a0"),r("ad41")),Te=r.n(Ce),Ee=(r("3c52"),r("0d7b")),Me=r.n(Ee),Ie=(r("fe07"),r("6ac5")),Le=r.n(Ie),Ne=(r("1951"),r("eedf")),Je=r.n(Ne),Ve=(r("6611"),r("e772")),qe=r.n(Ve),Fe=(r("1f1a"),r("4e4b")),ze=r.n(Fe),Ae=(r("e960"),r("b35b")),Pe=r.n(Ae),He=(r("10cb"),r("f3ad")),Ke=r.n(He),Be=(r("a7cc"),r("df33")),Ue=r.n(Be);a.default.use(Ue.a),a.default.use(Ke.a),a.default.use(Pe.a),a.default.use(ze.a),a.default.use(qe.a),a.default.use(Je.a),a.default.use(Le.a),a.default.use(Me.a),a.default.use(Te.a),a.default.use(Se.a),a.default.use(Re.a),a.default.use(Oe.a),a.default.use($e.a),a.default.use(ye.a),a.default.use(ke.a),a.default.use(ge.a),a.default.use(he.a),a.default.use(fe.a),a.default.use(de.a),a.default.prototype.$msgbox=K.a,a.default.prototype.$alert=K.a.alert,a.default.prototype.$confirm=K.a.confirm,a.default.prototype.$prompt=K.a.prompt,a.default.prototype.$message=le.a;var Ye=r("a925"),Ge=r("4897"),Qe=r.n(Ge),We=r("b2d6"),Xe=r.n(We),Ze=r("f0d9"),et=r.n(Ze);a.default.use(Ye.a);var tt=new Ye.a({locale:"zh",messages:{zh:Object(c.a)(Object(c.a)({},{document:{interceptor:"拦截器",redirector:"重定向"},modal:{title:{create:"新增",edit:"编辑"},form:{match:{name:"路径匹配",msg:"请求路径不能为空"},res:{name:"响应数据",msg:"响应数据不能为空"},remark:{name:"备注"},tag:{name:"标签",placeholder:"请选择"},placeholder:"请输入",domain:{name:"域名",msg:"域名信息不能为空",placeholder:"http|https://foo.com"},redirect:{name:"重定向",msg:"重定向地址不能为空",placeholder:"http|https://foo2.com"},headers:{name:"请求头",key:"Key",value:"Value",option:"选项",append:"添加",delete:"删除",keyMsg:"key值不能为空",valueMsg:"value值不能为空",description:"描述"}},btn:{confirm:"确 定",cancel:"取 消"},msg:{not_json:"JSON格式错误"}},drawer:{btn:"确定"},errTips:"所有responseText会常驻浏览器后台；注意风险把控，不用的话记得关闭哦~",create:"新增",search:{match:{name:"路径",placeholder:"路径匹配"},remark:{name:"备注",placeholder:"备注"},btn:{search:"搜索",reset:"重置"}},table:{columns:{switch:"状态",match:"路径匹配",res:"响应数据",remark:"备注",tag:"标签",hit:"命中",domain:"域名",redirect:"重定向",options:"操作"},btn:{del:"删除",edit:"编辑",copy:"复制"}},confirMsg:"确认删除?",toolbar:{restore:"恢复",backup:"备份",no_down_data:"没有数据可以下载",override_data:"上传成功原文件会被覆盖",import_empty:"你导入了一个空列表",read_err:"读取异常，文件可能不是一个JSON",data_err:"数据异常"},chrome:{notice:"命中率多少有点高了"}}),et.a),en:Object(c.a)(Object(c.a)({},{document:{interceptor:"Interceptor",redirector:"Redirector"},modal:{title:{create:"Create",edit:"Edit"},form:{match:{name:"Match URL",msg:"match is required"},res:{name:"ResponseText",msg:"response text is required"},remark:{name:"Remark"},tag:{name:"Tag",placeholder:"Please select"},placeholder:"Please input",domain:{name:"Domain",msg:"Domain name information cannot be empty",placeholder:"http|https://foo.com"},redirect:{name:"Redirect",msg:"The redirection address cannot be empty",placeholder:"http|https://foo2.com"},headers:{name:"Headers",key:"Key",value:"Value",option:"Option",append:"Append",delete:"Delete",keyMsg:"key cannot be empty",valueMsg:"value cannot be empty",description:"Description"}},btn:{confirm:"OK",cancel:"Cancel"},msg:{not_json:"JSON format error"}},drawer:{btn:"OK"},errTips:"All responseText will be resident in the browser background; pay attention to risk control, and remember to close it if you don't use it~",create:"Create",search:{match:{name:"match",placeholder:"match"},remark:{name:"remark",placeholder:"remark"},btn:{search:"Search",reset:"Reset"}},table:{columns:{switch:"switch",match:"match",res:"responseText",remark:"remark",tag:"Tag",hit:"Hit",domain:"Domain",redirect:"Redirect",options:"options"},btn:{del:"Delete",edit:"Edit",copy:"Copy"}},confirMsg:"Are you sure you want to delete?",toolbar:{restore:"Restore",backup:"Backup",no_down_data:"There is no data to download",override_data:"If the upload is successful, the original file will be overwritten",import_empty:"You imported an empty list",read_err:"Read exception. The file may not be a JSON",data_err:"Abnormal data"},chrome:{notice:"The percentage of hits is a little high"}}),Xe.a)}});Qe.a.i18n((function(e,t){return tt.t(e,t)}));var rt=tt;r("1e09");a.default.prototype.$ELEMENT={size:"mini"},a.default.config.productionTip=!1,new a.default({router:se,i18n:rt,render:function(e){return e(o)}}).$mount("#app")},"59e9":function(e,t,r){"use strict";r("4d21")},6:function(e,t){},"656a":function(e,t,r){},7:function(e,t){},8:function(e,t){},"85ec":function(e,t,r){},"8c18":function(e,t,r){},9:function(e,t){},c1aa:function(e,t,r){"use strict";r("ec69")},d2b2:function(e,t,r){"use strict";r("656a")},e7e5:function(e,t,r){"use strict";r("f0d5")},ec69:function(e,t,r){},f0d5:function(e,t,r){}},[[0,"runtime","npm.core-js","npm.element-ui","npm.babel-runtime","npm.alrale","npm.async-validator","npm.browserify-sign","npm.browserify-aes","npm.elliptic","npm.hash-base","npm.asn1.js","npm.readable-stream","npm.hash.js","npm.vue-json-editor","npm.browserify-rsa","npm.bn.js","npm.buffer","npm.regenerator-runtime","npm.resize-observer-polyfill","npm.vue-i18n","npm.vue-router","npm.vue","vendors~app"]]]);