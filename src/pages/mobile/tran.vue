<template>
  <q-page class="bg-white" v-touch:swipe.right="onright">
 <!-- <q-input outlined v-model="number" prefix="$" label-slot clearable>
        <template v-slot:prepend>
          <q-avatar>
            <img src="https://dev.cg.house/img/PCMLogo.svg">
          </q-avatar>
        </template>

        <template v-slot:label>
          <strong class="text-deep-orange">поиск</strong>
          название <em class="q-px-sm bg-deep-orange text-white rounded-borders">моделей</em>
        </template>
      </q-input> -->

    <div class="row w-vw-100 h-vh-10" >
      <q-toolbar class="bg-black text-white ">
        <q-btn round dense flat icon="navigate_before" class="q-mr-xs" @click="goback" />
        <q-avatar >
          <img src="https://rec.cg.house/logo.png">
        </q-avatar>

        <q-space />

        <q-input dark borderless v-model="searchQuery" placeholder="model name" input-class="text-center text-uppercase text-subtitle2 text-weight-light" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="searchQuery === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </div>
    <div class="row" v-if="girlsVideos.length > 0">
      <div class="col-12 q-pd-xs q-pr-xs" v-for="(girlVideo, index) in girlsVideos" :key="girlVideo.id" >
          <q-item clickable v-ripple :to="'/'+girlVideo.link">
      <q-item-section side  :v-if="imageExists(index ,girlVideo.screen).status">
        <q-avatar rounded size="100px" >
          <img  :v-if="!!(girlVideo.status)" :src="girlVideo.screen.replace('.camsguns.com','.cg.house')" />
          <q-badge floating color="red">live</q-badge>
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-black text-uppercase text-left">
        <q-item-label>@{{girlVideo.username}}</q-item-label>
        <q-item-label class="text-black text-uppercase text-left" caption>{{girlVideo.otherData.UuserId.name}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        {{
           getdatediff(girlVideo.otherData.updatedAt).month !== 0 ? `${getdatediff(girlVideo.otherData.updatedAt).month} months ago`:
           getdatediff(girlVideo.otherData.updatedAt).day !== 0 ? `${getdatediff(girlVideo.otherData.updatedAt).day} days ago`:
           getdatediff(girlVideo.otherData.updatedAt).hr !== 0 ? `${getdatediff(girlVideo.otherData.updatedAt).hr} hrs ago`:
           `${getdatediff(girlVideo.otherData.updatedAt).min} min ago`}}
      </q-item-section>
      <q-item-section avatar>
          <q-avatar round>
            <img :src="girlVideo.otherData.avatars.replace('.camsguns.com','.cg.house')">
          </q-avatar>
        </q-item-section>
    </q-item>
      </div>
    </div>
    <div class="row h-vh-100 w-vw-100 justify-center items-center" v-else> 
    <div class="col-8"><p class="text-black text-h6 text-uppercase text-weight-light text-center q-mx-auto oswald-bold q-my-auto">некого в эфире </p></div>
    <div class="col-2"><q-icon name="record" color="black" size="50px"></q-icon></div>
    </div>
  </q-page>
  
</template>

<script>
import http from "../../http-common";
import { LocalStorage, date } from 'quasar';

export default {
  name:"live",
  data() {
    return {
      model:"",
      girlsVideos: [],
      searchQuery:null,
      girlsVideosBack:[]
    };
  },
  watch:{
    searchQuery: function(val){
      this.girlsVideosBack = this.girlsVideos;
     // console.log(val)
      if(val){
         this.girlsVideos = this.girlsVideos.filter(e=>e.username.search(val) !== -1 )
     //  console.log(this.girlsVideos.filter(e=>e.username.search(val) !== -1 ))
      } else {
      this.girlsVideos = this.girlsVideosBack ; 
      }
    
    }
  },
  beforeCreate() {
    // http({
    //   method: "get",
    //   url: "/models_online",
    //   headers: {
    //     "x-access-token": LocalStorage.getItem("token")
    //   }
    // }).then(response => {
    //   this.girlsVideos = response.data;
    // });
    // setInterval(
    //   function() {
    //     http({
    //       method: "get",
    //       url: "/models_online",
    //       headers: {
    //         "x-access-token": LocalStorage.getItem("token")
    //       }
    //     }).then(response => {
    //       if(!(this.searchQuery)){
    //             this.girlsVideos = response.data;
    //       }
      
    //     });
    //   }.bind(this),
    //   5000
    // );
  },
  sockets:{
    online:function(models){
     this.girlsVideos = models
    }
  },
  methods: {
    goback:function(){
   this.$root.$emit("changepage", 1)
    },
      onright:function(){
     this.$router.back()
    },
      getdatediff(dte){
      let date2 = new Date(dte)
let date1 = new Date()
let diff = unit => date.getDateDiff(date1, date2, unit)
     return {month:diff('months'),day:diff('days'),hr:diff('hours'),min:diff('minutes')}
    },
   imageExists: function (i, image_url){
     this.girlsVideos[i].status = false;
    var protocol = window.location.protocol
    var url = `${protocol}//${image_url.split('//').reduce((a,q)=>a.length > q.length ? a : q )}`
    // console.log(url.split('//').reduce((a,q)=>a.length > q.length ? a : q ))
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    try {
       http.send();
       this.girlsVideos[i].screen = http.status !== 404 ? url : 'https://rec.cg.house/no-image.png';
       this.girlsVideos[i].status = http.status !== 404;
    } catch (error) {
       this.girlsVideos[i].screen = http.status !== 404 ? url : 'https://rec.cg.house/no-image.png';
       this.girlsVideos[i].status = http.status !== 404;
    }
    return {status:http.status != 404, img: url};

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
