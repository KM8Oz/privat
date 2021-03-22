<template>
  <q-layout class="bg-white profileminfix">
    <div :class="pcm.controls.dark? 'row bg-dark':'row' ">
      <div class="col-lg-2 col-md-3 mt-vh-4">
        <q-followings />
      </div>

      <div v-if="!auth" class="flex justify-center q-mt-xl text-black col">
        <h5>you can't access this data try ti signin</h5>
      </div>

      <div
        v-else
        class="col-lg-7 col-md-5 mt-vh-4 d-flex justify-content-center fullpageMT"
      >
        <!--Профиль модели-->
        <div v-if="thisModel" :class="pcm.controls.dark? 'w-60 h-100 m-mx-auto text-white': 'w-60 h-100 m-mx-auto text-dark'">
          <div class="row">
            <q-avatar size="10vh">
              <img style="border: 1px solid #ffffff" :src="ifexist(thisModel,'avatars') ? thisModel.avatars : 'https://rec.camsguns.com/avatars/hashtag.png'" />
            </q-avatar>

            <div class="row h-md flex-1 items-center">
              <div class="col q-mb-none ml-vw-1">
                <div class="col-12 row">
                  <p class=" h-mc text-weight-bold text-30 q-ma-none">
                    {{ thisModel.name }}
                  </p>
                </div>
                <p class=" h-mc text-comment-18 q-ma-none">
                  @{{ thisModel.name }}
                </p>
              </div>
              <!-- <q-btn rounded no-caps class="q-mt-sm" dense color="pink-13">
                <p class="text-white q-mx-sm q-mb-none">Подписаться</p>
              </q-btn> -->
              <!-- <q-btn
                flat
                icon="settings"
                class="text-black h-mc ml-auto"
                to="/profile/settings"
              /> -->
              <q-btn
                v-if="auth"
                class="w-35 col-3 q-my-auto q-px-none q-py-none q-mx-none"
                @click="subscribe()"
                dense
                rounded
                :outline="modell.issubscribe"
                color="pink-6"
                no-caps
              >
                <p
                  class="q-ma-none text-md text-weight-regular q-pa-none q-ma-none"
                  v-if="!modell.issubscribe"
                >
                  Подписаться
                </p>
                <p
                  class="q-ma-none text-md text-weight-regular q-py-none q-px-custom q-ma-none"
                  v-if="modell.issubscribe"
                >
                  Отписаться
                </p>
              </q-btn>
            </div>
            <!-- @click="" -->
          </div>

          <div class=" flex-center-div row mt-vh-2">
             <q-profilebar v-if="showbar" :id="thisModel.id" :notpravite="false"/>
          </div>
          <!-- <div class="infomain col-12 row items-center q-mb-md">
            <div
              class="col row q-mt-md q-ml-md items-center q-mb-md text-black"
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
          </div> -->
          <!-- <div class="infomain col-12 row items-center q-mb-md">
            <div
              class="col row q-mt-md q-ml-md items-center q-mb-md text-black"
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
          </div> -->

          <div class=" row mt-vh-2 text-max3-18 w-100">
            <p class="w-100"></p>
          </div>
          <div class="row"></div>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="h-65"
          >
            <div class="row" v-if="vidos">
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
                <div class="bg-black rounded-borders flex">
                  <vue-plyr class="mute-right">
                    <video
                      data-plyr-config='{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}'
                      class="col-12"
                      :id="item._id"
                      :src="item._source.body.video.replace('.mp4','_mobile.mp4')"
                      color="black"
                      type="video/mp4"
                    />
                  </vue-plyr>
                </div>
              </div>
            </div>
            <div class="row" v-else>
            <span>no videos</span>
            </div>
          </q-scroll-area>
        </div>

        <!--Профиль юзера-->

        <div v-else class="w-60 h-100 m-mx-auto">
          <div class="row m-mx-auto">
            <div class="row col-12">
              <q-avatar size="10vh">
                <img
                  style="border: 1px solid #ffffff"
                  :src="thisModel.avatars ? thisModel.avatars : 'https://rec.camsguns.com/avatars/hashtag.png'"
                />
              </q-avatar>
              <div class="row h-mc flex-1 flex-center">
                <div class="col q-mb-none ml-vw-1">
                  <div class="col-12 row">
                    <p
                      class="text-black h-mc text-weight-bold text-30 q-ma-none"
                    >
                      {{ thisModel.name }}
                    </p>
                  </div>
                  <p class="text-black h-mc text-comment-18 q-ma-none">
                    @{{ thisModel.name }}
                  </p>
                  <div class="row">
                    <p v-if="podpleight != null" class="text-black q-mr-xl">
                      {{ podpleight }} Подписки
                    </p>
                  </div>
                </div>

                <q-btn
                  v-if="auth"
                  class="w-35 h-10 q-px-none q-py-none q-mx-none"
                  @click="subscribe"
                  dense
                  rounded
                  :outline="modell.issubscribe"
                  color="pink-6"
                  no-caps
                >
                  <p
                    class="q-ma-none text-md text-weight-regular q-pa-none q-ma-none"
                    v-if="!modell.issubscribe"
                  >
                    Подписаться
                  </p>
                  <p
                    class="q-ma-none text-md text-weight-regular q-py-none q-px-custom q-ma-none"
                    v-if="modell.issubscribe"
                  >
                    Отписаться
                  </p>
                </q-btn>
                <!-- <q-btn
                  flat
                  icon="settings"
                  class="text-black h-mc ml-auto"
                  to="/profile/settings"
                /> -->
              </div>
              <!-- @click="" -->
            </div>
            <!-- <div class="infomain col-12 row items-center q-mb-md mt-vh-2">
              <div
                class="col-8 row q-mt-md q-ml-md items-center q-mb-md text-black"
              >
                <q-icon name="fiber_manual_record" />
                <p class="q-mb-none q-ml-xs">Баланс:</p>
                <p
                  class="text-grey q-mb-none q-ml-xs"
                  v-if="balance == null || balance == 0"
                >
                  0T
                </p>
                <p v-else class="text-grey q-mb-none q-ml-xs">{{ balance }}T</p>
              </div>
              <q-btn
                rounded
                size="9px"
                class="col q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs q-mr-xs"
                label="Пополнить баланс"
                color="pink-6"
                @click="depositDialog = true"
              />
            </div> -->
            <p class="text-black full-width flex flex-center">Мои поцелуи</p>
          </div>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="h-65"
          >
          
          
   
            <div class="row">
              <div
                v-for="(item, index) in vidos"
                :key="item._id"
                v-bind:class="[
                  { 'ml-09': index % 3 != 0 },
                  'w-33',
                  'q-pa-none',
                  'q-mt-xs',
                  'mb-1',
                ]"
              >
                <div class="bg-black rounded-borders flex" v-if="item.body">
                        <transition  appear
  enter-active-class="animated bounceInUp"
  leave-active-class="animated bounceOutDown"
  >
                  <vue-plyr class="mute-right">
                    <video
                      data-plyr-config='{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}'
                      class="col-12 "
                      :id="item._id"
                      :src="item.body.video.replace('.mp4','_desktop.mp4')"
                      color="black"
                      type="video/mp4"
                    />
                  </vue-plyr>
                           </transition>
                </div>
              </div>
            </div>

          </q-scroll-area>
        </div>
      </div>
      <q-listrec />
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
/* <script src="https://static.yamoney.ru/checkout-js/v1/checkout.js">
 */

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
      modell: {
        id: this.$route.params.modelid,
        issubscribe: false,
      },
      vidos: null,
      isModel: false,
      balance: 0,
      withdrawDialog: false,
      options: ["RUB", "USD", "EUR", "CNY", "JPN"],
      currency: null,
      amount: null,
      depositDialog: false,
      yad: false,
      showbar:false,
      amount_deposit: null,
      order_id: 0,
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      playedid: null,
      pin: "",
      thisModel:null,
      token: null,
      username: null,
      userid: null,
      name: LocalStorage.getItem("name"),
      auth: null,
      thsincom: "Токены от ID:",
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
   ...mapState(['pcm']),
   thisMAv:function(){
     return !!(this.thisModel?.avatars)
   }
  },
  sockets: {
    checkifsubrs: function (res) {
      if (res.data) {
        this.modell.issubscribe = true;
        this.modell.id = res.id;
        this.podpleight = res.totals;
      } else {
        this.modell.issubscribe = false;
        this.modell.id = res.id;
        this.podpleight = res.totals;
      }
    },
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
    cl_getuserinfos: function (response) {
      console.log(response)
      this.showbar = true
      this.thisModel = response;
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
    cl_subscribeControle: function (response) {
      //#//===--- this is for nnotification don't touch it please ----===//#//
      if (response.status == "added") {
        this.modell.issubscribe = true;
        this.$q.notify({
          color: "pink-6",
          message: "Подписка на " + response.name + " оформлена",
          classes: "glossy",
          timeout: 500,
        });
      }
      if (response.status == "removed") {
        this.modell.issubscribe = false;
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
  },
  mounted() {
    this.getdata(this.$route.params.modelid);
    // const checkout = YandexCheckout(
    //   "7CD398BA5F300CE05CE19E46EA4ACA4EB5AA9728AF031DA21ED6D331B685BB02"
    // );
  },
  created() {
    this.$socket.emit("s_chagePage", {
      token: this.token,
      page: "index",
    });
  },
  beforeMount:function(){
       this.token = this.pcm.user.tk
      this.username = this.pcm.user.un
      this.userid = this.pcm.user.id
      this.auth = this.pcm.auth
      this.isModel = this.pcm.user.rol
      this.thsincom = "Токены от ID:"+this.username
 if (!this.auth) {
      this.$router.push("/");
    } else {
          this.$socket.emit("identification", {
      token: this.pcm.user.tk,
      update: false,
    });
    }
  },

  methods: {
    ifexist(array,val){
      return !!array[val]
    },
    subscribe() {
      // console.log({
      //   sender: this.pcm.user.id,
      //   receiver: this.modell.id,
      //   token: this.pcm.user.tk,
      //   index: 0,
      // });
      this.$socket.emit("subscribeControle", {
        sender: this.pcm.user.id,
        receiver: this.modell.id,
        token: this.pcm.user.tk,
        index: 0,
      });
      this.$socket.emit("checkifsubrs", {
        userid: this.pcm.user.id,
        modelid: id,
      });
    },
    getdata: function (id) {
      this.$socket.emit("getuserinfoprofile", {
        id: id,
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
.infomain {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
}
.vidoss {
  height: 15vh;
}
.h100 {
  height: 90%;
}
</style>
