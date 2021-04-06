<template>
  <div :class="`${pcm.controls.dark ? 'bg-dark' : 'bg-white'} row justify-center home_wrapper`">
    <div
      :class="width > 1200 ? 'col-lg-2 col-md-2 col-xs-3 mt-vh-4 bar-left' : 'col-lg-2 col-md-2 col-xs-2 mt-vh-2 bar-left'"
    >
      <q-followings v-model="tabVideos" :index="lastindex" @change="reRender2()" />
    </div>
    <div class="col-lg-5 col-md-5 col-xs-5">
      <swiper
        class="swiper h-vh-100 mousewheel"
        :options="swiperOption"
        ref="mySwiper"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
        v-if="show"
        @slideChange="onSwiper(swiper)"
      >
      <!-- ignore no-unused-vars -->
        <swiper-slide
          v-for="(girlVideo, index) in pcm.slides"
          v-bind:key="girlVideo.id[0]"
        >
         <div class="full-width full-height row justify-around"> 
          <div class="col-lg-9 col-md-10 col-xs-10 flex justify-end">
   <div class="row  flex flex-fix slider_min_wrapper">
      <q-avatar class="q-mb-none mr-vw-05" size="50px">
                <img class="bordavatar" :src="girlVideo.data[0].avatar.replace('.camsguns.com','.cg.house')" />
                <q-badge floating color="green" v-if="girlVideo.data[0].islive">live</q-badge>
              </q-avatar>
              <div class="text-black slider_min_username">
                             <p>
                  {{ girlVideo.data[0].modelname }}
                </p>
                 <kbd>
                  @{{ girlVideo.data[0].modelname }}
                </kbd>
              </div>
  
            <q-item
              clickable
              class="row q-mr-none cuttext q-mb-none q-pb-none q-itmv2"
              :to="'/user/' + girlVideo.data[0].modelid"
            >
              <div class="row q-ma-none h-100 ">
               
              </div>
            </q-item>
           <div class="slide_min_hashtags">
              <p
              :class="`${
                pcm.controls.dark ? 'text-white' : 'text-black'
              }`"
            >
              {{ girlVideo.data[0].tags ? girlVideo.data[0].tags[0] : "#нет_хэштегов" }}
            </p>
           </div>
            <div class="video_wrapper">
             <vue-plyr ref="Myplyr" class="bigbtnplyr mute-right" :emit="['loadeddata']"> 
                <LazyVideo
                 @click="clickevent"
                loadOffset="1%"
                  data-plyr-config='{ "controls": ["play-large","mute"]}'
                  :data-poster="girlVideo.data[0].video.replace('camsguns.com', 'cg.house').replace('.mp4','_mobile.png')"
                  :sources="videosrc(girlVideo.data[0].video)"
                  :attrs="{
                    wmode: 'opaque',
                    type: 'video/mp4',
                    class: 'video-main bigbtnplyr mute-right',
                    id: girlVideo.id[0],
                    playsinline: false,
                    loop: true,
                    controls: false,
                    metadata: true,
                    muted: pcm.controls.mute,
                    ref: 'videoRef',
                  }"
                ></LazyVideo>
              </vue-plyr> 
            </div>
          </div>
          </div>
          <div class="col-lg-3 col-md-2 col-xs-2">
               <div
                class="full-height fit column content-center justify-center align-start"
              >
                  <q-btn
                     flat
                     :ripple="false" 
                    :color="girlVideo.liked[0]? 'red': pcm.controls.dark ? 'white' : 'dark' "
                    class="col-3 q-mx-auto q-pa-none "
                    @click="cl_like(girlVideo.id[0], index)"

                    :icon=" girlVideo.liked[0]? 'favorite': 'favorite_border'"
                    :label="girlVideo.data[0].like"
                />
                  <q-btn
                    flat
                    :ripple="false" 
                    :color="!!(1430 >= width >= 1100 | pcm.controls.dark) ? 'white' : 'dark'"
                    class="col-3 q-mx-auto q-pa-none "
                    @click="  cl_openPostComment(
                        girlVideo.id[0],
                        girlVideo.data[0].comm,
                        girlVideo,
                        index
                      )"
                    :icon="'insert_comment'"
                    :label="girlVideo.data[0].comm"
                />
                <q-btn
                    flat
                    :ripple="false" 
                    :color="!!(1430 >= width >= 1200 | pcm.controls.dark) ? 'white' : 'dark'"
                    class="col-3 q-mx-auto q-pa-none "
                    @click="        girlVideo.data[0].islive
                        ? routeToModel(girlVideo.data[0].modelid)
                        : (checklive = true)"
                    :icon="'tv'"
                    :label="'   '"
                />
              </div>
          </div>
         </div>
       
        </swiper-slide>
      </swiper>
    </div>
   <div class="col-md-3">
     <q-listrec  :tag="tagsearch" />
   </div> 
    <q-dialog v-model="checklive" content-style="dialog">
      <q-card class="text-white fit flex flex-center card-bg">
        <div class="justify-center row">
          <div class="col-12 justify-center row">
            <q-avatar class="bordavatar bordavatar" icon="notifications_none"></q-avatar>
          </div>
          <p class="q-px-xl q-mt-md q-mx-lg col-12 row justify-center text-fxl">
            Модель не онлайн.
          </p>
          <q-btn
            class="text-weight-bold col-7 q-mt-lg bg-pink-7 opacity-3"
            @click="checklive = false"
            >ОК</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog
      transition-show="jump-up"
      full-height
      @hide="cl_closePostComment(commid)"
      v-model="commentsDialog"
      v-if="open_post_data"
      class="q-pa-none"
      position="bottom"
    >
      <q-card :class="pcm.controls.dark ? 'text-white bg-dark q-pa-none q-ma-none vw-30':'text-black q-pa-none q-ma-none vw-30'">
        <q-card-section class="q-pa-none mx-vw-1">
          <div class="row justify-center mt-vh-3">
            <div class="row self-center ">
              <q-avatar size="5.16vh">
                <img class="bordavatar" :src="open_post_data.data[0].avatar.replace('.camsguns.com','.cg.house')" />
              </q-avatar>
              <div class="row q-mx-md">
                <p class="text-black col-12 q-mb-none text-xl text-nowrap oswald-semibold">
                  {{ open_post_data.data[0].modelname }}
                  <q-badge
                    class="q-ml-sm text-black-50 q-mb-none"
                    align="middle"
                    v-if="open_post_data.data[0].islive"
                  >
                    <span class="dot q-mr-xs"></span> live
                  </q-badge>
                </p>
                <p
                  class="text-grey-8 col-12 cuttext text-nowrap text-md q-mb-none h-vh-3"
                >
                  @{{ open_post_data.data[0].modelname }}
                </p>
              </div>
            </div>
            <p>
              <q-btn
                flat
                @click="cl_closePostComment(commid)"
                icon="close"
                class="clbtn"
              />
            </p>
          </div>
          <div class="row text-max2-14 justify-center">
            <p class="text-subtitle1 text-wigth-regular q-ml-xs swald-regular">
              {{ open_post_data.data[0].example }}
            </p>
          </div>
          <div v-if="open_post_data.data[0].tags">
            <q-btn
              v-for="(tag, index) in tags"
              :key="index"
              class="text-body1 text-lowercase text-weight-light q-my-xs q-mx-xs q-py-none text-pink h-20"
              flat
              :label="tag"
              rounded
            />
          </div>

          <div class="row q-mx-auto flex-center justify-center">
                     <q-btn
                      :ripple="false" 
                     flat
                    :color="!!(1430 >= width >= 1200 | pcm.controls.dark) ? 'white' : 'dark' "
                    class="col-3 q-mx-auto q-pa-none "
                    @click="cl_like(open_post_data.id[0], indexpostopen)"
                    :icon=" open_post_data.liked[0]? 'favorite': 'favorite_border'"
                    :label="open_post_data.data[0].like"
                />
                  <q-btn
                   :ripple="false" 
                   disabled
                    flat
                    :color="!!(1430 >= width >= 1100 | pcm.controls.dark) ? 'white' : 'dark'"
                    class="col-3 q-mx-auto q-pa-none "
                    @click="  cl_openPostComment(
                        open_post_data.id[0],
                        open_post_data.data[0].comm,
                        open_post_data,
                        indexpostopen
                      )"
                    :icon="'insert_comment'"
                    :label="open_post_data.data[0].comm"
                />
                <q-btn
                 :ripple="false" 
                    flat
                    :color="!!(1430 >= width >= 1200 | pcm.controls.dark) ? 'white' : 'dark'"
                    class="col-3 q-mx-auto q-pa-none cursor-none"
                    @click="        open_post_data.data[0].islive
                        ? routeToModel(open_post_data.data[0].modelid)
                        : (checklive = true)"
                    :icon="'tv'"
                />
          </div>
        </q-card-section>
        <q-scroll-area
          ref="commentsscroll"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          :class="pcm.controls.dark ?  'comdial ml-vw-1 q-pa-none h-vh-70': 'comdial ml-vw-1 q-pa-none h-vh-70'"
        >
          <div v-for="(textcom, index) in textcoms" :key="index" class="row">
            <q-avatar size="5.16vh">
              <img class="bordavatar" :src="textcom.avatar.replace('.camsguns.com','.cg.house')" />
            </q-avatar>
            <div class="ml-1 col">
              <p
                :class="
                  textcom.ismodel
                    ? 'text-pink-6 text-body1 col-10 text-weight-bold swald-regular q-mb-none'
                    : 'text-body1 col-10 text-weight-bold q-mb-none oswald-regular'
                "
              >
                {{ textcom.username }}
              </p>
              <p class="text-md text-body1 q-mb-none">{{ textcom.comments }}</p>
              <div class="row justify-between mr-vw-1">
                <div class="row"></div>
                <p class="text-comment-14 text-grey-8 q-mb-none">
                  {{ returnComent(textcom.date) }}
                </p>
              </div>
            </div>
          </div>
        </q-scroll-area>
                <div :class="pcm.controls.dark ? ' bg-dark  row   w-vw-chat white' : 'dark bg-white fit row  q-mx-md  w-vw-chat'">
    
                <q-input
            v-on:keyup.enter="cl_createcomment()"
            v-model="commm_send"
            placeholder="Ваше сообщение"
            borderless
            :color="pcm.controls.dark ? 'dark' : 'white'"
            :input-class="`text-body1 backy-cmt oswald-regular ${
              pcm.controls.dark ? 'text-white' : 'text-dark'
            }  q-my-md q-pl-md q-ml-none`"
            class="col-11 backy-cmt2 q-my-xs q-ml-xs"
          >
          <template v-slot:append>
            <q-btn
            color="green"
            class="btnsend q-my-auto q-py-auto q-ml-xs text-center "
            align="center"
            icon="mdi-send"
            outline
            rounded
            text-color="green"
            @click="cl_createcomment()"
          />
          </template>
          </q-input>
          </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import http from "../../http-common";

import { mapState } from "vuex";

  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

export default {
  components: {
      Swiper,
      SwiperSlide
      
    },



    
  data() {
    return {
      tagsearch: null,
      width: window.innerWidth,
      height: window.innerHeight,
      btnColor: "black",
      btnIcon: "favorite_border",
      videoid: null,
      // videotabs:"recs",
      openswiper: false,
      commamount: null,
      commid: null,
      muted: false,
      lastindex: 0,
      show: true,
      textcoms: [],
      commentsDialog: false,
      commm_send: null,
      open_post_data: null,
      recModels: 5,
      sub: "sub",
      routertag: null,
      checklive: false,
      models: null,

      girlsVideos: null,
      videoloadet: [],
      tabVideos: "recs",
      models_video: null,
      drawer: true,
      one: true,
      token: null,
      username: null,
      userid: null,
      name: null,
      auth: this._G.auth,
      indexpostopen: null,
      swiperOption: {
        on: {
          init: async function () {
           // console.log(this.slides[this.activeIndex].children[0].children[0].children[0].children[4].children[0].children[0].children[1].children[0]);
            let video = await this.slides[this.activeIndex].children[0].children[0].children[0].children[4].children[0].children[0].children[1].children[0];
            if (video?.paused) {
              video.onloadedmetadata = function () {
                //console.log('ok');
                video?.play();
              };
            } else {
              video?.play();
            }
          },
          slideChange: async function () {

            let video = await this.slides[this.activeIndex].children[0].children[0].children[0].children[4].children[0].children[0].children[1].children[0];
            video?.pause();

            // video = await this.slides[this?.activeIndex]['__vue__']?.$el.children[0].children[2]
            //   .children[0].children[0].children[1].firstChild;
            if (!video.paused) {
              this.on("transition-end", () => {
                //  setTimeout(()=>{

                //  },3000)
                video.onloadstart = function () {
                  //console.log('ok');
                  video?.play();
                };
              });
            } else {
              video?.play();
            }
            //        let video = await this.slides[this.previousIndex]?.children[0].children[0].children[0].children[1].firstChild
            //        video?.pause();

            //   video = await this.slides[this?.activeIndex]?.children[0].children[0].children[0].children[1].firstChild
            // if(video){
            //     video.onloadedmetadata = function(){
            //       //console.log('ok');
            //                 video?.play();
            //       }
            // }

            // video.onloadstart = function(){

            // }
          },
        },
        hashNavigation: true,
        direction: "vertical",
        slidesPerView: 1,
        speed: 200,
        lazy: true,
        zoom: {
          enabled: false,
          maxRatio: 1,
          minRatio: 1,
          toggle: false,
        },
        updateOnWindowResize: true,
        setWrapperSize: false,
        autoHeight: true,
        // watchSlidesProgress: true,
        // watchSlidesVisibility: true,
        snapOnRelease: true,
        //containerModifierClass:'slidesWrapper',
       // slidesPerColumnFill:'column',
        slidesPerColumn:1,
        centeredSlides: true,
        //slidesPerColumnFill:'column',
        //cssMode:true,
        init:true,
        // a11y:{
        // enabled:true,
        // },
        centerInsufficientSlides:true,
        normalizeSlideIndex:true,
        shortSwipes:true,
        slidesPerGroup:1,
        mousewheel: {
          sensitivity: 1,
          releaseOnEdges: true,
        },
        keyboard: {
          enabled: true,
        },
      },
      model_num: 0,
      model_max: null,
      allmod: null,
      modelall_video: 0,
      modelidlink: null,
      subscribList: null,
      subscribListL: false,
      videoid: null,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
    };
  },
  watch: {
    tabVideos: function (val) {
      // val === 'home' ? 'slide-right':'slide-left'
      if (val === "home") {
        if (this.pcm.subedvideos.length > 0) {
          //  this.swiper?.virtual.removeSlide()
          this.$store.dispatch("pcm/updateSlides", { status: "subed" });
          this.$nextTick(() => {
            this.reRender();
          });
        } else {
          this.tabVideos = "recs";
          this.$nextTick(() => {
            this.$store.dispatch("pcm/updateSlides", { subed: "unsubed" });
            this.norecs();
            this.nosubs = true;
            this.reRender();
          });
        }
      } else if (val === "recs") {
        // this.videosdata = this.pcm.unsubedvideos;
        this.$store.dispatch("pcm/updateSlides", { subed: "unsubed" });
        this.$nextTick(() => {
          this.reRender();
        });
      }
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper?.$swiper;
    },
    ...mapState(["pcm"]),

  },
  props: ["videostag"],
  beforeMount() {
    this.token = this.pcm.user.tk;
    this.username = this.pcm.user.un;
    this.userid = this.pcm.user.id;
    this.muted = this.pcm.controls.mute;
    this.beforeShow(
      this.pcm.subedvideos,
      this.pcm.unsubedvideos,
      this.pcm.offlinevideos
    ).then((data) => {
      // this.videoloadet = true;
      //console.log(data);
      //  this.videosdata = data
      this.$store.dispatch("pcm/updateSlides", { status: data });
      this.openswiper = false;
      // this.swiper?.virtual.renderSlide()
      // this.refreshSwiper()
      // this.$forceUpdate();
    });
  },
  mounted() {
          Array.prototype.slice.call(document.getElementsByTagName("video")).map(v=>{
      v.addEventListener('click',event=> v.paused ? v.play() : v.pause());
    })
    this.$socket.emit("getvideostags", {
      token: this.pcm.user.tk,
    });
    window.addEventListener("resize", (res) => {
      this.width = res.target.innerWidth;
      this.height = res.target.innerHeight;
    });
    this.username = this.pcm.user.un;
    this.$root.$on("tagsRefreshEvent", (status) => {
      // console.log(status);
      this.reRender();
    });
    // this.slidesChangedcontrol()
    //  this.reRender();
  },
  updated() {
  // updates
  },
  created() {
    this.$socket.emit("s_chagePage", {
      token: this.pcm.user.tk,
      page: "index",
    });
    if(this.pcm.slides.length === 0 ){
      console.log(this.pcm.slides.length);
      setTimeout(()=>{
          //this.reRender2()
          //this.$router.go("/")
      },2000)
    } else {
        this.isLoading = false
    }
    //    console.log(this.)
    // рекомендованные модели
  },
  beforeDestroy() {},
  sockets: {
    livemodel: function (response) {
      ////console.log(response)
    },

    cl_authcontroll: function (response) {
      if (response.massage == "auth") {
        this.auth = true;
      } else if (response.massage == "deauth") {
        this.auth = false;
      }
    },
    // connect: function() {
    //   ////console.log('socket connected')
    // },
    cl_getAllMassage: function (response) {
      if (!this.commentsDialog) {
        this.commentsDialog = true;
      }
      this.textcoms = response.comments.map((ep) => {
        var rlts = {
          username: ep.data.username,
          comments: ep.data.comments,
          date: ep.data.date,
          ismodel: ep.data.ismodel,
          avatar: ep.data.avatar,
          replays: ep.tags,
        };
        return rlts;
      });
    },

    cl_massageSended: function (resopnse) {
      if (resopnse == "ok") {
        // let jsonobj = {
        //   comments: this.commm_send,
        //   date: new Date().toString(),
        //   username: this.pcm.user.un
        // };
        // this.textcoms.push(jsonobj);
        this.commm_send = null;
        var vid = this.open_post_data.id[0];
        for (var i = 0; i < this.girlsVideos.length; i++) {
          if (this.girlsVideos[i].id[0] != vid) {
            continue;
          }
          this.girlsVideos[i].data[0].comm++;
        }
     this.$refs.commentsscroll.setScrollPercentage(
            1.0,200
          );
      } else {
      }
    },
    cl_newMassage: function (response) {
      let jsonobj = {
        comments: response.comment,
        date: response.date,
        username: response.username,
        avatar: response.avatar,
        ismodel: response.ismodel,
        islive: response.islive,
      };
        this.$refs.commentsscroll.setScrollPercentage(
            1.0,200
          );
      this.textcoms.push(jsonobj);
    },
    cl_likeStatus: function (response) {
      if (response.status == "try to signin") {
        this.$router.push("profile");
      } else {
        this.$store.dispatch("pcm/liking", response);
      }
    },
    // cl_postLiked: function(response) {
    //   var vid = response.videoid;
    //   for (var i = 0; i < this.girlsVideos.length; i++) {
    //     if (this.girlsVideos[i].id[0] != vid) {
    //       continue;
    //     }
    //     if (response.status == "liked") {
    //       this.girlsVideos[i].data[0].like++;
    //       break;
    //     } else if (response.status == "removed") {
    //       this.girlsVideos[i].data[0].like--;
    //       break;
    //     }
    //   }
    // }
  },
  methods: {
        videosrc:function(val){
          let url = val.replace('camsguns.com', 'cg.house').replace(".mp4","_mobile.mp4")
        return  [url]
    },
    clickevent:function(e){
    e.target.played ? e.target.pause() : e.target.play()
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
    //    Array.prototype.slice.call(document.getElementsByTagName("video")).map(v=>{
    //   v.addEventListener('click',event=> v.paused ? v.play() : v.pause());
    // })
    },
    slidesChangedcontrol() {
      this.swiper?.on("slideChange", () => {
        let video = document.getElementById(
          this.pcm.slides[this.swiper?.previousIndex]?.id[0]
        );
        video?.pause();
        this.$nextTick(() => {
          let video = document.getElementById(
            this.pcm.slides[this.swiper?.activeIndex]?.id[0]
          );
          this.$nextTick(() => {
            if (video?.paused) {
              video?.play();
            }
          });
        });
      });
    },
    norecs: function () {
      this.$q.notify({
        color: "pink-6",
        message: "0 подписчики",
        position: "center",
      });
    },
    beforeShow: async function (subed, unsubed, offline) {
      if (this.pcm.auth) {
        if (this.tabVideos === "home") {
          if (subed.length > 0) {
            return "subed";
          } else {
            this.tabVideos === "recs";
            return "unsubed";
          }
        } else {
          return "unsubed"; //response.sort((a, b) => b.data[0].like - a.data[0].like);
        }
      } else {
        return "offline"; //response.sort((a, b) => b.data[0].like - a.data[0].like);
      }
    },
    changedTab() {
      console.log("ok");
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
    asyncfunction: async function (fun) {
      var data = await fun
        .filter((e) => e.data[0].tags !== undefined)
        .filter(
          (e) =>
            e.data[0].tags[0].replace(" ", "").split("#").indexOf(this.videostag) !== -1
        );
      return data;
    },
    tagchanged() {
      //console.log(this.videostag);
    },
    onSwiper(swiper){
     this.lastindex = swiper?.activeIndex
    },
    changevisible(index) {
      this.$set(this.videoloadet, index, true);
    },
    scrollHandler: (event) => {
      //console.log(event);
    },
    delay: (t, data) => {
      return new Promise((resolve) => {
        setTimeout(resolve.bind(null, data), t);
      });
    },
    getToken: async () => {
      try {
        // //console.log(this.$firebase);
        const messaging = this.$firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        //console.log("token of the user:", token);
      } catch (error) {
        console.error("error from firebase", error);
      }
    },

    returnComent(text) {
      var ThisDate = new Date();
      var ComentDate = new Date(text);
      var Resurlt = ComentDate.tryHours() + ":" + ComentDate.tryMinuts();
      if (
        ThisDate.tryDate() > ComentDate.tryDate() ||
        ThisDate.tryMonth() > ComentDate.tryMonth()
      ) {
        Resurlt += " " + ComentDate.tryDate() + "." + ComentDate.tryMonth();
      }
      if (ThisDate.getFullYear() > ComentDate.getFullYear()) {
        Resurlt +=
          " " + ComentDate.tryDate() + "." + ComentDate.tryMonth() + "." + ComentDate.getFullYear();
      }
      return Resurlt;
    },
    onActiveIndex(play) {
      var vi1 = document.getElementById(this.videoid);
      if (vi1 && !vi1.paused) {
        vi1.pause();
      }
      this.videoid = this.girlsVideos[play.swiper?.activeIndex].id[0];
      var vi2 = document.getElementById(this.videoid);
      if (vi2 && vi2.paused) {
        vi2.play();
      }
    },
    tags(tag) {
      let tags = String(tag);
      return tags;
    },
    routeToModel(modelid) {
      this.$router.push("/model_chat/" + modelid);
    },

    checkLiveModel(modelid) {
      http({
        method: "get",
        url: "/check_model",
        headers: {
          "x-access-token": this.pcm.user.tk,
          modelid: modelid,
        },
      }).then((response) => {
        if (response.data.status == "Y") {
          return true;
        }
      });
    },
    cl_openPostComment(id, amount, postdata, index) {
      this.indexpostopen = index;
      this.commamount = amount;
      this.commid = id;
      //console.log(postdata);
      this.open_post_data = postdata;
      if (this.pcm.user.tk) {
        this.$socket.emit("s_getcomments", {
          token: this.pcm.user.tk,
          videoid: id,
        });
      } else {
        this.$q.notify({
          color: "red",
          title: "нет входа",
          message: `попробуйте сначала зарегистрироваться`,
        });
      }
    },

    cl_closePostComment(id) {
      (this.indexpostopen = null), (this.commamount = null);
      this.commid = null;
      this.commentsDialog = false;
      this.open_post_data = null;
      this.$socket.emit("s_closecomments", {
        token: this.pcm.user.tk,
        videoid: id,
      });
    },
    // comments_search(id, amount, postdata) { ЗАМНЕНО НА cl_openPostComment и cl_getAllMassage
    //   this.commamount = amount;
    //   this.commid = id;
    //   this.open_post_data = postdata;
    //   http({
    //     method: "get",
    //     url: "/comments_search",
    //     headers: {
    //     }
    //   }).then(response => {
    //     this.textcoms = response.data.reverse();
    //     if (!this.commentsDialog) {
    //       this.commentsDialog = true;
    //     }
    //   });
    // }, comments_send
    cl_createcomment() {
      if (!this.commm_send) {
        return;
      } else {
        this.$refs.commentsscroll.setScrollPercentage(1.0,200);
      this.$socket.emit("s_create_comment", {
        token: this.pcm.user.tk,
        comment: this.commm_send,
        username: this.pcm.user.un,
        videoid: this.commid,
      });
      }
    },
    cl_like(id, index) {
      if (!this.pcm.auth) {
        this.$root.$emit('login',{status:null})
      } else {
        let socketobj = {
          token: this.pcm.user.tk,
          userid: this.pcm.user.id,
          videoid: id,
          index: index,
        };
        this.$socket.emit("s_videoLike", {
          obj: socketobj,
        });
      }
    },
  },
};
</script>
<style lang="scss">
  .home_wrapper{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    max-width: 1400px;
    margin: 0px auto;
  }
  .bar-left{
    // border-left:1px solid rgba(114, 114, 114, 0.322);
    height: 100%;
    max-height: 700px;
  }
  .video_wrapper {
    position: relative;
    width: 100%;
    top: -60px;
    z-index: 0;
}

.slider_min_wrapper .slide_min_hashtags{
  z-index: 1;
 
  p{
    color: rgb(211, 205, 205) !important;
  }
}
.q-itmv2{
  z-index: 1;
}
</style>