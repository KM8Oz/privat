(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"03f2":function(t,e,s){},4909:function(t,e,s){},"82cd":function(t,e,s){"use strict";s("03f2")},"996f":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{staticClass:"bg-white text-white"},[t.$q.platform.is.mobile?s("div",{staticClass:"mobile-only"},[s("transition",{attrs:{name:"fade"}},[s("mobile")],1)],1):t._e(),t.$q.platform.is.desktop?s("div",{staticClass:"desktop-only"},[s("desktop")],1):t._e()])},a=[],o=s("c427"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-layout",{class:t.pcm.controls.dark?"bg-dark h-vh-100 profileminfix text-white":"bg-white profileminfix text-black h-vh-100"},[s("div",{staticClass:"row profile-container wrap"},[s("div",{staticClass:"col-lg-2 col-md-2 col-sm-2 mt-vh-4 row justify-end"},[s("q-followings")],1),s("q-scroll-area",{staticClass:"col-lg-7 col-md-7 col-sm-6 row  mt-vh-4 justify-center",attrs:{"thumb-style":t.thumbStyle,"bar-style":t.barStyle}},[t.pcm.user.rol?s("div",{staticClass:"h-100 q-mx-lg"},[s("q-vueProfile",{attrs:{name:t.thisModel.name,username:t.username,avatar:t.thisModel.avatars}}),s("div",{staticClass:" row flex-center-div"},[t.showbar?s("q-profilebar",{attrs:{id:t.thisModel.id,notpravite:!0}}):t._e()],1),s("div",{class:t.pcm.controls.dark?"infomain col-12 bg-dark text-white row items-center q-mb-xs":"infomain col-12 bg-white text-black row items-center q-mb-xs"},[s("div",{staticClass:"col row q-mt-md q-ml-md items-center q-mb-md "},[s("q-icon",{attrs:{name:"fiber_manual_record"}}),s("p",{staticClass:"q-mb-none q-ml-xs text-comment-18"},[t._v("Баланс:")]),s("p",{staticClass:"text-grey q-mb-none q-ml-xs text-comment-18"},[t._v("\n                "+t._s(t.balance)+"T\n              ")])],1),s("q-btn",{staticClass:"col-3 q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs q-mr-xs",attrs:{rounded:"",size:"9px",color:"pink-6",label:"Запросить вывод"},on:{click:function(e){return t.payout()}}})],1),s("div",{staticClass:"infomain col-12 row items-center q-mb-xs"},[s("div",{staticClass:"col row q-mt-md q-ml-md items-center q-mb-md "},[s("q-icon",{attrs:{name:"fiber_manual_record"}}),s("p",{staticClass:"q-mb-none q-ml-xs text-comment-18"},[t._v("Пин код:")]),s("p",{staticClass:"text-grey q-mb-none q-ml-xs text-comment-18"},[t._v("\n                "+t._s(t.pin)+"\n              ")])],1),s("q-btn",{staticClass:"col-3 q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs q-mr-xs",attrs:{rounded:"",size:"9px",color:"pink-6",label:"Получить новыи"},on:{click:function(e){return t.identification()}}}),s("p",{staticClass:" full-width flex flex-center"},[t._v("видео-библиотека")])],1),s("div",{staticClass:"row"},t._l(t.vidos,(function(t,e){return s("div",{key:t._id,class:[{"ml-09":e%3!=0},"w-32","q-pa-none","q-pa-none","mb-1"]},[s("div",{staticClass:"rounded-borders flex"},[s("vue-plyr",{staticClass:"mute-right"},[s("video",{staticClass:"videoprofile-inter",attrs:{"data-plyr-config":'{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}',id:t._id,src:t._source.body.video.replace(".mp4","_mobile.mp4"),color:"black",type:"video/mp4"}})])],1)])})),0)],1):s("div",{staticClass:"h-100 q-mx-lg"},[s("div",{staticClass:"row m-mx-auto"},[s("div",{staticClass:"flex column col-12 setting-border "},[s("q-avatar",{staticClass:"self-center setting-border-avatar",attrs:{size:"10vh"}},[s("img",{attrs:{src:t.thisModel.avatars}})]),s("div",{staticClass:"col self-center"},[s("div",{staticClass:"self-center"},[s("p",{staticClass:" text-center text-weight-bold oswald-regular text-30 q-ma-none"},[t._v("\n                      "+t._s(t.thisModel.name)+"\n                    ")])]),s("div",{staticClass:"row"},[t.showbar?s("q-profilebar",{attrs:{id:t.thisModel.id,notpravite:!0}}):t._e(),s("q-btn",{staticClass:" h-mc ml-auto q-ma-xs",attrs:{flat:"",icon:"settings",to:"/profile/settings"}})],1)])],1),s("div",{class:t.pcm.controls.dark?"infomain col-12 bg-dark text-white row items-center q-mt-md q-mb-xs":"infomain col-12 bg-white text-black q-mt-md row items-center q-mb-xs"},[s("div",{staticClass:"col-8 row q-mt-md q-ml-md items-center q-mb-md "},[s("q-icon",{attrs:{name:"fiber_manual_record"}}),s("p",{staticClass:"q-mb-none q-ml-xs"},[t._v("Баланс:")]),null==t.balance||0==t.balance?s("p",{staticClass:"text-grey q-mb-none q-ml-xs"},[t._v("\n                  0T\n                ")]):s("p",{staticClass:"text-grey q-mb-none q-ml-xs"},[t._v(t._s(t.balance)+"T")])],1),s("q-btn",{staticClass:"col q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs q-mr-xs",attrs:{rounded:"",size:"9px",label:"Пополнить баланс",color:"pink-6"},on:{click:function(e){t.depositDialog=!0}}})],1),s("p",{staticClass:" full-width flex flex-center"},[t._v("список понравившихся видео")])]),s("q-scroll-area",{staticClass:"h-vh-60 q-pb-xl",attrs:{"thumb-style":t.thumbStyle,"bar-style":t.barStyle}},[s("div",{staticClass:"row"},t._l(t.vidos,(function(e,i){return s("div",{key:e._id,class:[{"ml-09":i%3!=0},"w-32","q-pa-none","q-pa-none","mb-1"]},[e._source.body?s("div",{staticClass:"rounded-borders videoprofile"},[s("vue-plyr",{staticClass:"mute-right"},[s("video",{staticClass:" videoprofile-inter",attrs:{"data-plyr-config":'{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}',id:e._id,src:e._source.body.video.replace(".mp4","_mobile.mp4"),color:"black",type:"video/mp4"}})]),s("q-icon",{staticClass:"z-index-video",attrs:{name:"zoom_out_map",color:"white",size:"20px"},on:{click:function(s){return t.openfullvideo(e)}}})],1):t._e()])})),0)]),s("q-dialog",{staticClass:"full-video-profile",attrs:{position:"bottom","transition-show":"bounceIn"},model:{value:t.fullvideo.open,callback:function(e){t.$set(t.fullvideo,"open",e)},expression:"fullvideo.open"}},[t.fullvideo.video?s("q-card",{staticClass:"profilefullvideo"},[t.pcm.user.rol?s("q-btn",{staticClass:"delete_btn",staticStyle:{width:"100px"},attrs:{loading:t.loading,percentage:t.percentage,"dark-percentage":"",unelevated:"",color:"red","text-color":"black",icon:"delete_forever"},on:{click:function(e){return t.startComputingdelete(t.fullvideo.id,t.token)}}}):t._e(),s("vue-plyr",{staticClass:"mute-right"},[s("video",{ref:"dialogVideo",staticClass:"custHeight",attrs:{controls:"false","data-plyr-config":'{ "controls": ["mute"]}',src:t.fullvideo.video.video.replace(".mp4","_desktop.mp4"),color:"black",type:"video/mp4"},on:{play:t.setProgressBar}})]),s("q-linear-progress",{attrs:{value:t.fullvideo.progress,color:"pink"}}),s("q-card-section",{staticClass:"row items-center no-wrap"},[s("div",{staticClass:"text-left"},[s("div",{staticClass:"text-weight-bold text-uppercase"},[t._v("@"+t._s(t.fullvideo.video.tags?t.fullvideo.video.modelname:"none"))]),s("div",{staticClass:"text-grey"},[t._v(t._s(t.fullvideo.video.tags?t.fullvideo.video.tags[0]:"#none"))])]),s("q-space"),s("q-btn",{attrs:{flat:"",round:"",icon:"play_arrow"},on:{click:function(e){return t.$refs.dialogVideo.play()}}}),s("q-btn",{attrs:{flat:"",round:"",icon:"pause"},on:{click:function(e){return t.$refs.dialogVideo.pause()}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",icon:"close"}})],1)],1):t._e()],1)],1)]),s("div",{staticClass:"col-lg-3 col-md-3 col-sm-3 mt-vh-4 justify-start"},[s("q-listrec")],1)],1),s("q-dialog",{directives:[{name:"show",rawName:"v-show",value:t.withdrawDialog,expression:"withdrawDialog"}],staticClass:"row"},[s("q-card",{staticClass:"bg-white full-width fullpage q-pl-sm q-pr-sm"},[s("p",[t._v("Укажите необходимую сумму и валюту для вывода")]),s("q-select",{staticClass:"col-12 q-pt-sm",attrs:{outlined:"",options:t.options,label:"Валюта вывода"},model:{value:t.currency,callback:function(e){t.currency=e},expression:"currency"}}),s("q-input",{staticClass:"col-12 q-pt-sm",attrs:{outlined:"",placeholder:"сумма токенов"},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}}),s("q-btn",{staticClass:"no-shadow full-width q-mt-sm q-mb-sm",attrs:{color:"pink-13",label:"Вывести"},on:{click:function(e){return t.withdraw()}}})],1)],1),s("q-dialog",{model:{value:t.depositDialog,callback:function(e){t.depositDialog=e},expression:"depositDialog"}},[s("q-card",{staticClass:"w-vw-20 h-vh-30 absolute-center flex q-px-md",attrs:{color:"white"}},[t.yad?s("div",{staticClass:"flex-center-div flex-center-vertical"},[s("div",[s("div",[t._v("\n              Сформирован счет № "+t._s(t.order_id)+" на сумму:\n              "+t._s(t.amount_deposit)+" токенов\n            ")]),s("form",{staticClass:"flex w-70 ma-auto",attrs:{method:"POST",action:"https://money.yandex.ru/quickpay/confirm.xml"}},[s("input",{attrs:{type:"hidden",name:"receiver",value:"4100115505163705"}}),s("input",{attrs:{type:"hidden",name:"formcomment",value:"Токены"}}),s("input",{attrs:{type:"hidden",name:"short-dest",value:"Покупка токенов"}}),s("input",{attrs:{type:"hidden",name:"label"},domProps:{value:t.amount_deposit+" Токенов"}}),s("input",{attrs:{type:"hidden",name:"quickpay-form",value:"donate"}}),s("input",{attrs:{type:"hidden",name:"targets"},domProps:{value:t.amount_deposit}}),s("input",{attrs:{type:"hidden",name:"sum","data-type":"number"},domProps:{value:t.amount_deposit}}),s("input",{attrs:{type:"hidden",name:"comment"},domProps:{value:t.thsincom}}),s("input",{attrs:{type:"hidden",name:"need-fio",value:"false"}}),s("input",{attrs:{type:"hidden",name:"need-email",value:"false"}}),s("input",{attrs:{type:"hidden",name:"need-phone",value:"false"}}),s("input",{attrs:{type:"hidden",name:"need-address",value:"false"}}),s("input",{attrs:{type:"hidden",name:"paymentType",value:"AC"}}),s("q-btn",{staticClass:"flex-center bg-pink-6 mt-vh-2 w-100 text-white",attrs:{rounded:"",type:"submit",label:"Перейти к оплате"}})],1)])]):s("div",{staticClass:"mt-vh-4 row flex-center-div flex-center-vertical"},[s("div",[s("p",{staticClass:"q-pa-none"},[t._v("\n              1 токен равен 1 рубль укажите сумму в рублях ниже\n            ")]),s("q-input",{attrs:{outlined:"",placeholder:"Сумма"},model:{value:t.amount_deposit,callback:function(e){t.amount_deposit=e},expression:"amount_deposit"}}),s("q-btn",{staticClass:"no-shadow w-60 mt-vh-2 ml-20 text-center bg-pink-6 text-white",attrs:{rounded:"",label:"Перейти в кассу"},on:{click:function(e){return t.depositstart()}}})],1)])])],1)],1)},l=[],r=s("ded3"),c=s.n(r),d=s("18d6"),u=s("2f62"),m={name:"App",components:{},data(){return{plyr:{fullscreen:{enabled:!1}},podpleight:0,followers:0,likes:0,loading:null,vidos:null,isModel:!1,percentage:null,balance:0,auth:null,withdrawDialog:!1,options:["RUB","USD","EUR","CNY","JPN"],currency:null,amount:null,interval:null,depositDialog:!1,yad:!1,amount_deposit:null,order_id:0,recModels:5,modelall_video:0,subscribList:null,subscribListL:!1,playedid:null,pin:"",token:null,username:null,userid:null,fullvideo:{open:!1,video:null,id:null,progress:null},name:d["a"].getItem("name"),auth:null,thsincom:"Токены от ID:",thisModel:{avatars:null,createdAt:null,is_vip:null,name:null,pub_streamid:null,sec_streamid:null,updatedAt:null,videos:{}},showbar:!1,thumbStyle:{display:"none"},barStyle:{display:"none"},controls:["play-large","restart","rewind","play","fast-forward","progress","current-time","duration","mute","volume","captions","settings","pip","airplay","download","fullscreen"]}},computed:c()({},Object(u["b"])(["pcm"])),beforeMount(){this.token=this.pcm.user.tk,this.username=this.pcm.user.un,this.userid=this.pcm.user.id,this.auth=this.pcm.auth,this.thsincom="Токены от ID:"+this.username,this.auth?(this.$socket.emit("identification",{token:this.pcm.user.tk,update:!1}),Object(o["a"])({method:"get",url:"/balance",headers:{"x-access-token":this.pcm.user.tk}}).then((t=>{this.balance=t.data.balance}))):this.$router.push("/")},sockets:{identification:function(t){this.pin=t.uuid},cl_authcontroll:function(t){"auth"==t.massage?this.auth=!0:"deauth"==t.massage&&(this.auth=!1)},cl_subscribeControle:function(t){"ok"==t.status&&(this.recModels[t.index].issubscribe=!1,this.$q.notify({color:"pink-6",message:"Подписка на "+t.name+" оформлена",classes:"glossy",timeout:500})),"removed"==t.status&&(this.recModels[t.index].issubscribe=!0,this.$q.notify({color:"pink-6",message:"Вы отказались от подписки на "+t.name,classes:"glossy",timeout:500})),"error"==t.status&&"you can not follow your self"==t.log&&this.$q.notify({color:"pink-6",message:"Вы не можете подписаться сами на себя "}),t.opennotifs&&askForPermissioToReceiveNotifications(t.id,Platform.is)},cl_getuserinfos:function(t){if(this.showbar=!0,this.thisModel=t,console.log("model infos:",t.videos),this.vidos=t.videos,this.vidos)for(var e=0;e<this.vidos.length;e++)this.vidos[e].status="mdi-play";this.followers=t.subscribers,this.podpleight=t.subscribing}},mounted(){console.log(this.pcm.user.rol)},created(){this.$socket.emit("s_chagePage",{page:"index"}),this.$socket.emit("getuserinfo",{token:this.pcm.user.tk,username:this.username})},beforeCreate(){},methods:{startComputingdelete(t,e){this["loading"]=!0,this["percentage"]=0,this["interval"]=setInterval((()=>{this["percentage"]+=Math.floor(8*Math.random()+10),this["percentage"]>=100&&(this.$socket.emit("deletevideobyid",{id:t,token:e},(t=>{t.status?this.$q.notify({type:"positive",message:"deleted with success."}):this.$q.notify({type:"nigative",message:t.reason})})),clearInterval(this["interval"]),this["loading"]=!1)}),700)},setProgressBar(t){const e=setInterval((()=>{this.fullvideo.progress=t.target.currentTime/t.target.duration,(t.target.currentTime===t.target.duration||t.target.paused)&&clearInterval(e)}),100)},openfullvideo(t){this.fullvideo.video=t._source.body,this.fullvideo.open=!0,this.fullvideo.id=t._id},subscribe(t,e,s){this.$socket.emit("subscribeControle",{sender:this.pcm.user.id,receiver:t,token:this.pcm.user.tk,index:s})},identification(){this.$socket.emit("identification",{token:this.pcm.user.tk,update:!0})},payout(){this.withdrawDialog=!0},depositstart(){Object(o["a"])({method:"get",url:"/depositstart",headers:{"x-access-token":this.pcm.user.tk,amount:this.amount_deposit}}).then((t=>{this.order_id=t.data.link.id,this.yad=!0}))},withdraw(){this.withdialog=!1,Object(o["a"])({method:"get",url:"/withdraw",headers:{"x-access-token":this.pcm.user.tk,amount:parseFloat(this.amount),currency:this.currency}}).then((t=>{this.alert=t.data.status,"done"==t.data.status?location.reload():this.$q.notify({color:"negative",message:"Что-то пошло не так!"})}))}}},p=m,h=(s("e1de"),s("2877")),f=s("4d5a"),v=s("4983"),g=s("0016"),b=s("9c40"),q=s("cb32"),y=s("24e8"),x=s("f09f"),w=s("6b1d"),k=s("a370"),_=s("2c91"),C=s("1c1c"),$=s("ddd8"),I=s("27f9"),P=s("7f67"),M=s("eebe"),Q=s.n(M),S=Object(h["a"])(p,n,l,!1,null,null,null),D=S.exports;Q()(S,"components",{QLayout:f["a"],QScrollArea:v["a"],QIcon:g["a"],QBtn:b["a"],QAvatar:q["a"],QDialog:y["a"],QCard:x["a"],QLinearProgress:w["a"],QCardSection:k["a"],QSpace:_["a"],QList:C["a"],QSelect:$["a"],QInput:I["a"]}),Q()(S,"directives",{ClosePopup:P["a"]});var j=s("9df1"),O={name:"PageIndex",components:{desktop:D,mobile:j["a"]},data(){return{bal:"100.00",nnologin:!1,nologin:!0,username:null,password:null,signupform:!1,accept:!1,roles:"",name:d["a"].getItem("username")}},methods:{create_model(){Object(o["a"])({method:"post",url:"/create_model_chat",headers:{"x-access-token":d["a"].getItem("token")}}).then((t=>{}))},signup(){this.nologin=!1,this.signupform=!0,this.nnologin=!1},signin(){this.nologin=!0,this.signupform=!1,this.nnologin=!1},signupstart(){this.nologin=!1,this.signupform=!1;var t={username:this.username,password:this.password,roles:this.roles};o["a"].post("/signup",t).then((t=>{"ok"==t.data.mess?(this.nologin=!0,this.signupform=!1,this.nnologin=!1):"false"==t.data.auth?(this.$q.notify(t.data.reason),this.nologin=!1,this.signupform=!0,this.nnologin=!1):(this.nologin=!1,this.signupform=!0,this.nnologin=!1)})).catch((t=>{this.$q.notify("ошибка попробуйте снова и проверьте форму"),this.nologin=!1,this.signupform=!0,this.nnologin=!1}))},signinstart(){this.nologin=!1,this.signupform=!1;var t={username:this.username,password:this.password};o["a"].post("/signin",t).then((t=>{if(console.log(t.data),"ok"==t.data.stat){this.nologin=!1,this.signupform=!0;const e=t.data.reason,s=this.username;d["a"].setItem("token",e),d["a"].setItem("username",s),this.nologin=!1,this.signupform=!1,this.auth=!0,this.nnologin=!0}else"false"==t.data.auth&&(this.$q.notify(t.data.reason),this.nologin=!1,this.signupform=!0,this.nnologin=!1)}))}},beforeCreate(){Object(o["a"])({method:"get",url:"/verify_sess",headers:{"x-access-token":d["a"].getItem("token")}}).then((t=>{"YES"==t.data.session?(this.nologin=!1,this.signupform=!1,this.auth=!0,this.nnologin=!0):(this.nologin=!0,this.nnologin=!1)}))}},T=O,z=(s("82cd"),s("9989")),A=Object(h["a"])(T,i,a,!1,null,null,null);e["default"]=A.exports;Q()(A,"components",{QPage:z["a"]})},e1de:function(t,e,s){"use strict";s("4909")}}]);
//# sourceMappingURL=11.js.map