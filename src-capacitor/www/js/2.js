(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"0392":function(e,t,i){"use strict";i("86e7")},"86e7":function(e,t,i){},e5ee:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("q-page",{staticClass:"bg-white"},[e.$q.platform.is.mobile&&e.show?i("div",{staticClass:"vh100"},[i("mobile",{attrs:{videostag:e.query}})],1):e._e(),e.$q.platform.is.desktop&&e.show?i("div",[i("desktop",{attrs:{videostag:e.query}})],1):e._e(),i("loading",{attrs:{active:e.isLoading,"can-cancel":!1,"is-full-page":!0},on:{"update:active":function(t){e.isLoading=t}}})],1)],1)},a=[],n=i("ded3"),o=i.n(n),l=i("c380"),r=i("7806"),d=i("2f62"),c=i("9062"),p=i.n(c),u=(i("e40d"),{components:{desktop:l["a"],mobile:r["default"],Loading:p.a},props:["query"],data(){return{transitionName:"slide",show:!1,looper:null,isLoading:!0}},computed:o()({},Object(d["b"])(["pcm"])),created(){this.$router.beforeEach(((e,t,i)=>{let s=e.meta.transitionName||t.meta.transitionName;if("slide"===s){const i=e.path.split("/").length,a=t.path.split("/").length;s=i<a?"slide-right":"slide-left"}this.transitionName=s,i()}))},mounted(){this.looper=setInterval((()=>{0!=this.pcm.offlinevideos.length&&(this.show=!0,this.isLoading=!1,clearInterval(this.looper))}),500)}}),h=u,m=(i("0392"),i("2877")),f=i("9989"),g=i("eebe"),v=i.n(g),b=Object(m["a"])(h,s,a,!1,null,null,null);t["default"]=b.exports;v()(b,"components",{QPage:f["a"]})}}]);
//# sourceMappingURL=2.js.map