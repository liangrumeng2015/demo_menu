(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopMall/index"],{"0192":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{categoryList:[],subCategoryList:[],height:0,categoryActive:0,scrollTop:0,scrollHeight:0,name:"七月_"}},methods:{scroll:function(t){this.scrollHeight=t.detail.scrollHeight},categoryClickMain:function(t,e){this.categoryActive=e,this.subCategoryList=t.subCategoryList,this.scrollTop=-this.scrollHeight*e},getCategory:function(){for(var t=1;t<21;t++){for(var e=[],i=1;i<31;i++)e.push({NAME:"分类"+t+":商品"+i,LOGO:"http://placehold.it/50x50"});this.categoryList.push({NAME:"分类"+t,subCategoryList:e})}this.subCategoryList=this.categoryList[0].subCategoryList}},onLoad:function(){this.getCategory(),this.height=t.getSystemInfoSync().windowHeight}};e.default=i}).call(this,i("543d")["default"])},1843:function(t,e,i){},"298d":function(t,e,i){"use strict";i.r(e);var s=i("0192"),a=i.n(s);for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);e["default"]=a.a},"2df0":function(t,e,i){"use strict";var s=i("1843"),a=i.n(s);a.a},"3b59":function(t,e,i){"use strict";i.r(e);var s=i("6d67"),a=i("298d");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("2df0");var n=i("2877"),r=Object(n["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=r.exports},"6d67":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"container"},[i("view",{staticClass:"page-body"},[i("scroll-view",{staticClass:"nav-left",style:"height:"+t.height+"px",attrs:{"scroll-y":""}},t._l(t.categoryList,function(e,s){return i("view",{key:s,staticClass:"nav-left-item",class:s==t.categoryActive?"active":"",attrs:{eventid:"b72949be-0-"+s},on:{click:function(i){t.categoryClickMain(e,s)}}},[t._v(t._s(e.NAME))])})),i("scroll-view",{staticClass:"nav-right",style:"height:"+t.height+"px",attrs:{"scroll-y":"","scroll-top":t.scrollTop,"scroll-with-animation":"",eventid:"b72949be-1"},on:{scroll:t.scroll}},[t._l(t.subCategoryList,function(e,s){return i("view",{key:s,staticClass:"nav-right-item",attrs:{id:0===s?"first":""}},[i("image",{attrs:{src:e.LOGO}}),i("view",[t._v(t._s(e.NAME))])])}),t.subCategoryList.length>1?i("page-foot",{attrs:{name:t.name,mpcomid:"b72949be-0"}}):t._e()],2)],1)])},a=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a})},"836e":function(t,e,i){"use strict";i("d243");var s=o(i("b0ce")),a=o(i("3b59"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))}},[["836e","common/runtime","common/vendor"]]]);