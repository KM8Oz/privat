<template>
  <q-page :class="`${pcm.controls.dark? 'bg-dark text-white':'bg-white text-black'}`">
    <div class="row">
        <div
      :class="width > 1200 ? 'col-lg-2 col-md-3 mt-vh-4' : 'col-lg-2 col-xs-1 mt-vh-2'"
    >
      <q-followings v-model="tabVideos" :index="lastindex" @change="reRender()" />
    </div>
    <div class="col-lg-9 col-md-9 row">
        <div class="row w-100">
      <q-toolbar class=" text-white rounded-borders">
        <q-space />
        <q-input dark borderless v-model="searchQuery" placeholder="model name" :input-class="pcm.controls.dark ? 'text-center text-uppercase text-subtitle2 text-weight-light': 'text-dark text-center text-uppercase text-subtitle2 text-weight-light'" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="searchQuery === ''" name="search" :color="pcm.controls.dark ? 'white':'dark'"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </div>
      <div class="fit row q-pd-xs q-pr-xs q-ma-xs" >
        <!-- <router-link :to="'/'+model.link">
          <q-card class="my-card">
            <q-img :src="img(model.screen)" basic>
              <div class="absolute-bottom text-subtitle2 text-center">@{{model.username}}</div>
            </q-img>
          </q-card>
        </router-link> -->
        <div v-if="models.length === 0" class="self-center banner-no-streams  oswald-bold q-ma-auto">
         некого в эфире <q-icon name="record" class="q-mx-md"></q-icon>
        </div>
        <q-stream class="col-3"  v-for="(model,index) in models" :key="index" :img="img(model.screen)" :name="model.username" :time="model.otherData.updatedAt" :link="'/'+model.link"/>
      </div>
      </div>
      
    </div>
  </q-page>
</template>

<script>
import http from "../../http-common";
import { LocalStorage } from 'quasar';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      models: [],
      //lopper:null,
      tabVideos:null,
      lastindex:0,
      steamShow:true,
      width: window.innerWidth,
      searchQuery:"",
      text:""
    };
  },
  watch:{
    searchQuery: function(val){
      this.girlsVideosBack = this.models;
     // console.log(val)
      if(val){
         this.models = this.models.filter(e=>e.username.search(val) !== -1 )
     //  console.log(this.girlsVideos.filter(e=>e.username.search(val) !== -1 ))
      } else {
      this.models = this.girlsVideosBack ; 
      }
    
    }
  },
  computed:{
   ...mapState(['pcm'])
  },
  sockets:{
        applicationstatus: function(data){
           console.log(data);
        },
        online: function(res){
          let vm = this;
           this.steamShow = false;
           this.models = res;
           this.$root.$emit("refreshscreens", {status:!!res})
            //  res.length > 0 ? res.map(e=>vm.$root.on(`${e.screen}`) ): null;
           this.steamShow = true;
        }
  },
  beforeDestroy(){
 //clearInterval(this.lopper)
  },
  created() {
    // http({
    //   method: "get",
    //   url: "/models_online",
    //   headers: {
    //     "x-access-token": this.pcm.user.tk
    //   }
    // }).then(response => {
    //   this.models = response.data;
    // });

  },
  methods: {
    img(img) {
      return 'https://'+img;
    }
  }
};
</script>
<style scoped>
.vh100 {
  height: 90vh;
  width: 100%;
}
.vh40 {
  height: 20vh;
  width: 100%;
}
.mpb50 {
  padding-top: 20vh;
  height: 40vh;
}
.zi200 {
  z-index: -200;
}
.bott {
  margin-bottom: 0px;
}
.mb0 {
  padding-top: 30vh;
}
.vh100 {
  height: 100vh;
}
.zi200 {
  z-index: 200;
}
</style
>>
