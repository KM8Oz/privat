<template>
  <swiper
    class="swiper vh100 bg-black"
    :options="swiperOption"
    ref="mySwiper"
    :auto-update="true"
    :auto-destroy="false"
    :delete-instance-on-destroy="false"
    :cleanup-styles-on-destroy="false"
  >
    <swiper-slide
      v-cloak
      v-for="(girlVideo, index) in videosdata"
      :key="index"
      class="row vh100 bg-black"
      v-touch:swipe.left="onleft"
    >
      <div class="absolute-center full-width zi200 vh100">
        <!-- <video
            class="absolute-center full-width"
            :id="girlVideo.id[0]"
            :src="girlVideo.data[0].video"
            playsinline
            webkit-playsinline
            wmode="opaque"
            type="video/mp4"
          />-->
        <vue-plyr
          :ref="girlVideo.id[0]"
          class="bigbtnplyr plyrmobile absolute-center full-width zi200 vh100"
          :emit="['loadeddata', 'volumechange']"
        >
          <LazyVideo
            :data-plyr-config="getplyrconfig(index)"
            :src="girlVideo.data[0].video"
            :attrs="{
              wmode: 'opaque',
              type: 'video/mp4',
              class: 'video-mainMobile vh100',
              id: girlVideo.id[0],
              controls: false,
              playsinline: true,
              loop: true,
              autoplay: false,
              muted: muteall,
              ref: 'videoRef',
            }"
            :pauseOnExit="true"
            v-if="girlVideo.data[0].video != null"
          ></LazyVideo>
        </vue-plyr>
      </div>
      <div class="row zi200 clickevnt mobileheadctl align-center text-pink-dg">
        <!-- <div class="">
                  <q-btn class="mute-mobile absolute-center"  round dense size="7vh">
              <q-icon
                flat
                class="text-white shadow"
                :name="(mutedvar)?'volume_off':'volume_up'"
                size="6vh"
              />
            </q-btn>
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
            <p
              class="text-pink-dg"
            >{{girlVideo.data[0].tags ? girlVideo.data[0].tags[0]: 'нет_хэштегов'}}</p>
            <p class="text-pink-dg">{{girlVideo.data[0].example}}</p>  </div>-->

        <q-item
          clickable
          v-ripple
          class="row text-pink-dg mobileheadctl2 text-subtitle1"
          :to="'/user/' + girlVideo.data[0].modelid"
        >
          <q-item-section avatar>
            <q-avatar size="50px" class="b-borderwhite">
              <img :src="girlVideo.data[0].avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-mx-auto">
            <q-item-label class="q-pa-none p-mb-md">{{
              girlVideo.data[0].tags ? girlVideo.data[0].tags[0] : "нет_хэштегов"
            }}</q-item-label>
            <q-item-label caption lines="2" class="text-white">
              <span class="text-subtitle1 text-uppercase text-weight-regular text-white"
                >@{{ girlVideo.data[0].modelname }}</span
              >
              -- {{ girlVideo.data[0].example }}
            </q-item-label>
          </q-item-section>

          <q-item-section side bottom class="text-white text-weight-light">
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
            :disable="!pcm.auth && nosubs"
          />
          <q-tab
            name="recs"
            content-class="text-black videotabs"
            label="рекомендации"
            :disable="!pcm.auth"
          />
        </q-tabs>
        <div
          class="col-1 q-mb-none mr-vw-9 itemsmobile justify-content-center q-gutter-y-md"
        >
          <q-btn
            round
            @click="subscribe(girlVideo.data[0].modelid, index, girlVideo.data[0].avatar)"
            :ref="'modelsub' + index"
          >
            <q-avatar size="50px" class="b-borderwhite">
              <img :src="girlVideo.data[0].avatar" />
            </q-avatar>
            <q-badge
              floating
              round
              v-if="!girlVideo.data[0].subed"
              class="radius-50"
              color="red"
              >+</q-badge
            >
          </q-btn>
          <q-btn flat @click="cl_like(girlVideo.id[0], index)">
            <q-icon
              class="text-white shadow full-width"
              flat
              name="mdi-cards-heart"
              size="6vh"
              :color="girlVideo.liked[0] ? 'red' : 'white'"
            />

            <p class="text-white full-width q-ma-none text-fxl">
              {{ girlVideo.data[0].like }}
            </p>
          </q-btn>
          <q-btn flat color="transparent">
            <q-icon
              @click="
                cl_openPostComment(
                  girlVideo.id[0],
                  girlVideo.data[0].comm,
                  girlVideo,
                  index
                )
              "
              flat
              class="text-white shadow"
              name="mdi-wechat"
              size="6vh"
            />
            <p class="text-white full-width q-ma-none text-fxl">
              {{ girlVideo.data[0].comm }}
            </p>
          </q-btn>

          <q-btn flat color="transparent">
            <q-icon
              @click="getmodel(girlVideo.data[0].modelid)"
              flat
              class="text-white shadow"
              name="videocam"
              size="6vh"
            />
          </q-btn>
          <q-btn flat color="transparent">
            <q-icon
              @click="addmuteevent()"
              flat
              class="text-white shadow"
              :name="!muteall ? 'volume_up' : 'volume_off'"
              size="6vh"
            />
          </q-btn>
        </div>
      </div>

      <q-dialog v-model="checklive" content-style="dialog">
        <q-page class="absolute-full" style="height: 100%; display: block">
          <q-card
            class="text-white fit flex flex-center"
            style="background: rgba(254, 44, 85, 0.7)"
          >
            <div class="justify-center row">
              <q-avatar
                style="border: 1px solid #ffffff; border-radius: 30px"
                icon="notifications_none"
              ></q-avatar>
              <p class="q-px-xl q-mt-md q-mx-lg text-center" style="font-size: 4vw">
                Модель не онлайн. Уведомить вас о начале стрима?
              </p>
              <q-btn
                class="text-red bg-white text-weight-bold col-7"
                @click="alert('hello')"
                style="border-radius: 30px"
                >Да</q-btn
              >
              <q-btn
                class="text-weight-bold col-7 q-mt-lg"
                style="background: rgba(255, 255, 255, 0.3); border-radius: 30px"
                >Нет</q-btn
              >
            </div>
          </q-card>
        </q-page>
      </q-dialog>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: "QmSwiper",
  props: ["videos"],
  data: () => ({
    swiperOption: {
      on: {
        init: this.progressof(),
      },
      zoom: {
        enabled: false,
        maxRatio: 1,
        minRatio: 1,
        toggle: false,
      },
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 0,
      observer: true,
      snapOnRelease: false,
      mousewheel: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    },
  }),
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  beforeMount() {},
  mounted() {
    this.swiper.on("slideChange", () => {
      // this.onActiveIndex(this);
      let video = document.getElementById(
        this.videosdata[this.swiper.previousIndex]?.id[0]
      );
      // console.log(video.played)
      video?.pause();
      this.$nextTick(() => {
        video = document.getElementById(this.videosdata[this.swiper.activeIndex]?.id[0]);
        video?.play();
      });
    });
  },
  methods: {},
  sockets: {},
};
</script>

<style></style>
