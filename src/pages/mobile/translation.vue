<template>
  <q-page class="row bg-white fullpage">
    <div class="topvideostream">   
        <transition
  appear
  enter-active-class="animated bounceInDown"
  leave-active-class="animated bounceOutUp"
>
       <q-chip class="q-ml-md q-mt-md" >
         <q-avatar >
           {{viewers ? viewers.filter(e=>e.username != pcm.user.un).length : 0}}
         </q-avatar>
        {{username}}
      </q-chip>
           </transition>
        <!-- <transition
  appear
  enter-active-class="animated bounceInDown"
  leave-active-class="animated bounceOutUp"
>
      <q-btn class="q-mr-xs" v-if="!opendialog" size="20px" @click="switchcamera" round color="none" icon="cameraswitch" />
        </transition> -->
         <transition
  appear
  enter-active-class="animated bounceInDown"
  leave-active-class="animated bounceOutUp"
>
      <q-btn class="q-mr-xs" v-if="!opendialog" size="20px" @click="opendialog = !opendialog" round color="none" icon="speaker_notes" />
        </transition>
      </div>
      <div  v-touch:swipe.right="onright" class="row col-12 fixed fit flex-center-div h-vh-100">
        <video
          id="video"
          class="col-12 bg-black h-vh-100 video-fit"
          autoplay
          playsinline
          muted
          poster="https://rec.camsguns.com/stream.png"
        ></video>
        <q-btn
          round
          color="white"
          @click="streamControl()"
          style="margin-top: -30vw; height: 15vw; width: 15vw"
          v-if="!opendialog"
        >
          <q-icon
            class="text-pink-6 w-100 h-100"
            size="8vw"
             v-if="!streamStarted"
            name="play_arrow"
           
          />
           <q-icon
            class="text-pink-6 w-100 h-100"
            size="8vw"
             v-else
            name="stop"
           
          />
        </q-btn>
      </div>
    <q-dialog
      v-model="opendialog"
      persistent
      seamless
      :position="'top'"
      transition-show="bounce-down"
      transition-hide="bounce-up"
      class="col-12 h-vh-49"
      content-class=""
    >
      <q-card class="videodialog primary text-white">
        <q-bar class="bar-try">
          <q-space />

          <q-btn class="q-mt-lg" dense size="20px"  flat icon="speaker_notes_off" v-close-popup>
            <q-tooltip content-class="primary text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <!-- <q-card-section>
             <div class="w-100 h-vh-6">
            <q-card class="text-black no-shadow h-i">
                <q-card-section class="q-ma-none q-pa-none">
            <div class="row justify-between mt-vh-1">
              <div class="row ml-vw-1">
                <q-avatar size="8vh">
                  <img class="bordavatar" :src="useravatar" />
                </q-avatar>
                <div class="row ml-vw-1">
                  <p class="text-black col-12 q-mb-none text-fxl mt-vh-05 text-nowrap">
                    {{myname}}
                    <q-badge
                      v-if="!isPrivate"
                      color="pink-6"
                      class="q-ml-sm text-black-50 q-mb-none"
                      align="middle"
                    >
                      <span class="dot q-mr-xs bg-white"></span> live
                    </q-badge>
                    <q-badge
                      v-else
                      color="pink-6"
                      class="q-ml-sm text-black-50 q-mb-none"
                      align="middle"
                    >
                      <span class="dot q-mr-xs bg-white"></span> private
                    </q-badge>
                  </p>
                  <p
                    class="text-grey-8 col-12 cuttext text-nowrap text-xl q-mb-none h-vh-3"
                  >@{{username}}</p>
                </div>
              </div>
            </div>
            <div class="row text-max2-xl ml-vw-1 q-ma-none">
              <p class="text-xl q-ma-none">{{streamDesc}}</p>
            </div>
             {{tags(open_post_data.tags)}} 
            <p class="text-black cuttext text-xl mb-1 q-ma-none h-mc ml-vw-1">{{tags}}</p>
          </q-card-section>
                <q-card class="tabschat">
                    <q-tabs v-model="tabpanel" dense class="text-grey" active-color="pink-6" indicator-color="pink-6" align="justify" narrow-indicator>
                        <q-tab name="chat">
                            <p class="q-ma-none text-mobilestreambar">Чат</p>
                        </q-tab>
                         <q-tab name="persons">
                <p class="q-ma-none text-mobilestreambar">Пользователи</p>
              </q-tab> 
                       <q-tab name="donat">
                <p class="q-ma-none text-mobilestreambar">Донат</p>
              </q-tab> 
                        <q-tab name="settings">
                            <p class="q-ma-none text-mobilestreambar">Настройки</p>
                        </q-tab>
                    </q-tabs>
                </q-card>
            </q-card>
        </div>
        </q-card-section> -->

        <q-card-section class="q-pt-none">
          <q-tab-panels
            v-model="tabpanel"
            animated
              v-bind:style="{ height: height1+30  + 'px' }"
            class="videodialog"
            swipeable
          >
            <q-tab-panel
              name="chat"
              class="q-pa-none q-mt-md"
                v-bind:style="{ height: height1  + 'px' }"
            >
              <q-scroll-area
                ref="chatscroll"
                class=" ml-vw-1 q-pa-none"
                :thumb-style="{display:'none'}"
                :bar-style="{display:'none'}"
                :style="{ height: height1  + 'px' }"
                 :content-style="{display:'block'}"
              > 
                <!-- <div style="width:95%" class="text-white"
                v-for="(v, i) in viewers" :key="i" v-show="v.username != pcm.user.un">
                  <div class="q-ma-none row flexchat">
                             <q-chip dense>
        <q-avatar color="red" text-color="white">    <q-icon name="visibility" /></q-avatar>
        {{ v.username }}:
      </q-chip>
                    <p class="text-xl text-pink-6 q-ma-none q-ml-xs">поздоровайся с {{v.username}}</p>
                  </div>
                </div> -->
                <div
                  style="width: 95%"
                  class="text-white"
                  v-for="item in datachat"
                  :key="item.date"
                >
                  <div class="q-ma-none row flexchat" v-if="item.ismodel">
                             <q-chip dense>
        <q-avatar color="red" text-color="white">    <img :src="item.avatar" /></q-avatar>
        {{ item.name }}:
      </q-chip>
                    <p class="text-xl text-pink-6 q-ma-none q-ml-xs">{{ item.text }}</p>
                  </div>
                  <div class="q-ma-none row flexchat" v-else-if="!item.ismodel && item.avatar">
                    <q-chip dense>
        <q-avatar color="red" text-color="white"><img :src="item.avatar" /></q-avatar>
        {{ item.name }}:
      </q-chip>
                    <p class="text-white text-xl q-ma-none q-ml-xs">{{ item.text }}</p>
                  </div>
                  <div class="q-ma-none row flexchat" v-else-if="!item.ismodel && !item.name">
                       <q-chip dense>
        <q-avatar color="red" text-color="white">    <q-icon name="visibility" /></q-avatar>
        {{ item.username }}:
      </q-chip>
                    <p class="text-xl text-pink-6 q-ma-none q-ml-xs">поздоровайся с {{item.username}}</p>
                  </div>
                   <div class="q-ma-none row flexchat" v-else>
                    <q-chip dense>
        <q-avatar color="red" text-color="white"><img :src="item.avatar" /></q-avatar>
        {{ item.name }}:
      </q-chip>
                    <p class="text-white text-xl q-ma-none q-ml-xs">{{ item.text }}</p>
                  </div>
                </div>
              </q-scroll-area>
     <transition
  appear
  enter-active-class="animated bounceInDown"
  leave-active-class="animated bounceOutUp"
>
              <div class="row wi">
                <q-input
                  v-on:keyup.enter="send_comment()"
                  v-model="chat_send"
                  placeholder="Ваше сообщение"
                  borderless
                  input-class="text-body1 backy text-white q-pl-md"
                  class="sendfix  col-10 h-i q-ml-xs q-mt-xs"
                />

                <q-btn
                  color="green"
                  class="btnsend q-my-auto q-mx-auto text-center"
                  align="center"
                  icon="mdi-send"
                  outline
                  round
                  text-color="green"
                  @click="send_comment()"
                >
                </q-btn>
              </div>
     </transition>
            </q-tab-panel>
            <q-tab-panel name="settings" class="q-pa-none">
              <q-scroll-area
                ref="commentsscroll"
                class="comdial  ml-vw-1 q-pa-none h-vh-100 mr-vw-1"
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
              >
                <q-card-section class="q-pb-none w-mxc q-pa-none row q-mx-auto">
                  <p
                    class="col text-black text-weight-regular text-uppercase text-overline"
                  >
                    Настройки доната
                  </p>
                </q-card-section>
                <q-input
                  class="text-xl b-border"
                  input-class="text-subtitle1 text-weight-regular q-px-xs"
                  autogrow
                  maxlength="70"
                  color="black"
                  v-model="target"
                  placeholder="Цель сбора Токенов"
                  dense
                />
                <q-input
                  class="q-mt-md text-xl b-border"
                  input-class="text-subtitle1 text-center text-weight-regular q-px-xs"
                  autogrow
                  maxlength="60"
                  color="black"
                  v-model="sum"
                  placeholder="Сумма"
                  dense
                />

                <q-card-section class="q-pb-none w-mxc q-pa-none row q-mx-auto">
                  <p
                    class="col text-black text-weight-regular text-uppercase text-overline"
                  >
                    Настройки привата
                  </p>
                </q-card-section>
                <q-input
                  class="text-xl b-border"
                  input-class="text-subtitle1 text-center text-weight-regular q-px-xs"
                  v-model.number="sumPrivat"
                  color="black"
                  type="number"
                  placeholder="Стоимость минуты привата"
                  dense
                />
                <q-checkbox
                  v-model="cMode"
                  color="black"
                  class="mt-vh-2 w-100 flex-center-div text-center"
                  dense
                  size="4vh"
                >
                  <p class="text-comment-18 gray-1337 q-ma-none">
                    Разрешить подглядывания
                  </p>
                </q-checkbox>

                <q-card-section class="q-pb-none w-mxc q-pa-none q-mt-xs row q-mx-auto">
                  <p
                    class="col text-black text-weight-regular text-uppercase text-overline"
                  >
                    Настройки бота
                  </p>
                </q-card-section>
                <q-input
                  class="text-xl b-border"
                  input-class="text-subtitle1 text-weight-regular q-px-xs"
                  autogrow
                  color="black"
                  v-model="botDesk"
                  placeholder="Текст сообщения бота"
                  dense
                />
                <q-input
                  class="q-mt-md text-xl b-border"
                  input-class="text-center text-subtitle1 text-weight-regular q-px-xs"
                  v-model.number="botTime"
                  type="number"
                  placeholder="Таймаут"
                  color="black"
                  dense
                />
                <div class="flex-center-div">
                  <q-btn
                    rounded
                    outline
                    class="q-mt-md q-mb-xs w-80 text-overline"
                    label="Сохранить"
                    color="black"
                    @click="cl_changestreaminfo()"
                  />
                </div>
              </q-scroll-area>
            </q-tab-panel>
            <q-tab-panel name="persons" class="q-pa-none"> </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-dialog>
 <q-dialog v-model="showprivate2">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="videocam"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    {{ userprivate }} зовет вас в приват
                </p>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="SuccPrivate2()" style="border-radius: 30px">Согласна</q-btn>
                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="canselPrivate2()">Нет</q-btn>
            </div>
        </q-card>
    </q-dialog>
    <q-dialog v-model="showprivate">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            {{ userprivate }} завет вас в приват
          </p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="SuccPrivate()"
            style="border-radius: 30px"
            >Согласна</q-btn
          >
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="canselPrivate()"
            >Нет</q-btn
          >
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="closeprivate">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            У {{ userprivate }} закочились токены
          </p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="closeprivate = false"
            style="border-radius: 30px"
            >ОК</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Loader from "../Loader.vue";
import http from "../../http-common";
import { LocalStorage } from "quasar";
import * as getMedia from 'get-user-media-promise';
import { mapState } from 'vuex';
export default {
  name: "VideoCapture",
  data() {
    return {
      chat_send: null,
      showprivate2:false,
      datachat: [],
      connection: null,
      mediaRecorder: null,
      streamStarted: false,
      tabpanel: "chat",
      peoplesIn:0,
      sockestsIte:null,
      facemode:true,
      viewers:null,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
      username: LocalStorage.getItem("username"),
      myname: LocalStorage.getItem("name"),
      useravatar: null,
      streamDesc: null,
      tags: null,
      oldViewers:[],
      height1: null,
      target: null,
      sum: null,
      sumPrivat: null,
      cMode: false,
      botDesk: null,
      botTime: null,
      userprivate: null,
      showprivate: false,
      userprivateid: null,
      closeprivate: false,
      private2:{
        start_time:null
        },
      isPrivate: false,
      alluser: null,
      donat: null,
      opendialog: false,
    };
  },
  watch:{
    viewers:function(val){
      let vm = this
      this.arr_diff(vm.oldViewers, val).then((res)=>{
      // console.log(res);
        if(res !== []){
         res.map(e=>e ? vm.datachat.push(e): e)
        }
      })
        //  this.datachat.push()
        this.oldViewers = val;
    }
  },
  computed:{
    ...mapState(['pcm'])
  },
  beforeMount:function(){
  this.username = this.pcm.user.un;
  
  },
  beforeDestroy() {
    this.stop();
    clearInterval(this.sockestsIte)
  },
  sockets: {
    cl_getalluser: function (response) {
      this.alluser = response.alluser;
    },
    // cl_newdonat: function (response) {
    //   this.donat = response.alluser
    // },
    cl_preopleinlive: function(res){
     this.peoplesIn = res.number > 0  ? res.number - 1 : res.number
    },
     cl_control_streams: function(res){
           // console.log(res);
         if(res.status){
             if(res.payload){
         this.$q.notify({
             type:"positive",
             message:`приватный чат закрыт пользователем { всего: ${res.payload.total}}`
         })
             } else {
      this.$q.notify({
             type:"positive",
             message:"private stream started"
         })
             }
         this.private2.start_time = new Date();
         } 
        },
    cl_newMassage: function (response) {
      let jsonobj = {
        text: response.text,
        date: response.date,
        name: response.name,
        models: response.models,
        ismodel: response.ismodel,
        avatar: response.avatar
      };
      //console.log(jsonobj)
      this.datachat.push(jsonobj);
      setTimeout(() => {
        this.$refs.chatscroll?.setScrollPosition(this.$refs.chatscroll?.scrollSize);
      }, 500);
    },

    cl_streamcloused: function (response) {
      if ((response.reason = "clien have no money")) {
        this.closeprivate = true;
      }
      this.stop();
    },

    cl_StartPrivate: function (response) {
      this.userprivate = response.userprivate;
      this.userprivateid = response.userprivateid;
      this.showprivate = true;
    },
    cl_StartPrivate2: function (response) {
      this.userprivate = response.userprivate;
      this.userprivateid = response.userprivateid;
      this.showprivate2 = true;
    },
    cl_broadcastNewInfo: function (response) {
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode == "true" ? true : false;
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
    },
    cl_changetstreaminfo: function (response) {
      if (response == "ready") {
        this.$q.notify({
          color: "pink-6",
          message: "Настройки изменены",
        });
      }
    },
    cl_changestreamdata: function (response) {
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode == "true" ? true : false;
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
    },
    cl_getstreaminfo: function (response) {
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode == "true" ? true : false;
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
    },
    cl_getmyavatar: function (response) {
      this.useravatar =
        response.avatar != null
          ? response.avatar
          : "https://cdn.quasar.dev/img/boy-avatar.png";
    },
    cl_streamClose: function (response) {
      if ((response.reason = "clien have no money")) {
        this.stop();
        this.$q.notify({
          color: "pink-6",
          message: "У пользователя недостаточно токенов",
        });
      }
    },
  },
  mounted() {
    let vm = this;
    this.height1 = window.innerHeight - 150;
    window.addEventListener("resize", () => {
      // We execute the same script as before
      this.height1 = window.innerHeight - 150;
     // console.log(this.height1);
    });
      this.sockestsIte = setInterval(()=>{
 this.findAllSockets()
    }, 2000)
    // setInterval(()=>{
    //   this.$socket.emit('getPeoplesInStream',{
    //     id: LocalStorage.getItem('userid'),
    //     token: LocalStorage.getItem('token')
    //   })
    // },5000)
    this.$socket.emit("s_changePage", {
      page: "stream",
      model: this.pcm.user.id,
      userid: this.pcm.user.id,
      token: this.pcm.user.tk,
    });
    this.$socket.emit("s_getstreaminfo", {
      token: this.pcm.user.tk,
      modelid: this.pcm.user.id,
    });
    this.$socket.emit("s_ModelStream", {
      userid: this.pcm.user.id,
    });
    this.$socket.emit("s_getmyavatar", {
      userid: this.pcm.user.id,
    });
    // setInterval(
    //   function () {
    //     http({
    //       method: "get",
    //       url: "/search_comments_model",
    //       headers: {
    //         "x-access-token": this.pcm.user.tk,
    //       },
    //     }).then((response2) => {
    //       this.datachat = null;
    //       this.datachat = response2.data;
    //     });
    //   }.bind(this),
    //   3000
    // );
    // http({
    //   method: "get",
    //   url: "/search_comments_model",
    //   headers: {
    //     "x-access-token": this.pcm.user.tk,
    //   },
    // }).then((response2) => {
    //   this.datachat = null;
    //   this.datachat = response2.data;
    // });
    //  console.log(navigator.mediaDevices.getSupportedConstraints()) 
  //   {audio:{  audio: {
  //   channelCount: 2,
  //   echoCancellation:false
  // }},video:{
  //     facingMode:{exact:  "user"},
  //     frameRate: { max: 30 },
  //   }}
  (async()=>{
  //let devices = (await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind === "videoinput").map(e=>e.deviceId)
    getMedia({audio:true,video:true})
      .then((stream) => {
        var options = {
          mimeType: "video/webm",
        };
        this.mediaRecorder = new MediaRecorder(stream, options);
        this.mediaRecorder.start(2000);
        var video = document.querySelector("video");
        video.srcObject = stream;
          vm.$q.notify({
            type:'positive',
          message: 'media support:'+getMedia.isSupported,
          multiLine:true
        });
      })
      .catch((err) => {
       // console.log(navigator.mediaDevices.getSupportedConstraints())
        vm.$q.notify({
          message: 'try an other browser',
          color: "red",
        });
      });
  })()
  
  },
  methods: {
        canselPrivate2() {
            this.$socket.emit("s_cancelPrivate2", {
                token: this.pcm.user.tk,
                modelid: this.pcm.user.id,
                userid: this.userprivateid
            });
            this.showprivate = false;
        },
    SuccPrivate2() {
            this.$socket.emit("control_streams", {
                token: this.pcm.user.tk,
                payload:{
                    type:"update",
                 modelid:this.pcm.user.id,
                 user_in_private: this.userprivateid,
                 is_private: true
                }
            });
            this.showprivate2 = false;
            // this.startPrivate();
            this.isPrivate = true;
        },
     arr_diff: async function (a2, a1) {
     // a2 old 
     // a1 new
    var a = [], diff = [];
    if(a2.length === 0){
     a1.map(e=> diff.push(e))
    
   } else {
    for (var i = 0; i < a2.length; i++) {
        a[a2[i].username] = true;
    }
      for (var i = 0; i < a1.length; i++) {
        if (a[a1[i].username]) {
            delete a[a1[i].username];
        } else {
            diff.push(a1[i]);
        }
    }
   }



   
    // for (var k in a) {
    //     diff.push(k);
    // }

    return diff;
},
       findAllSockets: function(){
 this.$socket.emit("findAllInRoom", {room: "chat"+this.pcm.user.id, token: this.pcm.user.tk}, (res)=>{
          this.viewers = res.sockests
         // console.log(res);
        })
        },
    canselPrivate() {
      this.$socket.emit("s_cancelPrivate", {
        token: this.pcm.user.tk,
        modelid: this.pcm.user.id,
        userid: this.userprivateid,
      });
      this.showprivate = false;
    },
    SuccPrivate() {
      this.$socket.emit("s_StartPrivateModel", {
        token: this.pcm.user.tk,
        modelid: this.pcm.user.id,
        userid: this.userprivateid,
      });
      this.showprivate = false;
      this.stop();
      this.startPrivate();
      this.isPrivate = true;
    },
    cl_changestreaminfo() {
      if (
        this.target != null &&
        this.sum != null &&
        this.sumPrivat != null &&
        this.sumPrivat != 0 &&
        this.botDesk != null &&
        this.botTime != null
      ) {
        this.$socket.emit("changestreamdata", {
          token: this.pcm.user.tk,
          target: this.target,
          sum: this.sum,
          sumPrivat: this.sumPrivat,
          cMode: this.cMode,
          botDesk: this.botDesk,
          botTime: this.botTime,
        });
      } else {
        this.$q.notify({
          color: "pink-6",
          message: "Ошибка изменения поля пустые или неверны",
        });
      }
    },
    send_comment() {
      if (
        this.chat_send == null ||
        this.chat_send == "" ||
        this.chat_send == " " ||
        !this.chat_send.trim().length > 0
      ) {
        this.$q.notify({
          // ограничение на 3 или 2 буквы тут будут бесполезны из за особенности русского языка
          color: "pink-6",
          message: "Сообщение пустое",
        });
        return;
      }
      this.$socket.emit("s_streamchatsend", {
        username: this.pcm.user.un,
        modelid: this.pcm.user.id,
        avatar:this.useravatar,
        textmess: this.chat_send,
      });
      this.chat_send = null;
    },
    streamControl() {
      if (this.streamStarted) {
        this.isPrivate = false;
        this.stop();
      } else {
        this.start(this);
      }
    },
    onright:function(){
     this.$root.$emit('changepage', 1)
    },
    //  start(){
    //    this.connection = new WebSocket("wss://record.camsguns.com/streams?token=" + this.pcm.user.tk +"");
    //    this.mediaRecorder.addEventListener('dataavailable',videoDataHandler)
    //    this.streamStarted = true;
    //  },
    //  stop() {
    //    this.connection.close();
    //    this.mediaRecorder.removeEventListener('dataavailable',videoDataHandler);
    //    this.streamStarted = false;
    //  },
    switchcamera:async ()=>{
     // console.log();
     this.facemode = ! this.facemode;
     this.stop();
     this.start(this);
    },
    start:async function(vm){
          // let devices = (await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind === "videoinput").map(e=>e.deviceId)
      const websocketEndpoint =
        "wss://record.camsguns.com/streams?token=" + this.pcm.user.tk + "&type=mobile";
      this.connection = new WebSocket(websocketEndpoint);
      
     getMedia({
          audio: true,
            video:true,
        })
        .then((stream) => {
          var options = {
            mimeType: "video/webm",
          };

          vm.mediaRecorder = new MediaRecorder(stream, options);
          vm.mediaRecorder.start(1500);
          vm.mediaRecorder.ondataavailable = this.videoDataHandler;
          var video = document.querySelector("video");
          video.srcObject = stream;
          vm.streamStarted = true;
        });
    },
    startPrivate() {
      const websocketEndpoint =
        "wss://record.camsguns.com/private?token=" +
        this.pcm.user.tk +
        "&modelid=" +
        this.pcm.user.id +
        "&userid=" +
        this.userprivateid +
       "&type=mobile";
      this.connection = new WebSocket(websocketEndpoint);
      getMedia({
          audio: true,
            video: { width: window.innerWidth, height: window.innerHeight},
        })
        .then((stream) => {
          var options = {
            mimeType: "video/webm",
          };
          this.mediaRecorder = new MediaRecorder(stream, options);
          this.mediaRecorder.start(1000);
          this.mediaRecorder.ondataavailable = this.videoDataHandler;
          var video = document.querySelector("video");
          video.srcObject = stream;
          this.streamStarted = true;
        });
    },
    stop() {
      this.mediaRecorder?.stop();
      this.connection?.close();
      this.streamStarted = false;
    },
    videoDataHandler(event) {
      //this.isUploading = true;
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.data);
      reader.onloadend = () => {
        this.connection.send(reader.result);
      };
    },
  },
};
</script>

<style>
.mbb50 {
  width: 100%;
  margin-bottom: 10vh;
}

.purp {
  color: #fe2c55;
}

.h-vh-resize49 {
  height: calc(var(--vh, 1vh) * 49);
}
</style>
