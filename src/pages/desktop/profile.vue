<template>
  <q-layout :class="!pcm.controls.dark? 'bg-white profileminfix text-black h-vh-100': 'bg-dark h-vh-100 profileminfix text-white'">
    <div class="row profile-container wrap">
      <div class="col-lg-2 col-md-2 col-sm-2 mt-vh-4 row justify-end">
        <q-followings />
      </div>

      <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
        class="col-lg-7 col-md-7 col-sm-6 row  mt-vh-4 justify-center"
      >
        <!--Профиль модели-->
        <div v-if="pcm.user.rol" class="h-100 q-mx-lg">
         <q-vueProfile  :name="thisModel.name" :username="username" :avatar="thisModel.avatars"/>
          <div class=" row flex-center-div">
            <q-profilebar v-if="showbar" :id="thisModel.id" :notpravite="true"/>
          </div>
          <div :class="pcm.controls.dark ? 'infomain col-12 bg-dark text-white row items-center q-mb-xs' :'infomain col-12 bg-white text-black row items-center q-mb-xs'">
            <div
              class="col row q-mt-md q-ml-md items-center q-mb-md "
            >
              <q-icon name="fiber_manual_record" />
              <p class="q-mb-none q-ml-xs text-comment-18">Баланс:</p>
              <p class="text-grey q-mb-none q-ml-xs text-comment-18">
                {{ balance }}T
              </p>
            </div>

            <q-btn
              rounded
              size="9px"
              class="col-3 q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs q-mr-xs"
              @click="payout()"
              color="pink-6"
              label="Запросить вывод"
            />
          </div>
          <div class="infomain col-12 row items-center q-mb-xs">
            <div
              class="col row q-mt-md q-ml-md items-center q-mb-md "
            >
              <q-icon name="fiber_manual_record" />
              <p class="q-mb-none q-ml-xs text-comment-18">Пин код:</p>
              <p class="text-grey q-mb-none q-ml-xs text-comment-18">
                {{ pin }}
              </p>
            </div>
            <q-btn
              rounded
              size="9px"
              class="col-3 q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs q-mr-xs"
              @click="identification()"
              color="pink-6"
              label="Получить новыи"
            />
            <p class=" full-width flex flex-center">видео-библиотека</p>
          </div>
            <div class="row">
              <div
                v-for="(item, index) in vidos"
                :key="item._id"
                v-bind:class="[
                  { 'ml-09': index % 3 != 0 },
                  'w-32',
                  'q-pa-none',
                  'q-pa-none',
                  'mb-1',
                ]"
              >
                <div>
                  <!-- <vue-plyr class="mute-right">
                    <video
                      data-plyr-config='{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}'
                      class="videoprofile-inter"
                      :id="item._id"
                      :src="item._source.body.video.replace('.camsguns.com','.cg.house').replace('.mp4','_mobile.mp4')"
                      color="black"
                      type="video/mp4"
                    />
                  </vue-plyr> -->
                   <q-cart :src="item._source.body.video" :disable="true" :modelname="item._source.body.modelname" :modelid="item._source.body.modelid" :tags="item._source.body.tags" :data-image="item._source.body.video.replace('.camsguns.com','.cg.house').replace('.mp4','_mobile.png')">
    <h1 slot="header">{{item._source.body.modelname}}</h1>
    <p slot="content">{{item._source.body.title+": "+item._source.body.example+"/ "+ item._source.body.tags.join(',')}}</p>
  </q-cart>
                </div>
              </div>
            </div>
        </div>

        <!--Профиль юзера-->

        <div v-else class="h-100 q-mx-lg">
          <div class="row m-mx-auto">
            <div class="flex column col-12 setting-border ">
              <q-avatar size="10vh" class="self-center setting-border-avatar">
                <img
                
                  :src="thisModel.avatars.replace('.camsguns.com','.cg.house')"
                />
              </q-avatar>
              <div class="col self-center">
                  <div class="self-center">
                    <p
                      class=" text-center text-weight-bold oswald-regular text-30 q-ma-none"
                    >
                      {{ thisModel.name }}
                    </p>
                  </div>
<div class="row">
  
                    <q-profilebar v-if="showbar" :id="thisModel.id" :notpravite="true"/>
                     <q-btn
                  flat
                  icon="settings"
                  class=" h-mc ml-auto q-ma-xs"
                  to="/profile/settings"
                />
                  </div>
                <!-- <q-btn rounded no-caps class="q-mt-sm" dense color="pink-13">
                <p class="text-white q-mx-sm q-mb-none">Подписаться</p>
              </q-btn> -->
               
              </div>
              <!-- @click="" -->
            </div>
             <div :class="pcm.controls.dark ? 'infomain col-12 bg-dark text-white row items-center q-mt-md q-mb-xs' :'infomain col-12 bg-white text-black q-mt-md row items-center q-mb-xs'">
              <div
                class="col-8 row q-mt-md q-ml-md items-center q-mb-md justify-start align-center"
              >
                <q-icon name="fiber_manual_record" />
                <p class="q-mb-none q-ml-xs">{{$t('settings.balance')}}:</p>
                <kbd
                  class="text-grey q-my-auto q-mx-md"
                  v-if="balance == null || balance == 0"
                >
                  0.0 Tkn
                </kbd>
                <kbd v-else class="text-grey q-my-auto q-mx-md">{{ balance }}T</kbd>
              </div>
              <q-btn
                rounded
                size="9px"
                class="col q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs q-mr-xs"
                label="Пополнить баланс"
                color="pink-6"
                @click="depositDialog = true"
              />
            </div>
            <p class=" full-width flex flex-center">{{$t('settings.list_liked')}}</p>
          </div>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="h-vh-60 q-pb-xl"
          >
            <div class="row">
              <div
                v-for="(item, index) in vidos"
                :key="item._id"
                v-bind:class="[
                  { 'ml-09': index % 3 != 0 },
                  'w-32',
                  'q-pa-none',
                  'q-pa-none',
                  'mb-1',
                ]"
              >
                <!-- <div class="rounded-borders videoprofile" v-if="item._source.body">
                  <vue-plyr class="mute-right">
                    <video
                      data-plyr-config='{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}'
                      class=" videoprofile-inter"
                      :id="item._id"
                      :src="item._source.body.video.replace('.camsguns.com','.cg.house').replace('.mp4','_mobile.mp4')"
                      color="black"
                      type="video/mp4"
                    />
                  </vue-plyr>
                   <q-icon name='zoom_out_map' color="white" size="20px" @click="openfullvideo(item)" class="z-index-video"/>
             
                </div> -->
                            <q-cart :disable="true" :src="item._source.body.video" :modelname="item._source.body.modelname" :modelid="item._source.body.modelid" :tags="item._source.body.tags" :data-image="item._source.body.video.replace('.camsguns.com','.cg.house').replace('.mp4','_mobile.png')">
    <h1 slot="header">{{item._source.body.modelname}}</h1>
    <p slot="content">{{item._source.body.title+": "+item._source.body.example+"/ "+ item._source.body.tags.join(',')}}</p>
  </q-cart>
              </div>
            </div>
          </q-scroll-area>
                    <q-dialog v-model="fullvideo.open" position="bottom" class="full-video-profile" transition-show="bounceIn" >
      <q-card class="profilefullvideo" v-if="fullvideo.video">
        <q-btn
        v-if="pcm.user.rol"
      :loading="loading"
      :percentage="percentage"
      dark-percentage
      unelevated
      color="red"
      class="delete_btn"
      text-color="black"
      @click="startComputingdelete(fullvideo.id, token)"
      icon="delete_forever"
      style="width: 100px"
    />
        <vue-plyr class="mute-right" >
                    <video
                      @play="setProgressBar"
                      controls="false"
                      class="custHeight"
                      data-plyr-config='{ "controls": ["mute"]}'
                      ref="dialogVideo"
                      :src="fullvideo.video.video.replace('.camsguns.com','.cg.house').replace('.mp4','_desktop.mp4')"
                      color="black"
                      type="video/mp4"
                    />
                  </vue-plyr>
        <q-linear-progress :value="fullvideo.progress" color="pink" />

        <q-card-section class="row items-center no-wrap">
          <div class="text-left">
              <div class="text-weight-bold text-uppercase">@{{ fullvideo.video.tags ? fullvideo.video.modelname : 'none'}}</div>
            <div class="text-grey">{{fullvideo.video.tags ? fullvideo.video.tags[0] : '#none'}}</div>
          </div>

          <q-space />

          <q-btn flat round icon="play_arrow" @click="$refs.dialogVideo.play()"/>
          <q-btn flat round icon="pause" @click="$refs.dialogVideo.pause()"/>
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
        </div>
      </q-scroll-area>
  <div class="col-lg-3 col-md-3 col-sm-3 mt-vh-4 justify-start">
      <q-listrec  />
  </div>
    </div>

    <q-dialog v-show="withdrawDialog" class="row">
      <q-card class="bg-white full-width fullpage q-pl-sm q-pr-sm">
        <p>Укажите необходимую сумму и валюту для вывода</p>
        <q-select
          class="col-12 q-pt-sm"
          outlined
          v-model="currency"
          :options="options"
          label="Валюта вывода"
        />
        <q-input
          class="col-12 q-pt-sm"
          outlined
          v-model="amount"
          placeholder="сумма токенов"
        />
        <q-btn
          color="pink-13"
          class="no-shadow full-width q-mt-sm q-mb-sm"
          @click="withdraw()"
          label="Вывести"
        ></q-btn>
      </q-card>
    </q-dialog>

    <q-dialog v-model="depositDialog">
      <q-card
        color="white"
        class="w-vw-20 h-vh-30 absolute-center flex q-px-md"
      >
        <div
          v-if="!yad"
          class="mt-vh-4 row flex-center-div flex-center-vertical"
        >
          <div>
            <p class="q-pa-none">
              1 токен равен 1 рубль укажите сумму в рублях ниже
            </p>
            <q-input v-model="amount_deposit" outlined placeholder="Сумма" />
            <q-btn
              rounded
              class="no-shadow w-60 mt-vh-2 ml-20 text-center bg-pink-6 text-white"
              label="Перейти в кассу"
              @click="depositstart()"
            />
          </div>
        </div>
        <div v-else class="flex-center-div flex-center-vertical">
          <!-- start -->
          <div>
            <div>
              Сформирован счет № {{ order_id }} на сумму:
              {{ amount_deposit }} токенов
            </div>
            <form
              method="POST"
              class="flex w-70 ma-auto"
              action="https://money.yandex.ru/quickpay/confirm.xml"
            >
              <input type="hidden" name="receiver" value="4100115505163705" />
              <input type="hidden" name="formcomment" value="Токены" />
              <input type="hidden" name="short-dest" value="Покупка токенов" />
              <input
                type="hidden"
                name="label"
                :value="amount_deposit + ' Токенов'"
              />
              <input type="hidden" name="quickpay-form" value="donate" />
              <input type="hidden" name="targets" :value="amount_deposit" />
              <input
                type="hidden"
                name="sum"
                :value="amount_deposit"
                data-type="number"
              />
              <input type="hidden" name="comment" :value="thsincom" />
              <input type="hidden" name="need-fio" value="false" />
              <input type="hidden" name="need-email" value="false" />
              <input type="hidden" name="need-phone" value="false" />
              <input type="hidden" name="need-address" value="false" />
              <input type="hidden" name="paymentType" value="AC" />
              <q-btn
                rounded
                class="flex-center bg-pink-6 mt-vh-2 w-100 text-white"
                type="submit"
                label="Перейти к оплате"
              />
            </form>
          </div>
        </div>
        <!-- end -->
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import http from "../../http-common";
import { LocalStorage } from "quasar";
import { mapState } from 'vuex';
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      plyr: {
        fullscreen: { enabled: false },
      },
      podpleight: 0,
      followers: 0,
      likes: 0,
      loading:null,
      vidos: null,
      isModel: false,
      percentage:null,
      balance: 0,
      auth: null,
      withdrawDialog: false,
      options: ["RUB", "USD", "EUR", "CNY", "JPN"],
      currency: null,
      amount: null,
      interval:null,
      depositDialog: false,
      yad: false,
      amount_deposit: null,
      order_id: 0,
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      playedid: null,
      pin: "",
      token: null,
      username: null,
      userid: null,
      fullvideo:{
        open:false,
        video:null,
        id:null,
        progress:null
      },
      name: LocalStorage.getItem("name"),
      auth: null,
      thsincom: "Токены от ID:",
      thisModel: {
        avatars: null,
        createdAt: null,
        is_vip: null,
        name: null,
        pub_streamid: null,
        sec_streamid: null,
        updatedAt: null,
        videos: {},
      },
      showbar:false,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
      controls: [
        "play-large", // The large play button in the center
        "restart", // Restart playback
        "rewind", // Rewind by the seek time (default 10 seconds)
        "play", // Play/pause playback
        "fast-forward", // Fast forward by the seek time (default 10 seconds)
        "progress", // The progress bar and scrubber for playback and buffering
        "current-time", // The current time of playback
        "duration", // The full duration of the media
        "mute", // Toggle mute
        "volume", // Volume control
        "captions", // Toggle captions
        "settings", // Settings menu
        "pip", // Picture-in-picture (currently Safari only)
        "airplay", // Airplay (currently Safari only)
        "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
        "fullscreen", // Toggle fullscreen
      ],
    };
  },
  computed:{
   ...mapState(['pcm'])
  },
  beforeMount(){
    this.token = this.pcm.user.tk;
    this.username = this.pcm.user.un;
    this.userid = this.pcm.user.id;
    this.auth = this.pcm.auth;
    this.thsincom = "Токены от ID:"+ this.username
         if(!this.auth){
            this.$router.push('/')
      } else {
          this.$socket.emit("identification", {
      token: this.pcm.user.tk,
      update: false,
    });
        http({
          method: "get",
          url: "/balance",
          headers: {
            "x-access-token": this.pcm.user.tk,
          },
        }).then((response) => {
          this.balance = response.data.balance;
        });
      }
  },
  sockets: {
    identification: function (response) {
      this.pin = response.uuid;
    },
    cl_authcontroll: function (response) {
      if (response.massage == "auth") {
        this.auth = true;
      } else if (response.massage == "deauth") {
        this.auth = false;
      }
    },
    cl_subscribeControle: function (response) {
      //#//===--- this is for nnotification don't touch it please ----===//#//

      if (response.status == "ok") {
        this.recModels[response.index].issubscribe = false;
        this.$q.notify({
          color: "pink-6",
          message: "Подписка на " + response.name + " оформлена",
          classes: "glossy",
          timeout: 500,
        });
      }
      if (response.status == "removed") {
        this.recModels[response.index].issubscribe = true;
        this.$q.notify({
          color: "pink-6",
          message: "Вы отказались от подписки на " + response.name,
          classes: "glossy",
          timeout: 500,
        });
      }
      if (response.status == "error") {
        if (response.log == "you can not follow your self") {
          this.$q.notify({
            color: "pink-6",
            message: "Вы не можете подписаться сами на себя ",
          });
        }
      }
      if (response.opennotifs) {
        askForPermissioToReceiveNotifications(response.id, Platform.is);
      }
    },
    cl_getuserinfos: function (response) {
      this.showbar = true;
      this.thisModel = response;
      console.log("model infos:",response.videos)
      this.vidos = response.videos;
      if (this.vidos) {
        for (var i = 0; i < this.vidos.length; i++) {
          // this.player[i] = new Plyr("#"+this.vidos[i]._id);
          this.vidos[i].status = "mdi-play";
        }
      }
      this.followers = response.subscribers;
      this.podpleight = response.subscribing;
    },
  },
  mounted() {
//  console.log(this.pcm.user.rol);
    // const checkout = YandexCheckout(
    //   "7CD398BA5F300CE05CE19E46EA4ACA4EB5AA9728AF031DA21ED6D331B685BB02"
    // );
  },
  created() {
    this.$socket.emit("s_chagePage", {
      page: "index",
    });
    this.$socket.emit("getuserinfo", {
      token: this.pcm.user.tk,
      username: this.username,
    });
  },
  beforeCreate() {
   

  },

  methods: {
    startComputingdelete (id, token) {
     
      this[`loading`] = true
      this[`percentage`] = 0
      this[`interval`] = setInterval(() => {
        this[`percentage`] += Math.floor(Math.random() * 8 + 10)
  
        if (this[`percentage`] >= 100) {
           //console.log({id, token});
            this.$socket.emit('deletevideobyid', {id:id, token: token }, (res)=>{
         if(res.status){
            this.$q.notify({
                 type:'positive',
                 message:'deleted with success.'
               })
         } else {
            this.$q.notify({
              type:'nigative',
              message:res.reason
            })
         }
         })
          clearInterval(this[`interval`])
          this[`loading`] = false
        }
      }, 700)
    },
            setProgressBar(evt){
    const progresser =  setInterval(()=>{
        this.fullvideo.progress = evt.target.currentTime / evt.target.duration;
       if( evt.target.currentTime === evt.target.duration || evt.target.paused)  clearInterval(progresser) 
     },100)
    },
        openfullvideo(video){
     this.fullvideo.video = video._source.body;
     this.fullvideo.open = true;
     this.fullvideo.id = video._id
    },
    subscribe(modelid, modell, index) {
      this.$socket.emit("subscribeControle", {
        sender: this.pcm.user.id,
        receiver: modelid,
        token: this.pcm.user.tk,
        index: index,
      });
    },
    identification() {
      this.$socket.emit("identification", {
        token: this.pcm.user.tk,
        update: true,
      });
    },
    payout() {
      this.withdrawDialog = true;
    },
    depositstart() {
      http({
        method: "get",
        url: "/depositstart",
        headers: {
          "x-access-token": this.pcm.user.tk,
          amount: this.amount_deposit,
        },
      }).then((response2) => {
        this.order_id = response2.data.link.id;
        this.yad = true;
      });
    },
    withdraw() {
      this.withdialog = false;
      http({
        method: "get",
        url: "/withdraw",
        headers: {
          "x-access-token": this.pcm.user.tk,
          amount: parseFloat(this.amount),
          currency: this.currency,
        },
      }).then((response2) => {
        this.alert = response2.data.status;
        if (response2.data.status == "done") {
          location.reload();
        } else {
          this.$q.notify({
            color: "negative",
            message: "Что-то пошло не так!",
          });
        }
      });
    },
  },
};
</script>

<style>
.profile-container{
 max-height: 100%;
 height: 93%;
}
.infomain {
 
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 25px;
  box-decoration-break: clone;
  box-sizing: border-box;
  box-shadow: 0px 2px 0px #e5e5e5;
  margin: 10px 0px;
}
@media (max-height: 790px){
.videoprofile-inter{
  width:160px !important;
}
}
.videoprofile-inter{
  width:360px !important;
}
.h100 {
  height: 90%;
}
</style>
