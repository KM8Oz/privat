<template>
<div class="fit">
  <section v-if="isValid" class="row  " v-touch:swipe.right="gohome">
    <div
      v-bind:class="[activeC, 'flex', 'justify-center', 'bg-black', 'w-vw-100']"
    >
      <vue-plyr 
    crossorigin
    hideControls
    >
        <video
          v-if="splayer"
          data-plyr-config='{ "controls": ["mute"]}'
          ref="videoRec"
           poster="https://rec.camsguns.com/stream.png"
          muted
         :class="[activeC, 'video-fit3', 'bg-black', 'col-12']"
          src=""
          loop
          autoplay
          preload
          metadata
          playsinline
        />
      </vue-plyr>
        <vue-plyr controls
    crossorigin
    v-if="!splayer"
    >
        <video
          ref="videoRec2"
          data-plyr-config='{ "controls": ["play-large"]}'
          muted
         :class="[activeC2, 'video-fit2', 'bg-black', 'col-12']"
          src=""
          loop
          autoplay
          preload
          metadata
          playsinline
        />
      </vue-plyr>
      <template v-if="videoRecorder">
        <VueRecordVideo
          class="fixed col-6"
          :mode="'press'"
          @stream="onStream"
          @result="onResult"

        />
      </template>
    </div>
    <div class="col-12 h-vh-60 z-100 bg-white" v-if="videoinfos">
      <div class="row mt-5 pa-vh-1">
        <div class="col-12">
          <q-input
            class="text-body1"
            outlined
            input-class="q-mx-xs text-weight-light"
            square
            v-model="example"
            placeholder="название видео..."
          />
        </div>
        <!-- <div class="col-12">
          <q-input v-model="diff" outline dark class="text-black" placeholder = "Описание видео" />
        </div> -->
        <div class="col-12 mt-5">
          <q-input
            class="text-body1"
            input-class="q-mx-xs text-weight-light"
            @input="chenged"
            outlined
            v-model="tags"
            placeholder="хэштеги через пробел"
          />
        </div>
        <div class="row col-12 justify-between mt-5">
          <q-btn
            class="q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs"
            dense
            rounded
            color="pink-6"
            no-caps
            @click="gohome()"
            label="Отмина"
          />
          <q-btn
            class="q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs"
            dense
            rounded
            color="pink-6"
            :disable="!notempty"
            no-caps
            @click="uploadvid"
            label="Опубликовать"
          />
        </div>
        <q-linear-progress size="25px" :value="progress" track-color="red" stripe  color="pink-7" class="q-mt-sm" />
        <!-- <button type="button" class="btn" @click.prevent="resetVideo">{{cancelBtnContent}}</button>
      <button type="button" class="btn" @click.prevent="done">{{doneBtnContent}}</button> -->
      </div>
      <!-- <h1 class="error-video">{{errText}}</h1>
    <p>{{mess}}</p> -->
    </div>

  </section>
      <section v-if="startupload"  class="text-white fit fixed flex flex-center  bg-beage">
   
        <div class="justify-center row">
          <q-avatar
            style="border: 1px solid #ffffff; border-radius: 30px"
            icon="videocam"
          ></q-avatar>
          <q-avatar
            style="border: 1px solid #ffffff; border-radius: 30px"
            icon="backup"
          ></q-avatar>

          <p class="q-px-xl q-mt-md q-mx-lg text-center" style="font-size: 4vw">
            Вы собираетесь записать или загрузить видео?
          </p>
          <q-btn
            class="text-red bg-white text-weight-bold col-7 h-vh-5"
            @click="resetVideo"
            style="border-radius: 30px"
            >Записать</q-btn
          >
          <q-file
            borderless
            error-message="error"
    
            v-model="file"
            class="col-7 q-mt-lg h-vh-5 bg-white"
            style="border-radius: 30px"
            accept=".mp4,.m4a,.mkv,.mov"
            @input="upload"
          >
            <p class="absolute-center text-red bg-white text-uppercase text-weight-bold">
              Загрузить
            </p>
          </q-file>
          <q-btn
            class="col-7 q-mt-xl h-vh-5 q-mx-auto"
            icon="arrow_back_ios"
            rounded
            outline
            @click="goback"
          />
        </div>

    </section>
</div>
</template>

<script>
import http from "../../http-common";
import { LocalStorage, Platform } from "quasar";
import { Plugins } from '@capacitor/core'
import * as getMedia from "get-user-media-promise";
import { mapState } from 'vuex';


export default {
  name: "VideoCapture",
  props: {
    uploadUrl: {
      default: null,
    },
    recordBtnContent: {
      default: "Record",
    },
    stopBtnContent: {
      default: "◼",
    },
    cancelBtnContent: {
      default: "Cancel",
    },
    doneBtnContent: {
      default: "OK",
    },
  },
  data() {
    return {
      startupload: true,
      activeC: "fullpage",
      alert: null,
      notempty: false,
      file: null,
      errText: null,
      isValid: false,
      activeC2:'h-vh-68-m',
      splayer:true,
      isUploading: false,
      isRecording: false,
      videoinfos:false,
      player:true,
      isFinished: false,
      modefile: false,
      recorder: null,
      connection: null,
      videoRecorder:true,
      videoUrl: null,
      progress:0,
      videoUrlelastic: null,
      tags: null,
      uploadState3:false,
      mess: null,
      example: null,
      uploadState2:false,
      filesend: false,
      mediaStream: null,
    };
  },
  computed:{
  ...mapState(['pcm'])
  },
  created() {
    if (!this.uploadUrl) this.errText = "There is no upload url available";
    // this.getWebSocket(); // initialize connection to WebSocket
  },
  beforeMount(){
     if (!this.pcm.auth | !this.pcm.user.rol) {
      this.$root.$emit('changepage', 1)
    }
  },
  mounted: function () {

  },
  sockets: {
    vsuccCreated: function (response) {
      if (response.status == "ok") {
        this.$refs.videoRec.src = response.videourl;
        // this.mediaStream.stream.getTracks().forEach(track => track.stop());
        this.isRecording = false;
        this.activeC = "h-vh-68 ";
        this.isFinished = true;
        // delete this.mediaStream;
      }
    },
  },
  methods: {
    closest(logic) {
      this.startupload = false;
    },
    async upload () {
         if(Platform.is.capacitor){
     let vm = this
     const { FilePicker } = Plugins
    // const uri = await Filesystem.getUri({directory:'EXTERNAL', path:'.'});
    // Filesystem.readFile({path:uri}).then(file=>{
      
      
    // }).finally(()=>{
     
    // })
    FilePicker.showFilePicker({
  fileTypes: ["video/*", "video/mp4"],
}).then(
  (fileResult) => {
    const fileUri = fileResult.uri;
    const fileName = fileResult.name;
    const fileMimeType = fileResult.mimeType;
    const fileExtension = fileResult.extension;
    vm.file = file
  },
  (error) => {
    console.log(error);
  }
).finally(()=>{
 vm.upload()
});
     }else {
      (this.filesend = true), (this.startupload = false);
      // this.$socket.emit("fileuploader", this.file);
      //console.log(this.file)
     // this.getWebSocket();
     // this.videoDataHandlerv2(this.file);
     this.activeC = "h-vh-68";
     this.isValid = true
     this.player = false
        this.videoinfos = true;
     this.videoRecorder = false
       this.$nextTick(()=>{
      this.$refs.videoRec.src = URL.createObjectURL(this.file)
       })
     }
    },
            uploadvid(){
            let vm = this
            var op = 100
            this.BinaryClient().then((client)=>{
              vm.isUploading = true;
                 this.modefile = true;
           
             client.on('open', function(){
                var stream = client.send(vm.file, {name: vm.file.name, size: vm.file.size});
                                   var tx = 0;
                 stream.on('data', function(data){
                  console.log(data);
                 data.stage === 2 &&  data.state === "start" ? (tx = 0, vm.uploadState2 = true, op=10000) : null;
                  data.stage === 3 &&  data.state === "start" ? (tx = 0, vm.uploadState3 = true, vm.videoUrl = data.url,  op=100) : null;
                  data.state === "done" ? (vm.videoUrl = data.url,vm.done(),  vm.isFinished = true ,vm.activeC = "h-vh-68") : null;
          vm.progress = Math.round(tx+=data.rx*op)/100;
         // console.log(Math.round(tx),"% to complete");
        });
             })
             
          })        
    
        },
    // reset video display with media device media stream
    cancelVideo() {
      this.videoUrl = null;
    },
    onStream(mediaStream) {
      this.$refs.videoRec?this.$refs.videoRec.srcObject = mediaStream:null;
      this.$refs.videoRec?this.$refs.videoRec.load():null;
      this.$refs.videoRec?this.$refs.videoRec.play():null;
      //this.toggleVideo();
    },
    onResult(video) {
       (this.filesend = true), (this.startupload = false);

     this.file = video
     console.log(video);
     this.activeC = "h-vh-68";
     this.isValid = true
     this.splayer = false
     this.player = true
        this.videoinfos = true;
     this.videoRecorder = false;
       this.$nextTick(()=>{

      this.$refs.videoRec2.setAttribute('src',URL.createObjectURL(video));
      this.$refs.videoRec2.load()
       })
    },
    resetVideo() {
      //reset !=mounted
      var vm = this;
         this.activeC = "h-vh-100";
     this.isValid = true
     this.player = true
        this.videoinfos = false;
     this.videoRecorder = true
      this.$refs.videoRec?this.$refs.videoRec.muted = true:null;
      getMedia({
        video: true,
        audio: { width: window.innerWidth, height: window.innerHeight },
      })
        .then(function (stream) {
          vm.mediaStream = {
            stream,
          };
          vm.gotStream(stream);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // start recoording ///change
    record() {
      if (!this.uploadUrl) return;
      this.getWebSocket();
      this.isRecording = true;
      this.recorder.start(1000);
    },

    // stop recording  ///change
    stop() {
      this.recorder.stream.getTracks().forEach((track) => track.stop());
      this.recorder.stop();
      this.mediaStream.stream.getTracks().forEach((track) => track.stop());
      this.isRecording = false;
      this.activeC = "h-vh-68";
      this.isFinished = true;
      this.connection.send("DONE");
      delete this.mediaStream;
      delete this.recorder;
    },
    RecordController() {
      if (this.isRecording) {
        this.stop();
      } else {
        this.record();
      }
    },
    chenged(evt) {
      if (evt.length > 5) {
        this.notempty = true;
      }
    },
    // reset video diaply and emit video file url
    done() {
      this.send();
      this.activeC = "h-vh-68";
      this.gohome();
    },
    send() {
      
      var body = {
        tag: this.tags,
        text: this.example,
        videolink: this.videoUrl,
      };
      http({
        method: "post",
        url: "/create_videos",
        data: body,
        headers: {
          "x-access-token": this.pcm.user.tk,
        },
      }).then((response) => {
        this.alert = response.data;
       // this.resetVideo();
        this.$emit("input", this.videoUrl);
        location.reload();
        return;
      });
    },
    gohome() {
      location.reload()
    },
    goback: function () {
      this.$root.$emit("changepage", 1);
    },
    // initialize MediaRecorder and video element source
    gotStream(mediaStream) {
      this.recorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm;codecs=h264",
      });
      this.recorder.ondataavailable = this.videoDataHandler;
      this.$refs.videoRec.src = null;
      this.$refs.videoRec.srcObject = mediaStream;
      // this.toggleVideo();
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
    videoDataHandlerv2(event) {
      //this.isUploading = true;
      
      let reader = new FileReader();
      reader.readAsArrayBuffer(event);
      reader.onloadend = () => {
        this.connection.onopen = () => {
          this.connection.send(reader.result);
          setTimeout(() => {
            this.connection.close();
         
          }, event.size / 100);
        };
      };
    },
    // initialize WebSocket
  
    // update video when file written
    updateVideoFile(fileName) {
      this.videoUrl = this.uploadUrl + fileName + ".mp4";
      this.toggleVideo();
      this.$refs.videoRec.srcObject = null;
      this.$refs.videoRec.src = this.videoUrl;
      this.isUploading = false;
      LocalStorage.set("record", this.videoUrl);
    },
    // toggle video display
    toggleVideo() {
      this.$refs.videoRec.loop = !this.$refs.videoRec.loop;
      // this.$refs.videoRec.controls = !this.$refs.videoRec.controls;
    },
  },
};
</script>
<style>
  /* .plyr video {
    height: 100vh !important;
} */
</style>
