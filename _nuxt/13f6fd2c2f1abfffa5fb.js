(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{280:function(e,t,r){var content=r(299);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(16).default)("08df33d6",content,!0,{sourceMap:!1})},281:function(e,t,r){var content=r(302);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(16).default)("fb5528e6",content,!0,{sourceMap:!1})},298:function(e,t,r){"use strict";var n=r(280);r.n(n).a},299:function(e,t,r){(e.exports=r(15)(!1)).push([e.i,".services-container[data-v-2d722c08]{margin:0 -16px;white-space:nowrap;overflow-x:auto}.services-container .service-image-container[data-v-2d722c08]{position:relative;padding-top:100%}.services-container .service-image-container .service-image[data-v-2d722c08]{position:absolute;top:0;left:0;display:block;width:100%;height:100%;-o-object-fit:contain;object-fit:contain;-webkit-filter:grayscale(1);filter:grayscale(1)}.services-container .service-image-container .service-image.selected[data-v-2d722c08]{-webkit-filter:grayscale(0);filter:grayscale(0)}",""])},301:function(e,t,r){"use strict";var n=r(281);r.n(n).a},302:function(e,t,r){(e.exports=r(15)(!1)).push([e.i,".hidden-input[data-v-b3bf7208]{margin:0;padding:0}.hidden-input[data-v-b3bf7208] .v-input__slot{display:none}",""])},303:function(e,t,r){"use strict";r(14),r(8),r(7),r(6),r(10);var n=r(1),o=(r(34),r(52),r(13)),c={name:"ServiceSelect",props:{isCustom:{type:Boolean,default:!1},dockerPullCommand:{type:String,default:""},availableServices:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1}},data:function(){return{internal:{isCustom:!1,service:void 0,version:void 0}}},computed:{currentTab:{get:function(){return this.isCustom?"tab-custom-service":"tab-default-services"},set:function(e){var t=this;this.service=void 0,this.version=void 0,this.$nextTick().then((function(){return t.$emit("type-change","tab-custom-service"===e)}))}},serviceData:function(){return this.getServiceDataByDockerPullCommand(this.dockerPullCommand)},service:{get:function(){return this.serviceData.service},set:function(e){this.internal.service=e,this.internal.version=void 0,this.$emit("docker-pull-command-change",this.getDockerPullCommand(e,void 0)),this.$emit("service-label-change",this.serviceLabels[e]||"")}},version:{get:function(){return this.serviceData.version},set:function(e){this.internal.version=e,this.$emit("docker-pull-command-change",this.getDockerPullCommand(this.internal.service,e))}},serviceLabels:function(){var e={};return this.availableServices.forEach((function(t){e[t.value]=t.label})),e}},methods:{getDockerPullCommand:function(e,t){return e&&t?"docker pull ".concat(e,":").concat(t):""},getServiceDataByDockerPullCommand:function(e){var t=e.split(" ").pop().split(":"),r=Object(o.a)(t,2);return{service:r[0],version:r[1]}}}},l=(r(298),r(36)),v=r(50),d=r.n(v),f=r(309),m=r(385),h=r(390),y=r(384),_=r(397),x=r(396),C=r(380),k=r(379),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-4"},[r("v-tabs",{attrs:{"fixed-tabs":""},model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},[r("v-tab",{key:"default-services",staticClass:"font-weight-black",attrs:{href:"#tab-default-services",disabled:e.disabled}},[e._v("\n      現有服務\n    ")]),e._v(" "),r("v-tab",{key:"custom-service",staticClass:"font-weight-black",attrs:{href:"#tab-custom-service",disabled:e.disabled}},[e._v("\n      客製化服務\n    ")]),e._v(" "),r("v-tabs-items",{attrs:{touchless:""},model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},[r("v-tab-item",{key:"default-services",attrs:{value:"tab-default-services"}},[r("div",{staticClass:"services-container px-2 pt-4 pb-2 text-center"},e._l(e.availableServices,(function(t,n){return r("div",{key:"service-select-card-"+n,staticClass:"d-inline-block"},[r("v-hover",{scopedSlots:e._u([{key:"default",fn:function(o){var c=o.hover;return[r("v-card",{staticClass:"pa-2",class:{"mr-3":n!==e.availableServices.length-1},style:"opacity: "+(t.value!==e.internal.service?.4:1),attrs:{elevation:c&&!e.disabled?6:2,width:"180"},on:{click:function(r){!e.disabled&&(e.service=t.value)}}},[r("div",{staticClass:"py-3 text-center"},[e._v("\n                  "+e._s(t.label)+"\n                ")]),e._v(" "),r("div",{staticClass:"service-image-container"},[r("img",{staticClass:"service-image",class:{selected:t.value===e.internal.service},attrs:{src:t.logoUrl}})]),e._v(" "),r("v-select",{attrs:{value:t.value===e.service?e.version:void 0,label:"版本",items:t.subList.map((function(a){return a.label})),"menu-props":{top:!0},disabled:e.disabled||t.value!==e.internal.service},on:{input:function(t){e.version=t}}})],1)]}}],null,!0)})],1)})),0)]),e._v(" "),r("v-tab-item",{key:"custom-service",attrs:{value:"tab-custom-service"}},[r("div",{staticClass:"pt-4"},[r("div",{staticClass:"subheading font-weight-medium primary--text"},[e._v("\n            Docker Hub 上 Image 的 pull 指令\n          ")]),e._v(" "),r("v-text-field",{attrs:{value:e.dockerPullCommand},on:{input:function(t){return e.$emit("docker-pull-command-change",t)}}})],1)])],1)],1),e._v(" "),e._t("default")],2)}),[],!1,null,"2d722c08",null),j=component.exports;d()(component,{VCard:f.a,VHover:m.a,VSelect:h.a,VTab:y.a,VTabItem:_.a,VTabs:x.a,VTabsItems:C.a,VTextField:k.a});var w={name:"QuestionTooltip",props:{text:{type:String,default:""}}},P=r(308),O=r(387),D=Object(l.a)(w,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[r("v-icon",e._g({attrs:{size:"20",color:"primary"}},n),[e._v("\n      mdi-help-circle-outline\n    ")])]}}])},[e._v(" "),r("span",{domProps:{textContent:e._s(e.text)}})])}),[],!1,null,null,null),S=D.exports;function T(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}d()(D,{VIcon:P.a,VTooltip:O.a});var V=function(input){return!!input||"必填"},E=function(input,e){return input.length<=e||"長度需小於等於 ".concat(e)},$=function(input,e){return input>=e||"必須為大於等於 ".concat(e," 整數")},R=function(input,e){return input<=e||"必須為小於等於 ".concat(e," 整數")},M=function(input){return/^\d*$/.test(input)||"僅能輸入數字"},L=function(input){return/^[a-zA-Z0-9-_]*$/.test(input)||"必須為英文字母、數字、-、_"},A=function(input){return!!input||"未選擇服務或版本"},B=function(input){var e=input.split(" ");return!(3!==e.length||"docker"!==e[0]||"pull"!==e[1]||!e[2])||"指令參數有誤"},F={name:"ProjectEditor",components:{ServiceSelect:j,QuestionTooltip:S},props:{mode:{type:String,default:"create"},isLoading:{type:Boolean,default:!1},value:{type:Object,default:function(){return{name:"",description:"",cpu:1,memory:512,storage:5,isCustom:!1,dockerPullCommand:""}}},availableServices:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1}},data:function(){var e=this;return{valid:null,serviceLabel:"",inputs:{name:{rules:[function(){return V(e.value.name)},function(){return L(e.value.name)},function(){return E(e.value.name,25)}],errorMessages:[]},description:{rules:[function(){return E(e.value.description,50)}]},cpu:{rules:[function(){return V(e.value.cpu)},function(){return M(e.value.cpu)},function(){return $(e.value.cpu,1)},function(){return R(e.value.cpu,2)}]},memory:{rules:[function(){return V(e.value.memory)},function(){return M(e.value.memory)},function(){return $(e.value.memory,512)},function(){return R(e.value.memory,8192)}]},storage:{rules:[function(){return V(e.value.storage)},function(){return M(e.value.storage)},function(){return $(e.value.storage,2)},function(){return R(e.value.storage,25)}]},dockerPullCommand:{rules:[function(){return A(e.value.dockerPullCommand)},function(){return B(e.value.dockerPullCommand)}]}},feeRate:{cpu:1,memory:1e-4,storage:.001}}},computed:{isEditMode:function(){return"edit"===this.mode},descriptionPlaceholder:function(){return"A ".concat(this.value.isCustom?"Custom":this.serviceLabel," project")},costs:function(){var e=+(this.feeRate.cpu*this.value.cpu).toFixed(12),t=+(this.feeRate.memory*this.value.memory).toFixed(12),r=+(this.feeRate.storage*this.value.storage).toFixed(12);return{cpu:e,memory:t,storage:r,total:+(e+t+r).toFixed(12)}}},methods:{update:function(e,t){this.$emit("input",function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?T(source,!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):T(source).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},this.value,Object(n.a)({},e,t)))},validate:function(){return this.$refs.form.validate()},handlerErrors:function(e){409===e&&this.inputs.name.errorMessages.push("專案名稱重複")}}},I=(r(301),r(388)),Q=r(383),U=r(108),z=r(389),G=Object(l.a)(F,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isLoading?r("div",{staticClass:"d-flex justify-center align-center",staticStyle:{height:"300px"}},[r("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):r("div",{staticClass:"pa-4"},[r("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("div",{staticClass:"subheading font-weight-medium primary--text"},[e._v("\n          專案名稱\n        ")]),e._v(" "),r("v-text-field",{attrs:{value:e.value.name,rules:e.inputs.name.rules,disabled:e.disabled||e.isEditMode,"error-messages":e.inputs.name.errorMessages,counter:"25"},on:{input:function(t){return e.update("name",t)},focus:function(t){e.inputs.name.errorMessages=[]}}})],1),e._v(" "),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("div",{staticClass:"subheading font-weight-medium primary--text"},[e._v("\n          專案敘述（選填）\n        ")]),e._v(" "),r("v-text-field",{attrs:{value:e.value.description,rules:e.inputs.description.rules,disabled:e.disabled,placeholder:e.descriptionPlaceholder,counter:"50"},on:{input:function(t){return e.update("description",t)}}})],1),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("div",{staticClass:"subheading font-weight-medium primary--text"},[e._v("\n          資源調整\n        ")]),e._v(" "),r("v-row",[r("v-col",{attrs:{cols:"4"}},[r("div",{staticClass:"subheading font-weight-medium primary--text d-flex align-center"},[r("span",{staticClass:"mr-1"},[e._v("vCPU")]),e._v(" "),r("QuestionTooltip",{attrs:{text:"vCPU（顆/時）："+e.feeRate.cpu+" 台幣"}})],1),e._v(" "),r("v-select",{attrs:{value:e.value.cpu,prefix:" ",suffix:"顆",rules:e.inputs.cpu.rules,items:[1,2],disabled:e.disabled},on:{input:function(t){return e.update("cpu",t)}}})],1),e._v(" "),r("v-col",{attrs:{cols:"4"}},[r("div",{staticClass:"subheading font-weight-medium primary--text d-flex align-center"},[r("span",{staticClass:"mr-1"},[e._v("RAM")]),e._v(" "),r("QuestionTooltip",{attrs:{text:"RAM（MB/時）："+e.feeRate.storage+" 台幣"}})],1),e._v(" "),r("v-text-field",{attrs:{value:e.value.memory,prefix:" ",suffix:"MB",rules:e.inputs.memory.rules,disabled:e.disabled},on:{input:function(t){return e.update("memory",t)}}})],1),e._v(" "),r("v-col",{attrs:{cols:"4"}},[r("div",{staticClass:"subheading font-weight-medium primary--text d-flex align-center"},[r("span",{staticClass:"mr-1"},[e._v("Disk")]),e._v(" "),r("QuestionTooltip",{attrs:{text:"Disk（GB/時）："+e.feeRate.storage+" 台幣（無法減少只能增加）"}})],1),e._v(" "),r("v-text-field",{attrs:{value:e.value.storage,prefix:" ",suffix:"GB",rules:e.inputs.storage.rules,disabled:e.disabled},on:{input:function(t){return e.update("storage",t)}}})],1)],1)],1),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("div",{staticClass:"subheading font-weight-medium primary--text"},[e._v("\n          選擇服務\n        ")]),e._v(" "),r("ServiceSelect",{attrs:{"is-custom":e.value.isCustom,"docker-pull-command":e.value.dockerPullCommand,disabled:e.disabled||e.isEditMode,"available-services":e.availableServices},on:{"type-change":function(t){return e.update("isCustom",t)},"docker-pull-command-change":function(t){return e.update("dockerPullCommand",t)},"service-label-change":function(t){e.serviceLabel=t}}},[r("v-text-field",{staticClass:"hidden-input",attrs:{value:e.value.dockerPullCommand,rules:e.inputs.dockerPullCommand.rules,disabled:e.disabled||e.isEditMode}})],1)],1),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("div",{staticClass:"subheading font-weight-medium primary--text"},[e._v("\n          花費試算\n        ")]),e._v(" "),r("div",{staticClass:"pl-3 subtitle-2 grey--text"},[r("div",{staticClass:"pt-2"},[e._v("\n            vCPU: "+e._s(e.feeRate.cpu)+" x "+e._s(e.value.cpu)+" = "+e._s(e.costs.cpu)+" 台幣/時\n          ")]),e._v(" "),r("div",{staticClass:"pt-2"},[e._v("\n            RAM: "+e._s(e.feeRate.memory)+" x "+e._s(e.value.memory)+" = "+e._s(e.costs.memory)+" 台幣/時\n          ")]),e._v(" "),r("div",{staticClass:"pt-2"},[e._v("\n            Disk: "+e._s(e.feeRate.storage)+" x "+e._s(e.value.storage)+" = "+e._s(e.costs.storage)+" 台幣/時\n          ")]),e._v(" "),r("div",{staticClass:"pt-2"},[e._v("\n            總計: "+e._s(e.costs.cpu)+" + "+e._s(e.costs.memory)+" + "+e._s(e.costs.storage)+" = "),r("span",{staticClass:"primary--text"},[e._v(e._s(e.costs.total)+" 台幣/時")])])])])],1)],1)],1)}),[],!1,null,"b3bf7208",null);t.a=G.exports;d()(G,{VCol:I.a,VForm:Q.a,VProgressCircular:U.a,VRow:z.a,VSelect:h.a,VTextField:k.a})},394:function(e,t,r){"use strict";r.r(t);r(14),r(8),r(7),r(6),r(10),r(33),r(52);var n=r(1),o=(r(37),r(4));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(source,!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(source).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v,d,f,m={name:"ProjectCreatePage",middleware:"isTokenValid",components:{ProjectEditor:r(303).a},data:function(){return{isDataTransferring:!1,isLoading:!1,availableServices:[],projectData:void 0}},created:(f=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.isLoading=!0,this.isDataTransferring=!0,e.next=4,this.getAvailableServices();case 4:this.isDataTransferring=!1,this.isLoading=!1;case 6:case"end":return e.stop()}}),e,this)}))),function(){return f.apply(this,arguments)}),methods:{createProject:(d=Object(o.a)(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.$refs.projectEditor.validate()){e.next=2;break}return e.abrupt("return");case 2:return t=l({},this.projectData,{description:this.projectData.description.trim()||this.$refs.projectEditor.descriptionPlaceholder,imageTag:this.projectData.dockerPullCommand.split(" ").pop()}),this.isDataTransferring=!0,e.prev=4,e.next=7,this.$api.createProject(t);case 7:this.$router.replace("/projects"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(4),e.t0.response&&(r=e.t0.response.status,this.$refs.projectEditor.handlerErrors(r),this.isDataTransferring=!1);case 13:case"end":return e.stop()}}),e,this,[[4,10]])}))),function(){return d.apply(this,arguments)}),getAvailableServices:(v=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$api.getAvailableServices();case 2:this.availableServices=e.sent;case 3:case"end":return e.stop()}}),e,this)}))),function(){return v.apply(this,arguments)})}},h=r(36),y=r(50),_=r.n(y),x=r(267),C=r(309),k=r(277),j=r(317),w=r(308),P=r(274),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page-container",staticStyle:{"max-width":"650px !important"}},[r("v-card",{staticClass:"ma-3"},[r("v-card-actions",{staticClass:"pa-0"},[r("v-btn",{attrs:{text:""},on:{click:function(t){return e.$router.replace("/projects")}}},[r("v-icon",[e._v("mdi-arrow-left")]),e._v("返回\n      ")],1)],1),e._v(" "),r("v-card-title",{staticClass:"headline font-weight-bold py-5 primary--text"},[r("v-icon",{attrs:{color:"primary"}},[e._v("\n        mdi-plus\n      ")]),e._v("創建專案\n    ")],1),e._v(" "),r("v-divider"),e._v(" "),r("ProjectEditor",{ref:"projectEditor",attrs:{"is-loading":e.isLoading,"available-services":e.availableServices,disabled:e.isDataTransferring},model:{value:e.projectData,callback:function(t){e.projectData=t},expression:"projectData"}}),e._v(" "),r("v-divider"),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{loading:e.isDataTransferring,disabled:e.isDataTransferring,color:"primary"},on:{click:e.createProject}},[e._v("\n        建立\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;_()(component,{VBtn:x.a,VCard:C.a,VCardActions:k.a,VCardTitle:k.c,VDivider:j.a,VIcon:w.a,VSpacer:P.a})}}]);