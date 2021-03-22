<template>
  <div class="tiktok">
    <video :src="src" ref="video" :muted="muted"  :id="id" :poster="poster" />
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      @click="togglePlay"
      
      v-show="!state.playing"
    >
      <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#fff" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "tiktok",
  props: {
    src: String,
    muted:Boolean,
    poster: String,
    id:String,
  },
  data:()=>({ 
      play,
      pause,
      togglePlay,
      state:{
        playing:false
      },

  }),
  mounted:function(){
   // console.log(this.$refs);
    let vm = this
  this.$refs.video?.addEventListener('playing',()=>{
         vm.state.playing = false;
     })
      this.$refs.video?.addEventListener('click',()=>{
         vm.state.playing ? vm.pause(): vm.play();
     })
  },
  methods:{
     play : () => {
      this.$refs.video?.play();
      this.state.playing = true;
    },

     pause : () => {
      this.$refs.video?.pause();
      this.state.playing = false;
    },

   togglePlay : () => {
  //   console.log(e);
      if (this.state.playing) {
        this.pause();
      } else {
        this.play();
      }
    }
  }
};
</script>

<style scoped>
.tiktok {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

video {
  aspect-ratio: 348/520;
  width: 100%;
  height: auto;
  position: relative;
}

svg {
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  width: 90px;
  height: 90px;
  z-index: 10;
}
</style>
