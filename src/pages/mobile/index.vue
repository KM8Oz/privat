<template>
  <q-page class="vh100" v-if="show2">

       <q-ajax-bar
      ref="bar"
      position="top"
      color="black"
      size="4px"
      skip-hijack
    />
     <swiper class="swiper_menu" :options="swiperOptionMenu" ref="swipermenu" @slideChange="onMenuSlideChange">
    <swiper-slide class="menu"><q-silde-mobile  :searchrate="0.2" :placeholder="'модель'"/> </swiper-slide>
    <swiper-slide class="content">
    <!--  v-touch:swipe.left="onleft"-->
     <swiper

     v-show="tabVideos === 'recs' && !pcm.auth"
      class="swiper vh100 bg-black offline"
      :options="swiperOption"
      ref="mySwiper"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
     @slideChangeTransitionEnd="onSwiper"
      
     
    >
      <swiper-slide
        v-for="(girlVideo, index) in pcm.offlinevideos"
        :key="girlVideo.id[0]+index"
        class="row vh100 "
       
       
      >
        <div class="absolute-center full-width zi200 vh100">
   
    <q-player :muted="muteall" :src="videosrc(girlVideo.data[0].video)[0]"  :poster="girlVideo.data[0].video.replace('.mp4','_mobile.png')"/>
 
        </div>
        <div class="row zi200 clickevnt mobileheadctl align-center text-pink-dg">
  

          <q-item
            clickable
            v-ripple
            class="row text-pink-dg mobileheadctl2 text-subtitle1"
            :to="auth ? '/user/' + girlVideo.data[0].modelid : '/profile'"
          >
            <q-item-section avatar>
              <q-avatar size="40px" class="b-borderwhite">
                <img :src="girlVideo.data[0].avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="q-mx-auto">
              <q-item-label class="q-pa-none p-mb-md text-body2">{{
                girlVideo.data[0].tags ? girlVideo.data[0].tags[0] : "#нет_хэштегов"
              }}</q-item-label>
              <q-item-label caption lines="2" class="text-white text-overline">
                <span class="text-subtitle1 text-uppercase text-weight-light text-white text-caption"
                  >@{{ girlVideo.data[0].modelname }}</span
                >
              <span class="text-slide-left-right">{{ girlVideo.data[0].example }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side bottom class="text-white text-weight-light text-overline">
              {{
                getdatediff(girlVideo.data[0].date).month !== 0
                  ? `${getdatediff(girlVideo.data[0].date).month} months ago`
                  : getdatediff(girlVideo.data[0].date).day !== 0
                  ? `${getdatediff(girlVideo.data[0].date).day} days ago`
                  : getdatediff(girlVideo.data[0].date).hr !== 0
                  ? `${getdatediff(girlVideo.data[0].date).hr} hrs ago`
                  : `${getdatediff(girlVideo.data[0].date).min} min ago`
              }}
            </q-item-section>
          </q-item>
          <q-tabs
            v-model="tabVideos"
            dense
            class="text-white w-100 q-mx-md q-mt-md"
            align="center"
          >
            <q-tab
              name="home"
              content-class="text-black videotabs"
              label="подписки"
              :disable="!auth || nosubs"
            > <q-badge color="red" v-if="auth" floating>{{ pcm.subedvideos.length }}</q-badge></q-tab>
            <q-tab
              name="recs"
              content-class="text-black videotabs"
              :label="auth ? `рекомендации` : `бесплатные видео`"
              :disable="!auth"
            />
          </q-tabs>
            <!-- <q-avatar icon="login" color="green"/> -->
      <q-tiktoolbar :http="http" v-if="tabVideos === 'recs' && !pcm.auth" :opencomt="cl_openPostComment" :index="index" :tab="tabVideos" :liked="girlVideo.liked[0]" :pcm="pcm" :auth="pcm.auth" :videodata="girlVideo" :id="Number(pcm.user.id)" v-model="muteall"/>
        </div>

  
        
      </swiper-slide>
    </swiper>
 <swiper
 v-show="tabVideos === 'home' && pcm.auth"
      class="swiper vh100 bg-black home"
      :options="swiperOption"
      ref="mySwiper1"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
    @slideChangeTransitionEnd="onSwiper"
      
    >
      <swiper-slide
        v-for="(girlVideo, index) in pcm.subedvideos"
        :key="girlVideo.id[0]+index"
        class="row vh100 "
       
       
      >
        <div class="absolute-center full-width zi200 vh100">
   
             <q-player :muted="muteall" :src="videosrc(girlVideo.data[0].video)[0]"  :poster="girlVideo.data[0].video.replace('.mp4','_mobile.png')"/>


        </div>
        <div class="row zi200 clickevnt mobileheadctl align-center text-pink-dg">
       

          <q-item
            clickable
            v-ripple
            class="row text-pink-dg mobileheadctl2 text-subtitle1"
            :to="auth ? '/user/' + girlVideo.data[0].modelid : '/profile'"
          >
            <q-item-section avatar>
              <q-avatar size="40px" class="b-borderwhite">
                <img :src="girlVideo.data[0].avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="q-mx-auto">
              <q-item-label class="q-pa-none p-mb-md text-body2">{{
                girlVideo.data[0].tags ? girlVideo.data[0].tags[0] : "#нет_хэштегов"
              }}</q-item-label>
              <q-item-label caption lines="2" class="text-white text-overline">
                <span class="text-subtitle1 text-uppercase text-weight-light text-white text-caption"
                  >@{{ girlVideo.data[0].modelname }}</span
                >
               <span class="text-slide-left-right">{{ girlVideo.data[0].example }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side bottom class="text-white text-weight-light text-overline">
              {{
                getdatediff(girlVideo.data[0].date).month !== 0
                  ? `${getdatediff(girlVideo.data[0].date).month} months ago`
                  : getdatediff(girlVideo.data[0].date).day !== 0
                  ? `${getdatediff(girlVideo.data[0].date).day} days ago`
                  : getdatediff(girlVideo.data[0].date).hr !== 0
                  ? `${getdatediff(girlVideo.data[0].date).hr} hrs ago`
                  : `${getdatediff(girlVideo.data[0].date).min} min ago`
              }}
            </q-item-section>
          </q-item>
          <q-tabs
            v-model="tabVideos"
            dense
            class="text-white w-100 q-mx-md q-mt-md"
            align="center"
          >
            <q-tab
              name="home"
              content-class="text-black videotabs"
              label="подписки"
              :disable="!auth || nosubs"
            > <q-badge color="red" v-if="auth" floating>{{ pcm.subedvideos.length }}</q-badge></q-tab>
            <q-tab
              name="recs"
              content-class="text-black videotabs"
              :label="auth ? `рекомендации` : `бесплатные видео`"
              :disable="!auth"
            />
          </q-tabs>
            <!-- <q-avatar icon="login" color="green"/> -->
          <q-tiktoolbar :http="http" :opencomt="cl_openPostComment" :index="index" :tab="tabVideos" :liked="girlVideo.liked[0]" :pcm="pcm" :auth="pcm.auth" :videodata="girlVideo"  :id="Number(pcm.user.id)" v-model="muteall"/>
        </div>


      </swiper-slide>
    </swiper>
                                                   <!-- second swiper-->
    <swiper
       v-show="tabVideos === 'recs' && pcm.auth"
      class="swiper vh100 bg-black recs"
      :options="swiperOption"
      ref="mySwiper2"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
      @slideChangeTransitionEnd="onSwiper"
      
     
    >
      <swiper-slide
        v-for="(girlVideo, index) in pcm.unsubedvideos"
        :key="girlVideo.id[0]+index"
        class="row vh100 "
       
       
      >
        <div class="absolute-center full-width zi200 vh100">

             <q-player :muted="muteall" :src="videosrc(girlVideo.data[0].video)[0]"  :poster="girlVideo.data[0].video.replace('.mp4','_mobile.png')"/>

        </div>
        <div class="row zi200 clickevnt mobileheadctl align-left text-pink-dg">
         

          <q-item
            clickable
            v-ripple
            class="row text-pink-dg mobileheadctl2 text-subtitle1"
            :to="auth ? '/user/' + girlVideo.data[0].modelid : '/profile'"
          >
            <q-item-section avatar>
              <q-avatar size="40px" class="b-borderwhite">
                <img :src="girlVideo.data[0].avatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="q-mx-none row content-start">
              <q-item-label class="q-pa-none p-mb-md text-body2">{{
                girlVideo.data[0].tags ? girlVideo.data[0].tags[0] : "#нет_хэштегов"
              }}</q-item-label>
              <q-item-label caption lines="2" class="text-white text-overline row">
                <span class="col-6 text-subtitle1 text-uppercase text-weight-light text-white text-caption"
                  >@{{ girlVideo.data[0].modelname }}</span
                >
                <span class="col-6  text-slide-left-right">{{ girlVideo.data[0].example }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side bottom class="text-white text-weight-light text-overline">
              {{
                getdatediff(girlVideo.data[0].date).month !== 0
                  ? `${getdatediff(girlVideo.data[0].date).month} months ago`
                  : getdatediff(girlVideo.data[0].date).day !== 0
                  ? `${getdatediff(girlVideo.data[0].date).day} days ago`
                  : getdatediff(girlVideo.data[0].date).hr !== 0
                  ? `${getdatediff(girlVideo.data[0].date).hr} hrs ago`
                  : `${getdatediff(girlVideo.data[0].date).min} min ago`
              }}
            </q-item-section>
          </q-item>
          <q-tabs
            v-model="tabVideos"
            dense
            class="text-white w-100 q-mx-md q-mt-md"
            align="center"
          >
            <q-tab
              name="home"
              content-class="text-black videotabs"
              label="подписки"
              :disable="!auth || nosubs"
            > <q-badge color="red" v-if="auth" floating>{{ pcm.subedvideos.length }}</q-badge></q-tab>
            <q-tab
              name="recs"
              content-class="text-black videotabs"
              :label="auth ? `рекомендации` : `бесплатные видео`"
              :disable="!auth"
            />
          </q-tabs>
            <!-- <q-avatar icon="login" color="green"/> -->
          <q-tiktoolbar :http="http" :opencomt="cl_openPostComment" :index="index" :tab="tabVideos"  :liked="girlVideo.liked[0]" :pcm="pcm" :auth="pcm.auth" :videodata="girlVideo" :id="Number(pcm.user.id)" v-model="muteall" />
        </div>

        
      </swiper-slide>
    </swiper>
    <!-- </transition> -->
    <!-- v-model="dialogcomments"  -->
        </swiper-slide>
          <swiper-slide class="content">
            <profile />
          </swiper-slide>
            <swiper-slide class="content" v-if="pcm.auth && pcm.user.rol">
            <v-capture />
          </swiper-slide>
           <swiper-slide class="content" v-if="pcm.auth">
            <v-live />
          </swiper-slide>
            <swiper-slide class="content" v-if="pcm.auth && pcm.user.rol">
            <v-streaming-page />
          </swiper-slide>
  </swiper>
        <transition
        appear
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutDown"
       
      >
        <q-footer
          reveal
          elevated
          class="text-transparent ddd fixed-bottom"
          bordered
        >
          <q-tabs
             content-class="overflow-inherit"
            class="text-black bg-white row"
            no-caps
            indicator-color="transparent"
            narrow-indicator
            align="center"
          >
            <q-tab
              @click="$root.$emit('changepage',4)"
             :ripple="false"
              class="col q-pa-none"
              v-ripple.center
              icon="videocam"
              
            >
          
            </q-tab>
            <!-- <q-route-tab
            to="/categories"
            v-if="!ismodel"
            class="col-3 iconfooter q-pa-none head"
            dense
            icon="search"
          >
            <p class="q-ma-none text-comment-20M">Входящие</p>
          </q-route-tab>  <p class="q-ma-none text-comment-20M">Лента</p>   <p class="q-ma-none text-comment-20M">Запись</p> <p class="q-ma-none text-comment-20M">Начать стрим</p> <p class="q-ma-none text-comment-20M">Трансляции</p> <p class="q-ma-none text-comment-20M">Я</p> -->
 <q-tab  :ripple="false" v-if="pcm.user.rol">
<q-fab
              icon="add"
              direction="up"
              color="dark"
              vertical-actions-align="center"
            class="fabsFooter"
            
            >
              <q-fab-action @click="$root.$emit('changepage',5)" anchor="start" label-class="oswald-semibold"  label-position="top" text-color="dark"  icon="live_tv" label="эфире" />
              <q-fab-action @click="$root.$emit('changepage',3)" anchor="start" label-class="oswald-semibold"  label-position="top" text-color="dark"   icon="radio_button_checked" label="запись"/>
            </q-fab>
           </q-tab>
            <q-tab
            v-else
              @click="$root.$emit('changepage',1)"
             :ripple="false"
              class="col q-pa-none"
              v-ripple.center
              icon="home"
              
            >
          
            </q-tab>
            <q-tab
            :ripple="false"
              @click="$root.$emit('changepage',2)"
              class="col q-pa-none"
              v-ripple.center
              icon="account_circle"
            >
            </q-tab>
          </q-tabs>
        </q-footer>
      </transition>
        <!-- <q-menu
        touch-position
        context-menu
      >

        <q-list dense style="min-width: 100px" class="q-pa-none transparent">
          <q-item class="transparent" clickable v-ripple @click="fullscreen">
            <q-item-section avatar top>
            <q-avatar :icon="pcm.controls.fullscreen ? 'fullscreen_exit':'fullscreen_exit' " />
            </q-item-section>
            <q-item-section side class="q-pa-none ellipsis" >
            {{pcm.controls.fullscreen ? 'fullscreen on 1s':'fullscreen off 1s'}}
            </q-item-section>
          </q-item>
          </q-list>
          </q-menu> -->

  </q-page>
</template>

<script>
import http from "../../http-common";
import { Platform, date } from "quasar";
import { mapState } from 'vuex';
import { askForPermissioToReceiveNotifications } from "../../firebase";
import Profile from "./profile.vue";
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
import VideoCapture from './VideoCapture.vue';
import StreamPage from "./newstream";
import Live from "./tran";
export default {
  name:'mainMobile',
  props: ["videostag"],
   components: {
      Swiper,
      SwiperSlide,
    profile: Profile,
      "v-capture":VideoCapture,
      "v-live":Live,
      "v-streaming-page":StreamPage
    },
  data() {
    return {
      loadit: false,
      mutedvar: false,
      commamount: 0,
      menuOpenedreset:true,


      slides:[],

      videoid: null,
      sub: "sub",
      nosubs: false,
      auth: false,
      swiperindex:{off:0,recs:0,home:0},
      tabVideos: "recs",
      models: null,
      footer: true,
      girlsVideos: null,
      likes: false,
      modelonline: false,
      one: true,
      holdtouch:true,
      valdes: [],
      show2:true,
      muteall: false,
      commamount: null,
      loaderstat:false,
      textcoms: null,
      commentsDialog: false,
      videosdata: null,
      openswiper: true,
      double: [],
      mutedid: [],
       menuOpened: false,
        swiperOptionMenu: {
          initialSlide: 1,
          resistanceRatio: 0,
  
           lazy:true,
        zoom: {
          enabled: false,
          maxRatio: 1,
          minRatio: 1,
          toggle: false,
        },
        allowSlideNext:true,
        allowSlidePrev:true,
        slidesPerGroupSkip:0,
         observer: true,
        snapOnRelease: false,
          slidesPerView: 'auto',

        },
      animation:'fade',
      modelsubstatus: [],
      savedtimer: [],
      slides0:[],
      slides1:[],
      show:true,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
      swiperOption: {
       on: {
         init:async function (){
          // console.log( this.slides);
        //    let video = await this.slides[0]?.children[0].children[0].firstChild
        //    if(video?.paused){
        // video.onloadedmetadata = function(){
        //   //console.log('ok');
        //             video?.play();
        //    }
        //    } else {
        //       video?.play();
        //    }
    
         },
         slideChange:async function(){
                  let video = this.slides[this.previousIndex]?.children[0].children[0].firstChild
           video?.pause();
          
           
      video = this.slides[this.activeIndex]?.children[0].children[0].firstChild
    if(!video.playing){
        video?.play();
    } else {
      // video.onloadedmetadata = function(){
      //     //console.log('ok');
      //               video?.play();
      //     }
       
    }
         }

    },
        lazy:false,
        zoom: {
          enabled: false,
          maxRatio: 1,
          minRatio: 1,
          toggle: false,
        },
        updateOnWindowResize: true,
        direction: "vertical",
        slidesPerView: 1,

        setWrapperSize: true,
        centeredSlides: true,
        spaceBetween: 0,
        autoHeight: true,
        observer: true,
        snapOnRelease: true,
         mousewheel: {
          sensitivity: 100,
          releaseOnEdges: false,
        },
        refrech:false,
      },
    };
  },
  computed: {
    http:()=>http,
    swipermenu() {
        return this.$refs.swipermenu?.$swiper
      },
    swiper() {
      return this.$refs.mySwiper?.$swiper;
    },
    swiper1() {
      return this.$refs.mySwiper1?.$swiper;
    },
    swiper2() {
      return this.$refs.mySwiper2?.$swiper;
    },
    ...mapState(["pcm"]),
  
  },
  updated(){
    // if(this.swiper?.on()){
    //    this.slidechangeControls()
    // }
    
   Array.prototype.slice.call(document.getElementsByTagName("video")).map(v=>{
      v.addEventListener('click',event=> v.paused ? (v.play(), this.loaderstat = false) : (v.pause(), this.loaderstat = true));
    })
  },
  watch: {

    show:function(val){
     if(!val){ this.$refs.bar.start(), this.$nextTick(()=>{
       this.$refs.bar.stop()
     }) }
    },
    tabVideos: function (val) {
      // val === 'home' ? 'slide-right':'slide-left'
Array.prototype.slice.call(document.getElementsByTagName("video")).map(v=>{
  v?.paused ||  v?.pause()
})
      if (val === "home") {
       // console.log(this.swiper?.activeIndex);
      //  let video =  this.swiper1.$el[0].children[0].children[this.swiperindex.home]?.children[0].children[0].firstChild
      // video?.play()
        if (this.pcm.subedvideos.length > 0) {
          //this.swiper?.virtual.removeSlide()
          //this.$store.dispatch("pcm/updateSlides", { status: "subed" });
        

          this.$nextTick(() => {
            this.reRender();
          });
        } else {
          // this.tabVideos = "recs";
      //     let video =  this.swiper.$el[0].children[0].children[this.swiperindex.recs]?.children[0].children[0].firstChild
      // video?.play()
          this.$nextTick(() => {
            //this.$store.dispatch("pcm/updateSlides", { status: "unsubed" });
            this.norecs();
            this.nosubs = true;
          this.reRender();

          });
        }
      } else if (val === "recs") {
      //   let video =  this.swiper2.$el[0].children[0].children[this.swiperindex.recs]?.children[0].children[0].firstChild
      // video?.play()
        // this.videosdata = this.pcm.unsubedvideos;
       // this.$store.dispatch("pcm/updateSlides", { status: "unsubed" });
         this.$nextTick(() => {
            this.reRender();
          });
      }
    },
  },
  mounted() {
    //console.log(this.slides);
    // if(this.slides === []){
    //   ///location.reload()
    //   this.$forceUpdate()
    // }
     this.$root.$on('page', (index)=>{
console.log('page:',index);
     })
    this.$root.$on("changepage", (number) => {
      // console.log(status);
      Array.prototype.slice.call(document.getElementsByTagName("video")).map(v=>{
        v.pause()
      })
      this.swipermenu?.slideTo(number,500,false)
    });
    this.reRender2();
     this.$root.$on("tagsRefreshEvent", (status) => {
      // console.log(status);
      this.reRender();
    });
    setTimeout(()=>{
  // console.log(this.refrech);
      if(this.refrech){
        location.reload()
        //this.refrech = false
      }
         Array.prototype.slice.call(document.getElementsByTagName("video")).map(v=>{
      v.addEventListener('click',event=> v.paused ? (v.play(), this.loaderstat = false) : (v.pause(), this.loaderstat = true));
    })
    },1000)
 
    // this.$forceUpdate()
    // video auto play after sliding
  },
  created(){ 
       
     this.beforeShow(this.pcm.subedvideos,
          this.pcm.unsubedvideos,
           this.pcm.offlinevideos
          ).then((data)=>{
    // this.videoloadet = true;
        //console.log(data);
      //  this.videosdata = data
     // console.log(data);
        this.$store.dispatch('pcm/updateSlides',{status:data})

         this.slides0 = this.pcm.subedvideos
         this.slides1 = this.pcm.unsubedvideos ;
         if(!this.pcm.auth){
           this.slides1 = this.pcm.offlinevideos 
         }
         this.auth = this.pcm.auth;
        //console.log(this.slides.length === 0);
          // if(this.pcm.slides.length === 0){
          //  // location.reload()
          //  this.refrech = true
          // }
         // console.log(this.pcm.slides.length === 0);
       // this.swiper?.virtual.renderSlide()
       // this.refreshSwiper()
      
       })
  },
  beforeMount(){
     //   console.log('beforemount');
      //  this.auth = this.pcm.auth;
       
   
  },
   cl_openPostComment(id, amount, index) {
            if (!this.auth) {
                this.$root.$emit('changepage',2)
            } else {
                let video = document.getElementById(id);

                this.$nextTick(() => {
                    video?.pause()
                    this.commamount = amount;
                    this.videoid = id;
                    this.$socket.emit("s_getcomments", {
                        token: this.pcm.user.tk,
                        videoid: id,
                    });
                })
            }
        },
  beforeDestroy() {
    this.$router.beforeEach((to, from, next) => {
      let video = document.getElementById(
        this.pcm.slides[this.swiper?.activeIndex]?.id[0]
      );
      video?.pause();
      next();
    });
  },

  sockets: {
    cl_getAllMassage: function(response) {
      //console.log(response);
        if(response.id){
            if (response.status == "try to signin") {
                this.swipermenu?.slideTo(2,700,false);
            }else {
 this.$root.$emit('videocomments',{id:response.id,res:response.comments})
            }
          
            //жаль в js не работают хаки из c++
         
        }


        },
 
         cl_likeStatus: function (response) {
      if (response.status == "try to signin") {
        this.$router.push("profile");
      } else {
      this.$store.dispatch('pcm/liking',{...response,tab:this.tabVideos})
      }
    },
  
    authStatus:function(){
     this.reRender()
    }
  },
  methods: {
    onMenuSlideChange:function(){
      this.footer = this.swipermenu?.activeIndex === 2 ? false : true
    },
    menuOpenedReset:function(){
      this.menuOpenedreset = false
      this.$nextTick(()=>{
        this.menuOpenedreset = true
      })
    },
     toggleMenu(event) {
     // console.log(this);
        if(this.menuOpened){
           this.menuOpened = false
            this.swipermenu.slideNext(700,false)
            this.$nextTick(()=>{
              this.menuOpenedReset()
            })
          
        } else {
          this.menuOpened = true
           this.swipermenu.slidePrev(700,false)
            this.$nextTick(()=>{
              this.menuOpenedReset()
            })
        }
         
      },
     onSwiper() {
              Array.prototype.slice.call(document.getElementsByClassName('playpause')).map(v=>{
                v.style.display = 'none'
              })


      },
    setIndex(i){
      if(this.tabVideos === 'recs'){
this.swiperindex.off = i
this.swiperindex.recs = i
      } else {
this.swiperindex.home = i
      }
    },
     videosrc:function(val){
        return  [val.replace(".mp4","_mobile.mp4")]
    },
    fullscreen:function(){
     this.$root.$emit('fullscreen',{state:!this.pcm.controls.fullscreen})
    },
    clickedvideo(){
 console.log('ok');
    },
    slidechangeControls(){
     this.swiper?.on("slideChange", () => {
                 // console.log('changed');
      let video = document.getElementById(
        this.pcm.slides[this.swiper?.previousIndex]?.id[0]
      );
      video?.pause();
      this.$nextTick(() => {
        let video = document.getElementById(
        this.pcm.slides[this.swiper?.activeIndex]?.id[0]
      );
       this.$nextTick(() => {
          if(video?.paused){
                 video?.play();
        }
       })
      });
    });
    },
    beforeShow:async function (subed,unsubed,offline) {
      if(this.pcm.auth){     
       if (this.tabVideos === "home") {
     if(subed.length > 0){
 return 'subed'
     } else {
      this.tabVideos === "recs"
      return 'unsubed'
     }
      } else {
       return 'unsubed'//response.sort((a, b) => b.data[0].like - a.data[0].like);
      }
      }else {
        return 'offline'//response.sort((a, b) => b.data[0].like - a.data[0].like);
      }
     
    },
    norecs: function () {
      this.$q.notify({
        color: "pink-6",
        message: "0 подписчики",
        position: "center",
      });
    },
    progressof() {
      this.openswiper = false;
    },
  reRender: function () {
      this.show = false;
      this.$nextTick(() => {
        //re-render start
        this.show = true;
        this.swiper?.destroy();
        this.$nextTick(() => {
          //re-render end
          this.swiper?.update();
        });
      });
    },
     reRender2: function () {
       setTimeout(()=>{
   this.show2 = false;
      this.$nextTick(() => {
        //re-render start
        this.show2 = true;
        this.swiper?.destroy();
        this.$nextTick(() => {
          //re-render end
          this.swiper?.update();
        });
      });
       },1000)
       Array.prototype.slice.call(document.getElementsByTagName("video")).map(v=>{
      v.addEventListener('click',event=> v.paused ? (v.play(), this.loaderstat = false) : (v.pause(), this.loaderstat = true));
    })
    },
    getdatediff(dte) {
      let date2 = new Date(dte);
      let date1 = new Date();
      let diff = (unit) => date.getDateDiff(date1, date2, unit);
      return {
        month: diff("months"),
        day: diff("days"),
        hr: diff("hours"),
        min: diff("minutes"),
      };
    },
    onleft: function () {
      this.$router.push("/profile");
    },
    delay: (t, data) => {
      return new Promise((resolve) => {
        setTimeout(resolve.bind(null, data), t);
      });
    },
    getplyrconfig(index) {
      return (
        '{ "controls": ["play-large"], "playsinline": true, "autoplay": ' +
        (index == 0) +
        " }"
      );
    },
  
    
  

  

    cl_openPostComment(id, amount, index) {
      if (!this.auth) {
        this.$root.$emit('changepage',1)
      } else {
        let video = document.getElementById(id);

      this.$nextTick(()=>{
        video?.pause()
    this.commamount = amount;
      this.videoid = id;
      this.$socket.emit("s_getcomments", {
        token: this.pcm.user.tk,
        videoid: id,
      });
      })
      }
    },
 
 
 
   
  },
};
</script>

<style lang="scss" scoped>


 .swiper_menu {
    .menu {
      min-width: 100px;
      width: 70%;
      max-width: 320px;
     background-color: #ffffff!important;
      color: rgb(192, 9, 94);
    }

    .content {
      width: 100%;
    }

    .menu-button {
      position: absolute;
         top: 48px;
    left: 0px;
    padding: 9px;
      cursor: pointer;
      transition: .3s;
     // background-color: #2C8DFB;
      z-index:2;
      .bars {
            position: relative;
    display: block;
    width: 27px;
    height: 2px;
    margin: 11px auto;
    background-color: #fff;
    border-radius: 10px;
    transition: 0.3s;
    z-index: 2;

        &:nth-of-type(1) {
          margin-top: 0px;
        }
        &:nth-of-type(3) {
          margin-bottom: 0px;
        }
      }

      &:hover {
        .bars:nth-of-type(1) {
          transform: translateY(1.5px) rotate(-4.5deg);
        }
        .bars:nth-of-type(2) {
          opacity: .9;
        }
        .bars:nth-of-type(3) {
          transform: translateY(-1.5px) rotate(4.5deg);
        }
      }

      &.opened {
        .bars:nth-of-type(1) {
          transform: translateY(15px) rotate(-45deg);
        }
        .bars:nth-of-type(2) {
          opacity: 0;
        }
        .bars:nth-of-type(3) {
          transform: translateY(-15px) rotate(45deg);
        }

        &:hover {
          .bars:nth-of-type(1) {
            transform: translateY(13.5px) rotate(-40.5deg);
          }
          .bars:nth-of-type(2) {
            opacity: .1;
          }
          .bars:nth-of-type(3) {
            transform: translateY(-13.5px) rotate(40.5deg);
          }
        }
      }
    }
  }
.vh100 {
  height: 100vh !important;
  height: calc(var(--vh, 1vh) * 100) !important;
  max-height: 100% !important;
  width: 100% !important;
  object-fit: cover !important;
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

.zi200 {
  z-index: 200;
}

.mt20 {
  margin-top: -40px;
}

.comdial {
  max-height: 60vh;
}

.clbtn {
  display: block;
  float: right;
  margin-top: 0%;
}

.pb50 {
  padding-bottom: 15vh;
}

.shadow {
  -webkit-filter: drop-shadow(0px 0px 1px black);
  filter: drop-shadow(0px 0px 1px black);
}
</style>
