<template>
  <q-page class="row bg-white">
    <div class="col-8 fullpage">
      <div class="row col-12 flex-center-div">
        <video id="video" class="col-12 bg-black fullpage" autoplay muted></video>
        <q-btn
          round
          class="fixed"
          color="white"
          @click="streamControl()"
          style=" margin-top:85vh; height:3vw; width:3vw;"
        >
          <q-icon class="text-black" name="play_arrow" v-if="!streamStarted" />
          <q-icon class="text-black" name="stop" v-else />
        </q-btn>
      </div>
    </div>

    <div class="col-4">
      <div class="w-100 h-vh-16">
        <q-card class="text-black no-shadow h-i">
          <q-card-section class="q-ma-none q-pa-none">
            <div class="row justify-between mt-vh-3">
              <div class="row ml-vw-1">
                <q-avatar size="5.16vh">
                  <img class="bordavatar" :src="useravatar" />
                </q-avatar>
                <div class="row ml-vw-1">
                  <p class="text-black col-12 q-mb-none text-comment-18 mt-vh-05 text-nowrap">
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
                    class="text-grey-8 col-12 cuttext text-nowrap text-comment-14 q-mb-none h-vh-3"
                  >@{{username}}</p>
                </div>
              </div>
            </div>
            <div class="row text-max2-14 ml-vw-1 q-ma-none">
              <p class="text-comment-14 q-ma-none">{{streamDesc}}</p>
            </div>
            <!-- {{tags(open_post_data.tags)}} -->
            <p class="text-black cuttext text-comment-14 mb-1 q-ma-none h-mc ml-vw-1">{{tags}}</p>
          </q-card-section>
          <q-card class="tabschat">
            <q-tabs
              v-model="tabpanel"
              dense
              class="text-grey"
              active-color="pink-6"
              indicator-color="pink-6"
              align="justify"
              narrow-indicator
            >
              <q-tab name="chat">
                <p class="q-ma-none text-comment-18">Чат</p>
              </q-tab>
              <q-tab name="persons">
                <p class="q-ma-none text-comment-18">Пользователи</p>
              </q-tab>
              <q-tab name="donat">
                <p class="q-ma-none text-comment-18">Донат</p>
              </q-tab>
              <q-tab name="settings">
                <p class="q-ma-none text-comment-18">Настройки</p>
              </q-tab>
            </q-tabs>
          </q-card>
        </q-card>
      </div>
      <q-separator />
      <q-tab-panels v-model="tabpanel" animated>
        <q-tab-panel name="chat" class="q-pa-none h-vh-75">
          <q-scroll-area
            ref="chatscroll"
            class="comdial ml-vw-1 q-pa-none h-vh-70"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
            <div style="width: 95%;" class="text-white" v-for="item in datachat" :key="item.date">
              <div class="q-ma-none row flexchat" v-if='item.ismodel'>
                <b class="text-pink-6 text-comment-18">{{item.name}}:</b>
                <p class="text-comment-14 text-pink-6 q-ma-none">{{item.text}}</p>
              </div>
              <div class="q-ma-none row flexchat" v-else>
                <b class="text-grey text-comment-18">{{item.name}}:</b>
                <p class="text-black text-comment-14 q-ma-none">{{item.text}}</p>
              </div>
            </div>
          </q-scroll-area>
          <div class="row wi absolute-bottom-right h-vh-5">
            <q-input
              v-on:keyup.enter="send_comment()"
              v-model="chat_send"
              placeholder="Ваше сообщение"
              class="sendfix text-white bg-white col"
            />

            <q-btn class="col-1" flat @click="send_comment()">
              <q-icon color="grey" name="mdi-send" class="mb0" />
            </q-btn>
          </div>
        </q-tab-panel>
        <q-tab-panel name="settings" class="q-pa-none">
          <q-scroll-area
            ref="commentsscroll"
            class="comdial ml-vw-1 q-pa-none h-vh-75 mr-vw-1"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
            <q-card-section class="q-pb-none w-mxc q-pa-none row">
              <p class="col text-fxl text-black font-weight-bolder line-height-1">Настройки доната</p>
            </q-card-section>
            <q-input
              class="text-comment-14"
              autogrow
              maxlength="70"
              outlined
              v-model="target"
              placeholder="Цель сбора Токенов"
              dense
            />
            <q-input
              class="mt-vh-2 text-comment-14"
              autogrow
              maxlength="60"
              outlined
              v-model="sum"
              placeholder="Сумма"
              dense
            />

            <q-card-section class="mt-vh-4 q-pb-none w-mxc q-pa-none row">
              <p class="col text-fxl text-black font-weight-bolder line-height-1">Настройки привата</p>
            </q-card-section>
            <q-input
              class="text-comment-14"
              v-model.number="sumPrivat"
              type="number"
              placeholder="Стоимость минуты привата"
              outlined
              dense
            />
            <q-checkbox v-model="cMode" class="mt-vh-2" dense size="4vh">
              <p class="text-comment-14 gray-1337 q-ma-none">Разрешить подглядывания</p>
            </q-checkbox>

            <q-card-section class="mt-vh-4 q-pb-none w-mxc q-pa-none row">
              <p class="col text-fxl text-black font-weight-bolder line-height-1">Настройки бота</p>
            </q-card-section>
            <q-input
              class="mt-vh-2 text-comment-14"
              autogrow
              outlined
              v-model="botDesk"
              placeholder="Текст сообщения бота"
              dense
            />
            <q-input
              class="mt-vh-2 text-comment-14 w-20"
              v-model.number="botTime"
              type="number"
              placeholder="Таймаут"
              outlined
              dense
            />

            <div class="flex-center-div">
              <q-btn
                dense
                rounded
                no-caps
                class="w-20 mt-vh-4"
                color="pink-6"
                @click="cl_changestreaminfo()"
              >
                <!-- @click="" -->
                <p class="absolute-center text-comment-14">Сохранить</p>
              </q-btn>
            </div>
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <q-dialog v-model="showprivate">
      <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p
            class="q-px-xl q-mt-md q-mx-lg text-center col-10"
            style="font-size: 2vw"
          >{{userprivate}} завет вас в приват</p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="SuccPrivate()"
            style="border-radius: 30px"
          >Согласна</q-btn>
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="canselPrivate()"
          >Нет</q-btn>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="closeprivate">
      <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p
            class="q-px-xl q-mt-md q-mx-lg text-center col-10"
            style="font-size: 2vw"
          >У {{userprivate}} закочились токены</p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="closeprivate = false;"
            style="border-radius: 30px"
          >ОК</q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Loader from "../Loader.vue";
import http from "../../http-common";
export default {
  name: "VideoCapture",
  data() {
    return {
      chat_send: null,
      datachat: [],
      connection: null,
      mediaRecorder: null,
      streamStarted: false,
      tabpanel: "chat",
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
      username: localStorage.getItem("username"),
      myname: localStorage.getItem("name"),
      useravatar: null,
      streamDesc: null,
      tags: null,
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
      isPrivate: false,
      alluser:null,
      donat:null,
    };
  },
  beforeDestroy() {
    this.stop();
  },
  sockets: {
    cl_getalluser: function (response) {
      this.alluser = response.alluser
    },
    // cl_newdonat: function (response) {
    //   this.donat = response.alluser
    // },
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
    this.$socket.emit("s_changePage", {
      page: "stream",
      model: localStorage.getItem("userid"),
      userid: localStorage.getItem("userid"),
      token: localStorage.getItem("token")
    });
    this.$socket.emit("s_getstreaminfo", {
      token: localStorage.getItem("token"),
      modelid: localStorage.getItem("userid"),
    });
    this.$socket.emit("s_ModelStream", {
      userid: localStorage.getItem("userid"),
    });
    this.$socket.emit("s_getmyavatar", {
      userid: localStorage.getItem("userid"),
    });
    // setInterval(
    //   function () {
    //     http({
    //       method: "get",
    //       url: "/search_comments_model",
    //       headers: {
    //         "x-access-token": localStorage.getItem("token"),
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
    //     "x-access-token": localStorage.getItem("token"),
    //   },
    // }).then((response2) => {
    //   this.datachat = null;
    //   this.datachat = response2.data;
    // });
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        var options = {
          mimeType: "video/webm",
        };
        this.mediaRecorder = new MediaRecorder(stream, options);
        this.mediaRecorder.start(2000);
        var video = document.querySelector("video");
        video.srcObject = stream;
      });
  },
  methods: {
    canselPrivate() {
      this.$socket.emit("s_cancelPrivate", {
        token: localStorage.getItem("token"),
        modelid: localStorage.getItem("userid"),
        userid: this.userprivateid,
      });
      this.showprivate = false;
    },
    SuccPrivate() {
      this.$socket.emit("s_StartPrivateModel", {
        token: localStorage.getItem("token"),
        modelid: localStorage.getItem("userid"),
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
          token: localStorage.getItem("token"),
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
        this.chat_send == " "||
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
        username: localStorage.getItem("username"),
        modelid: localStorage.getItem("userid"),
        textmess: this.chat_send,
      });
      this.chat_send = null;
    },
    streamControl() {
      if (this.streamStarted) {
        this.isPrivate = false;
        this.stop();
      } else {
        this.start();
      }
    },
    //  start(){
    //    this.connection = new WebSocket("wss://record.p2pbet.tech/streams?token=" + localStorage.getItem("token") +"");
    //    this.mediaRecorder.addEventListener('dataavailable',videoDataHandler)
    //    this.streamStarted = true;
    //  },
    //  stop() {
    //    this.connection.close();
    //    this.mediaRecorder.removeEventListener('dataavailable',videoDataHandler);
    //    this.streamStarted = false;
    //  },
    start() {
      const websocketEndpoint =
        "wss://record.p2pbet.tech/streams?token=" +
        localStorage.getItem("token") +
        "";
      this.connection = new WebSocket(websocketEndpoint);
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          var options = {
            mimeType: "video/webm",
          };

          this.mediaRecorder = new MediaRecorder(stream, options);
          this.mediaRecorder.start(2000);
          this.mediaRecorder.ondataavailable = this.videoDataHandler;
          var video = document.querySelector("video");
          video.srcObject = stream;
          this.streamStarted = true;
        });
    },
    startPrivate() {
      const websocketEndpoint =
        "wss://record.p2pbet.tech/private?token=" +
        localStorage.getItem("token") +
        "&modelid=" +
        localStorage.getItem("userid") +
        "&userid=" +
        this.userprivateid +
        "";
      this.connection = new WebSocket(websocketEndpoint);
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          var options = {
            mimeType: "video/webm",
          };
          this.mediaRecorder = new MediaRecorder(stream, options);
          this.mediaRecorder.start(2000);
          this.mediaRecorder.ondataavailable = this.videoDataHandler;
          var video = document.querySelector("video");
          video.srcObject = stream;
          this.streamStarted = true;
        });
    },
    stop() {
      this.mediaRecorder.stop();
      this.connection.close();
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
<style >
.mbb50 {
  width: 100%;
  margin-bottom: 10vh;
}
.purp {
  color: #fe2c55;
}
</style>

