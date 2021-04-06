<template>
     <div class="card-wrap"
     @click="clicked(modelid)"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg-hover" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div >
       <q-dialog v-model="seamless"  position="bottom" content-class="dialog_profile row" transition-show="bounceIn">
           <div class="col-9">
                <vue-plyr class="bigbtnplyr profilevideo mute-right" :emit="['loadeddata']">
                            <video @play="setProgressBar" controls="false" data-plyr-config='{ "controls": ["mute"]}' ref="dialogVideo" :src="source ? source  :src.replace('.mp4','_desktop.mp4').replace('.camsguns.com','.cg.house')" color="black" type="video/mp4" />
                        </vue-plyr>
                        <q-card-section class="row items-center no-wrap">
                            <div class="text-left">
                                <div class="text-weight-bold text-uppercase">
                                    @{{ tags ? modelname : "none" }}
                                </div>
                                <div class="text-grey">
                                    {{ tags ? tags.join(',') : "#none" }}
                                </div>
                            </div>
                            <q-space />
                            <q-btn flat round icon="play_arrow" @click="$refs.dialogVideo.play()" />
                            <q-btn flat round icon="pause" @click="$refs.dialogVideo.pause()" />
                            <q-btn flat round icon="close" v-close-popup />
                        </q-card-section>
                         <q-linear-progress :value="progress" color="pink" />
           </div>
           <div class="col-3 list">
           <q-scroll-area class="" style="width: 100%; height:100%" :bar-style="{display:'none'}" :thumb-style="{display:'none'}">
               <q-list bordered v-if="show">
                   <q-item clickable v-ripple  v-for="(video, index) in listVideos" :key="index" >
                      <q-img
                        @click="switcher(video.src)" 
                          :src="video.poster"
                          :ratio="9/16"
                          spinner-color="primary"
                          class="img_thumb"
                          spinner-size="82px"
                      />
                   </q-item>
               </q-list>
           </q-scroll-area>
           </div>
       </q-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"cardhover",
    props: ['dataImage', 'src', 'tags', 'modelname', 'modelid' , 'disable'],
    data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    show:false,
    progress:0,
    source:false,
    mouseY: 0,
    listVideos:[],
    seamless:false,
    mouseLeaveDelay: null
  }),
    computed: {
        ...mapState(["pcm"]),
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
    mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
 
  },
  methods:{
       setProgressBar(evt) {
           let vm = this;
            const progresser = setInterval(() => {
                vm.progress = evt.target.currentTime / evt.target.duration;
                if (evt.target.currentTime === evt.target.duration || evt.target.paused)
                    clearInterval(progresser);
            }, 100);
        },
        switcher:function(val){
       this.source = val.replace(".mp4", "_desktop.mp4");
       this.$refs.dialogVideo.load();
        },
      clicked:function(id){
    //    console.log("ok");
     let vm = this
       this.$socket.emit("get_all_model_videos", {id:id}, (res)=>{
    
       if(res.status){
     vm.listVideos = res.payload;
         console.log(res);
          vm.seamless = false
    this.$nextTick(()=>{
        vm.seamless = true
               vm.show=true
      
    })

       } 

    })
      },
    handleMouseMove(e) {
        // console.log(e.pageX,this.$refs.card.offsetLeft);
          if(!this.disable){
      this.mouseX = e.pageX - (this.$refs.card.offsetLeft + this.width/2)*1.8;
      this.mouseY = e.pageY - (this.$refs.card.offsetTop + this.height/2);
          }
    },
    handleMouseEnter() {
          if(!this.disable){
      clearTimeout(this.mouseLeaveDelay);
          }
    },
    handleMouseLeave() {
        if(!this.disable){
   this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
        }
    }
  }
}
</script>

<style lang="scss">
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);
.title {
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1+p, p+p {
  margin-top: 10px;
}

.container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-wrap {
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;
  
  &:hover {
    .card-info {
      transform: translateY(0);
    }
    .card-info p {
      opacity: 1;
    }
    .card-info, .card-info p {
      transition: 0.6s $hoverEasing;
    }
    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg-hover {
      transition: 
        0.6s $hoverEasing,
        opacity 5s $hoverEasing;
      opacity: 0.8;
    }
    .card {
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      box-shadow:
        rgba(white, 0.2) 0 0 40px 5px,
        rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
}

.card {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    rgba(black, 0.66) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg-hover {
  opacity: 0.5;
  position: absolute;
  top: -20px; left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition:
    1s $returnEasing,
    opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  
  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  
  * {
    position: relative;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}

.card-info h1 {
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
}
.dialog_profile{
  .list{
      min-width: 100px;
      .img_thumb{
        border-radius: 1em;
      }
  }
    .q-dialog__inner{
            margin: 0px auto;
      display: flex;
     max-width: 800px;
    }
    .q-linear-progress__model{
        width: 100%;   
         }
    .q-card__section{
        background-color: white;
        width: 100%;
    }
    .bigbtnplyr{
        border-radius:1em 1em 0em 0em !important;
        min-width: 100%;
    }
}
</style>