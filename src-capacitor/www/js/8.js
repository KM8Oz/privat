(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"3bc5":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{staticClass:"transparent"},[t.$q.platform.is.desktop?s("div",[s("VideoCaptureD",{attrs:{uploadUrl:t.uploadUrl},model:{value:t.videoUrl,callback:function(e){t.videoUrl=e},expression:"videoUrl"}})],1):t._e(),t.$q.platform.is.mobile?s("div",[s("VideoCapture",{attrs:{uploadUrl:t.uploadUrl},model:{value:t.videoUrl,callback:function(e){t.videoUrl=e},expression:"videoUrl"}})],1):t._e()])},i=[],a=s("ee26"),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.mediasupport||"record"!==t.typefile?t.mediasupport&&"record"===t.typefile?s("section",{staticClass:"fit row justify-center"},[s("div",{staticClass:"q-pa-md col-7"},[s("q-carousel",{attrs:{swipeable:"",animated:"",thumbnails:"",infinite:""},model:{value:t.totuslide,callback:function(e){t.totuslide=e},expression:"totuslide"}},[s("q-carousel-slide",{attrs:{name:1,"img-src":"http://rec.camsguns.com/tutos/obs1.png"}}),s("q-carousel-slide",{attrs:{name:2,"img-src":"http://rec.camsguns.com/tutos/obs2.png"}}),s("q-carousel-slide",{attrs:{name:3,"img-src":"http://rec.camsguns.com/tutos/obs3.png"}}),s("q-carousel-slide",{attrs:{name:4,"img-src":"http://rec.camsguns.com/tutos/obs4.png"}}),s("q-carousel-slide",{attrs:{name:4,"img-src":"http://rec.camsguns.com/tutos/obs5.png"}})],1)],1)]):"upload"===t.typefile?s("section",{class:t.pcm.controls.dark?"row bg-black":"row"},[s("div",{staticClass:"col-lg-2 col-md-3 mt-vh-4"},[s("q-followings")],1),s("div",{class:"col-lg-7 col-md-5 mt-vh-4 flex  justify-center fullpageMT  "+(t.pcm.controls.dark?"text-white":"text-dark")},[t.isUploading?s("div",{staticClass:"m-mx-23 h-100 w-100 row justify-center"},[s("q-circular-progress",{staticClass:"q-ma-md oswald-semibold text-center",attrs:{"show-value":"","font-size":"30px",value:100*t.progress,size:"45vh",thickness:.02,color:"pink","track-color":"grey-3"}},[t._v("\n      "+t._s(t.uploadState2?"перестройка":t.uploadState3?"сохранить":"передача")+" "),s("br"),t._v("\n        "+t._s(t.uploadState3||t.uploadState2?"#*#":t.form.video?Math.fround(t.form.video.size/1024*t.progress).toPrecision(2)+"Kb":"0Mb")+"\n    ")]),s("q-linear-progress",{staticClass:"q-mt-sm",attrs:{size:"25px",value:t.progress,"track-color":"red",stripe:"",color:"pink-7"}})],1):s("div",{staticClass:"m-mx-23 h-100 w-100 col "},[t._m(1),t._m(2),s("q-file",{class:"q-px-none q-py-auto q-mb-md text-subtitle1",staticStyle:{height:"70px"},attrs:{counter:"",accept:".mp4,.avi,.mkv,.wmv","bg-color":t.pcm.controls.dark?"grey":"",filled:"",label:"выберите видео"},on:{rejected:t.onRejected},scopedSlots:t._u([t.form.video?{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"cancel"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.form.video=null}}})]},proxy:!0}:null],null,!0),model:{value:t.form.video,callback:function(e){t.$set(t.form,"video",e)},expression:"form.video"}},[t.form.video?s("div",{staticClass:" relative-position text-pink text-subtitle1 q-pa-none"},[t._v("\n            "+t._s(t.form.video.name)+"\n          ")]):t._e()]),s("q-input",{staticClass:"row  h-10 text-body1 q-mb-md",attrs:{outlined:"","input-class":"q-mx-xs "+(t.pcm.controls.dark?"text-white":"text-dark")+" text-weight-light",square:"",placeholder:"название видео...",color:t.pcm.controls.dark?"white":"dark","bg-color":t.pcm.controls.dark?"grey":""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}}),s("q-input",{staticClass:"row q-mb-md  text-body1 ",attrs:{"input-class":"q-mx-xs "+(t.pcm.controls.dark?"text-white":"text-dark")+" text-weight-light",outlined:"",type:"textarea",square:"",placeholder:"Описание видео",color:t.pcm.controls.dark?"white":"dark","bg-color":t.pcm.controls.dark?"grey":""},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),s("q-input",{staticClass:"row  h-10 text-body1 q-mb-md",attrs:{outlined:"","input-class":"q-mx-xs "+(t.pcm.controls.dark?"text-white":"text-dark")+" text-weight-light",square:"",placeholder:"#Тег1#Тег2...",color:t.pcm.controls.dark?"white":"dark","bg-color":t.pcm.controls.dark?"grey":""},model:{value:t.form.tags,callback:function(e){t.$set(t.form,"tags",e)},expression:"form.tags"}}),s("div",{staticClass:"row  w-100"},[s("q-btn",{staticClass:"q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs ",attrs:{dense:"",rounded:"",color:"pink-6","no-caps":"",label:"Загрузить"},on:{click:t.uploadvid}})],1)],1)]),s("q-listrec")],1):s("section",{class:"row fit justify-center "+(t.pcm.controls.dark?"bg-dark text-white":"text-dark")},[s("div",{staticClass:"col-lg-2 col-md-3 mt-vh-4"},[s("q-followings")],1),"OBS"===t.typefile?s("div",{staticClass:"col-lg-6 col-md-6 mt-vh-4 q-mx-md justify-center   "},[s("div",{staticClass:"h-100  col-12 "},[t._m(3),t._m(4),t._m(5),t._m(6),s("div",{staticClass:"row justify-center"},[s("q-input",{staticClass:"col-12  h-10 text-body1 q-mb-md",attrs:{outlined:"","input-class":"q-mx-xs   text-weight-light",square:"",placeholder:"название видео..."},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}}),s("q-input",{staticClass:"col-12 q-mb-md  text-body1 ",attrs:{"input-class":"q-mx-xs text-weight-light",outlined:"",type:"textarea",square:"",placeholder:"Описание видео"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),s("q-input",{staticClass:"col-12  h-10 text-body1 q-mb-md",attrs:{outlined:"","input-class":"q-mx-xs   text-weight-light",square:"",placeholder:"#Тег1#Тег2..."},model:{value:t.form.tags,callback:function(e){t.$set(t.form,"tags",e)},expression:"form.tags"}}),s("div",{staticClass:"col-12"},[s("q-btn",{staticClass:" q-px-xs q-py-xs q-my-xs q-mx-auto w-100 text-weight-regular  ",attrs:{loading:t.obsbtnloading,dense:"",disable:!(t.form.tags&&t.form.title&&t.form.description),rounded:"",color:t.obsbtncolor,"no-caps":"",label:t.obsbtnlabel},on:{click:t.generateObs},scopedSlots:t._u([{key:"loading",fn:function(){return[s("q-spinner-radio"),t._v("\n        "+t._s(t.obsdatarecorded)+"\n      ")]},proxy:!0}],null,!1,2456765240)})],1),t.submitResult.status?s("q-card",{staticClass:"col-12 q-mt-md bg-grey-white",attrs:{flat:"",bordered:""}},[s("q-card-section",[s("q-input",{attrs:{"input-class":"text-body2",value:"server: "+t.streamingUrl,readonly:"","label-slot":""},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"content_paste"},on:{click:t.copy}})]},proxy:!0}],null,!1,4166166499)})],1),s("q-separator"),s("q-input",{attrs:{filled:"",autogrow:"",readonly:"",value:"Key: ********************************************","label-slot":""},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"content_paste"},on:{click:t.copy2}})]},proxy:!0}],null,!1,3950021681)})],1):t._e()],1)])]):s("div",{staticClass:"col-lg-5 col-md-5 mt-vh-4 d-flex justify-content-center fullpageMT"},[s("div",{staticClass:"m-mx-23 h-100 w-100 col "},[t._m(7),t._m(8),s("div",{staticClass:"row justify-center"},[s("div",{staticClass:"col-6"},[s("q-btn",{staticClass:" q-px-xs q-py-xs  w-100 text-weight-regular ",attrs:{dense:"",rounded:"",color:"pink-6","no-caps":"",label:"Записать видео"},on:{click:function(e){return t.goto("record")}}})],1),s("div",{staticClass:"col-6"},[s("q-btn",{staticClass:" q-px-xs q-py-xs q-ml-xs w-100 text-weight-regular  ",attrs:{dense:"",rounded:"",color:"pink-6","no-caps":"",label:"Загрузить видео"},on:{click:function(e){return t.goto("upload")}}})],1),s("div",{staticClass:"col-12"},[s("q-btn",{staticClass:" q-px-xs q-py-xs q-my-xs q-mx-auto w-100 text-weight-regular  ",attrs:{dense:"",rounded:"",color:"pink-6","no-caps":"",label:"Записать видео OBS"},on:{click:function(e){return t.goto("OBS")}}})],1)])])]),s("div",{staticClass:"col-lg-3 col-md-3 mt-vh-4"},[s("q-listrec")],1)]):s("section",{staticClass:"row justify-center"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isUploading,expression:"!isUploading"}],class:[t.activeC,"flex","justify-center","bg-black","q-mt-none","q-pt-none","window-height"]},[s("div",{staticClass:"w-100 h-100 q-pa-none q-ma-none justify-center row videowrapper"},[s("video",{ref:"videoRec",class:[t.activeCc,"h-100","q-pa-none","q-ma-none","video-6-19"],attrs:{playsInline:"",muted:""},domProps:{muted:!0}})]),t.isFinished?t._e():[s("VueRecordVideo",{staticClass:"fixed col-6",attrs:{mode:t.recMode},on:{stream:t.onStream,result:t.onResult}})]],2),s("p",{staticClass:"text-white"},[t._v(t._s(t.alert))]),t.isFinished?s("div",{staticClass:"row justify-center  q-my-none q-mx-none h-100 w-40"},[s("div",{staticClass:"w-100 h-100  col q-mx-md q-mt-md"},[t._m(0),s("q-input",{staticClass:"row  h-10 text-body1 q-mb-md",attrs:{outlined:"","input-class":"q-mx-xs   text-weight-light",square:"",placeholder:"название видео..."},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}}),s("q-input",{staticClass:"row q-mb-md  text-body1 ",attrs:{"input-class":"q-mx-xs text-weight-light",outlined:"",type:"textarea",square:"",placeholder:"Описание видео"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),s("q-input",{staticClass:"row  h-10 text-body1 q-mb-md",attrs:{outlined:"","input-class":"q-mx-xs   text-weight-light",square:"",placeholder:"#Тег1#Тег2..."},model:{value:t.form.tags,callback:function(e){t.$set(t.form,"tags",e)},expression:"form.tags"}}),s("div",{staticClass:"row  w-100"},[s("q-btn",{staticClass:"q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs ",attrs:{dense:"",rounded:"",color:"pink-6","no-caps":"",label:"Опубликовать"},on:{click:t.uploadvid}}),s("q-btn",{staticClass:"q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs ",attrs:{dense:"",rounded:"",color:"pink-6","no-caps":"",label:"Отмина"},on:{click:t.forcereload}})],1),s("div",{staticClass:"row  w-100"},[s("q-linear-progress",{staticClass:"q-mt-sm",attrs:{size:"25px",value:t.progress,"track-color":"red",stripe:"",color:"pink-7"}})],1)],1)]):t._e()])},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-h6 text-weight-light"},[s("p",{staticStyle:{color:"#000"}},[t._v("Загрузить видео")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-h6 text-weight-light"},[s("p",[t._v("Загрузить видео")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-weight-light"},[s("p",[t._v("выберите видеофайл.")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-h6 text-weight-light"},[s("p",[t._v("Записать видео OBS")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-weight-light"},[s("p",[t._v("1 - скопируйте и вставьте сервер и ключ в OBS и нажмите кнопку начать запись.")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-weight-light"},[s("p",[t._v("2 - продолжайте отслеживать размер видео на странице (не закрывайте эту страницу).")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-weight-light"},[s("p",[t._v("3 - нажмите опубликовать.")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-h6 text-weight-light"},[s("p",[t._v("Записать видео")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row text-weight-light"},[s("p",[t._v("Запишите видео используя видеокамеру или выберите видеофайл.")])])}],n=(s("e01a"),s("07ac"),s("ddb0"),s("2b3d"),s("c973")),c=s.n(n),d=s("ded3"),u=s.n(d),p=s("c427"),m=(s("18d6"),s("2f62")),h=s("cdde"),f={name:"VideoCaptureD",data(){return{recMode:"press",activeC:"w-100",activeCc:"w-100",streamingUrl:"rtmp://rtmp.cg.house/recorder",submitResult:{status:!1,value:null},alert:null,errText:null,isModel:!1,videostatus:!1,typefile:null,totuslide:1,obsbtnloading:!1,progress2:0,obsdatarecorded:"...Kb",obsbtnlabel:"генерировать",uploadState3:!1,isUploading:!1,isRecording:!1,isFinished:!1,recorder:null,ws:null,obsstage:0,uploadState2:!1,progress:0,obsbtncolor:"pink-6",auth:!1,respond:null,videoUrl:null,videoUrlelastic:null,tags:null,isUploading:!1,mess:null,description:null,mediaStream:null,videocontrols:{ctl:"",autoplay:"",loop:"off"},form:{title:null,description:null,tags:null,video:null,url:null,token:null}}},computed:u()(u()({mediasupport:function(){var t,e;return!(null===(t=navigator.mediaDevices)||void 0===t?void 0:t.getSupportedConstraints())||!!Object.values(null===(e=navigator.mediaDevices)||void 0===e?void 0:e.getSupportedConstraints()).map((t=>!1===t)).length>4}},Object(m["b"])(["pcm"])),{},{video:function(){return this.$refs.videoRec||document.getElementsByTagName("video")[0]},videoWrapper:function(){return document.getElementsByClassName("videowrapper")[0]}}),created(){this.uploadUrl||(this.errText="There is no upload url available")},beforeMount(){this.form.token=this.pcm.user.tk,this.isModel=this.pcm.user.rol,this.auth=this.pcm.auth,!this.auth|!this.isModel&&this.$router.push("/")},mounted(){},beforeCreate(){},methods:{generateObs:function(){0===this.obsstage?(this.obsbtnloading=!0,this.$socket.emit("join",`recording${this.pcm.user.id}`),this.getstreamkeyOB()):this.pushdataafterrecord()},copy(t){Object(h["a"])(this.streamingUrl),this.$q.notify({color:"pink-6",message:"Ключ скопирован в буфер обмена"})},getstreamkeyOB(){this.$socket.emit("streamkey",{token:this.pcm.user.tk})},copy2(t){Object(h["a"])(this.submitResult.value),this.$q.notify({color:"pink-6",message:"URL скопирован в буфер обмена"})},onRejected(t){this.$notify.error({title:"Советы по загрузке",message:`Тестовая среда не может загружать файлы ${t.length}`})},resetVideo:function(){},onResult:function(t){this.form.video=t,this.isFinished=!0,this.video.remove(),this.videostatus=!0,this.videostatus=!1,this.activeC="w-60",this.activeCc="w-64";let e=document.createElement("video");e.className="w-64 h-100 q-pa-none q-ma-none video-6-19 ",e.loop=!0,e.type="video/mp4",e.crossOrigin="anonymous",e.controls=!0,e.src=URL.createObjectURL(t);this.videoWrapper.appendChild(e),this.$nextTick((()=>{let t=setInterval((()=>{e.load()}),1e3);e.onloadedmetadata=function(e){clearInterval(t);var s=e.target.play();void 0!==s&&s.then((function(){})).catch((function(t){console.log(t)}))}}))},goto(t){this.typefile=t},record(){this.uploadUrl&&(this.isRecording=!0,this.recorder.start(1e3))},forcereload(){location.reload()},uploadvid(){let t=this;var e=100;this.BinaryClient().then((s=>{t.isUploading=!0,s.on("open",(function(){var o=s.send(t.form.video,{name:t.form.video.name,size:t.form.video.size}),i=0;o.on("data",(function(s){2===s.stage&&"start"===s.state&&(i=0,t.uploadState2=!0,e=1e4),3===s.stage&&"start"===s.state&&(i=0,t.uploadState3=!0,t.form.url=s.url,e=100),"done"===s.state&&(t.form.url=s.url,t.pushdataafterrecord()),t.progress=Math.round(i+=s.rx*e)/100}))}))}))},pushdataafterrecord(){this.verifyfilds()?this.send().then((()=>{this.$q.notify({type:"positive",message:"sending data ....",color:"green-6",progress:!0,timeout:3e3,onDismiss:()=>{this.$router.push("/")}})})):this.$q.notify({type:"positive",message:"check data and resend please !",color:"red-6"})},send:function(){var t=c()((function*(){var t={tag:this.form.tags,text:this.form.description,videolink:this.form.url};Object(p["a"])({method:"post",url:"/create_videos",data:t,headers:{"x-access-token":this.pcm.user.tk}}).then((t=>{this.alert=t.data}))}));return function(){return t.apply(this,arguments)}}(),onStream(t){this.video.srcObject=t,this.video.play()},verifyfilds(){return console.log(this.form.title,this.form.description,this.form.tags,this.form.url),!!(this.form.title&&this.form.description&&this.form.tags&&this.form.url)},toggleVideo(){this.video.loop=!this.video.loop,this.video.controls=!this.video.controls}},sockets:{recording(t){this.obsdatarecorded=t.progress,"done"===t.status&&(this.form.url="https://rec.camsguns.com/"+t.filename+".mp4",this.obsbtnloading=!1,this.obsbtncolor="green",this.obsbtnlabel="публиковать",this.obsstage=3)},getstreamkey(t){this.submitResult.status=t.status,this.submitResult.value=t.key},cl_uploaded:function(t){}}},g=f,v=(s("6746"),s("2877")),x=s("27f9"),b=s("9c40"),q=s("6b1d"),w=s("58ea"),k=s("880c"),y=s("62cd"),C=s("7d53"),_=s("0016"),$=s("1c1c"),U=s("9569"),S=s("f09f"),j=s("a370"),O=s("eb85"),R=s("eebe"),E=s.n(R),Q=Object(v["a"])(g,r,l,!1,null,"2505124d",null),B=Q.exports;E()(Q,"components",{QInput:x["a"],QBtn:b["a"],QLinearProgress:q["a"],QCircularProgress:w["a"],QCarousel:k["a"],QCarouselSlide:y["a"],QFile:C["a"],QIcon:_["a"],QList:$["a"],QSpinnerRadio:U["a"],QCard:S["a"],QCardSection:j["a"],QSeparator:O["a"]});s("d84f");var M={components:{VideoCapture:a["a"],VideoCaptureD:B},data(){return{videoUrl:null,uploadUrl:this._G.recUrl+"/"}}},V=M,z=(s("e9ab"),s("9989")),D=Object(v["a"])(V,o,i,!1,null,"1280868d",null);e["default"]=D.exports;E()(D,"components",{QPage:z["a"]})},6746:function(t,e,s){"use strict";s("6dcf")},"6dcf":function(t,e,s){},"98d0":function(t,e,s){},e9ab:function(t,e,s){"use strict";s("98d0")}}]);
//# sourceMappingURL=8.js.map