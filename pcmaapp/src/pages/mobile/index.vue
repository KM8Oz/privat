<template>
  <q-page>
    <Swiper
      class="swiper vh100"
      :options="swiperOption"
      ref="mySwiper"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
    >
      <swiper-slide v-for="(girlVideo,index) in girlsVideos" :key="girlVideo.id" class="row">
        <div class="absolute-center  full-width zi200 vh100">
          <!-- <video
            class="absolute-center full-width"
            :id="girlVideo.id[0]"
            :src="girlVideo.data[0].video"
            playsinline
            webkit-playsinline
            wmode="opaque"
            type="video/mp4"
          /> -->
          <vue-plyr ref="Myplyr" class=" plyrmobile absolute-center full-width zi200 vh100 ">
                  <video
                    data-plyr-config='{ "controls": ["play-large","mute"]}'
                   class=" video-mainMobile" ref="videoRef" :id="girlVideo.id[0]" :src="girlVideo.data[0].video" playsinline muted type="video/mp4" preload metadata loop v-if="girlVideo.data[0].video!=null">
                  </video>
                </vue-plyr>
        </div>

        <div class="row q-mb-md mpb50 d-flex col-12  zi200 clickevnt" style=" justify-content: space-between; margin-bottom:0px;">
          <div class="mb0">
            <p class="text-pink-dg col-12">
              @{{girlVideo.data[0].modelname}}
              <q-badge
                v-if="check_model(girlVideo.data[0].modelid)"
                class="q-ml-sm"
                style="background-color: rgba(255, 255, 255, 0.3); color: white"
                align="middle"
              >
                <span class="dot q-mr-xs"></span> live
              </q-badge>
            </p>
            <p class="text-pink-dg">{{tags(girlVideo.tags)}}</p>
            <p class="text-pink-dg">{{girlVideo.data[0].example}}</p>
          </div>
          <div class="col-1 q-mb-md q-mr-md d-flex justify-content-center q-gutter-y-md" >
            <div class="flex " style="">
              <q-avatar size="40px">
                <img style="border: 1px solid #ffffff;" :src="girlVideo.data[0].avatar" />
              </q-avatar>
              <q-btn
                text-color="white"
                round
                dense
                size="xs"
                style="background-color:#FE2C55;margin-top: -8px"
              >+</q-btn>
            </div>
            <q-btn flat @click="cl_like(girlVideo.id[0],index)">
              <q-icon
                class="text-white shadow full-width"
                flat
                name="mdi-cards-heart"
                size="lg"
              />

              <p class="text-white full-width">{{girlVideo.data[0].like}}</p>
            </q-btn>
            <q-btn flat color="transparent">
              <q-icon
                @click="comments_search(girlVideo.id[0],girlVideo.data[0].comm)"
                flat
                class="text-white shadow"
                name="mdi-wechat"
                size="lg"
              />
              <p class="text-white full-width">{{girlVideo.data[0].comm}}</p>
            </q-btn>

            <q-btn flat color="transparent">
              <q-icon
                @click="getmodel(girlVideo.data[0].modelid)"
                flat
                class="text-white shadow"
                name="videocam"
                size="lg"
              />
            </q-btn>
          </div>
        </div>

        <q-dialog v-model="checklive" content-style="dialog">
          <q-page class="absolute-full" style="height: 100%;display:block;">
            <q-card
              class="text-white fit flex flex-center"
              style="background: rgba(254, 44, 85, 0.7)"
            >
              <div class="justify-center row">
                <q-avatar
                  style="border: 1px solid #ffffff;border-radius: 30px"
                  icon="notifications_none"
                ></q-avatar>
                <p
                  class="q-px-xl q-mt-md q-mx-lg"
                  style="font-size: 4vw"
                >Модель не онлайн. Уведомить вас о начале стрима?</p>
                <q-btn
                  class="text-red bg-white text-weight-bold col-7"
                  @click="alert('hello')"
                  style="border-radius: 30px"
                >Да</q-btn>
                <q-btn
                  class="text-weight-bold col-7 q-mt-lg"
                  style="background: rgba(255, 255, 255, 0.3);;border-radius: 30px"
                >Нет</q-btn>
              </div>
            </q-card>
          </q-page>
        </q-dialog>
      </swiper-slide>
    </Swiper>
    <q-dialog v-model="dialogcomments" seamless position="bottom">
      <q-card class="text-black fit q-px-xs q-mb-xs bg-grey-3 pb50">
        <q-card-section>
          <p class="text-center">
            {{commamount}} комментариев
            <q-btn flat @click="dialogcomments = false" icon="close" class="clbtn" />
          </p>
        </q-card-section>
        <q-card-section class="comdial scroll">
          <p v-for="textcom in textcoms" :key="textcom.date">
            <q-chat-message :name="textcom.username" :text="[textcom.comments]" />
          </p>
        </q-card-section>
      </q-card>
      <div class="full-width fixed-bottom row bg-white">
        <q-input class="col-10" v-model="commm_send" placeholder="Добавить комментарий..." />
        <q-btn class="col-2" flat @click="comments_send()">
          <q-icon color="grey" name="mdi-send" />
        </q-btn>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import http from "../../http-common";

export default {
  data() {
    return {
      commamount: 0,
      commid: null,
      commm_send: null,
      textcoms: [],
      dialogcomments: false,
      videoid: null,
      sub: "sub",
      checklive: false,
      models: null,
      girlsVideos: null,
      likes: false,
      modelonline: false,
      one: true,
      open_post_data: null,
      swiperOption: {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        onSlideChangeStart: function() {
          this.onActiveIndex();
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    for(var i; i<=girlsVideos.length; i++){

    }
    this.swiper.on("transitionStart", () => {
      this.onActiveIndex(this);
      console.log("active? ", this.swiper);
      console.log("active? ", this.swiper.activeIndex);
    });
    console.log(this.$refs.videoRef)
  },
  updated() {
    
    var vi2 = document.getElementById(this.videoid);
    //console.log(vi2);

    vi2.play();
    //vi2.muted = !vi2.muted;
  },
  beforeCreate() {
    http({
      method: "get",
      url: "/videos_rec",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response => {
      this.girlsVideos = response.data;
      this.videoid = this.girlsVideos[0].id[0];
      //console.log(this.videoid);
    });
  },
  methods: {
    playercontrols(em){
      if(em && em.paused){
        vi2.play();
      }else if(!em.paused){
        vi2.pause();
      }
    },
    cl_massageSended: function(resopnse) {
      if (resopnse == "ok") {
        let jsonobj = {
          comments: this.commm_send,
          date: new Date().toString(),
          username: LocalStorage.getItem("username")
        };
        this.textcoms.push(jsonobj);
        this.commm_send = null;
        var vid = this.open_post_data.id[0];
        for (var i = 0; i < this.girlsVideos.length; i++) {
          if (this.girlsVideos[i].id[0] != vid) {
            continue;
          }
          this.girlsVideos[i].data[0].comm++;
        }

        setTimeout(() => {
          this.$refs.commentsscroll.setScrollPosition(
            this.$refs.commentsscroll.scrollSize
          );
        }, 500);
      } else {
      }
    },
    cl_newMassage: function(response) {
      let jsonobj = {
        comments: response.comment,
        date: response.date,
        username: response.username
      };
      this.textcoms.push(jsonobj);
      var vid = this.open_post_data.id[0];
      for (var i = 0; i < this.girlsVideos.length; i++) {
        if (this.girlsVideos[i].id[0] != vid) {
          continue;
        }
        this.girlsVideos[i].data[0].comm++;
      }
    },
    cl_like(id, index) {
          if(this.blocketlike){
            return;
          }
          this.blocketlike = true;
          // this.girlsVideos[index].liked[0] = !girlsVideos[index].liked[0];
          let socketobj = {
            token: localStorage.getItem("token"),
            userid: localStorage.getItem("userid"),
            videoid: id
          };
          this.$socket.emit('s_videoLike', {
              obj: socketobj
            })
            // http({
            //   method: "get",
            //   url: "/video_like",
            //   headers: {
            //     "x-access-token": localStorage.getItem("token"),
            //     videoid: id
            //   }
            // });
            // console.log(vi2);
            // vi2.addClass("green");
        },
    // like(id) {
    //   http({
    //     method: "get",
    //     url: "/video_like",
    //     headers: {
    //       "x-access-token": localStorage.getItem("token"),
    //       id: id
    //     }
    //   });
    //   var vi2 = "like" + id;
    //   console.log(this.$refs[vi2][0].$el);
    //   this.$refs[vi2][0].$el.classList.add("text-purple-13");
    // },
    comments_send() {
      //console.log(id);
      var body = {
        comments: JSON.stringify(this.commm_send),
        username: localStorage.getItem("username")
      };
      http({
        method: "post",
        url: "/create_comments",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          videoid: this.commid
        },
        data: body
      }).then(response => {
        this.commm_send = null;
      });
    },
    comments_search(id, amount) {
      this.commamount = amount;
      this.commid = id;
      console.log("ид для поиска:", id);
      http({
        method: "get",
        url: "/comments_search",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          videoid: id
        }
      }).then(response => {
        console.log(response.data);
        this.textcoms = response.data;
        this.dialogcomments = true;
      });
    },
    onActiveIndex(play) {
      var vi1 = document.getElementById(this.videoid);
      console.log(vi1);
      vi1.pause();
      this.videoid = this.girlsVideos[play.swiper.activeIndex].id[0];
      var vi2 = document.getElementById(this.videoid);
      vi2.play();
      // vi2.muted = !vi2.muted;

      console.log(play.swiper.activeIndex);
    },
    tags(tag) {
      let tags = String(tag);
      return tags;
    },
    check_model(modelid) {
      http({
        method: "get",
        url: "/check_model",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          modelid: modelid
        }
      }).then(response => {
        if (response.data.status == "Y") {
          return true;
        } else {
          return false;
        }
      });
    },
    getmodel(modelid) {
      http({
        method: "get",
        url: "/check_model",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          modelid: modelid
        }
      }).then(response => {
        if (response.data.status == "Y") {
          this.$router.push("/model_chat/" + modelid);
        } else {
          this.checklive = true;
        }
      });
    },
    handleSwipe({ evt, ...info }) {
      if (info.direction == "up" && this.model_max - 1 > this.model_num) {
        if (this.one == true) {
          this.one = false;
        } else {
          this.one = true;
        }
        info.duration = 10;
        ////////стрираем коменты и данные моделей
        this.models_video_comments_nik1 = null;
        this.models_video_comments_nik2 = null;
        this.models_video_comments_nik3 = null;
        this.models_video_comments_text1 = null;
        this.models_video_comments_text2 = null;
        this.models_video_comments_text3 = null;

        //////////////
        this.model_num++;
        this.models = this.allmod[this.model_num];
        this.modelidlink = this.models.userId;
        this.video_num = 0;

        http({
          method: "get",
          url: "/videos",
          headers: {
            userId: this.allmod[this.model_num].userId
          }
        }).then(modelsvideo => {
          console.log(modelsvideo.data);
          this.modelall_video = modelsvideo.data;
          this.models_video = modelsvideo.data[0];
          this.srcvideo = modelsvideo.data[this.video_num].link;
          this.video_max = modelsvideo.data.length;
          this.video = {};
          this.video = {
            sources: [
              {
                src: this.models_video.link,
                type: "video/mp4"
              }
            ],
            options: {
              autoplay: true,
              volume: 0.3
            }
          };
          http({
            method: "get",
            url: "/comments",
            headers: {
              vid: this.models_video.id
            }
          }).then(modelsvideocomments => {
            this.models_video_comments_nik1 = modelsvideocomments.data[0].uid;
            this.models_video_comments_nik2 = modelsvideocomments.data[1].uid;
            this.models_video_comments_nik3 = modelsvideocomments.data[2].uid;
            this.models_video_comments_text1 =
              modelsvideocomments.data[0].comment;
            this.models_video_comments_text2 =
              modelsvideocomments.data[1].comment;
            this.models_video_comments_text3 =
              modelsvideocomments.data[2].comment;
          });
        });
      } else if (info.direction == "down" && this.model_num > 0) {
        if (this.one == true) {
          this.one = false;
        } else {
          this.one = true;
        }
        info.duration = 620;
        ////////стрираем коменты и данные моделей
        this.models_video_comments_nik1 = null;
        this.models_video_comments_nik2 = null;
        this.models_video_comments_nik3 = null;
        this.models_video_comments_text1 = null;
        this.models_video_comments_text2 = null;
        this.models_video_comments_text3 = null;

        //////////////
        this.model_num--;
        this.models = this.allmod[this.model_num];
        this.modelidlink = this.models.userId;
        this.video_num = 0;
        var v_num = 0;
        http({
          method: "get",
          url: "/videos",
          headers: {
            userId: this.allmod[this.model_num].userId
          }
        }).then(modelsvideo => {
          this.modelall_video = modelsvideo.data;
          this.models_video = modelsvideo.data[0];
          this.srcvideo = modelsvideo.data[this.video_num].link;
          this.video_max = modelsvideo.data.length;

          http({
            method: "get",
            url: "/comments",
            headers: {
              vid: this.models_video.id
            }
          }).then(modelsvideocomments => {
            this.models_video_comments_nik1 = modelsvideocomments.data[0].uid;
            this.models_video_comments_nik2 = modelsvideocomments.data[1].uid;
            this.models_video_comments_nik3 = modelsvideocomments.data[2].uid;
            this.models_video_comments_text1 =
              modelsvideocomments.data[0].comment;
            this.models_video_comments_text2 =
              modelsvideocomments.data[1].comment;
            this.models_video_comments_text3 =
              modelsvideocomments.data[2].comment;
          });
        });
      } else if (
        info.direction == "left" &&
        this.video_max - 1 > this.video_num
      ) {
        info.duration = 620;
        this.video_num++;
        this.models_video = this.modelall_video[this.video_num];
        this.srcvideo = this.models_video.link;
        console.log(this.models_video);
        http({
          method: "get",
          url: "/comments",
          headers: {
            vid: this.models_video.id
          }
        }).then(modelsvideocomments => {
          this.models_video_comments_nik1 = modelsvideocomments.data[0].uid;
          this.models_video_comments_nik2 = modelsvideocomments.data[1].uid;
          this.models_video_comments_nik3 = modelsvideocomments.data[2].uid;
          this.models_video_comments_text1 =
            modelsvideocomments.data[0].comment;
          this.models_video_comments_text2 =
            modelsvideocomments.data[1].comment;
          this.models_video_comments_text3 =
            modelsvideocomments.data[2].comment;
        });
      } else if (info.direction == "right" && this.video_num > 0) {
        info.duration = 620;
        this.video_num--;
        this.models_video = this.modelall_video[this.video_num];
        this.srcvideo = this.models_video.link;
        console.log(this.models_video);
        http({
          method: "get",
          url: "/comments",
          headers: {
            vid: this.models_video.id
          }
        }).then(modelsvideocomments => {
          this.models_video_comments_nik1 = modelsvideocomments.data[0].uid;
          this.models_video_comments_nik2 = modelsvideocomments.data[1].uid;
          this.models_video_comments_nik3 = modelsvideocomments.data[2].uid;
          this.models_video_comments_text1 =
            modelsvideocomments.data[0].comment;
          this.models_video_comments_text2 =
            modelsvideocomments.data[1].comment;
          this.models_video_comments_text3 =
            modelsvideocomments.data[2].comment;
        });
      }
      console.log(this.model_num);
      console.log(this.video_num);
    }
  }
};
</script>
<style scoped>
.vh100 {
  height: 94vh;
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
</style
>>
