<template>
<div class="wrapper" ref="videow">
      <video
            class="video-mainMobile"
      playsInline
      controlsList="notimeline noremoteplayback nodownload nofullscreen noremoteplayback"
      :controls="false"
      :src="src"
      :poster="poster"

      :muted="muted"
      :id="id"
      ref="video"
    >
        
    </video>
    <div class="playpause loader1" ref="playbtn" ></div>
     <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      ref="playing"
      @click="togglePlay"
      
    >
      <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#fff" />
    </svg>
</div>
</template>
<script>
export default {
    name:"Player",
  props: {
    src: String,
    poster: String,
    id:String,
    muted:Boolean,
    slide: Boolean
  },
  data:()=>({
    playing:false  
  }),
  computed:{
  btn:function(){
      return this.$refs.playbtn;
  },
   btn2:function(){
      return this.$refs.playing;
  },
  video:function(){
      return this.$refs.videow;
  }
  },
  methods:{
togglePlay:function(){
  this.$refs.video.play();
  this.btn2.style.display = 'none' 
}
  },
  mounted:function(){
      let vm = this;
      this.btn.style.display = 'none' ;
        this.btn2.style.display = 'none' 
     // vm.$refs.video.playing ? this.btn.style.display = 'none' : this.btn.style.display = 'block'
     // console.log(this.$refs.playbtn);
     this.video.addEventListener('playing',()=>{
         this.btn.style.display = 'none'
         this.btn2.style.display = 'none' 
         console.log('playing');
     })
     this.video.addEventListener('loadeddata',()=>{
         this.btn.style.display = 'none'
        // this.btn2.style.display = 'none' 
     })
      this.video.addEventListener('waiting',()=>{
          this.playing = false;
     })
         this.video.addEventListener('abort',()=>{
          this.playing = false;
          this.btn.style.display = 'none'
         // this.btn2.style.display = 'none' 
     })
          this.video.addEventListener('error',()=>{
          this.playing = false;
          this.btn.style.display = 'none'
     })
          this.video.addEventListener('suspend',()=>{
          this.playing = false;
     })
       this.video.addEventListener('play',()=>{
          this.playing = false;
          this.btn.style.display = 'none'
         // this.btn2.style.display = 'none' 
     })
        this.video.addEventListener('pause',()=>{
          this.playing = false;
           this.btn.style.display = 'block'
     })
    
        this.video.addEventListener('click',()=>{
        //console.log(this.btn.after());
          this.playing ? (vm.$refs.video.pause(), this.playing = false , this.btn.style.display = 'block') :(vm.$refs.video.play(), this.playing = true , this.btn.style.display = 'none');
      })
  },
  updated:function(){
    this.btn.style.display = 'none' ;
       // this.btn2.style.display = 'none'  
  }
}
</script>
<style lang="css">
.video {
  aspect-ratio: 348/530;

}
.wrapper{
    display:block;
    position:relative;
    width:100vw;
    height: 100vh;
    z-index:9999
}

/* svg {
  position: absolute;
     top: calc(47% - 35px);
    left: calc(48% - 35px);
  width: 90px;
  height: 90px;
  z-index: 10;
  filter: drop-shadow(0px 0px 1px black);

} */
</style>