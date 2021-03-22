<template>
<section v-if="!mediasupport && typefile === 'record'" class="row justify-center">
    
    <div v-bind:class="[activeC, 'flex', 'justify-center', 'bg-black','q-mt-none','q-pt-none', 'window-height']" v-show="!isUploading">
          <div class="w-100 h-100 q-pa-none q-ma-none justify-center row videowrapper" >
         <video ref="videoRec" v-bind:class="[activeCc, 'h-100', 'q-pa-none', 'q-ma-none', 'video-6-19']"
          playsInline
          muted
          >
         </video>
            </div>
        <template v-if="!isFinished">
          <VueRecordVideo class="fixed col-6" :mode="recMode" @stream="onStream" @result="onResult"/> 
        </template>
    </div>
    <p class="text-white">{{ alert }}</p>
        <div
      class="row justify-center  q-my-none q-mx-none h-100 w-40" v-if="isFinished"
    >
      <div class="w-100 h-100  col q-mx-md q-mt-md">
      <div class="row text-h6 text-weight-light"><p style="color:#000;">Загрузить видео</p></div>
          <q-input class="row  h-10 text-body1 q-mb-md" outlined 
     input-class="q-mx-xs   text-weight-light"    square v-model="form.title" placeholder="название видео..."  
     
     />
    <q-input class="row q-mb-md  text-body1 "  input-class="q-mx-xs text-weight-light" outlined  type="textarea" square v-model="form.description"
     placeholder='Описание видео'
     />

    <q-input class="row  h-10 text-body1 q-mb-md" outlined 
     input-class="q-mx-xs   text-weight-light"    square v-model="form.tags" placeholder="#Тег1#Тег2..."  
     
     />
        <div class="row  w-100">
         <q-btn
                  class="q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs "
                  dense
                  rounded
                  color="pink-6"
                  no-caps
                  @click="uploadvid"
                  label="Опубликовать"
                />
                <q-btn
                  class="q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs "
                  dense
                  rounded
                  color="pink-6"
                  no-caps
                  @click="forcereload"
                  label="Отмина"
                />
        </div>
        <div class="row  w-100">
                 <q-linear-progress size="25px" :value="progress" track-color="red" stripe  color="pink-7" class="q-mt-sm" />
        </div>
        <!-- <div class="row  w-100">
                  <q-circular-progress
      show-value
      font-size="25px"
      :value="progress*100"
      size="30vh"
      :thickness="0.02"
      color="pink"

      track-color="grey-3"
      class="q-ma-md oswald-semibold text-center"
    >
      {{ uploadState2 ? "перестройка" : uploadState3 ? "сохранить" : "передача"  }} <br/>
        {{ !uploadState3 && !uploadState2 ?  form.video ? Math.fround((form.video.size / 1024)*progress).toPrecision(2)+'Kb' : 0+'Mb': '#*#'}}
    </q-circular-progress>
        </div> -->
       
      </div>
    </div>
</section>
<section v-else-if="mediasupport && typefile === 'record'" class="fit row justify-center">
  <div class="q-pa-md col-7">
    <q-carousel
      swipeable
      animated
      v-model="totuslide"
      thumbnails
      infinite
    >
      <q-carousel-slide :name="1" img-src="http://rec.camsguns.com/tutos/obs1.png" />
      <q-carousel-slide :name="2" img-src="http://rec.camsguns.com/tutos/obs2.png" />
      <q-carousel-slide :name="3" img-src="http://rec.camsguns.com/tutos/obs3.png" />
      <q-carousel-slide :name="4" img-src="http://rec.camsguns.com/tutos/obs4.png" />
      <q-carousel-slide :name="4" img-src="http://rec.camsguns.com/tutos/obs5.png" />
    </q-carousel>
  </div>
</section>
<!--  bg -->
<section v-else-if="typefile === 'upload'" :class="pcm.controls.dark ? 'row bg-black':'row'">
   <div class="col-lg-2 col-md-3 mt-vh-4">
     <q-followings />
    </div>
    <div
      :class="`col-lg-7 col-md-5 mt-vh-4 flex  justify-center fullpageMT  ${pcm.controls.dark?'text-white':'text-dark'}`"
    >
      <div  v-if="!isUploading" class="m-mx-23 h-100 w-100 col ">
      <div class="row text-h6 text-weight-light"><p >Загрузить видео</p></div>
      <div class="row text-weight-light"><p >выберите видеофайл.</p></div>
     
<q-file :class=" `q-px-none q-py-auto q-mb-md text-subtitle1`" 
 counter
 style="height:70px"
  @rejected="onRejected"
  accept=".mp4,.avi,.mkv,.wmv"
  :bg-color="pcm.controls.dark?'grey':''"
  filled v-model="form.video" label="выберите видео">
         <template v-if="form.video" v-slot:append>
          <q-icon name="cancel" @click.stop.prevent="form.video = null" class="cursor-pointer" />
        </template>
         <div  v-if="form.video" class=" relative-position text-pink text-subtitle1 q-pa-none">
            {{ form.video.name }}
          </div>
      </q-file>
          <q-input class="row  h-10 text-body1 q-mb-md" outlined 
     :input-class="`q-mx-xs ${pcm.controls.dark?'text-white':'text-dark'} text-weight-light`"    square v-model="form.title" placeholder="название видео..."  
       :color="pcm.controls.dark?'white':'dark'"
       :bg-color="pcm.controls.dark?'grey':''"
     />
    <q-input class="row q-mb-md  text-body1 "  :input-class="`q-mx-xs ${pcm.controls.dark?'text-white':'text-dark'} text-weight-light`" outlined  type="textarea" square v-model="form.description"
     placeholder='Описание видео'
     :color="pcm.controls.dark?'white':'dark'"
     :bg-color="pcm.controls.dark?'grey':''"
     />

    <q-input class="row  h-10 text-body1 q-mb-md" outlined 
     :input-class="`q-mx-xs ${pcm.controls.dark?'text-white':'text-dark'} text-weight-light`"    square v-model="form.tags" placeholder="#Тег1#Тег2..."  
       :color="pcm.controls.dark?'white':'dark'"
       :bg-color="pcm.controls.dark?'grey':''"
     />
        <div class="row  w-100">
         <q-btn
                  class="q-px-none q-mx-auto w-40 q-py-none q-mx-none text-weight-regular q-ml-xs "
                  dense
                  rounded
                  color="pink-6"

                  no-caps
                  @click="uploadvid"
                  label="Загрузить"
                />
        </div>
      </div>
      <div class="m-mx-23 h-100 w-100 row justify-center" v-else>
           <q-circular-progress
      show-value
      font-size="30px"
      :value="progress*100"
      size="45vh"
      :thickness="0.02"
      color="pink"

      track-color="grey-3"
      class="q-ma-md oswald-semibold text-center"
    >
      {{ uploadState2 ? "перестройка" : uploadState3 ? "сохранить" : "передача"  }} <br/>
        {{ !uploadState3 && !uploadState2 ?  form.video ? Math.fround((form.video.size / 1024)*progress).toPrecision(2)+'Kb' : 0+'Mb': '#*#'}}
    </q-circular-progress>
       <q-linear-progress size="25px" :value="progress" track-color="red" stripe  color="pink-7" class="q-mt-sm" />
      </div>
    </div>
    <!--Рекомендации-->
  <q-listrec />
</section>
   <section v-else :class="`row fit justify-center ${pcm.controls.dark ?'bg-dark text-white':'text-dark'}`">
    <div class="col-lg-2 col-md-3 mt-vh-4">
     <q-followings />
    </div>
    
      <div
      v-if="typefile === 'OBS'"
      class="col-lg-6 col-md-6 mt-vh-4 q-mx-md justify-center   "
    >
      <div class="h-100  col-12 ">
      <div class="row text-h6 text-weight-light"><p >Записать видео OBS</p></div>
      <div class="row text-weight-light"><p >1 - скопируйте и вставьте сервер и ключ в OBS и нажмите кнопку начать запись.</p></div>
        <div class="row text-weight-light"><p >2 - продолжайте отслеживать размер видео на странице (не закрывайте эту страницу).</p></div>
      <div class="row text-weight-light"><p >3 - нажмите опубликовать.</p></div>

   <div class="row justify-center">
              <q-input class="col-12  h-10 text-body1 q-mb-md" outlined 
     input-class="q-mx-xs   text-weight-light"    square v-model="form.title" placeholder="название видео..."  
     
     />
    <q-input class="col-12 q-mb-md  text-body1 "  input-class="q-mx-xs text-weight-light" outlined  type="textarea" square v-model="form.description"
     placeholder='Описание видео'
     />

    <q-input class="col-12  h-10 text-body1 q-mb-md" outlined 
     input-class="q-mx-xs   text-weight-light"    square v-model="form.tags" placeholder="#Тег1#Тег2..."  
     
     />
                   <div class="col-12"><q-btn
                   :loading="obsbtnloading"
                  class=" q-px-xs q-py-xs q-my-xs q-mx-auto w-100 text-weight-regular  "
                  @click="generateObs"
                  dense
                  :disable="!(form.tags&&form.title&&form.description)"
                  rounded
                  :color="obsbtncolor"
                  no-caps
                  :label="obsbtnlabel"
                >
                 <template v-slot:loading>
        <q-spinner-radio />
        {{obsdatarecorded}}
      </template>
                </q-btn></div>
                 <q-card
              v-if="submitResult.status"
              flat
              bordered
              class="col-12 q-mt-md bg-grey-white"
            >
              <q-card-section>
                <q-input input-class="text-body2" :value="'server: '+streamingUrl" readonly label-slot>
                  <template v-slot:append>
                    <q-icon
                      name="content_paste"
                      @click="copy"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-separator />

              <q-input
              
                filled
                autogrow
                readonly
                value="Key: ********************************************"
                label-slot
              >
                <template v-slot:append>
                  <q-icon
                    name="content_paste"
                    @click="copy2"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-card>
      </div>
      </div>
    </div>
    <div
    v-else
      class="col-lg-5 col-md-5 mt-vh-4 d-flex justify-content-center fullpageMT"
    >
      <div class="m-mx-23 h-100 w-100 col ">
      <div class="row text-h6 text-weight-light"><p >Записать видео</p></div>
      <div class="row text-weight-light"><p >Запишите видео используя видеокамеру или выберите видеофайл.</p></div>
      <div class="row justify-center">
          <div class="col-6"> <q-btn
                  class=" q-px-xs q-py-xs  w-100 text-weight-regular "
                  @click="goto('record')"
                  dense
                  rounded
                  color="pink-6"
                  no-caps
                  label="Записать видео"
                /></div>
          <div class="col-6"><q-btn
                  class=" q-px-xs q-py-xs q-ml-xs w-100 text-weight-regular  "
                  @click="goto('upload')"
                  dense
                  rounded
                  color="pink-6"
                  no-caps
                  label="Загрузить видео"
                /></div>
                   <div class="col-12"><q-btn
                  class=" q-px-xs q-py-xs q-my-xs q-mx-auto w-100 text-weight-regular  "
                  @click="goto('OBS')"
                  dense
                  rounded
                  color="pink-6"
                  no-caps
                  label="Записать видео OBS"
                /></div>
      </div>
      </div>
    </div>
    <!--Рекомендации-->
    <div class="col-lg-3 col-md-3 mt-vh-4">
      <q-listrec />
    </div>
 
  </section>
</template>

<script>
import http from "../../http-common";
// import Loader from "../Loader.vue";
import {
    LocalStorage
} from "quasar";
import { mapState } from 'vuex';
import { copyToClipboard } from "quasar";
//import VueRouter from "vue-router";
export default {
    name: "VideoCaptureD",
    data() {
        return {
            recMode:'press',
            activeC: "w-100",
            activeCc:"w-100",
            streamingUrl: "rtmp://rtmp.cg.house/recorder",
            submitResult: {
        status: false,
        value: null,
      },
            alert: null,
            errText: null,
            isModel:false,
            videostatus:false,
            typefile: null,
            totuslide:1,
            obsbtnloading:false,
            progress2:0,
            obsdatarecorded:'...Kb',
            obsbtnlabel:'генерировать',
            uploadState3:false,
            isUploading: false,
            isRecording: false,
            isFinished: false,
            recorder: null,
            ws: null,
            obsstage:0,
            uploadState2:false,
            progress:0,
            obsbtncolor:'pink-6',
            auth:false,
            respond:null,
            videoUrl: null,
            videoUrlelastic: null,
            tags: null,
            isUploading:false,
            mess: null,
            description: null,
            mediaStream: null,
            videocontrols:{
                ctl:'',
                autoplay:'',
                loop:'off'
            },
            form:{
                title:null,
                description:null,
                tags:null,
                video:null,
                url:null,
                token:null
            }
        };
    },
    computed:{
        mediasupport:function(){
        return !navigator.mediaDevices?.getSupportedConstraints() || !!Object.values(navigator.mediaDevices?.getSupportedConstraints()).map(e=>e===false).length > 4
        },
     ...mapState(['pcm']),
     video:function(){
       return this.$refs.videoRec || document.getElementsByTagName("video")[0]
     },
     videoWrapper:function(){
       return document.getElementsByClassName("videowrapper")[0];
     }
    },
    created() {
        if (!this.uploadUrl) this.errText = "There is no upload url available";
    },
    beforeMount(){
    //  this.getWebSocket(); 
        this.form.token = this.pcm.user.tk
        this.isModel = this.pcm.user.rol
        this.auth = this.pcm.auth
        if (!this.auth | !this.isModel) {
            this.$router.push("/");
        } else {

        }
    },
    mounted() {
    },
    beforeCreate(){
    },
    methods: {
      generateObs:function(){
        if(this.obsstage === 0){
        this.obsbtnloading = true;
       // console.log(`recording${this.pcm.user.id}`);
            this.$socket.emit('join', `recording${this.pcm.user.id}`)
      this.getstreamkeyOB()
      } else {
   this.pushdataafterrecord()
      }
      },
      copy(evt) {
      copyToClipboard(this.streamingUrl);
      this.$q.notify({
        color: "pink-6",
        message: "Ключ скопирован в буфер обмена",
      });
    },
     getstreamkeyOB() {
      this.$socket.emit("streamkey", {
        token: this.pcm.user.tk,
      });
    },
    copy2(evt) {
      copyToClipboard(this.submitResult.value);
      this.$q.notify({
        color: "pink-6",
        message: "URL скопирован в буфер обмена",
      });
    },
             onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
                 this.$notify.error({
            title: 'Советы по загрузке',
           message: `Тестовая среда не может загружать файлы ${rejectedEntries.length}`
      })
      // eslint-disable-next-line no-console
           },
   
        resetVideo:function(){},
        onResult:function(video){
            //console.log(video,{token:LocalStorage.getItem('token'),buffer:video});
            this.form.video = video;
            // this.uploadvid()
            this.isFinished = true
                       this.video.remove()
                   this.videostatus = true
                    this.videostatus = false
                     this.activeC = 'w-60'
                     this.activeCc = 'w-64'
                     let videos = document.createElement("video");
                     videos.className = "w-64 h-100 q-pa-none q-ma-none video-6-19 ";
                      videos.loop = true;
                      videos.type = 'video/mp4';   
                     videos.crossOrigin = 'anonymous';  
                     videos.controls = true;
                     // this.video.srcObject = null;
                     videos.src = URL.createObjectURL(video);
                      let vm = this
                     
                     //console.log(this.videoWrapper);
                     this.videoWrapper.appendChild(videos)
                    this.$nextTick(()=>{
                     
                     let playlopper =  setInterval(()=>{
                      videos.load()
            
                     },1000) 
                  videos.onloadedmetadata = function(e){
                             clearInterval(playlopper)
                             var playPromise =   e.target.play()
                         
// In browsers that don’t yet support this functionality,
// playPromise won’t be defined.
if (playPromise !== undefined) {
  playPromise.then(function() {
    // Automatic playback started!
  }).catch(function(error) {
    console.log(error);
    // Automatic playback failed.
    // Show a UI element to let the user manually start playback.
  });
}
                           }
                    })
        },
        // reset video display with media device media stream
        goto(type){
            this.typefile = type
        },
        // start recoording
        record() {
            if (!this.uploadUrl) return;
            this.isRecording = true;
            this.recorder.start(1000);
        },
       
            forcereload(){
             location.reload()
            },
        uploadvid(){
            let vm = this
            var op = 100
            this.BinaryClient().then((client)=>{
              vm.isUploading = true
             client.on('open', function(){
                var stream = client.send(vm.form.video, {name: vm.form.video.name, size: vm.form.video.size});
                                   var tx = 0;
                 stream.on('data', function(data){
                  // console.log(data);
                 data.stage === 2 &&  data.state === "start" ? (tx = 0, vm.uploadState2 = true, op=10000) : null;
                  data.stage === 3 &&  data.state === "start" ? (tx = 0, vm.uploadState3 = true, vm.form.url = data.url,  op=100) : null;
                  data.state === "done" ? (vm.form.url = data.url,vm.pushdataafterrecord()) : null;
          vm.progress = Math.round(tx+=data.rx*op)/100;
         // console.log(Math.round(tx),"% to complete");
        });
             })
             
          })        

        },
        pushdataafterrecord(){
             if(this.verifyfilds()){
                        this.send().then(()=>{
                             this.$q.notify({
                     type: 'positive',
                    message:'sending data ....',
                  color:'green-6',
                   progress: true,
                   timeout: 3000,
                    onDismiss:()=>{
                            this.$router.push('/')
                    }
                         })
                           
                        })
                    } else {
                         this.$q.notify({
                     type: 'positive',
                    message:'check data and resend please !',
                  color:'red-6',
                         })
                    }
        },
         send:async  function (){
            var body = {
                tag: this.form.tags,
                text: this.form.description,
                videolink: this.form.url,
            };
            http({
                method: "post",
                url: "/create_videos",
                data: body,
                headers: {
                    "x-access-token": this.pcm.user.tk
                }
            }).then(response => {
                this.alert = response.data;
 
            });
        },
        // initialize MediaRecorder and video element source
        onStream(mediaStream) {
            this.video.srcObject = mediaStream;
            this.video.play()
            //this.toggleVideo();
        },
        verifyfilds(){
            console.log(this.form.title , this.form.description , this.form.tags , this.form.url);
            if(this.form.title && this.form.description && this.form.tags && this.form.url){
              return true;
            } else {
                return false;
            }
        },
        // toggle video display
        toggleVideo() {
            this.video.loop = !this.video.loop;
         this.video.controls = !this.video.controls;
        }
    },
      sockets: {
        recording(data){
   //console.log(data);
   this.obsdatarecorded = data.progress
   if(data.status === "done"){
     this.form.url =  'https://rec.camsguns.com/'+data.filename+'.mp4'
     this.obsbtnloading = false
     this.obsbtncolor = 'green'
     this.obsbtnlabel = 'публиковать'
     this.obsstage = 3
   }
        },
     getstreamkey(data) {
      this.submitResult.status = data.status;
      this.submitResult.value = data.key;
    },
      cl_uploaded: function(res){
      // if(res){
      //   //  console.log('subscribe',res);
      //     this.isFinished = true;
      //      this.video.srcObject  = null
      //     this.video.src  = 'https://record.camsguns.com'+res
      //     this.video.play()
      //     this.video.controls = true;
      //       //this.activeC = 'w-70'
      // }
      }
    },
};
</script>

<style scoped>
video::-webkit-media-controls-play-button {
    display: none;
}

video::-webkit-media-controls-timeline {
    display: none;
}

video::-webkit-media-controls-current-time-display {
    display: none;
}

video::-webkit-media-controls-time-remaining-display {
    display: none;
}

video::-webkit-media-controls-toggle-closed-captions-button {
    display: none;
}
.plyr--video {
    top: -22px !important;
}

video::-webkit-media-controls-volume-slider {
    display: none;
}

video::-webkit-media-controls-volume-slider {
    display: none;
}

video::-webkit-media-controls-volume-control-hover-background {
    display: none;
}



</style>