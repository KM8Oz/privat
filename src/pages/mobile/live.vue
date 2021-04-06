<template>
  <q-page class="bg-white fullpage" style="overflow: auto">
    <div class="fit fixed bg-black" >
      <!-- <video
        id="videoElement"
        autoplay
        muted
        playsinline
        class="full-width"
        style="height:33vh; width:100%;"
        webkit-playsinline
        wmode="opaque"
        :src="link"
      ></video> -->
      <!-- <video-player ref="streamplayer" :options="videoOptions" :configs="{ hls: true }"></video-player> -->

      <q-hls :src="src" :wps="100" ref="playerhls" :hps="100" :c="false"  class="h-vh-100 " classes="video-fit" />
    </div>

    <div class="row w-vw-100 h-vh-100 fixed-center">
      <div class="row w-vw-100">
        <div class="row w-hw-100 ">
          <div class="row justify-between mt-vh-3 ">
            <q-item clickable v-ripple class="w-100 text-white fixed-top-left">
              <q-item-section side>
                <q-avatar round size="48px">
                  <img :src="modelavatar" />
                  <q-badge floating color="red" label="live" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label v-if="datamodel"> {{ datamodel.modelname }}</q-item-label>
                <q-item-label caption class="text-white"
                  >{{ streamDesc }} | {{ tags }}</q-item-label
                >
              </q-item-section>
              <q-item-section side class="text-white" v-if="datamodel">
                <q-chip @click="gotoprofile(datamodel)">
                  <q-avatar>@</q-avatar>
                  {{ datamodel.UuserId.username }}
                </q-chip>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <div class="row h-vh-70 w-vw-100 fixed-center">
          <q-scroll-area
          v-touch:swipe.right="onright"
            ref="chatscroll"
            class="col row ml-vw-1 q-pa-none "
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
           
          >
            <div
              style="width: 95%"
              class="text-white"
              v-for="item in datachat"
              :key="item.date"
            >
              <div class="q-ma-none row flexchat" v-if="item.ismodel">
                <q-chip dense>
                  <q-avatar color="red" text-color="white">
                    <img :src="item.avatar"
                  /></q-avatar>
                  {{ item.name }}:
                </q-chip>
                <p class="text-xl text-pink-6 q-ma-none q-ml-xs">{{ item.text }}</p>
              </div>
              <div class="q-ma-none row flexchat" v-else>
                <q-chip dense>
                  <q-avatar color="red" text-color="white"
                    ><img :src="item.avatar"
                  /></q-avatar>
                  {{ item.name }}:
                </q-chip>
                <p class="text-white text-xl q-ma-none q-ml-xs">{{ item.text }}</p>
              </div>
            </div>
          </q-scroll-area>
        </div>
        <div class="fixed-bottom  w-vw-100 row">
    
          <q-input
            v-on:keyup.enter="send_comment()"
            v-model="chat_send"
            placeholder="Ваше сообщение"
            borderless
            input-class="text-body1 backy text-white q-my-md q-pl-md"
            class="sendfix col-10 q-my-xs q-ml-xs"
          >
          <template v-slot:prepend>
                      <q-fab
        v-model="fabLeft"
        vertical-actions-align="left"
       color="black"
        class=" text-black q-my-auto text-center "
        icon="keyboard_arrow_up"
        direction="up"
        
      >
        <q-fab-action label-position="right" color="pink-6"  @click="privateStart = true" icon="vpn_lock" label="Приват" />
        <q-fab-action label-position="right" color="pink-3"   @click="giftDialog = true" icon="redeem" label="Подарить токены" />
        <q-fab-action label-position="right" :color="videoHD ? 'pink-3':'dark'"  :label="videoHD?'стандартный':'низкое качество'"  @click="switchSrc" icon="hd"/>
      </q-fab>
        </template>
          </q-input>

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
      </div>
    </div>
    <q-dialog v-model="giftDialog">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            Вы можете подарить не более {{ userToken }} токенов
          </p>
          <q-input
            rounded
            outlined
            dense
            dark
            class="col-12 q-px-xl q-mt-md q-mx-lg text-white"
            v-model="amountGift"
            placeholder="Сумма токенов"
          />
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="giftTokenDialog()"
            style="border-radius: 30px"
            >Да</q-btn
          >
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="giftDialog = false"
            >Нет</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="privateStart" v-if="userToken > sumPrivat">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 4vw">
            Внимание у вас {{ userToken }} токенов за приват модель просит
            {{ sumPrivat }} в минуту. Вы хотите начать приват?
          </p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="SuccPrivate()"
            style="border-radius: 30px"
            >Да</q-btn
          >
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="privateStart = false"
            >Нет</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="privateStart" v-else>
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 4vw">
            У вас недостаточно токенов для привата модель просит
            {{ sumPrivat }} токенов за минуту
          </p>
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="privateStart = false"
            >ОК</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import http from "../../http-common";
// import videoPlayer from "../../components/VideoPlayer";
// import EasyPlayer from "@easydarwin/easyplayer";
import Hls from "hls.js";
import { LocalStorage } from "quasar";
import { log } from "video.js";
import { mapState } from 'vuex';
export default {
  components: {
    // VuePlyr,
    // videojs,
    // resolutionswitch,
    // VideoPlayer
    // contribhls,
    // videyoutube,
    // videojsvimeo,
  },
  data() {
    return {
      privateStart: false,
      hls: null,
      chat_send: null,
      madels: 95,
      sub: "sub",
      report: false,
      fabLeft:false,
      muted: true,
      link: null,
      chatmess: null,
      datamodel: null,
      privat: false,
      offline: false,
      load: true,
      giftDialog: false,
      amountGift: null,
      userToken: null,
      streamDesc: null,
      tags: null,
      target: null,
      sum: null,
      sumPrivat: null,
      cMode: false,
      botDesk: null,
      botTime: null,
      modelavatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      chatplayer: null,
      amount_bounty: null,
      bal: 0,
      bounty: false,
      chat_send: null,
      madels: 95,
      sub: "sub",
      checklive: false,
      videoHD:true,
      muted: true,
      link: null,
      datachat: [],
      chatmess: null,
      interval: null,
      videol: null,
      peoplesIn: 0,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
          src:
            this._G.recUrl +
            "/mobileHD/model" +
            this.$route.params.modelid +
            "/index.m3u8",
    };
  },
  // components: { EasyPlayer },
  computed:{
   ...mapState(['pcm']),
   playerhls:function (){
     return this.$refs.playerhls
   }
  },
  created: function () {
    this.src =  this._G.recUrl +
            "/mobileHD/model" +
            this.$route.params.modelid +
              "/index.m3u8"+`?id=${this.pcm.user.id}&token=abcsf123nk21d`;
    this.$nextTick(function () {
      this.videol = this.$route.params.modelid;
      this.$socket.emit("s_changePage", {
        page: "stream",
        model: this.$route.params.modelid,
        userid: this.pcm.user.un,
        token: this.pcm.user.tk,
      });
      this.$socket.emit("s_getstreaminfo", {
        token: this.pcm.user.tk,
        modelid: this.$route.params.modelid,
      });
      this.$socket.emit("s_getuseravatar", {
        userid: this.$route.params.modelid,
      });
      this.chatplayer = this.link;

    //  var videoSrc = this.videoOptions.source.src;
    //  const video = this.$refs.videoRef;
    //   if (Hls.isSupported()) {
    //     var hls = new Hls({
    //       // debug: true,
    //       enableWorker: true,
    //       liveBackBufferLength: 900,
    //       // widevineLicenseUrl: "http://cwip-shaka-proxy.appspot.com/no_auth",
    //       //  emeEnabled: true,
    //       levelLoadingMaxRetry: 100,
    //       manifestLoadingMaxRetry: 200,
    //       // abrMaxWithRealBitrate:true,
    //       manifestLoadingRetryDelay: 100,
    //       autoStartLoad: true,
    //       // enableSoftwareAES:false,
    //       appendErrorMaxRetry: 100,
    //     });
    //     hls.loadSource(videoSrc);
    //     hls.attachMedia(video);
    //     // hls.on(Hls.Events.MEDIA_ATTACHED, function() {
    //     //  this.$refs.videoRef.play();
    //     // });
    //     hls.on(Hls.Events.MANIFEST_LOADED, function () {
    //       video.play();
    //       console.log("manifest loaded");
    //     });
    //     var vm = this;
    //     hls.on(Hls.Events.ERROR, function () {
    //       console.log(window.location.pathname)
    //       if(window.location.pathname === 'live'){
    // vm.$q.notify({
    //         type:'warning',
    //         message:'error loading stream',
    //         actions: [
    //       { label: 'back', color: 'black', handler: () => { vm.$router.back() } }
    //     ]
    //       })
    //       }
      
    //     });
    //     // hls.config.abrMaxWithRealBitrate
    //     //   hls.config.lowBufferWatchdogPeriod
    //     //     hls.config.highBufferWatchdogPeriod
    //     //       hls.config.nudgeOffset
    //     //       hls.config.maxSeekHole
    //     //       hls.config.capLevelToPlayerSize
    //     //       hls.config.manifestLoadingMaxRetryTimeout
    //     // hls.config.appendErrorMaxRetry
    //     // Hls.Events.MANIFEST_LOADED
    //     video.play();
    //     console.log(Hls.Events.MANIFEST_LOADED);
    //   }
    //   // hls.js is not supported on platforms that do not have Media Source
    //   // Extensions (MSE) enabled.
    //   //
    //   // When the browser has built-in HLS support (check using `canPlayType`),
    //   // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    //   // element through the `src` property. This is using the built-in support
    //   // of the plain video element, without using hls.js.
    //   //
    //   // Note: it would be more normal to wait on the 'canplay' event below however
    //   // on Safari (where you are most likely to find built-in HLS support) the
    //   // video.src URL must be on the user-driven white-list before a 'canplay'
    //   // event will be emitted; the last video event that can be reliably
    //   // listened-for when the URL is not on the white-list is 'loadedmetadata'.
    //   else if (this.$refs.videoRef.canPlayType("application/vnd.apple.mpegurl")) {
    //     video.src = videoSrc;

    //     video.addEventListener("canplay", function () {
    //       console.log("meta data loaded with native support");
    //       video.play();
    //     });
    //   }
      http({
        method: "get",
        url: "/balance",
        headers: {
          "x-access-token": this.pcm.user.tk,
        },
      }).then((response2) => {
        this.bal = response2.data.balance;
        this.userToken = response2.data.balance;
      });

    this.src = this._G.recUrl +
          "/mobileHD/model" +
          this.$route.params.modelid +
          "/index.m3u8"+`?id=${this.pcm.user.id}&token=abcsf123nk21d`;
    });
  },
  sockets: {
    cl_newMassage: function (response) {
      let jsonobj = {
        text: response.text,
        date: response.date,
        name: response.name,
        models: response.models,
        ismodel: response.ismodel,
        avatar: response.avatar,
      };
      this.datachat.push(jsonobj);
      setTimeout(() => {
        this.$refs.chatscroll.setScrollPosition(this.$refs.chatscroll.scrollSize);
      }, 500);
    },

    cl_privateRoute(response) {
      if (response.status == "ready") {
        this.$q.notify({
          color: "pink-6",
          message: "Модель согласилась на приват",
        });
        this.$router.push({
          path: `/private/${response.payload.chatkey}/${response.payload.userid}/${response.payload.modelid}/called`,
        });
         setTimeout(()=>{
            location.reload()
        }, 500)
      } else {
        this.$q.notify({
          color: "pink-6",
          message: "Модель отказала вам в привате",
        });
      }
    },
    cl_getRouteMain: function (response) {
      if ((response.private = "N")) {
      }
    },
    cl_changestreamdata: function (response) {
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode; // разрешить подглядывания
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
    },
    cl_getstreaminfo: function (response) {
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode; // разрешить подглядывания
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
    },
    cl_getuseravatar: function (response) {
      this.modelavatar =
        response.status == "ok"
          ? response.avatar
          : "https://cdn.quasar.dev/img/boy-avatar.png";
    },
    cl_preopleinlive: function (res) {
      this.peoplesIn = res.number > 0 ? res.number - 1 : res.number;
    },
  },
  beforeMount:function(){
      if(!this.pcm.auth) {  this.$q.notify({
        type:"warning",
        message:"signin first please!"
      }); setTimeout(()=>{
        this.$root.$emit("changepage", 1);
      }, 1000) }
  },
  beforeDestroy() {
    this.link = null;
    window.clearInterval(this.interval);
  },
  mounted:function(){
   this.playerhls.addEventListener("click", ()=>{
     this.switchSrc()
   })
  },
  methods: {
    onright:function(){
     this.$router.back()
    },
    SuccPrivate() {
      this.$socket.emit("s_StartPrivate", {
        token: this.pcm.user.tk,
        userid: this.pcm.user.un,
        name: this.pcm.user.un,
        modelid: this.$route.params.modelid,
      });
      this.privateStart = false;
      this.$q.notify({
        color: "pink-6",
        message: "Ожидаем ответа от модели",
      });
    },
    send_comment() {
      if (
        this.chat_send == null ||
        this.chat_send == "" ||
        this.chat_send == " " ||
        !this.chat_send.trim()
      ) {
        this.$q.notify({
          // ограничение на 3 или 2 буквы тут будут бесполезны из за особенности русского языка
          color: "pink-6",
          message: "Сообщение пустое",
        });
        return;
      }
      this.$socket.emit(
        "s_streamchatsend",
        {
          username: this.pcm.user.un,
          modelid: this.$route.params.modelid,
          textmess: this.chat_send,
          avatar: this.pcm.user.avatar ? this.pcm.user.avatar :  "https://cdn.quasar.dev/img/boy-avatar.png",
        },
        (err) => console.log("message sended:", err)
      );
      this.chat_send = null;
      // var data = {
      //   username: LocalStorage.getItem("username"),
      //   modelid: this.$route.params.modelid,
      //   textmess: this.chat_send
      // };
      // http({
      //   method: "post",
      //   url: "/create_comments_on",
      //   headers: {
      //     "x-access-token": this.pcm.user.tk
      //   },
      //   data: data
      // }).then(response => {
      //   this.chat_send = "отправка сообщения";
      //   //////////////////////////
      //   if (response.data.result == "created") {
      //     http({
      //       method: "get",
      //       url: "/search_comments",
      //       headers: {
      //         modelid: this.$route.params.modelid
      //       }
      //     }).then(response2 => {
      //       this.chat_send = null;
      //       this.datachat = response2.data.data;
      //     });
      //   }
      //   ///////////////////////////
      // });
    },
     switchSrc: function () {
      this.videoHD = !this.videoHD;
      this.src = this.videoHD
        ? this._G.recUrl +
          "/mobileHD/model" +
          this.$route.params.modelid +
           "/index.m3u8"+`?id=${this.pcm.user.id}&token=abcsf123nk21d`
        :  this._G.recUrl +
          "/mobileSD/model" +
          this.$route.params.modelid +
         "/index.m3u8"+`?id=${this.pcm.user.id}&token=abcsf123nk21d`;
    },
    play() {
      this.$refs.videoRef.play();
    },
    list_comments() {
      http({
        method: "get",
        url: "/search_comments",
        headers: {
          modelid: this.$route.params.modelid,
        },
      }).then((response2) => {
        this.datachat = null;
        this.datachat = response2.data.data;
      });
    },
    gotoprofile(val){
    console.log(val)
    },
    donat() {
      http({
        method: "get",
        url: "/donat",
        headers: {
          "x-access-token": this.pcm.user.tk,
          model: this.$route.params.modelid,
          amount: this.amount_bounty,
        },
      }).then((response) => {
        if (response.data.status == "ok") {
          this.$q.notify("Подарок отправлен");
          this.bounty = false;
        } else {
          this.$q.notify(response.data.status);
        }
      });
    },
    reward() {
      this.bounty = true;
    },
    giftTokenDialog(){
      console.log('ok');
    },
    // send_comment() {
    //   var data = {
    //     username: LocalStorage.getItem("username"),
    //     modelid: this.$route.params.modelid,
    //     textmess: this.chat_send
    //   };
    //   http({
    //     method: "post",
    //     url: "/create_comments_on",
    //     headers: {
    //       "x-access-token": this.pcm.user.tk
    //     },
    //     data: data
    //   }).then(response => {
    //     this.chat_send = "отправка сообщения";
    //     //////////////////////////
    //     if (response.data.result == "created") {
    //       http({
    //         method: "get",
    //         url: "/search_comments",
    //         headers: {
    //           modelid: this.$route.params.modelid
    //         }
    //       }).then(response2 => {
    //         this.chat_send = null;
    //         this.datachat = response2.data;
    //       });
    //     }
    //     ///////////////////////////
    //   });
    // },
    unmuted() {
      this.muted = false;
      var video = document.getElementById("videoElement");

      video.muted = !video.muted;
    },
    muteddd() {
      this.muted = true;
      var video = document.getElementById("videoElement");

      video.muted = !video.muted;
    },
  },
};
</script>
<style scoped>
.vh100 {
  height: 95vh;
  width: 100vw;
}
.vh30 {
  height: 33vh;
}
.mt10 {
  margin-top: 20px;
}
.roz {
  fill: #fe2c55;
}
.w50 {
  width: 70%;
}
.w501 {
  width: 30%;
}
.mt30 {
  margin-top: 35vh;
}
.mtm30 {
  margin-top: 27vh;
}
.mtm20 {
  margin-top: -10vh;
  margin-right: 80vh;
  z-index: 200;
}
.fullscreen-bg {
  overflow: hidden;
  z-index: -100;
  position: relative;
  width: 120%;
  height: 32vh;
  padding-top: 45%;
}

.fullscreen-bg__video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 32vh;
}
.overlay {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 32vh;
  z-index: 4;
}
.overlay h1 {
  text-align: center;
  color: #fff;
  font-size: 70px;
  margin-top: 17%;
}
.mb50 {
  margin-bottom: 9vh;
  width: 80%;
  height: 40px;
}
.mb501 {
  margin-bottom: 9vh;
  width: 20%;
  margin-left: 80%;
  height: 40px;
  color: white;
  border-radius: 0px;
}

.mbb50 {
  width: 100%;
  margin-bottom: 60px;
}
.purp {
  color: #fe2c55;
}
</style>
