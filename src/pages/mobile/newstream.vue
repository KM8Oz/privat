<template>
  <div class=" fit q-mx-md bg-white h-vh-100 row">
    <div class="col-12 mt-vh-4 h-vh-100 flex-center-div fullpageMT">
      <div class="w-100 h-100">
        <q-scroll-area  :thumb-style="thumbStyle" :bar-style="barStyle" class="h-100">
        <transition
  appear
  enter-active-class="animated bounceInUp"
  leave-active-class="animated bounceOutDown"
>
          <q-card-section class="q-pb-none w-mxc q-pa-none row w-100 align-center text-center">
            <p class="col text-black text-weight-regular text-uppercase text-overline ">Настройки стрима</p>
          </q-card-section>
        </transition>
              <transition
  appear
  enter-active-class="animated bounceInUp"
  leave-active-class="animated bounceOutDown"
>
           <q-input  class="c-border" color="black" type="textarea" hint="Описание стрима (<120)" input-class="text-subtitle1 text-weight-regular q-px-xs"  v-model="streamDesc"  maxlength="120" placeholder="Описание стрима" />
              </transition>      <transition
  appear
  enter-active-class="animated bounceInUp"
  leave-active-class="animated bounceOutDown"
> <q-input class="c-border q-mt-md" color="black"  hint="Тэги (#Тэг#..) [<60]" input-class="text-subtitle1 text-uppercase text-weight-regular q-px-xs q-pt-none q-mt-none"  v-model="tags"  maxlength="60" placeholder="#Тэги#.." />
        
          </transition>      <transition
  appear
  enter-active-class="animated bounceInUp"
  leave-active-class="animated bounceOutDown"
><q-card-section class="q-pb-none q-mt-md w-mxc q-pa-none row w-100 align-center text-center">
            <p class="col text-black text-weight-regular text-uppercase text-overline ">Настройки доната</p>
          </q-card-section>
            </transition> <q-input class="c-border" color="black"  hint="Цель сбора Токенов [<70]" input-class="text-subtitle1 text-uppercase text-weight-regular q-px-xs q-pt-none q-mt-none"  v-model="target"  maxlength="70" placeholder="Цель сбора Токенов" />
                       <q-input class="c-border q-mt-md" type="number" fill-mask="0"  hint="Сумма доната [<10]" input-class="text-subtitle1 text-uppercase text-center text-weight-regular q-px-xs q-pt-none q-mt-none"  v-model="sum"  maxlength="10" placeholder="Сумма доната" />
          <q-card-section class="q-pb-none q-mt-md w-mxc q-pa-none row w-100 align-center text-center">
            <p class="col text-black text-weight-regular text-uppercase text-overline ">Настройки привата</p>
          </q-card-section>
            <q-input class="c-border q-mt-md" color="black"  type="number" fill-mask="0"  hint="Стоимость минуты привата [<10]" input-class="text-subtitle1 text-uppercase text-center text-weight-regular q-px-xs q-pt-none q-mt-none"  v-model="sumPrivat"  maxlength="10" placeholder="Стоимость минуты привата" />
          <q-checkbox v-model="cMode"  color="black" class="mt-vh-2 w-100 flex-center-div text-center" dense size="4vh">
            <p class="text-comment-18 gray-1337 q-ma-none">Разрешить подглядывания</p>
          </q-checkbox>
           <q-card-section class="q-pb-none q-mt-md w-mxc q-pa-none row w-100 align-center text-center">
            <p class="col text-black text-weight-regular text-uppercase text-overline ">Настройки бота</p>
          </q-card-section>
           <q-input class="c-border" color="black"   hint="Текст сообщения бота [<70]" input-class="text-subtitle1  text-weight-regular q-px-xs q-pt-none q-mt-none"  v-model="botDesk"  maxlength="70" placeholder="Текст сообщения бота" />
              <q-input class="c-border q-mt-md" color="black"   fill-mask="0"  hint="Таймаут (min)" input-class="text-subtitle1 text-uppercase text-center text-weight-regular q-px-xs q-pt-none q-mt-none"  v-model="botTime"  maxlength="10" placeholder="Таймаут" />

          <div class="flex-center-div">
             <q-btn  rounded outline class="q-mt-md w-80 text-overline" label="Сохранить" color="black" @click="cl_SendInfo()" />
          </div>
          <div class="flex-center-div q-mb-lg">
            <q-icon class="q-mt-md w-80 " size="xl" name="keyboard_backspace" color="black" @click="goback()" />
          </div>
        </q-scroll-area>
      </div>
    </div>
    <!--Рекомендации-->
  
  </div>
</template>

<script>
//cl - client
//s - server
// cts - client to server
// stc - server to client
import { LocalStorage } from 'quasar';
import http from "../../http-common";
import { mapState } from 'vuex';
export default {
  data() {
    return {
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
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
    };
  },
  sockets: {
    cl_streamStart: function (response) {
      if (response == "ready") {
        // жаль в js не работают хаки из c++
        this.$router.push("chat");
      }
    },
    cl_getstreaminfo: function (response) {
      //console.log(response)
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode == "true" ? true : false; // разрешить подглядывания
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
    },
  },
  computed: {
    ...mapState(['pcm'])
  },
  mounted() {
    this.$socket.emit("s_changePage", {
      token:this.pcm.user.tk,
      page: "newstream",
    });
    this.$socket.emit("s_getstreaminfo", {
      token: this.pcm.user.tk,
      modelid: this.pcm.user.id,
    });
  },
  updated() {},
  created() {
    // рекомендованные модели
    // http({
    //   method: "get",
    //   url: "/models",
    //   headers: {
    //     "x-access-token": this.pcm.user.tk,
    //   },
    // }).then((response) => {
    //   this.recModels = response.data;
    // });
  },
  beforeCreate() {
    // http({
    //   method: "get",
    //   url: "/podplist",
    //   headers: {
    //     "x-access-token": this.pcm.user.tk,
    //   },
    // }).then((response) => {
    //   this.subscribListL = true;
    //   this.subscribList = response.data;
    // });
  },
  beforeDestroy() {},
  methods: {
    goback(){
      this.$root.$emit('changepage', 1)
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
        };
        console.log(myobj);
        this.$socket.emit("s_streamStart", {
          obj: myobj,
        });
      }
    },
  },
};
</script>