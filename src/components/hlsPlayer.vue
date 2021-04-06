<template>
  <div class="video-wrapper" >
    <div v-if="loading" class="loader">Loading...</div>
    <video
    class="videoref"
    id="hls-video"
      ref="videoref"
      :class="classes"
    
     
    >
     <source  data-fluid-hd
                     :src="vsrc" title="HD" type='application/x-mpegURL'/>
                      <source  data-fluid-hd
                     :src="vsdsrc" title="SD" type='application/x-mpegURL'/>
    </video>
  </div>
</template>

<script>
import Hls from "hls.js";
import fluidPlayer from 'fluid-player';
export default {
  name: "HlsPlayer",
  props: {
    src: String,
    w: Number,
    h: Number,
    wps: Number,
    hps: Number,
    c: Boolean,
    classes:String
  },
  data: () => ({
    vsrc: null,
    
    ww: null,
    wh: null,
     player: null,
    loading:false
  }),
  computed: {
    vsdsrc(){return this.vsrc.replace("HD","SD")},
    video() {
      return this.$refs.videoref;
    }
  },
  beforeUpdate: () => {
    //  this.hls.destroy()
  },
  created() {
    this.vsrc = this.src;
   
  },
  watch: {
    src: function (val) {
      // this.hls.detachMedia(this.video);
      this.vsrc = val;
     // this.video.srcObject = null;
      // this.hls.attachMedia(this.video);
      // this.hls.loadSource(val);
      // this.$nextTick(() => {
      //   // console.log(this.video);
      //   this.video.addEventListener("canplay", (event) => {
      //     this.video.play();
      //   });
      // });
      this.player.play()
    },
  },
  mounted() {
     this.reportWindowSize();
    this.$nextTick(() => {
      window.onresize = this.reportWindowSize;
    });
    this.player = fluidPlayer(this.video,{
        layoutControls: {

           primaryColor: "#fe2c55",
            fillToContainer: true,
             autoPlay: true,
             preload: "auto" ,
             doubleclickFullscreen: false,
            posterImage: 'https://rec.cg.house/tutos/loading-1.jpg',
            allowTheatre:           false,
            logo: {
                imageUrl:           "https://rec.cg.house/tutos/logo-trans.png",
                position:           'top right',
                clickUrl:           null,
                opacity:            1
            },
        }
    });
    this.startVideo();
  //  this.joinVideoHls();
   
//           this.video.addEventListener('waiting', (event) => {
//   console.log('Video is waiting for more data.');
// });
  },
  methods: {
    ps(s,f){
    return ((s/100 )* f).toFixed()
    },
    reportWindowSize() {
      
      this.wh = window.innerHeight.toFixed();
      this.ww = window.innerWidth.toFixed();
      //console.log(this.video);
      this.video.style.heigh = this.ps(this.hps,this.wh);
       this.video.style.width = this.ps(this.wps,this.ww);
    },
    startVideo() {
      // this.hls.attachMedia(this.video);
      // this.hls.loadSource(this.src);
     this.player.play()
    },
    joinVideoHls() {
      // this.hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      //   console.log("video and hls.js are now bound together !");
      // });
      // this.hls.on(Hls.Events.FRAG_LOADING, function () {
      //  this.loading = true
      // });
      // this.hls.on(Hls.Events.FRAG_LOADED, function () {
      //  this.loading = false
      // });
      // let vm = this
      // this.hls.on(Hls.Events.ERROR, function (event, data) {
      //   if (data.fatal) {
      //     switch (data.type) {
      //       case Hls.ErrorTypes.NETWORK_ERROR:
      //         // try to recover network error
      //         console.log("fatal network error encountered, try to recover");
      //         vm.hls.startLoad();
      //         break;
      //       case Hls.ErrorTypes.MEDIA_ERROR:
      //         console.log("fatal media error encountered, try to recover");
      //         vm.hls.recoverMediaError();
      //         break;
      //       default:
      //         // cannot recover
      //         vm.hls.destroy();
      //         break;
      //     }
      //   }
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   @import "~fluid-player/src/css/fluidplayer.css";

    div.fluid-component, div.fluid-component > video {
        /* width: 100% !important;
        height: 100% !important; */
    }
.video-wrapper{
position: relative;
width: 100%;
height: 100%;
margin: 0 0;
}
.videoref{
position: relative;
object-fit: cover;
}

.loader {
  position: absolute;
  color: #e45252;
  left: 43%;
  z-index: 11;
  font-size: 90px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 25% auto 0px auto;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}
@media screen and (min-width: 1000px) {
 .loader {
  left: 43%;
  margin: 15% auto 0px auto;
}
}
@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
