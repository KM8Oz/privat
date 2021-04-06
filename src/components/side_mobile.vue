<template>
  <q-scroll-area
      :delay="1200"
      :thumb-style="{display:'none'}"
      :bar-style="{display:'none'}"
      class="scroller"
    >
    <q-input class="q-pa-md" input-class="padingf oswald-semibold" color="dark" rounded  v-model="search" :placeholder="placeholder">
        <template v-slot:append>
          <q-avatar>
           <q-icon name="search" />
          </q-avatar>
        </template>
      </q-input>
  <q-list bordered separator class="full-width">
     
      <q-slide-item @left="onLeft" @right="onRight" v-for="(model,index) in recModels" :key="index">
        <template v-slot:left>
          Left
        </template>
        <template v-slot:right>
          Right content.. long
        </template>

        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="model.avatars.replace('.camsguns.com','.cg.house')" draggable="false">
               <q-badge v-if="model.is_vip === 'Y'" floating color="teal">VIP</q-badge>
            </q-avatar>
          </q-item-section>
           <q-item-section class="text-black text-left">
          <q-item-label lines="1">{{model.name}}</q-item-label>
          <q-item-label caption lines="2">
            
            <q-badge  color="pink" class="q-mb-lg"> <span class="text-weight-bold">видео </span>  {{': '+model.videos}} <q-icon name="video_library" color="white" class="q-ml-xs" /></q-badge>
          </q-item-label>
        </q-item-section>
          <q-item-section side top>
          <q-item-label caption>offline</q-item-label>
          <div class="text-orange">
            <q-icon name="star" v-for="(item, index) in Array(model.rank)" :key="index"/>
          </div>
        </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </q-scroll-area>

</template>

<script>
import { mapState } from 'vuex';
import http from '../http-common';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import * as stringSimilarity from 'string-similarity';
  import 'swiper/css/swiper.css'
export default {
  name: "sidemobile",
  props: {
    placeholder:String,
    swiperdata:Object,
    searchrate:Number,
  },
  components: {
      Swiper,
      SwiperSlide
    },
  data:()=>({
    recModels:null,
    recModelsback:null,
    search:"",
    auth:false,
     swiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          mousewheel: true
        }
  }),
  computed:{
    ...mapState(['pcm'])
  },
  watch:{
    search:function(val){
      let rate = this.searchrate
      val !== "" ? 
     this.recModels = this.recModelsback.filter(e => stringSimilarity.compareTwoStrings(e.name,val) >= rate) : this.recModels = this.recModelsback
    }
  },
  mounted:function(){
    //console.log(this.pcm.user.un);
  },
   beforeMount() {
    http({
      method: "get",
      url: "/models",
      headers: {
        "x-access-token": this.pcm.user.tk,
      },
    }).then((response) => {
     // console.log("models data:",response.data)
      if (response) {
        this.auth = true;
        this.recModels = response.data;
        this.recModelsback = response.data;
       // console.log( this.recModels);
      } else {
        this.$q.notify({
          color: "pink-6",
          message: "try to sign in please",
          classes: "glossy",
          timeout: 500,
        });
      }
    });
  },
  methods:{
     onLeft ({ reset }) {
      this.$q.notify('Left action triggered. Resetting in 1 second.')
      this.finalize(reset)
    },

    onRight ({ reset }) {
      this.$q.notify('Right action triggered. Resetting in 1 second.')
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    }
  },
    beforeDestroy () {
    clearTimeout(this.timer)
  }
};
</script>
<style lang="scss" scoped>
.scroller{
width: 100% !important;
height: 95vh;
}
.q-placeholder {
    padding-top: 4px !important;
}

</style>