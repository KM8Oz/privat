<template>
  <div :class="`${pcm.controls.dark ? 'bg-dark': 'bg-white'} row`">
    <div class="col-lg-2 col-md-3 mt-vh-4">
     <q-followings />
    </div>
    <div
      class="col-lg-7 col-md-5 mt-vh-4 d-flex  justify-content-center fullpageMT"
    >
      <div class="m-mx-23 h-100 w-100 ">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="h-100 "
        >
        <q-card flat square :class="`${pcm.controls.dark?'bg-dark text-white':'text-black'}`">
          <q-card-section class="q-pb-none w-mxc q-pa-none row">
            <p class="col text-fxl  font-weight-bolder line-height-1">
              Настройки стрима
            </p>
          </q-card-section>
        
          <q-input  v-model="streamDesc" 
          input-class="q-mx-md text-body1 q-mb-xs text-weight-light" 
          bg-color="white" outlined color="gery-5" 
          class="q-px-xs"
          rounded
          placeholder="Описание стрима" 
           maxlength="60"  />
          <q-input  v-model="tags" 
          class="mt-vh-2 q-px-xs" 
           input-class="q-mx-md text-body1 q-mb-xs text-weight-light" 
          bg-color="white" outlined color="gery-5" 
          rounded
          placeholder="Тэги" 
           maxlength="60"  />
          <q-card-section class="mt-vh-2 q-pb-none w-mxc q-pa-none row">
            <p class="col text-fxl  font-weight-bolder line-height-1">
              Настройки доната
            </p>
          </q-card-section>
        
          <q-input  v-model="target" 
            input-class="q-mx-md text-body1 q-mb-xs text-weight-light" 
          bg-color="white" outlined color="gery-5" 
          class="q-px-xs"
          rounded
          placeholder="Цель сбора Токенов" 
           maxlength="70"  />
           <q-input  v-model.number="sum" 
           type="number" 
           :rules="[val => val > 0 || '(# > 0) !']"
             class="mt-vh-2 q-px-xs" 
           input-class="q-mx-md text-body1  text-center q-mb-xs text-weight-bold" 
          bg-color="white" outlined color="gery-5" 
          rounded
            placeholder="Сумма"  mask="xxx"
             />
       
          <q-card-section class="mt-vh-2 q-pb-none w-mxc q-pa-none row">
            <p class="col text-fxl  font-weight-bolder line-height-1">
              Настройки привата
            </p>
          </q-card-section>
            <q-input  v-model.number="sumPrivat" 
            type="number" 
             input-class="q-mx-md text-body1 text-center q-mb-xs text-weight-bold" 
          bg-color="white" outlined color="gery-5" 
          class="q-px-xs"
          rounded
          :rules="[val => val > 0 || '(# > 0) !']"
              placeholder="Стоимость минуты привата"  mask="xxx"
              />

          <q-item tag="label" v-ripple class="mt-vh-2 q-pl-none">
        <q-item-section avatar>
          <q-checkbox v-model="cMode" val="teal" color="pink-6" class="q-mx-xl" />
        </q-item-section>
        <q-item-section >
          <q-item-label title="Разрешить подглядывания" class="white text-overline ">Разрешить подглядывания</q-item-label>
        </q-item-section>
      </q-item>

          <q-card-section class="mt-vh-4 q-pb-none w-mxc q-pa-none row">
            <p class="col text-fxl  font-weight-bolder line-height-1">
              Настройки бота
            </p>
          </q-card-section>
          <!-- //==-- bot configuration --==// -->
          <q-input  v-model="botDesk"     class="mt-vh-2 q-px-xs" 
           input-class="q-mx-md text-body1 q-mb-xs text-weight-light" 
          bg-color="white" outlined color="gery-5" 
          rounded
          placeholder="Текст сообщения бота" 
           maxlength="60"  />
          <q-input  v-model.number="botTime" 
            type="number" 
            :rules="[val => val > 0 || '(# > 0) !']"
            class="mt-vh-2 q-px-xs " 
           input-class="q-mx-md text-body1 text-center q-mb-xs text-weight-bold" 
              bg-color="white" outlined color="grey-5" 
              rounded
              placeholder="Таймаут ./s"  mask="xxx"
              />
        
          <q-card-section class="mt-vh-2   q-pb-none w-mxc q-pa-none row">
            <p class="col text-fxl  font-weight-bolder line-height-1 ">
              Настройки Лаша
            </p>
          </q-card-section>
<q-input  v-model.number="priceSecond" 
            type="number" 
            :rules="[val => val > 0 || '(# > 0) !']"
             class="mt-vh-2 q-px-xs w-100" 
           input-class="q-mx-md text-body1 text-center q-mb-xs text-weight-bold" 
              bg-color="white" outlined color="grey-5" 
              rounded
              placeholder="Стоимость секунды ./rub"  mask="xxx"
              />
                    
          <div class="flex-center-div">
            <q-btn
              dense
              rounded
              no-caps
              class="w-30 h-15 text-subtitle1 mb-vh-4 mt-vh-2 q-px-xl b-border"
              color="pink-6"
              @click="cl_SendInfo()"
              label="Сохранить"
            >
              <!-- @click="" -->
            </q-btn>
          </div>
          </q-card>
        </q-scroll-area>
      </div>
    </div>
    <!-- Рекомендации -->
  <q-listrec />
  </div>
</template>

<script>
//cl - client
//s - server
// cts - client to server
// stc - server to client
import { LocalStorage } from "quasar";
import http from "../../http-common";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      priceSecond: 1000,
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      streamDesc: null,
      tags: null,
      target: null,
      sum: null,
      sumPrivat: null,
      cMode: false,
      botDesk: null,
      botTime: null,
      token: null,
      username: null,
      userid: null,
      name: null,
      auth: false,
      thumbStyle: {
        display: "none"
      },
      barStyle: {
        display: "none"
      }
    };
  },
  sockets: {
    cl_authcontroll: function(response) {
      if (response.massage == "auth") {
        this.auth = true;
      } else if (response.massage == "deauth") {
        this.auth = false;
      }
    },
    cl_subscribeControle: function(response) {
      // if (response.opennotifs) {
      //   initializerFirebase(),
      //     askForPermissioToReceiveNotifications(response.id, Platform.is);
      // }
      if (response.status == "ok") {
        this.recModels[response.index].issubscribe = true;
        this.$q.notify({
          color: "pink-6",
          message: "Подписка на " + response.name + " оформлена"
        });
      }
      if (response.status == "removed") {
        this.recModels[response.index].issubscribe = false;
        this.$q.notify({
          color: "pink-6",
          message: "Вы отказались от подписки на " + response.name
        });
      }
      if (response.status == "error") {
        if (response.log == "you can not follow your self") {
          this.$q.notify({
            color: "pink-6",
            message: "Вы не можете подписаться сами на себя "
          });
        }
      }
    },
    cl_streamStart: function(response) {
      if (response == "ready") {
        // жаль в js не работают хаки из c++
        this.$router.push("chat");
      }
    },
    cl_getstreaminfo: function(response) {
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode; // разрешить подглядывания
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
      this.priceSecond = response.priceSecond // Стоимость секунды Lush
    }
  },
  updated(){
  },
  computed: {
    ...mapState(['pcm'])
  },
  mounted() {
 
  },
  beforeMount(){
     this.username = this.pcm.user.un;
     this.userid = this.pcm.user.id;
     this.auth = this.pcm.auth
      if(!this.auth){
            this.$router.push('/')
        } else {
   this.$socket.emit("s_changePage", {
      token: this.pcm.user.tk,
      page: "newstream"
    });
    this.$socket.emit("s_getstreaminfo", {
      token: this.pcm.user.tk,
      modelid: this.pcm.user.id
    });
        }
  },
  methods: {
    subscribe(modelid, modell, index) {
      this.$socket.emit("subscribeControle", {
        sender: this.pcm.user.id,
        receiver: modelid,
        token: this.pcm.user.tk,
        index: index
      });
    },
    cl_SendInfo() {
      if (
        this.streamDesc == null ||
        this.tags == null ||
        this.sumPrivat == null
      ) {
        // защита от ...
        return;
      } else {
        this.sum = this.sum == null ? -1 : this.sum;
        this.target = this.target == null ? -1 : this.target;
        this.botDesk = this.botDesk == null ? -1 : this.botDesk;
        this.botTime = this.botTime == null ? -1 : this.botTime;
        let myobj = {
          streamDesc: this.streamDesc, //описание стрима
          tags: this.tags, // теги
          target: this.target, // цель сбор средств
          sum: this.sum, //сумма средств
          sumPrivat: this.sumPrivat, // сумма привата
          cMode: this.cMode, // разрешить подглядывания
          botDesk: this.botDesk, // описание бота
          botTime: this.botTime, // тайминг бога
          token: this.pcm.user.tk, // токен
          userid: this.pcm.user.id, //userid
          priceSecond: this.priceSecond // Стоимость секунды Lush
        };

        this.$socket.emit("s_streamStart", {
          obj: myobj
        });
      }
    }
  }
};
</script>
