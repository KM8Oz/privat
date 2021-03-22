<template>
  <q-page class="bg-white vh100" style="overflow: auto;">
    <div class="vh30 bg-black">
      <video
        id="videoElement"
        autoplay
        muted
        playsinline
        class="full-width"
        style="height:33vh; width:100%;"
        webkit-playsinline
        wmode="opaque"
        :src="link"
      ></video>
    </div>

    <div class="fixed-top row q-px-md q-mb-xl">
      <div class="col-10 row mt30">
        <div class="col-7">
          <q-btn dense rounded color="pink-6" class="w50 col-7" @click="checklive()">Live</q-btn>
        </div>
        <div class="col-5">
          <q-btn dense outline rounded color="pink-6" class="w50 col-5" @click="checklive()">Privat</q-btn>
        </div>

        <div
          style="overflow:y;height:35vh;padding-left:10px;padding-right:10px;"
          class="mbb50 fixed-bottom"
        >
          <div class="row">
            <div style="width: 90%;" class="text-white" v-for="item in datachat" :key="item.date">
              <p class="text-grey" v-if="item.userid == 'Y'">
                <b class="purp">@{{item.name}}:</b>
                {{item.text[0]}}
              </p>
              <p class="text-blue" v-if="item.userid == 'P'">
                <b class="blue">!!{{item.name}}!!:</b>
                {{item.text[0]}}
              </p>
              <p class="text-grey" v-else>
                <b class="text-grey">{{item.name}}:</b>
                {{item.text[0]}}
              </p>
            </div>
          </div>
          <q-input
            v-model="chat_send"
            label="Ваше сообщение"
            class="text-white bg-white fixed-bottom mb50"
          />
          <q-btn flat @click="send_comment()" class="fixed-bottom mb501">
            <q-icon color="grey" name="mdi-send" />
          </q-btn>
        </div>
      </div>
      <div class="col-2 q-mb-md q-gutter-y-lg mtm30">
        <div class="mtm20">
          <q-btn flat color="transparent" v-if="muted" @click="unmuted()">
            <q-icon class="text-white" name="mdi-volume-mute" size="lg" />
          </q-btn>
          <q-btn flat v-if="!muted" color="transparent" @click="muteddd()">
            <q-icon class="text-white" name="mdi-volume-high" size="lg" />
          </q-btn>
        </div>
        <div class="q-ml-sm flex flex-center">
          <q-avatar size="40px">
            <img style="border: 1px solid #ffffff;" src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <q-btn
            text-color="white"
            round
            dense
            size="xs"
            style="background-color:#FE2C55;margin-top: -8px"
          >+</q-btn>
        </div>

        <q-btn flat color="transparent">
          <q-icon color="pink-6" name="card_giftcard" size="lg" @click="reward()" />
        </q-btn>
      </div>
    </div>

    <q-dialog v-model="bounty" class="absolute-full">
      <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
        <div class="justify-center row">
          <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
          <p
            class="q-px-xl q-mt-md q-mx-lg text-center col-10"
            style="font-size: 4vw"
          >Вы можете подарить не более {{bal}} Токенов</p>
          <q-input
            rounded
            outlined
            dense
            dark
            class="col-12 q-px-xl q-mt-md q-mx-lg text-white"
            v-model="amount_bounty"
            placeholder="Сумма токенов"
          />
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="donat()"
            style="border-radius: 30px"
          >Да</q-btn>
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
          >Нет</q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import http from "../../http-common";

import EasyPlayer from "@easydarwin/easyplayer";
export default {
  data() {
    return {
      amount_bounty: null,
      bal: 0,
      bounty: false,
      chat_send: null,
      madels: 95,
      sub: "sub",
      checklive: false,
      muted: true,
      link: null,
      datachat: [],
      chatmess: null,
      interval: null
    };
  },
  components: { EasyPlayer },
  mounted() {
    http({
      method: "get",
      url: "/balance",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response2 => {
      this.bal = response2.data.balance;
    });
    var videol = this.$route.params.modelid;

    this.link = "https://rec.p2pbet.tech/99/" + videol + ".m3u8";

    this.interval = setInterval(this.list_comments, 3000);
    http({
      method: "get",
      url: "/search_comments",
      headers: {
        modelid: this.$route.params.modelid
      }
    }).then(response2 => {
      this.datachat = null;
      this.datachat = response2.data.data
      console.log(this.datachat)
    });
    setInterval(
        function() {
        }.bind(this),
        3000
      );
  },

  beforeDestroy() {
    this.link = null;
    window.clearInterval(this.interval);
  },

  methods: {
    list_comments() {
      http({
        method: "get",
        url: "/search_comments",
        headers: {
          modelid: this.$route.params.modelid
        }
      }).then(response2 => {
        this.datachat = null;
        this.datachat = response2.data.data;
      });
    },
    donat() {
      http({
        method: "get",
        url: "/donat",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          model: this.$route.params.modelid,
          amount: this.amount_bounty
        }
      }).then(response => {
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
    send_comment() {
      var data = {
        username: localStorage.getItem("username"),
        modelid: this.$route.params.modelid,
        textmess: this.chat_send
      };
      http({
        method: "post",
        url: "/create_comments_on",
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
        data: data
      }).then(response => {
        this.chat_send = "отправка сообщения";
        //////////////////////////
        if (response.data.result == "created") {
          http({
            method: "get",
            url: "/search_comments",
            headers: {
              modelid: this.$route.params.modelid
            }
          }).then(response2 => {
            this.chat_send = null;
            this.datachat = response2.data;
          });
        }
        ///////////////////////////
      });
    },
    unmuted() {
      this.muted = false;
      var video = document.getElementById("videoElement");

      video.muted = !video.muted;
    },
    muteddd() {
      this.muted = true;
      var video = document.getElementById("videoElement");

      video.muted = !video.muted;
    }
  }
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
</style
>>
