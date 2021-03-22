<template>
  <section v-if="isValid" class="row">
    <div 
    v-bind:class="[activeC, 'flex', 'justify-center', 'bg-black', 'fullpage']"
    v-show="!isUploading">
    <vue-plyr>
      <video ref="videoRec" 
      data-plyr-config='{ "controls": "false"}'
      muted 
      class="fullpage bg-black video-9-16"
      loop   
      autoplay
      preload 
      metadata
      playsinline
      />
      </vue-plyr>
      <template v-if="!isFinished">
        <q-btn round class="fixed col-6" color="white" @click="RecordController()" style=" margin-top:85vh; height:3vw; width:3vw;">
          <q-icon class="text-black" name="play_arrow" v-if="!isRecording"/>
          <q-icon class="text-black" name="stop" v-else/>
        </q-btn>
      </template>
    </div>
    <p class="text-white">{{alert}}</p>

    <Loader v-show="isUploading" />
    <div class="controls col-3" v-if="isFinished && !isUploading && uploadUrl">
      
      <div class="row mt-5 pa-vh-1">
        <div class="col-12">
           <q-input outlined v-model="example" placeholder="Название видео" dense />
        </div>
        <!-- <div class="col-12">
          <q-input v-model="diff" outline dark class="text-black" placeholder = "Описание видео" />
        </div> -->
        <div class="col-12 mt-5">
           <q-input outlined v-model="tags" placeholder="хэштеги через пробел" dense />
        </div>
        <div class="row col-12 justify-between mt-5" >
        <q-btn dense rounded outline color="pink-6" no-caps class="col-lg-4 col-md-5" style="height:min(5vh,30px);" @click="resetVideo">
                  <p class="absolute-center" style="white-space:nowrap; font-size:min(1.8vh, 28px);">Отмена</p>
        </q-btn>
        
        <q-btn dense rounded no-caps color="pink-6" class="col-lg-4 col-md-5" style="height:min(5vh,30px);" @click="done()">
                  <p class="absolute-center " style="font-size:min(1.8vh, 28px);">Опубликовать</p>
        </q-btn>
        </div>
        <!-- <button type="button" class="btn" @click.prevent="resetVideo">{{cancelBtnContent}}</button>
      <button type="button" class="btn" @click.prevent="done">{{doneBtnContent}}</button> -->
      </div>
      <!-- <h1 class="error-video">{{errText}}</h1>
    <p>{{mess}}</p> -->
    </div>
    
  </section>
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
      activeC:'col-12',
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
      tags: null,
      mess: null,
      example: null
    };
  },
  created() {
    if (!this.uploadUrl) this.errText = "There is no upload url available";
    //this.getWebSocket(); // initialize connection to WebSocket
  },
  mounted() {
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
  methods: {
    // reset video display with media device media stream
    cancelVideo() {
      this.videoUrl = null;
    },
    resetVideo() { //reset !=mounted 
      this.activeC = 'col-12';
      this.isFinished = false;
      this.isRecording = false;
      this.isLoading = true;
      this.recorder = null;
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
      this.recorder.stream.getTracks()[0].stop() //audio
      this.recorder.stream.getTracks()[1].stop() //video
      this.isRecording = false;
      this.activeC = 'col-9';
      this.isFinished = true;
      this.connection.send("DONE");
    },
    RecordController(){
      if(this.isRecording){
        this.stop();
      }else{
        this.record();
      }
    }
    ,
    // reset video diaply and emit video file url
    done() {
      var tag = "";
      console.log(this.tags)
      var tagsarr=this.tags.split(" ")
      for(var i=0;i<tagsarr.length;i++){
        tag+=(tagsarr[i][0]=="#")?tagsarr[i]+" ":"";
      }
      this.send(tag);
      this.activeC = 'col-9';
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
        location.reload();
        return;
      });
    },
    // initialize MediaRecorder and video element source
    gotStream(mediaStream) {
      this.recorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm;codecs=vp8,vp9,opus",
        audioBitsPerSecond: 128000
      });
      this.recorder.ondataavailable = this.videoDataHandler;
      this.$refs.videoRec.src = null;
      this.$refs.videoRec.srcObject = mediaStream;
      this.toggleVideo();
    },
    // handle sending data for writing using the given WebSocket
    videoDataHandler(event) {
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
        if (messages.status == "auth true") {
          this.$refs.videoRec.muted = true;
        } else if (messages.status == "record_process") {
          this.videoUrlelastic = messages.name;
          this.isUploading = true;
          this.mess = "ожидание кодирования видео";
        } else if (messages == "record done") {
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
video::-webkit-media-controls-play-button {
  display:none;
}
video::-webkit-media-controls-timeline {
  display:none;
}
video::-webkit-media-controls-current-time-display{
  display:none;
}
video::-webkit-media-controls-time-remaining-display {
  display:none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display:none;
}
video::-webkit-media-controls-volume-slider {
  display:none;
}
video::-webkit-media-controls-volume-slider{
  display:none;
}
video::-webkit-media-controls-volume-control-hover-background{
  display:none;
}
</style>
