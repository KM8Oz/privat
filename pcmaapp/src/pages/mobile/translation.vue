<template>
  <q-page class=" vh100 row bg-white" style="min-height:90vh; max-height:90vh;">
    <div class="col-12" style="height:35vh">
      <video id="video" autoplay muted style="height:40vh; width:100vw;"></video>
    </div>
    <div class="col-12 row">
      <q-btn dense color="green" class="col-6" @click="start">Старт</q-btn>
      <q-btn dense color="red" class="col-6" @click="stop">Стоп</q-btn>
    </div>

    <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height:40vh; width:100vh">
      <div style="width: 90%;" class="text-white" v-for="item in datachat" :key="item.date">
        <p class="text-grey" v-if="item.userid == 'Y'">
          <b class="purp">@{{item.name}}:</b>
          {{item.text[0]}}
        </p>
        <p class="text-grey" v-else>
          <b class="text-grey">{{item.name}}:</b>
          {{item.text[0]}}
        </p>
      </div>
    </q-scroll-area>
    <q-input
      v-model="chat_send"
      label="Ваше сообщение"
      class="text-white bg-white mb50"
      style="width:90vw; height:8vh;"
    />
    <q-btn flat @click="send_comment()" class="mb501" style="height:8vh;">
      <q-icon color="grey" name="mdi-send" />
    </q-btn>
  </q-page>
</template>

<script>
import Loader from "../Loader.vue";
import http from "../../http-common";
export default {
  name: "VideoCapture",

  data() {
    return {
      datachat: [],
      connection: null,
      mediaRecorder: null
      
    };
  },

  mounted() {
    setInterval(
      function() {
        http({
          method: "get",
          url: "/search_comments_model",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response2 => {
          this.datachat = null;
          this.datachat = response2.data;
        });
      }.bind(this),
      3000
    );
    http({
      method: "get",
      url: "/search_comments_model",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response2 => {
      this.datachat = null;
      this.datachat = response2.data;
      console.log(datachat);
    });
  },
  methods: {
    start() {
      const websocketEndpoint =
        "wss://record.p2pbet.tech/streams?token=" +
        localStorage.getItem("token") +
        "";
      this.connection = new WebSocket(websocketEndpoint);
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
          var options = {
            mimeType: "video/webm"
          };

          this.mediaRecorder = new MediaRecorder(stream, options);
          this.mediaRecorder.start(1000);
          this.mediaRecorder.ondataavailable = this.videoDataHandler;
          var video = document.querySelector("video");
          video.srcObject = stream;
        });
    },
    stop() {
      this.mediaRecorder.stop();
      this.connection.close();
    },
    videoDataHandler(event) {
      console.log(event.data);
      //this.isUploading = true;
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.data);
      reader.onloadend = () => {
        this.connection.send(reader.result);
      };
    }
  }
};
</script>
<style >
.vh100{
  height: 95vh;
  width: 100vw;
}
.mbb50 {
  width: 100%;
  margin-bottom: 10vh;
}
</style>

