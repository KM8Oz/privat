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
          <!-- <video-player ref="streamplayer" class="fullpage" :options="videoOptions"></video-player> -->
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
                <!-- <q-btn
                  dense
                  rounded
                  outline
                  color="pink-6"
                  no-caps
                  class="ml-vw-05"
                  @click="checklive()"
                >
                  <p class="q-ma-none q-pa-none text-comment-14">Подписаться</p>
                </q-btn> -->
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
        <q-scroll-area
          ref="chatscroll"
          class="comdial ml-vw-1 q-pa-none h-vh-72"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
        >
          <div
            style="width: 95%;"
            class="text-white"
            v-for="item in datachat"
            :key="item.date"
          >
            <div class="q-ma-none row flexchat" v-if="item.ismodel == true">
              <b class="text-pink-6 text-comment-18">{{ item.name }}:</b>
              <p class="text-comment-14 text-pink-6 q-ma-none">
                {{ item.text }}
              </p>
            </div>
            <div class="q-ma-none row flexchat" v-else>
              <b class="text-grey text-comment-18">{{ item.name }}:</b>
              <p class="text-black text-comment-14 q-ma-none">
                {{ item.text }}
              </p>
            </div>
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

    <!-- <q-dialog v-model="report" maximized persistent></q-dialog> -->

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
import { LocalStorage } from 'quasar';
//import { videoPlayer } from "vue-vjs-hls";

export default {
  name: "VideoPlayer",
  components: {
    // VuePlyr,
    // videojs,
   // videoPlayer,
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
     ...mapState(['pcm'])
  },
  sockets: {
    cl_newMassage: function (response) {
      let jsonobj = {
        text: response.text,
        date: response.date,
        name: response.name,
        models: response.models,
        ismodel: response.ismodel,
      };
      this.datachat.push(jsonobj);
      setTimeout(() => {
        this.$refs.chatscroll.setScrollPosition(
          this.$refs.chatscroll.scrollSize
        );
      }, 500);
    },
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
  beforeMount(){
    this.$socket.emit("s_getPrivateinfo", {
      token: this.pcm.user.tk,
      modelid: this.$route.params.modelid,
      userid: this.pcm.user.id,
    });

    this.$socket.emit("s_getstreaminfo", {
      token: this.pcm.user.tk,
      modelid: this.$route.params.modelid,
    });
    this.$socket.emit("s_getuseravatar", {
      userid: this.$route.params.modelid,
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
        "x-access-token": this.pcm.user.tk,
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
    this.$socket.emit("s_clouseprivate", {
      token: this.pcm.user.tk,
      modelid: this.$route.params.modelid,
      userid: this.pcm.user.id,
    });

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
            "x-access-token": this.pcm.user.tk,
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
      if (
        this.chat_send == null ||
        this.chat_send == "" ||
        this.chat_send == " "||
        !this.chat_send.trim()
      ) {
        this.$q.notify({
          // ограничение на 3 или 2 буквы тут будут бесполезны из за особенности русского языка
          color: "pink-6",
          message: "Сообщение пустое",
        });
        return;
      }
      this.$socket.emit("s_streamchatsend", {
        username: LocalStorage.getItem("username"),
        modelid: this.$route.params.modelid,
        textmess: this.chat_send,
      },(err)=>console.log('message sended:',err));
      this.chat_send = null;
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