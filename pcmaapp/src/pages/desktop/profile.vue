<template>
  <q-layout class="bg-white profileminfix">
    <div class="row">
         <div class="col-lg-2 col-md-3 mt-vh-4">
      <q-list class="menu-list text-black q-pa-none ">
        <q-item clickable v-ripple class=" q-pa-none h-vh-5-st">
          <q-item-section avatar class=" ml-vw-1  col-1 q-pr-none">
            <q-icon size="3.1vh" name="home" class="text-pink-6" />
          </q-item-section>

          <q-item-section class="text-pink-6 text-fxl ml-vw-1">Рекомендуемые</q-item-section>
        </q-item>
        <q-item clickable v-ripple class=" q-pa-none h-vh-5-st">
          <q-item-section avatar class="ml-vw-1  col-1 q-pa-none">
            <q-icon size="3.1vh" name="people_outline" />
          </q-item-section>
          <q-item-section class="ml-vw-1 text-fxl">Подписки</q-item-section>
        </q-item>
        <q-separator class="bg-grey-4" />

        <q-item v-if="!subscribListL">
          <q-item-label caption class="text-xl text-weight-thin text-black">Здесь появятся аккаунты, на которые вы подписаны</q-item-label>
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

              <div class="row justify-end col q-pt-none">
              </div>
            </div>
          </div>
        </div>
      </q-list>
    </div>

      <div v-if="!auth" class="flex justify-center q-mt-xl text-black col">
        <h5></h5>
      </div>

      <div v-else class="col-lg-7 col-md-5 mt-vh-4 d-flex justify-content-center fullpageMT">
        <!--Профиль модели-->
        <div v-if="isModel" class="w-60 h-100 m-mx-auto">

          <div class="row">
            
            <q-avatar size="10vh">
              <img
                style="border: 1px solid #ffffff;"
                :src=thisModel.avatars
              />
            </q-avatar>
            <div class="row h-mc flex-1">
              <div class="col q-mb-none ml-vw-1">
                <div class="col-12 row">
                <p
                  class="text-black h-mc text-weight-bold text-30 q-ma-none" 
                >{{thisModel.name}}</p>
                </div>
                <p
                  class="text-black h-mc text-comment-18 q-ma-none"
                >@{{username}}</p>
                
              </div>
              <!-- <q-btn rounded no-caps class="q-mt-sm" dense color="pink-13">
                <p class="text-white q-mx-sm q-mb-none">Подписаться</p>
              </q-btn> -->
              <q-btn  flat icon="settings" class="text-black h-mc ml-auto" to="/profile/settings"/>
            </div>
              <!-- @click="" -->
            
          </div>

          <div class="text-black row mt-vh-2">
            <p class="text-comment-18 text-weight-bold ">{{podpleight}}</p>
            <p class="text-comment-18">	&nbsp;Подписки</p>

            <p class="text-comment-18 text-weight-bold ml-vw-05">{{followers}}</p>
            <p class="text-comment-18">	&nbsp;Подписчики</p>

            <p class="text-comment-18 text-weight-bold ml-vw-05">{{likes}}</p>
            <p class="text-comment-18">	&nbsp;Поцелуи</p>
          </div>
          <div class="infomain col-12 row items-center q-mb-md">
            <div class="col row q-mt-md q-ml-md items-center q-mb-md text-black">
              <q-icon name="fiber_manual_record" />
              <p class="q-mb-none q-ml-xs text-comment-18">Баланс:</p>
              <p class="text-grey q-mb-none q-ml-xs text-comment-18">{{balance}}T</p>
            </div>

            <q-btn
              rounded
              dense
              @click="withdrawDialog == true"
              no-caps
              color="pink-13"
            >
              <p class="q-mb-none text-comment-14">Запросить вывод</p>
            </q-btn>
          </div>
          <div class="text-black row mt-vh-2 text-max3-18 w-100">
            <p class="w-100">Описание 3 строки<br>Описание 3 строки<br>Описание 3 строки</p>
          </div>
          <div class="text-black row "></div>
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-65">
            <div class="row">
              <div v-for="(item,index) in vidos" :key="item._id" v-bind:class="[{'ml-09':index%3!=0},'w-32','q-pa-none','q-pa-none','mb-1']">
                <div class="bg-black rounded-borders flex">
                  <vue-plyr class="mute-right">
                  <video 
                    data-plyr-config='{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}'
                    class="col-12"
                    :id="item._id"
                    :src="item._source.body.video"
                    color="black"
                    type="video/mp4"
                  />
                  </vue-plyr>
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>

        <!--Профиль юзера-->

        <div v-else class="w-60 h-100 m-mx-auto">
          <div class="row m-mx-auto">
               <div class="row col-12">
            
            <q-avatar size="10vh">
              <img
                style="border: 1px solid #ffffff;"
                :src=thisModel.avatars
              />
            </q-avatar>
            <div class="row h-mc flex-1">
              <div class="col q-mb-none ml-vw-1">
                <div class="col-12 row">
                <p
                  class="text-black h-mc text-weight-bold text-30 q-ma-none" 
                >{{thisModel.name}}</p>
                </div>
                <p
                  class="text-black h-mc text-comment-18 q-ma-none"
                >@{{username}}</p>
                <div class="row ">
                <p v-if="podpleight!=null" class="text-black q-mr-xl">{{podpleight}} Подписки</p>
              </div>
              </div>

              <!-- <q-btn rounded no-caps class="q-mt-sm" dense color="pink-13">
                <p class="text-white q-mx-sm q-mb-none">Подписаться</p>
              </q-btn> -->
              <q-btn  flat icon="settings" class="text-black h-mc ml-auto" to="/profile/settings"/>
            </div>
              <!-- @click="" -->
            
          </div>
            <div class="infomain col-12 row items-center q-mb-md mt-vh-2">
              <div class="col-8 row q-mt-md q-ml-md items-center q-mb-md text-black">
                <q-icon name="fiber_manual_record" />
                <p class="q-mb-none q-ml-xs">Баланс:</p>
                <p class="text-grey q-mb-none q-ml-xs" v-if="balance == null||balance == 0">0T</p>
                <p v-else class="text-grey q-mb-none q-ml-xs">{{balance}}T</p>
              </div>

              <q-btn
                rounded
                dense
                class="col q-mr-md"
                @click="depositDialog = true"
                no-caps
                color="pink-13"
              >
                <p class="q-mb-none q-mx-xs">Пополнить баланс</p>
              </q-btn>
            </div>
            <p class="text-black full-width flex flex-center">Мои поцелуи</p>
          </div>
          <q-scroll-area  :thumb-style="thumbStyle" :bar-style="barStyle" class="h-65">
            <div class="row">
              <div v-for="(item,index) in vidos" :key="item._id" v-bind:class="[{'ml-09':index%3!=0},'w-32','q-pa-none','q-pa-none','mb-1']">
                <div class="bg-black rounded-borders flex" v-if="item.body">
                  <vue-plyr class="mute-right">
                  <video
                    data-plyr-config='{ "controls": ["play-large","play","settings","mute"], "settings": ["quality"]}'
                    class="col-12"
                    :id="item._id"
                    :src="item.body.video"
                    color="black"
                    type="video/mp4"
                  />
                  </vue-plyr>
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>

      <!--Рекомендации-->
            <div class="col-lg-3 col-md-4 mt-vh-4">
        <q-card class="text-black q-pa-none q-card-fix ">
          <q-card-section class="q-pb-none">
            <div class="row items-baseline">
              <p class="col text-fxl font-weight-bolder line-height-1">Рекомендуемые девушки</p>
              <p class="col text-pink text-xl" align="right">Все</p>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-pr-none">
            <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-vh-30">

              <div v-for="modell in this.recModels" :key="modell.userId" class="row items-center q-mb-none mr-vw-1">
                <q-avatar size="5vh">
                  <img class="bordavatar" :src="modell.avatars" />
                </q-avatar>
                <div class="q-mt-md q-ml-sm" v-if="modell.UuserId != undefined">
                  <p class="text-xl col-10 text-weight-medium q-mb-none">{{modell.UuserId.username}}</p>
                  <p class="text-md">@{{modell.UuserId.username}}</p>
                </div>

                <div class="row justify-end col q-pt-none">
                  <q-btn @click="subscribe(model.userId)" dense rounded outline color="pink-6" no-caps>
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
    </div>

    <q-dialog v-model="withdrawDialog" class="row">
      <q-card class="bg-white full-width q-pl-sm q-pr-sm">
        <p>Укажите необходимую сумму и валюту для вывода</p>
        <q-select
          class="col-12 q-pt-sm"
          outlined
          v-model="currency"
          :options="options"
          label="Валюта вывода"
        />
        <q-input class="col-12 q-pt-sm" outlined v-model="amount" placeholder="сумма токенов" />
        <q-btn
          color="pink-13"
          class="no-shadow full-width q-mt-sm q-mb-sm"
          @click="withdraw()"
          label="Вывести"
        ></q-btn>
      </q-card>
    </q-dialog>

    <q-dialog v-model="depositDialog">
      <q-card color="white" class="absolute-full absolute-center flex q-px-md">
        <div v-if="!yad" class="absolute-center flex-center q-px-md">
          <p>1 токен равен 1 рубль укажите сумму в рублях ниже</p>
          <q-input v-model="amount_deposit" outlined placeholder="Сумма" />
          <q-btn
            rounded
            class="no-shadow q-mx-lg text-center bg-purple-13 text-white"
            label="Перейти в кассу"
            @click="depositstart()"
          />
        </div>
        <div v-else class="absolute-center flex-center q-px-md">
          <!-- start -->
          <div>Сформирован счет № {{order_id}} на сумму: {{amount_deposit}} токенов</div>
          <form method="POST" class="flex" action="https://money.yandex.ru/quickpay/confirm.xml">
            <input type="hidden" name="receiver" value="4100115505163705" />
            <input type="hidden" name="formcomment" value="Токены" />
            <input type="hidden" name="short-dest" value="Покупка токенов" />
            <input type="hidden" name="label" :value="order_id" />
            <input type="hidden" name="quickpay-form" value="donate" />
            <input type="hidden" name="targets" :value="order_id" />
            <input type="hidden" name="sum" :value="amount_deposit" data-type="number" />
            <input type="hidden" name="comment" value="Токены" />
            <input type="hidden" name="need-fio" value="false" />
            <input type="hidden" name="need-email" value="false" />
            <input type="hidden" name="need-phone" value="false" />
            <input type="hidden" name="need-address" value="false" />
            <input type="hidden" name="paymentType" value="AC" />
            <q-btn
              class="flex-center bg-purple-13 text-white"
              type="submit"
              label="Перейти к оплате"
            />
          </form>
        </div>
        <!-- end -->
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script src="https://static.yamoney.ru/checkout-js/v1/checkout.js"></script>
<script>
import { WebCam } from "vue-web-cam";
import http from "../../http-common";
export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam
  },
  data() {
    return {
      plyr: {
        fullscreen: { enabled: false }
      },
      podpleight: 0,
      followers: 0,
      likes: 0,
      vidos: null,
      isModel: false,
      balance: null,
      username: localStorage.getItem("username"),
      auth: null,
      withdrawDialog: false,
      options: ["RUB", "USD", "EUR", "CNY", "JPN"],
      currency: null,
      amount: null,
      depositDialog: false,
      yad: false,
      amount_deposit: null,
      order_id: 0,
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      playedid: null, 
      thisModel:{
        avatars:null,
        createdAt:null,
        is_vip:null,
        name:null,
        pub_streamid:null,
        sec_streamid:null,
        updatedAt:null,
        videos:{
        },
      },
      thumbStyle: {
        display: "none"
      },
      barStyle: {
        display: "none"
      },
      controls: [
        'play-large', // The large play button in the center
        'restart', // Restart playback
        'rewind', // Rewind by the seek time (default 10 seconds)
        'play', // Play/pause playback
        'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        'captions', // Toggle captions
        'settings', // Settings menu
        'pip', // Picture-in-picture (currently Safari only)
        'airplay', // Airplay (currently Safari only)
        'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
        'fullscreen', // Toggle fullscreen
    ],
    };
  },
  sockets:{
    cl_getuserinfos: function(response) {
          this.thisModel = response;
          this.vidos = response.videos;
          for(var i = 0; i<this.vidos.length; i++){
            // this.player[i] = new Plyr("#"+this.vidos[i]._id);
            this.vidos[i].status = "mdi-play";
          }
          this.followers = response.subscribers;
          this.podpleight = response.subscribing;
          console.log(response)
        },  
  },
  mounted() {
    // const checkout = YandexCheckout(
    //   "7CD398BA5F300CE05CE19E46EA4ACA4EB5AA9728AF031DA21ED6D331B685BB02"
    // );
  },
  created(){
    this.$socket.emit('s_chagePage', {
            page: "index"
          });
    this.$socket.emit('getuserinfo', {
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username"),
    });
  },
  beforeCreate() {
    http({
      method: "get",
      url: "/podplist",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response => {
      this.subscribListL = true;
      this.subscribList = response.data;
      console.log("podplist \n")
      console.log(response.data)
    });
    http({
      method: "get",
      url: "/verify_sess",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response2 => {
      if (response2.data.session == "YES") {
        if (response2.data.ismodel == "Y") {
          this.ismodel = true;
        }
        this.auth = true;
        http({
          method: "get",
          url: "/models",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response => {
          this.recModels = response.data;
        });

        http({
          method: "get",
          url: "/balance",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response => {
          this.balance = response.data.balance;
        });

        http({
          method: "get",
          url: "/verify_sess",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response2 => {
          if (response2.data.session == "YES") {
            if (response2.data.ismodel == "Y") {
              this.isModel = true;
            }
            this.auth = true;
          } else {
            this.auth = false;
          }
        });
      } else {
        this.$router.push("/");
      }
    });
  },

  methods: {

    depositstart() {
      http({
        method: "get",
        url: "/depositstart",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          amount: this.amount_deposit
        }
      }).then(response2 => {
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
          "x-access-token": localStorage.getItem("token"),
          amount: parseFloat(this.amount),
          currency: this.currency
        }
      }).then(response2 => {
        this.alert = response2.data.status;
        if (response2.data.status == "done") {
          location.reload();
        } else {
          this.$q.notify({
            color: "negative",
            message: "Что-то пошло не так!"
          });
        }
      });
    }
  }
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
