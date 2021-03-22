<template>
  <q-page class="bg-white">
    <div class="row" style="min-height:inherit">
      <div class="col-9">
        <div class="full-width row justify-end">
          <q-btn
            @click="report=true"
            rounded
            dense
            class="q-mr-sm text-white flex items-baseline"
            no-caps
            icon="o_flag"
            style="margin-bottom: -10vh;z-index: 5;height: 5vh"
            flat
            align="right"
          >
            <p class="q-ma-none">Жалоба</p>
          </q-btn>
        </div>
        <div class="fullpage">
          <video-player ref="streamplayer" class="fullpage" :options="videoOptions"></video-player>
        </div>
      </div>

      <div class="col-3">
        <div style="width: 100%;">
          <q-card class="text-black no-shadow">
            <q-card-section class="q-ma-none q-pa-none">
              <q-card-section class="q-ma-none q-pa-none">
                <div class="row justify-between mt-vh-3">
                  <div class="row ml-vw-05">
                    <q-avatar size="5.16vh">
                      <img class="bordavatar" :src="modelavatar" />
                    </q-avatar>
                    <div class="row ml-vw-05" v-if="datamodel">
                      <p class="text-black col-12 q-mb-none text-comment-18 mt-vh-05 text-nowrap">
                        {{datamodel.modelname}}
                        <q-badge
                          color="pink-6"
                          class="q-ml-sm text-black-50 q-mb-none"
                          align="middle"
                        >
                          <span class="dot q-mr-xs bg-white"></span> live
                        </q-badge>
                      </p>
                      <p
                        class="text-grey-8 col-12 cuttext text-nowrap text-comment-14 q-mb-none h-vh-3"
                      >@{{datamodel.UuserId.username}}</p>
                    </div>
                  </div>
                </div>
                <div class="row text-max2-14 ml-vw-05 q-ma-none">
                  <p class="text-comment-14 q-ma-none">{{streamDesc}}</p>
                </div>
                <!-- {{tags(open_post_data.tags)}} -->
                <p class="text-black cuttext text-comment-14 mb-1 q-ma-none h-mc ml-vw-05">{{tags}}</p>
                <p
                  class="text-black cuttext text-comment-14 mb-1 q-ma-none h-mc ml-vw-05"
                >У вас {{userToken}} токенов, Стоимость стрима {{sumPrivat}} в минуту</p>
              </q-card-section>
              <div class="row mt-vh-1 ml-vw-05">
                <q-btn
                  dense
                  rounded
                  outline
                  color="pink-6"
                  no-caps
                  class="ml-vw-05"
                  style="height:min(5vh,30px);"
                  @click="giftDialog = true"
                >
                  <p class="q-ma-none q-pa-none text-comment-14 nowarp">Подарить токены</p>
                </q-btn>
                <q-btn
                  dense
                  rounded
                  outline
                  color="pink-6"
                  no-caps
                  class="ml-vw-05"
                  @click="checklive()"
                >
                  <p class="q-ma-none q-pa-none text-comment-14">Подписаться</p>
                </q-btn>
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
        <q-scroll-area
          ref="commentsscroll"
          class="comdial ml-vw-1 q-pa-none h-vh-72"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
        >
          <div style="width: 95%;" class="text-white">
            <p class="text-pink-6 q-ma-none">
              <b class="text-pink-6 text-comment-18">ADM:</b>
              <b
                class="text-comment-14"
              >Внимание для тестеров Плеер все еще тестируется если у вас завис стрим но при этом браузер загружает файлы m4s нормально или в консоль пишет Cannot read property 'slice' of undefined можете для теста использовать старую версию плеера на сайте https://www.m3u8play.com/en (videojs 6x) ссылка на стрим - {{chatplayer}}</b>
            </p>
          </div>
          <div style="width: 95%;" class="text-white" v-for="item in datachat" :key="item.date">
            <p class="text-pink-6 q-ma-none" v-if="item.models == 'Y'">
              <b class="text-pink-6 text-comment-18">{{item.name}}:</b>
              <b class="text-comment-14">{{item.text[0]}}</b>
            </p>
            <p class="text-grey q-ma-none" v-else>
              <b class="text-grey text-comment-18">{{item.name}}:</b>
              <b class="text-black text-comment-14">{{item.text[0]}}</b>
            </p>
          </div>
        </q-scroll-area>
        <div class="vw-25 row absolute-bottom-right">
          <q-input v-model="chat_send" label="Ваше сообщение" class="text-white bg-white col-10" />

          <q-btn class="col-2 q-mt-md" flat @click="send_comment()">
            <q-icon color="grey" name="mdi-send" class="mb0" />
          </q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="report" maximized persistent></q-dialog>

    <q-dialog v-model="giftDialog">
      <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
        <div class="justify-center row">
          <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
          <p
            class="q-px-xl q-mt-md q-mx-lg text-center col-10"
            style="font-size: 2vw"
          >Вы можете подарить не более {{userToken}} токенов</p>
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
          >Да</q-btn>
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="giftDialog=false"
          >Нет</q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import http from "../../http-common";
// import videojs from 'video.js';
// import resolutionswitch from 'videojs-resolution-switcher'
// import contribhls from 'videojs-contrib-hls';
// import videyoutube from 'videojs-youtube';
// import videojsvimeo from 'videojs-vimeo';
// import EasyPlayer from 'easy-player';
// import Hls from 'hls.js';
// import VuePlyr from 'vue-plyr';
import { videoPlayer } from "vue-vjs-hls";

export default {
  name: "VideoPlayer",
  components: {
    // VuePlyr,
    // videojs,
    videoPlayer,
    // resolutionswitch,
    // contribhls,
    // videyoutube,
    // videojsvimeo,
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      hls: null,
      chat_send: null,
      madels: 95,
      sub: "sub",
      report: false,
      muted: true,
      link: null,
      datachat: [],
      chatmess: null,
      datamodel: null,
      chatplayer: null,
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
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
      // playerOptions: {
      //         controls: ['play-large', 'play', 'current-time', 'mute', 'volume', 'settings'],
      //         settings: ['quality'],
      //         currentTime:-1,
      //         invertTime: true,
      //         toggleInvert: false,
      //         debug: true,
      //     },
      videoOptions: {
        source: {
          type: "application/x-mpegURL",
          src:
            "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
          withCredentials: false,
        },
        live: true,
        preload: true,
      },
    };
  },

  computed: {
    player() {
      return this.$refs.streamplayer.player;
    },
  },
  sockets: {
    cl_sendMeBalance: function (response) {
      this.userToken = response.balance;
    },
    cl_getPrivateinfo: function (response) {
      this.videoOptions.source.src = response.src;
      this.chatplayer = response.src;
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
  },
  mounted() {
    this.$socket.emit("s_getPrivateinfo", {
      token: localStorage.getItem("token"),
      modelid: this.$route.params.modelid,
      userid: localStorage.getItem("userid"),
    });

    this.$socket.emit("s_getstreaminfo", {
      token: localStorage.getItem("token"),
      modelid: this.$route.params.modelid,
    });
    this.$socket.emit("s_getuseravatar", {
      userid: this.$route.params.modelid,
    });

    // window.playerEvents = this;
    // this.playerInitialize();
    // this.playerSetupEvents();
    // this.playerSetSrc(this.link);
    //  this.player = videojs(document.getElementById("streamVideo"));
    setInterval(
      function () {
        http({
          method: "get",
          url: "/search_comments",
          headers: {
            modelid: this.$route.params.modelid,
          },
        }).then((response2) => {
          this.load = false;
          if (response2.data.status == "P") {
            this.privat = true;
            this.offline = false;
            this.online = true;
            this.datachat = null;
            this.datachat = response2.data.data;
          } else {
            this.online = false;
            this.privat = false;
            this.offline = true;
            this.datachat = null;
            this.link = null;
          }
        });
      }.bind(this),
      3000
    );
    // if (Hls.isSupported()) {
    //       const hls = new Hls();
    //       hls.loadSource(this.link);
    //       hls.attachMedia(this.player.media);
    //       window.hls = hls;
    //       hls.on(Hls.Events.MANIFEST_PARSED,function(event,data) {
    //         console.log(window.hls)
    //       });
    //   }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    //     this.$refs.videoRef.addEventListener('loadedmetadata', function() {
    //   });
    // }
    setInterval(
      function () {
        http({
          method: "get",
          url: "/balance",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response2) => {
          this.userToken = response2.data.balance;
        });
      }.bind(this),
      60000
    );

    http({
      method: "get",
      url: "/search_comments",
      headers: {
        modelid: this.$route.params.modelid,
      },
    }).then((response2) => {
      this.load = false;
      if (response2.data.status == "P") {
        this.privat = false;
        this.offline = false;
        this.online = true;
        this.datachat = null;
        this.datachat = response2.data.data;
      } else {
        // this.online = true;
        // this.privat = false;
        // this.$router.push('/');
      }
      if (this.offline == true) {
      }
      // this.$router.push('/model_chat/'+this.$route.params.modelid);
    });
    http({
      method: "post",
      url: "/models_one",
      data: {
        modelid: this.$route.params.modelid,
      },
    }).then((response3) => {
      this.datamodel = null;
      this.datamodel = response3.data;
    });
    http({
      method: "get",
      url: "/balance",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response2) => {
      this.userToken = response2.data.balance;
    });
  },
  beforeDestroy() {
    this.link = null;
    if (this.player) {
      // this.player.dispose();
    }
  },
  methods: {
    giftTokenDialog() {
      if (this.amountGift <= 0 || this.amountGift == null) {
        this.$q.notify({
          color: "negative",
          message: "Неверное количество токенов",
        });
      } else {
        http({
          method: "get",
          url: "/donat",
          headers: {
            "x-access-token": localStorage.getItem("token"),
            model: this.$route.params.modelid,
            amount: this.amountGift,
          },
        }).then((response) => {
          if (response.data.status == "ok") {
            this.$q.notify({
              color: "green",
              message: "Подарок отправлен",
            });
            this.giftDialog = false;
          } else {
            this.$q.notify({
              color: "negative",
              message: "Что-то пошло не так!",
            });
          }
        });
      }
    },
    send_comment() {
      var data = {
        username: localStorage.getItem("username"),
        modelid: this.$route.params.modelid,
        textmess: this.chat_send,
      };
      http({
        method: "post",
        url: "/create_comments_on",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        data: data,
      }).then((response) => {
        this.chat_send = "отправка сообщения";
        //////////////////////////
        if (response.data.result == "created") {
          http({
            method: "get",
            url: "/search_comments",
            headers: {
              modelid: this.$route.params.modelid,
            },
          }).then((response2) => {
            this.chat_send = null;
            this.datachat = response2.data.data;
          });
        }
        ///////////////////////////
      });
    },
  },
};
</script>
<style scoped>
.overlay h1 {
  text-align: center;
  color: #fff;
  font-size: 70px;
  margin-top: 17%;
}

.purp {
  color: #fe2c55;
}
</style>>