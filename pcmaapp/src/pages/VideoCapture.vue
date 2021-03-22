<template>
  <div v-if="isValid" style="height:90vh;margin-top: -10vh;">
    <div v-show="!isUploading">
      <video
        ref="videoRec"
        style="height:50vh;  position: absolute; z-index:0 ;"
        class="absolute-center"
        muted
        loop
        controls 
        autoplay
        preloader
      />
      <template v-if="!isFinished">
        <button
          style="position: absolute;z-index:1 ; bottom:50px;"
          v-if="!isRecording"
          @click="record"
          class="btn btn-bot flex-center"
        >{{recordBtnContent}}</button>
        <button v-else @click="stop" class="btn" style="position: absolute;z-index:1;bottom:50px">
          <span style="font-size:3em;">{{stopBtnContent}}</span>
        </button>
      </template>
    </div>
    <p class="text-white">{{alert}}</p>

    <Loader v-show="isUploading" />
    <div class="controls" v-if="isFinished && !isUploading && uploadUrl">
      <div class="row" style="position: absolute;z-index:1">
        <div class="col-6">
          <q-input
            v-model="tag1"
            outline
            dark
            class="text-white text-center"
            label="хештег без 1 #"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="tag2"
            outline
            dark
            class="text-white text-center"
            label="хештег без 2 #"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="tag3"
            outline
            dark
            class="text-white text-center"
            label="хештег без 3 #"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="tag4"
            outline
            dark
            class="text-white text-center"
            label="хештег без 4 #"
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="example"
            outline
            dark
            class="text-white text-center"
            label="Название видео"
          />
        </div>
        <div class="col-6">
          <q-btn @click.prevent="resetVideo" class="full-width" color="red">отменить</q-btn>
        </div>
        <div class="col-6">
          <q-btn @click.prevent="done" class="full-width" color="green">опубликовать</q-btn>
        </div>
      </div>
    </div>
    <h1 class="error-video">{{errText}}</h1>
    <p>{{mess}}</p>
  </div>
</template>

<script>
import http from "../http-common";
import Loader from "./Loader.vue";
export default {
  name: "VideoCapture",
  props: {
    uploadUrl: {
      default: null
    },
    recordBtnContent: {
      default: "Record"
    },
    stopBtnContent: {
      default: "◼"
    },
    cancelBtnContent: {
      default: "Cancel"
    },
    doneBtnContent: {
      default: "OK"
    }
  },
  components: {
    Loader
  },
  data() {
    return {
      alert: null,
      errText: null,
      isValid: true,
      isUploading: false,
      isRecording: false,
      isFinished: false,
      recorder: null,
      connection: null,
      videoUrl: null,
      videoUrlelastic: null,
      tag1: null,
      tag2: null,
      tag3: null,
      tag4: null,
      mess: null,
      example: null
    };
  },
  created() {
    if (!this.uploadUrl) this.errText = "There is no upload url available";
    //this.getWebSocket(); // initialize connection to WebSocket
  },
  mounted() {
    this.resetVideo();
  },
  methods: {
    // reset video display with media device media stream
    cancelVideo() {
      this.videoUrl = null;
    },
    resetVideo() {
      this.isFinished = false;
      this.isRecording = false;
      this.isLoading = true;
      this.$refs.videoRec.muted = true;
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true
        })
        .then(this.gotStream)
        .catch(() => (this.isValid = false));
    },
    // start recoording
    record() {
      if (!this.uploadUrl) return;

      this.getWebSocket();
      this.isRecording = true;
      this.recorder.start(1000);
    },
    // stop recording
    stop() {
      this.recorder.stop();
      this.isRecording = false;
      this.isFinished = true;
      this.connection.send("DONE");
    },
    // reset video diaply and emit video file url
    done() {
      if (
        this.tag1 != null &&
        this.tag2 == null &&
        this.tag3 == null &&
        this.tag4 == null
      ) {
        var tag = ["#" + this.tag1 + ""];
        this.send(tag);
      }
      if (
        this.tag1 != null &&
        this.tag2 != null &&
        this.tag3 == null &&
        this.tag4 == null
      ) {
        var tag = ["#" + this.tag1 + "", "#" + this.tag2 + ""];
        this.send(tag);
      }
      if (
        this.tag1 != null &&
        this.tag2 != null &&
        this.tag3 != null &&
        this.tag4 == null
      ) {
        var tag = [
          "#" + this.tag1 + "",
          "#" + this.tag2 + "",
          "#" + this.tag3 + ""
        ];
        this.send(tag);
      }
      if (
        this.tag1 != null &&
        this.tag2 != null &&
        this.tag3 != null &&
        this.tag4 != null
      ) {
        var tag = [
          "#" + this.tag1 + "",
          "#" + this.tag2 + "",
          "#" + this.tag3 + "",
          "#" + this.tag4 + ""
        ];
        this.send(tag);
      }
    },
    send(tags) {
      var tag = tags;
      var body = {
        tag: JSON.stringify(tag),
        text: this.example,
        videolink: this.videoUrl
      };
      http({
        method: "post",
        url: "/create_videos",
        data: body,
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then(response => {
        this.alert = response.data;
        this.resetVideo();
        this.$emit("input", this.videoUrl);
        return;
      });
    },
    // initialize MediaRecorder and video element source
    gotStream(mediaStream) {
      this.recorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm",
        audioBitsPerSecond: 128000
      });
      this.recorder.ondataavailable = this.videoDataHandler;
      this.$refs.videoRec.src = null;
      this.$refs.videoRec.srcObject = mediaStream;
      this.toggleVideo();
    },
    // handle sending data for writing using the given WebSocket
    videoDataHandler(event) {
      console.log(event.data);
      //this.isUploading = true;
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.data);
      reader.onloadend = () => {
        this.connection.send(reader.result);
      };
    },
    // initialize WebSocket
    getWebSocket() {
      const websocketEndpoint =
        "wss://record.p2pbet.tech?token=" + localStorage.getItem("token");
      // const websocketEndpoint = "ws://localhost:3000";
      this.connection = new WebSocket(websocketEndpoint);
      //this.connection.send({ tocker: localStorage.getItem("token") });
      //console.log("connection", this.connection);
      this.connection.binaryType = "arraybuffer";
      this.connection.onmessage = message => {
        let messages = JSON.parse(message.data);
        console.log(message.data);
        if (messages.status == "auth true") {
          this.$refs.videoRec.muted = true;
        } else if (messages.status == "record_process") {
          this.videoUrlelastic = messages.name;
          this.isUploading = true;
          this.mess = "ожидание кодирования видео";
        } else if (messages == "record done") {
          console.log("заканчиваем");
          this.isUploading = false;
          this.updateVideoFile(this.videoUrlelastic);
          this.$refs.videoRec.muted = false;
          this.connection.close();
        } else {
          this.mess = "error encoding";
        }
      };
    },
    // update video when file written
    updateVideoFile(fileName) {
      this.videoUrl = this.uploadUrl + fileName + ".mp4";

      console.log("попытка плей:", this.videoUrl);
      this.toggleVideo();
      this.$refs.videoRec.srcObject = null;
      this.$refs.videoRec.src = this.videoUrl;
      this.isUploading = false;
      localStorage.setItem("record", this.videoUrl);
    },
    // toggle video display
    toggleVideo() {
      this.$refs.videoRec.loop = !this.$refs.videoRec.loop;
      this.$refs.videoRec.controls = !this.$refs.videoRec.controls;
    }
  }
};
</script>
<style scoped>

</style>

