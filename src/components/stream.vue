<template>
  <div class="q-pa-md relative-position" style="height: 100px;
    max-height: 2vh;">
     <!-- <q-item clickable v-ripple    v-morph:btn:mygroup:300.resize="morphGroupModel"   @click="nextMorph">
        <q-item-section avatar>
          <q-avatar size="50px">
            <img :src="img">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{name || 'name'}}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">@{{name || 'name'}}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          {{
           getdatediff(time).month !== 0 ? `${getdatediff(time).month} months ago`:
           getdatediff(time).day !== 0 ? `${getdatediff(time).day} days ago`:
           getdatediff(time).hr !== 0 ? `${getdatediff(time).hr} hrs ago`:
           `${getdatediff(time).min} min ago`}} 
        </q-item-section>
      </q-item> -->
    <q-card class="my-card"  >
 
             <q-card-section horizontal>
     
             <q-img :src="img"  class="col"  v-if="alive" alt="nonoe">
              <div class="absolute-bottom time2 text-weight-light text-overline">@{{name}} </div>
            <div class="time text-overline">{{
           getdatediff(time).month !== 0 ? `${getdatediff(time).month} months ago`:
           getdatediff(time).day !== 0 ? `${getdatediff(time).day} days ago`:
           getdatediff(time).hr !== 0 ? `${getdatediff(time).hr} hrs ago`:
           `${getdatediff(time).min} min ago`}} </div>
            </q-img>
        <q-card-actions vertical :class="pcm.controls.dark ? 'justify-around bg-dark': 'justify-around' ">
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="green" icon="video_library" :to="link" />
          <q-btn flat round color="primary" icon="share" @click="dialog = true" />
        </q-card-actions>
      </q-card-section>
          </q-card>
              <q-dialog v-model="dialog" position="right" >
     <q-list bordered separator>

      <q-slide-item :class="pcm.controls.dark ? 'bg-dark':''" @left="onLeft">
        <template v-slot:left>
          <q-icon name="done" />
        </template>

        <q-item>
          <q-item-section avatar>
              <q-Vkontakte :page_url="shared" has_icon title_social="Вконтакте" />
      <q-Odnoklassniki
      :page_url="shared"
        has_icon
        title_social="Одноклассники"
      />
      <q-Facebook 
      :page_url="shared" has_icon  title_social="Фейсбук" />
      <q-Moimir :page_url="shared" has_icon  title_social="Мой Мир" />
      <q-Twitter :page_url="shared" has_icon title_social="Твиттер" />
      <q-LiveJournal :page_url="shared" has_icon title_social="Живой Журнал" />
      <q-Email :page_url="shared" has_icon title_social="Электронная почта" />
          </q-item-section>
        </q-item>
      </q-slide-item>
      
     </q-list>
    </q-dialog>
  </div>
</template>
<script>
import {
    date
} from "quasar"
import { mapState } from "vuex"
// import checkLinks from "check-links";
const nextMorphStep = {
  btn: 'card1',
  card2: 'btn'
}
export default {
    props:{
        img:String,
        name: String,
        time: String,
        link: String
    },
    data:()=>({
       morphGroupModel: 'btn',
       dialog:false,
       alive:true,
       intrv:null,
    }),
    computed:{
        ...mapState(['pcm']),
        shared:function(){
          return location.protocol+'//'+location.host+this.link
        }
    },
    created:function(){

    },
    beforeDestroy() {
      clearInterval(this.intrv)
    },
    mounted:function(){
      this.checkImg(this.img);
      let vm = this;
     // this.$root.on(`${this.img}`, ()=>vm.refreshImg())
     this.$root.$emit("refreshscreens", (res)=>{
      if(res.status){
          this.refreshImg()
      }
     })
    },
    methods:{
    checkImg(img){
      
       this.intrv = setInterval(()=>{
        this.UrlExists(img).then((state)=>{
          if(state){ 
            this.refreshImg()
            clearInterval(this.intrv)
            }
       //console.log(state);
        })
// if(results2.status == 'alive'){
//   this.alive = false
//   this.alive = true
//   clearInterval(intrv)
// }  
    }, 2000)
      },
      UrlExists:function(url)
{
  return new Promise((resolve, reject)=>{
 var http = new XMLHttpRequest();
 http.open('GET', url,true);
 //http.setRequestHeader("Access-Control-Allow-Origin", "https://cg.house")
    http.send();
 //http.responseType = "arraybuffer";
    http.onreadystatechange = function(){
      this.readyState == this.HEADERS_RECEIVED ? resolve(http.status === 200) :resolve(false);
    }
    
  })
},
      onLeft:function(){
       
      } ,
      refreshImg:function(){
 this.alive = false;
            this.$nextTick(()=>{
              this.alive =true
            })
      },
              nextMorph () {
      this.morphGroupModel = nextMorphStep[this.morphGroupModel]
    },
       getdatediff(dte){
      let date2 = new Date(dte)
let date1 = new Date()
let diff = unit => date.getDateDiff(date1, date2, unit)
     return {month:diff('months'),day:diff('days'),hr:diff('hours'),min:diff('minutes')}
    },
    }
}
</script>
<style>
    
</style>