<template>
  <div class="bg-white row">
    <div class="col-lg-2 col-md-3 mt-vh-4">
      <q-list class="menu-list text-black q-pa-none">
        <q-item clickable v-ripple class="q-pa-none h-vh-5-st">
          <q-item-section avatar class="ml-vw-1 col-1 q-pr-none">
            <q-icon size="3.1vh" name="home" class="text-pink-6" />
          </q-item-section>
          <q-item-section class="text-pink-6 text-fxl ml-vw-1">Рекомендуемые</q-item-section>
        </q-item>
        <q-item clickable v-ripple class="q-pa-none h-vh-5-st">
          <q-item-section avatar class="ml-vw-1 col-1 q-pa-none">
            <q-icon size="3.1vh" name="people_outline" />
          </q-item-section>
          <q-item-section class="ml-vw-1 text-fxl">Подписки</q-item-section>
        </q-item>
        <q-separator class="bg-grey-4" />
        <q-item v-if="!subscribListL">
          <q-item-label
            caption
            class="text-xl text-weight-thin text-black"
          >Здесь появятся аккаунты, на которые вы подписаны</q-item-label>
        </q-item>
        <div v-else>
          <div class="text-xl mt-vh-2 ml-vw-1 text-grey-8">Ваши аккаунты из топа</div>
          <div clickable v-for="sub in subscribList" :key="sub.id">
            <div class="row items-center q-mb-none ml-vw-1">
              <q-avatar size="5vh">
                <img class="bordavatar" :src="sub.avatar" />
              </q-avatar>
              <div class="q-mt-md q-ml-sm">
                <p class="text-xl col-10 text-weight-medium q-mb-none">{{sub.modelname}}</p>
                <p class="text-grey-8 text-md">@{{sub.modelusername}}</p>
              </div>
              <div class="row justify-end col q-pt-none"></div>
            </div>
          </div>
        </div>
      </q-list>
    </div>
    <div class="col-lg-7 col-md-5">
      <Swiper
        class="swiper h-vh-90"
        :options="swiperOption"
        ref="mySwiper"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
      >
        <swiper-slide v-for="(girlVideo,index) in girlsVideos" v-bind:key="girlVideo.id[0]">
          <div class="row abs-hor-centr h-mc flex flex-fix mb-1 h-mc w-47" v-if="!videoloadet">
            <q-item class="row q-mr-none cuttext h-mc q-pa-none w-100">
              <q-item-section avatar>
                <q-skeleton type="QAvatar" size="5vh" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="rect" />
                </q-item-label>
                <q-item-label caption class="mt-vh-1">
                  <q-skeleton type="rect" />
                </q-item-label>
                <q-item-label caption class="mt-vh-1">
                  <q-skeleton type="rect" />
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none mt-vh-05">
              <q-item-section avatar />
              <q-item-section class="w-60">
                <q-skeleton height="74vh" class="q-mb-sm" />
                <div class="row items-center no-wrap">
                  <div class="row col-3 items-center">
                    <svg
                      width="4.24vh"
                      class="q-pa-none"
                      viewBox="0 0 41 22"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fiat
                        d="M39.8425 9.09804C37.3551 11.5574 35.5568 16.8403 30.0386 19.8263C28.7837 20.5042 27.3327 21.07 25.6408 21.451C24.5876 21.6863 23.4392 21.8599 22.1899 21.9384C22.0946 21.944 21.9938 21.9552 21.8985 21.9552C21.4168 21.9776 21.0302 21.9888 20.7557 21.9944C20.61 22 20.47 22 20.3187 22H20.1562C20.061 22 19.9322 21.9944 19.7697 21.9944C19.131 21.9832 18.5148 21.9608 17.921 21.9104C17.8481 21.9104 17.7697 21.9048 17.6969 21.8936C16.6661 21.7983 15.7081 21.6527 14.8229 21.451C13.1871 21.0868 11.7809 20.5434 10.554 19.8936C4.92936 16.9244 3.12544 11.5742 0.615634 9.09804C-0.163078 8.33053 -0.0846463 7.97759 0.20667 7.87675C3.50079 6.7563 6.83412 1.85994 10.3243 0.408963C10.9406 0.15126 11.5736 0 12.2011 0C16.3747 0 17.3719 1.7367 20.1618 1.7423H20.3019C23.0862 1.7367 24.089 0 28.2683 0C28.8957 0 29.5176 0.15126 30.145 0.408963C33.6296 1.85994 36.9686 6.7563 40.2571 7.87675C40.5428 7.97759 40.6268 8.33053 39.8425 9.09804Z"
                        fill="gray"
                      />
                    </svg>
                    <q-skeleton type="rect" class="col-5" />
                  </div>
                  <div class="row col-3 items-center">
                    <svg
                      width="3.1vh"
                      class="q-pa-none"
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27 0H3C1.35 0 0 1.35 0 3V30L6 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0Z"
                        fill="gray"
                      />
                    </svg>
                    <q-skeleton type="rect" class="col-5" />
                  </div>
                  <div class="row col-2 items-center">
                    <svg
                      width="3.72vh"
                      class="q-pa-none"
                      viewBox="0 0 36 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 9V2C28 0.9 27.1 0 26 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H26C27.1 24 28 23.1 28 22V15L36 23V1L28 9Z"
                        fill="gray"
                      />
                    </svg>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </div>
          <div class="row abs-hor-centr h-mc flex flex-fix" v-show="videoloadet">
            <div class="row q-mr-none cuttext h-mc">
              <q-avatar class="q-mb-none mr-vw-05" size="5vh">
                <img class="bordavatar" :src="girlVideo.data[0].avatar" />
              </q-avatar>
              <div class="row q-ma-none max-60 h-10">
                <p class="text-black col-12 q-mb-none text-xl text-nowrap">
                  {{girlVideo.data[0].modelname}}
                  <q-badge
                    class="q-ml-sm text-black-50 q-mb-none"
                    align="middle"
                    v-if="checkLiveModel(girlVideo.data[0].modelid)"
                  >
                    <span class="dot q-mr-xs"></span> live
                  </q-badge>
                </p>
                <p
                  class="text-grey-8 col-12 cuttext text-nowrap text-md q-mb-none h-vh-3"
                >@{{girlVideo.data[0].modelname}}</p>
              </div>
            </div>
            <p
              class="text-black q-mt-none cuttext text-md ml-vh-505 mb-1 h-mc"
            >{{tags(girlVideo.tags)}}</p>
            <div class="ml-vh-505">
              <vue-plyr ref="Myplyr" class="mute-right">
                <video
                  data-plyr-config='{ "controls": ["play-large","mute"]}'
                  class="video-main"
                  ref="videoRef"
                  :id="girlVideo.id[0]"
                  :src="girlVideo.data[0].video"
                  playsinline
                  type="video/mp4"
                  preload
                  metadata
                  loop
                  v-if="girlVideo.data[0].video!=null"
                ></video>
              </vue-plyr>
              <div
                class="row col-12 q-ml-none q-gutter-x-sm items-baseline mt-vh-1 likepanel items-center"
              >
                <div class="row col-3 items-center q-ml-none">
                  <q-btn
                    flat
                    color="transparent"
                    class="col-4 q-ml-none q-pa-none likepanel"
                    @click="cl_like(girlVideo.id[0],index)"
                  >
                    <!-- <img src="../../assets/С&Gmassage.jpg" class="absolute-center q-pa-none" /> -->
                    <svg
                      width="4.24vh"
                      class="absolute-center q-pa-none"
                      viewBox="0 0 41 22"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fiat
                        d="M39.8425 9.09804C37.3551 11.5574 35.5568 16.8403 30.0386 19.8263C28.7837 20.5042 27.3327 21.07 25.6408 21.451C24.5876 21.6863 23.4392 21.8599 22.1899 21.9384C22.0946 21.944 21.9938 21.9552 21.8985 21.9552C21.4168 21.9776 21.0302 21.9888 20.7557 21.9944C20.61 22 20.47 22 20.3187 22H20.1562C20.061 22 19.9322 21.9944 19.7697 21.9944C19.131 21.9832 18.5148 21.9608 17.921 21.9104C17.8481 21.9104 17.7697 21.9048 17.6969 21.8936C16.6661 21.7983 15.7081 21.6527 14.8229 21.451C13.1871 21.0868 11.7809 20.5434 10.554 19.8936C4.92936 16.9244 3.12544 11.5742 0.615634 9.09804C-0.163078 8.33053 -0.0846463 7.97759 0.20667 7.87675C3.50079 6.7563 6.83412 1.85994 10.3243 0.408963C10.9406 0.15126 11.5736 0 12.2011 0C16.3747 0 17.3719 1.7367 20.1618 1.7423H20.3019C23.0862 1.7367 24.089 0 28.2683 0C28.8957 0 29.5176 0.15126 30.145 0.408963C33.6296 1.85994 36.9686 6.7563 40.2571 7.87675C40.5428 7.97759 40.6268 8.33053 39.8425 9.09804Z"
                        :fill="(girlVideo.liked[0])?'red':'black'"
                      />
                    </svg>
                    <!--<q-icon><img class="q-mr-sm" src="~/assets/guby.svg" style="filter: invert(1);margin-top: -1.5vh" height="14px" /></q-icon>-->
                  </q-btn>
                  <p
                    class="text-black fixsvgbtn q-mb-none q-mt-none text-xl text-weight-bold"
                  >{{girlVideo.data[0].like}}</p>
                </div>
                <div class="row col-3 items-center q-ml-none">
                  <q-btn
                    @click="cl_openPostComment(girlVideo.id[0],girlVideo.data[0].comm,girlVideo,index)"
                    flat
                    color="transparent"
                    class="col-4 q-ma-none h-100 q-pa-none likepanel"
                  >
                    <!-- <img src="../../assets/PCMChatBubble.svg" class="absolute-center q-pa-none"/> -->
                    <svg
                      width="3.1vh"
                      class="absolute-center q-pa-none"
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27 0H3C1.35 0 0 1.35 0 3V30L6 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0Z"
                        fill="black"
                      />
                    </svg>
                  </q-btn>
                  <p
                    class="text-black q-mb-none fixsvgbtn text-xl q-mt-none text-weight-bold"
                  >{{girlVideo.data[0].comm}}</p>
                </div>
                <div class="row col-2 q-ml-none">
                  <q-btn
                    @click="getmodel(girlVideo.data[0].modelid)"
                    flat
                    color="transparent"
                    class="col-12 q-ma-none h-100 q-pa-none likepanel"
                  >
                    <!-- <img src="../../assets/PCMVideoCUM.svg" class="absolute-center q-pa-none"/> -->
                    <svg
                      width="3.72vh"
                      class="absolute-center q-pa-none"
                      viewBox="0 0 36 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 9V2C28 0.9 27.1 0 26 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H26C27.1 24 28 23.1 28 22V15L36 23V1L28 9Z"
                        fill="black"
                      />
                    </svg>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </Swiper>
    </div>
    <!--Рекомендации-->
    <div class="col-lg-3 col-md-4 mt-vh-4">
      <q-card class="text-black q-pa-none q-card-fix">
        <q-card-section class="q-pb-none">
          <div class="row items-baseline">
            <p class="col text-fxl font-weight-bolder line-height-1">Рекомендуемые девушки</p>
            <p class="col text-pink text-xl" align="right">Все</p>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none q-pr-none">
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-vh-30">
            <div v-if="this.recModels == 5">
              <q-item class="q-pa-none q-mt-md">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" animation="fade" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                </q-item-section>
                <q-skeleton type="QChip" class="ma-auto mr-vw-1" />
              </q-item>
              <q-item class="q-pa-none q-mt-md">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" animation="fade" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                </q-item-section>
                <q-skeleton type="QChip" class="ma-auto mr-vw-1" />
              </q-item>
              <q-item class="q-pa-none q-mt-md">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" animation="fade" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                </q-item-section>
                <q-skeleton type="QChip" class="ma-auto mr-vw-1" />
              </q-item>
              <q-item class="q-pa-none q-mt-md">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" animation="fade" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                </q-item-section>
                <q-skeleton type="QChip" class="ma-auto mr-vw-1" />
              </q-item>
              <q-item class="q-pa-none q-mt-md">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" animation="fade" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="rect" animation="fade" />
                  </q-item-label>
                </q-item-section>
                <q-skeleton type="QChip" class="ma-auto mr-vw-1" />
              </q-item>
            </div>
            <div
              v-else
              v-for="modell in this.recModels"
              :key="modell.userId"
              class="row items-center q-mb-none mr-vw-1"
            >
              <q-avatar size="5vh">
                <img class="bordavatar" :src="modell.avatars" />
              </q-avatar>
              <div class="q-mt-md q-ml-sm" v-if="modell.UuserId != undefined">
                <p class="text-xl col-10 text-weight-medium q-mb-none">{{modell.UuserId.username}}</p>
                <p class="text-md">@{{modell.UuserId.username}}</p>
              </div>
              <div class="row justify-end col q-pt-none">
                <q-btn
                  @click="subscribe(model.userId)"
                  dense
                  rounded
                  outline
                  color="pink-6"
                  no-caps
                >
                  <p class="q-ma-none text-md q-pa-none q-ma-none">Подписаться</p>
                </q-btn>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
      <!--Категории-->
      <!--<q-card class="text-black q-mt-md q-mr-xl">
            <q-card-section>
              <div class="row items-baseline"></div>
              <div class="row items-baseline">
                <p class="col" style="font-size: 20px">Категории</p>
                <p align="right" class="col text-pink">Все</p>
              </div>
            </q-card-section>
            
            <q-card-section class="q-pt-none" style="overflow: auto;height: 30vh">
              <div class="row items-center q-mb-none">
                <q-avatar size="40px">
                  <img
                    style="border: 1px solid #ffffff;"
                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                  />
                </q-avatar>
                <div class="q-ml-sm">
                  <p
                    style="font-size: 14px"
                    class="col-10 text-weight-medium q-mb-none text-weight-medium"
                  >#Название категории</p>
                </div>
            
                <div class="row justify-end col">
                  <q-btn dense flat icon="keyboard_arrow_right" no-caps class="q-ml-sm"></q-btn>
                </div>
              </div>
            </q-card-section>
      </q-card>-->
    </div>
    <q-dialog v-model="checklive" content-style="dialog">
      <q-card class="text-white fit flex flex-center card-bg">
        <div class="justify-center row">
          <div class="col-12 justify-center row">
            <q-avatar class="bordavatar bordavatar" icon="notifications_none"></q-avatar>
          </div>
          <p class="q-px-xl q-mt-md q-mx-lg col-12 row justify-center text-fxl">Модель не онлайн.</p>
          <!--<q-btn
                  Уведомить вас о начале стрима?
                    class="text-red bg-white text-weight-bold col-7"
                    @click="alert('hello')"
                    style="border-radius: 30px"
          >Да</q-btn>-->
          <q-btn
            class="text-weight-bold col-7 q-mt-lg bg-pink-7 opacity-3"
            @click="checklive=false"
          >ОК</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog
      full-height
      @hide="cl_closePostComment(commid)"
      v-model="commentsDialog"
      v-if="open_post_data"
      class="q-pa-none"
      position="right"
    >
      <q-card class="text-black q-pa-none q-ma-none vw-30">
        <q-card-section class="q-pa-none h-vh-17 mx-vw-1">
          <div class="row justify-between mt-vh-3">
            <div class="row">
              <q-avatar size="5.16vh">
                <img class="bordavatar" :src="open_post_data.data[0].avatar" />
              </q-avatar>
              <div class="row q-mф-none">
                <p class="text-black col-12 q-mb-none text-xl text-nowrap">
                  {{open_post_data.data[0].modelname}}
                  <q-badge
                    class="q-ml-sm text-black-50 q-mb-none"
                    align="middle"
                    v-if="checkLiveModel(open_post_data.data[0].modelid)"
                  >
                    <span class="dot q-mr-xs"></span> live
                  </q-badge>
                </p>
                <p
                  class="text-grey-8 col-12 cuttext text-nowrap text-md q-mb-none h-vh-3"
                >@{{open_post_data.data[0].modelname}}</p>
              </div>
            </div>
            <p>
              <q-btn flat @click="cl_closePostComment(commid)" icon="close" class="clbtn" />
            </p>
          </div>
          <div class="row text-max2-14">
            <p class="text-comment-14">
              Описание не более 2 строчек
              <br />Описание не более 2 строчек
              <br />Описание не более 2 строчек
              <br />Описание не более 2 строчек
              <br />Описание не более 2 строчек
              <br />Описание не более 2 строчек
            </p>
          </div>
          <p class="text-black cuttext text-comment-14 mb-1 h-mc">{{tags(open_post_data.tags)}}</p>
          <div
            class="row col-12 q-ml-none q-gutter-x-sm items-baseline mb-5 likepanel items-center"
          >
            <div class="row col-2 items-center q-ml-none">
              <q-btn
                flat
                color="transparent"
                class="col-4 q-ml-none q-pa-none likepanel"
                @click="cl_like(open_post_data.id[0],indexpostopen)"
              >
                <svg
                  width="4.24vh"
                  class="absolute-center q-pa-none"
                  viewBox="0 0 41 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fiat
                    d="M39.8425 9.09804C37.3551 11.5574 35.5568 16.8403 30.0386 19.8263C28.7837 20.5042 27.3327 21.07 25.6408 21.451C24.5876 21.6863 23.4392 21.8599 22.1899 21.9384C22.0946 21.944 21.9938 21.9552 21.8985 21.9552C21.4168 21.9776 21.0302 21.9888 20.7557 21.9944C20.61 22 20.47 22 20.3187 22H20.1562C20.061 22 19.9322 21.9944 19.7697 21.9944C19.131 21.9832 18.5148 21.9608 17.921 21.9104C17.8481 21.9104 17.7697 21.9048 17.6969 21.8936C16.6661 21.7983 15.7081 21.6527 14.8229 21.451C13.1871 21.0868 11.7809 20.5434 10.554 19.8936C4.92936 16.9244 3.12544 11.5742 0.615634 9.09804C-0.163078 8.33053 -0.0846463 7.97759 0.20667 7.87675C3.50079 6.7563 6.83412 1.85994 10.3243 0.408963C10.9406 0.15126 11.5736 0 12.2011 0C16.3747 0 17.3719 1.7367 20.1618 1.7423H20.3019C23.0862 1.7367 24.089 0 28.2683 0C28.8957 0 29.5176 0.15126 30.145 0.408963C33.6296 1.85994 36.9686 6.7563 40.2571 7.87675C40.5428 7.97759 40.6268 8.33053 39.8425 9.09804Z"
                    :fill="(open_post_data.liked[0])?'red':'black'"
                  />
                </svg>
                <!--<q-icon><img class="q-mr-sm" src="~/assets/guby.svg" style="filter: invert(1);margin-top: -1.5vh" height="14px" /></q-icon>-->
              </q-btn>
              <p
                class="text-black fixsvgbtn q-mb-none q-mt-none text-xl text-weight-bold"
              >{{open_post_data.data[0].like}}</p>
            </div>
            <div class="row col-2 items-center q-ml-none">
              <q-btn flat color="transparent" class="col-4 q-ma-none h-100 q-pa-none likepanel">
                <!-- <img src="../../assets/PCMChatBubble.svg" class="absolute-center q-pa-none"/> -->
                <svg
                  width="3.1vh"
                  class="absolute-center q-pa-none"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27 0H3C1.35 0 0 1.35 0 3V30L6 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0Z"
                    fill="black"
                  />
                </svg>
              </q-btn>
              <p
                class="text-black q-mb-none fixsvgbtn text-xl q-mt-none text-weight-bold"
              >{{open_post_data.data[0].comm}}</p>
            </div>
            <div class="row col-2 q-ml-none">
              <q-btn
                @click="getmodel(open_post_data.data[0].modelid)"
                flat
                color="transparent"
                class="col-12 q-ma-none h-100 q-pa-none likepanel"
              >
                <!-- <img src="../../assets/PCMVideoCUM.svg" class="absolute-center q-pa-none"/> -->
                <svg
                  width="3.72vh"
                  class="absolute-center q-pa-none"
                  viewBox="0 0 36 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 9V2C28 0.9 27.1 0 26 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H26C27.1 24 28 23.1 28 22V15L36 23V1L28 9Z"
                    fill="black"
                  />
                </svg>
              </q-btn>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <div class="row bg-white absolute-bottom h-vh-5-st">
          <div class="mx-vw-1 row w-100 h-vh-5-st">
            <q-input
              v-on:keyup.enter="cl_createcomment()"
              borderless
              class="q-pa-none col-11 text-md h-vh-5-st"
              v-model="commm_send"
              placeholder="Добавить комментарий..."
            />
            <q-btn class="col-1 h-vh-5-st" flat @click="cl_createcomment()">
              <q-icon color="grey" name="mdi-send" class="h-vh-5-st" />
            </q-btn>
          </div>
        </div>
        <q-scroll-area
          ref="commentsscroll"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="comdial ml-vw-1 q-pa-none h-vh-75"
        >
          <div v-for="textcom in textcoms" :key="textcom.date" class="row">
            <q-avatar size="5.16vh">
              <img class="bordavatar" src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="ml-1 col">
              <p class="text-xl col-10 text-weight-medium q-mb-none">{{textcom.username}}</p>
              <p class="text-md q-mb-none">{{textcom.comments}}</p>
              <div class="row justify-between mr-vw-1">
                <div class="row">
                  <p class="text-comment-14 text-grey-8 q-mb-none">Ответить</p>
                  <p class="text-comment-14 text-grey-8 q-mb-none ml-vw-1">
                    Смотреть другие ответы()
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z"
                        fill="#8A8B91"
                      />
                    </svg>
                  </p>
                </div>
                <p class="text-comment-14 text-grey-8 q-mb-none">{{returnComent(textcom.date)}}</p>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import http from "../../http-common";
import { log } from "video.js";
//  import { getWorkerInstance } from '../../../src-pwa/custom-service-worker';
export default {
  data() {
    return {
      btnColor: "black",
      btnIcon: "favorite_border",
      videoid: null,
      commamount: null,
      commid: null,
      textcoms: null,
      commentsDialog: false,
      commm_send: null,
      open_post_data: null,
      recModels: 5,
      sub: "sub",
      checklive: false,
      models: null,
      girlsVideos: null,
      videoloadet: false,
      models_video: null,
      drawer: true,
      one: true,
      blocketlike: false,
      indexpostopen: null,
      swiperOption: {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        observer: true,
        mousewheel: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        onSlideChangeStart: function () {
          this.onActiveIndex();
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
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    this.swiper.on("transitionStart", () => {
      this.onActiveIndex(this);
    });
  },
  updated() {
    var vi2 = document.getElementById(this.videoid);
    if (vi2 && vi2.paused) {
      vi2.play();
      //vi2.muted = !vi2.muted;
    }
  },
  created() {
    this.$socket.emit("s_chagePage", {
      page: "index",
    });

    // рекомендованные модели
    http({
      method: "get",
      url: "/models",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.recModels = response.data;
      console.log("models \n");
      console.log(response.data);
    });
  },
  beforeCreate() {
    http({
      method: "get",
      url: "/podplist",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.auth) {
        this.subscribListL = true;
        this.subscribList = response.data;
        console.log("podplist \n");
        console.log(response.data);
      }
    });
    http({
      method: "get",
      url: "/videos_rec2",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.girlsVideos = response.data;
      console.log("videos_rec2 \n");
      console.log(this.girlsVideos);
      this.videoid = this.girlsVideos[0].id;
    });
    setTimeout(
      function () {
        this.videoloadet = true;
      }.bind(this),
      1500
    );
  },
  beforeDestroy() {},
  sockets: {
    // connect: function() {
    //   console.log('socket connected')
    // },

    cl_getAllMassage: function (response) {
      this.textcoms = response.reverse();
      if (!this.commentsDialog) {
        // жаль в js не работают хаки из c++
        this.commentsDialog = true;
      }
    },
    cl_massageSended: function (resopnse) {
      console.log(resopnse);
      if (resopnse == "ok") {
        let jsonobj = {
          comments: this.commm_send,
          date: new Date().toString(),
          username: localStorage.getItem("username"),
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
    cl_newMassage: function (response) {
      let jsonobj = {
        comments: response.comment,
        date: response.date,
        username: response.username,
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
    cl_likeStatus: function (response) {
      this.blocketlike = false;

      if (response.status == "ok" || response.status == "removed") {
        var vid = response.videoid;
        for (var i = 0; i < this.girlsVideos.length; i++) {
          if (this.girlsVideos[i].id[0] != vid) {
            continue;
          }
          if (response.status == "removed") {
            this.girlsVideos[i].liked[0] = false;
            this.girlsVideos[i].data[0].like--;
            console.log("disliked");
            break;
          } else {
            this.girlsVideos[i].liked[0] = true;
            this.girlsVideos[i].data[0].like++;
            console.log("liked");
            break;
          }
        }
      }
    },
    cl_postLiked: function (response) {
      var vid = response.videoid;
      for (var i = 0; i < this.girlsVideos.length; i++) {
        if (this.girlsVideos[i].id[0] != vid) {
          continue;
        }
        console.log(response.status);
        if (response.status == "liked") {
          this.girlsVideos[i].data[0].like++;
          break;
        } else if (response.status == "removed") {
          this.girlsVideos[i].data[0].like--;
          break;
        }
      }
    },
  },
  methods: {
    returnComent(text) {
      var ThisDate = new Date();
      var ComentDate = new Date(text);
      var Resurlt = ComentDate.tryHours() + ":" + ComentDate.tryMinuts();
      if (ThisDate.tryDate() > ComentDate.tryDate()) {
        Resurlt += " " + ComentDate.tryDate() + "." + ComentDate.tryMonth();
        if (ThisDate.getFullYear() > ComentDate.getFullYear()) {
          Resurlt += "." + getFullYear();
        }
      }
      return Resurlt;
    },
    onActiveIndex(play) {
      var vi1 = document.getElementById(this.videoid);
      if (vi1 && !vi1.paused) {
        vi1.pause();
      }
      this.videoid = this.girlsVideos[play.swiper.activeIndex].id[0];
      var vi2 = document.getElementById(this.videoid);
      if (vi2 && vi2.paused) {
        vi2.play();
      }
      // vi2.muted = !vi2.muted;
    },
    tags(tag) {
      let tags = String(tag);
      return tags;
    },
    getmodel(modelid) {
      http({
        method: "get",
        url: "/check_model",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          modelid: modelid,
        },
      }).then((response) => {
        if (response.data.status == "Y") {
          this.$router.push("/model_chat/" + modelid);
        } else {
          this.checklive = true;
        }
      });
    },
    subscribe(modelid) {
      http({
        method: "get",
        url: "/podp",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          modelid: modelid,
        },
      }).then((response) => {
        // to do
      });
    },
    checkLiveModel(modelid) {
      http({
        method: "get",
        url: "/check_model",
        headers: {
          "x-access-token": localStorage.getItem("token"),
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
      this.open_post_data = postdata;
      console.log(localStorage.getItem("token"));
      console.log(id);
      this.$socket.emit("s_getcomments", {
        token: localStorage.getItem("token"),
        videoid: id,
      });
    },
    cl_closePostComment(id) {
      (this.indexpostopen = null), (this.commamount = null);
      this.commid = null;
      this.commentsDialog = false;
      this.open_post_data = null;
      this.$socket.emit("s_closecomments", {
        token: localStorage.getItem("token"),
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
    //     if (!this.commentsDialog) { // жаль в js не работают хаки из c++
    //       this.commentsDialog = true;
    //     }
    //   });
    // }, comments_send
    cl_createcomment() {
      if (this.commm_send == null) {
        return;
      }
      this.$socket.emit("s_create_comment", {
        token: localStorage.getItem("token"),
        comment: this.commm_send,
        username: localStorage.getItem("username"),
        videoid: this.commid,
      });
    },
    cl_like(id, index) {
      if (this.blocketlike) {
        return;
      }
      this.blocketlike = true;
      console.log(this.girlsVideos[index]);
      // this.girlsVideos[index].liked[0] = !girlsVideos[index].liked[0];
      let socketobj = {
        token: localStorage.getItem("token"),
        userid: localStorage.getItem("userid"),
        videoid: id,
      };
      console.log(socketobj);
      this.$socket.emit("s_videoLike", {
        obj: socketobj,
      });
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
  },
};
</script>