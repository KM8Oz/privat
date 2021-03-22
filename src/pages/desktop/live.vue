<template>
  <q-page :class="pcm.controls.dark ? 'bg-dark' : 'bg-white'">
    <div class="row" style="min-height: inherit">
      <div class="col-8">
        <div class="full-width row justify-end">
          <!-- <q-btn
            @click="report = true"
            rounded
            dense
            class="q-mr-sm text-white flex items-baseline"
            no-caps
            icon="o_flag"
            style="margin-bottom: -10vh;z-index: 5;height: 5vh"
            flat
            align="right"
          >
            <p class="q-ma-none">Жалоба</p>
          </q-btn> -->
        </div>
        <div
          v-if="false"
          style="background: rgba(254, 44, 85, 0.7)"
          class="text-white flex flex-center"
        >
          <div class="flex-center row" style="height: 100%">
            <p class="q-px-xl q-mt-md q-mx-lg">
              Модель не онлайн. Уведомить вас о начале стрима?
            </p>
          </div>
        </div>
        <div class="fullpage">
        <q-hls :src="src" :wps="100" :hps="100" :c="true"  />
          <!-- <q-icon
            name="hd"
            size="34px"
            @click="switchSrc"
            class="absolute-bottom-left cursor-pointer z-10"
            :color="videoHD ? 'white' : 'grey'"
          /> -->
        </div>
        <div
          style="background: rgba(254, 44, 85, 0.7)"
          class="text-white flex flex-center"
        >
          <div class="justify-center row" style="height: 50vh; max-width: 25vw">
            <p class="q-px-xl q-mt-md q-mx-lg">Модель в привате</p>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div>
          <q-card
            :class="`text-black no-shadow ${pcm.controls.dark ? 'bg-dark' : 'bg-white'} `"
          >
            <q-card-section
              :class="`q-ma-none q-pa-none ${
                pcm.controls.dark ? 'text-white' : 'text-dark'
              }`"
            >
              <!-- <div class="row flex items-center ml-vw-05">
                        <q-avatar class size="5vh">
                          <img style="border: 1px solid #ffffff;" src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        </q-avatar>
                        <div>
                          <p v-if="datamodel" style="font-size:min(2.2vh, 35px);" class="col-10 text-weight-medium q-mb-none">{{datamodel.modelname}}</p>
                          <div v-if="datamodel" class="text-subtitle2 text-gray" style="font-size:min(1.8vh, 28px);">@{{datamodel.UuserId.username}}</div>
                        </div>
                        </div>
                        <div class="row ml-vw-05 q-ma-none" style="overflow:hidden; max-height:calc(min(1.5vh, 25px)*2.9); height:calc(min(1.8vh, 28px)*2.9);">
                        <p style="font-size:min(1.5vh, 25px);">{{streamDesc}}</p>
                        </div>
                        <div class="row">
                        <p class="q-ma-none text-comment-14 ml-vw-05">{{tags}}</p>
              </div>-->
              <q-card-section class="q-ma-none q-pa-none">
                <div class="row justify-between items-center mt-vh-3">
                  <div class="row ml-vw-05">
                    <q-avatar size="5.16vh">
                      <img class="bordavatar" :src="modelavatar" />
                    </q-avatar>
                    <div class="row ml-vw-05" v-if="datamodel">
                      <p class="col-12 q-mb-none text-subtitle1 mt-vh-05 text-nowrap">
                        {{ datamodel.modelname }}
                        <q-badge color="pink-6" class="q-ml-sm q-mb-none" align="middle">
                          <span class="dot q-mr-xs bg-white"></span> live
                        </q-badge>
                      </p>
                      <p
                        class="text-grey-8 col-12 cuttext text-nowrap text-comment-14 q-mb-none h-vh-3"
                      >
                        @{{ datamodel.UuserId.username }}
                      </p>
                    </div>
                    <q-icon v-if="vibroenable == 'enabled'">
                      <q-img src="../../assets/vibro2000.svg"></q-img>
                    </q-icon>
                  </div>
                </div>
                <div class="col text-max2-16 ml-vw-05 q-pl-xs">
                  <p class="text-body1 q-my-none text-weight-light">{{ streamDesc }}</p>
                  <p class="text-body1 q-my-none text-weight-light">
                    {{ tags }}
                  </p>
                </div>
                <!-- {{tags(open_post_data.tags)}} -->
              </q-card-section>
              <div class="row q-mt-xs">
                <q-btn
                  rounded
                  size="9px"
                  class="col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs"
                  label="видеозвонок"
                  color="pink-6"
                  @click="privateStart = true"
                />
                <q-btn
                  rounded
                   v-if="is_private_chat"
                  size="9px"
                  class="col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs"
                  label="закрывать"
                  color="red"
                  @click="closePrivatChat"
                />
                <q-btn
                  rounded
                   v-if="!is_private_chat"
                  size="9px"
                  class="col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs"
                  label="приватный чат"
                  color="pink-6"
                  @click="privateStart2 = true"
                />
                <q-btn
                  rounded
                  size="9px"
                  class="col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs"
                  label="Подарить токены"
                  color="pink-6"
                  @click="giftDialog = true"
                />
                <q-btn
                  rounded
                  size="9px"
                  class="col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs"
                  label="Оплатить вибро"
                  color="pink-6"
                  @click="
                    () => {
                      vibroDialog = true;
                    }
                  "
                />
                <!-- <q-btn
                  dense
                  rounded
                  outline
                  color="pink-6"
                  no-caps
                  class="ml-vw-05"
                  @click="checklive()"
                >
                  <p class="q-ma-none q-pa-none text-comment-14">Подписаться</p>
                </q-btn> -->
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
        <q-scroll-area
          ref="chatscroll"
          v-if="datachat.length > 0"
          class="row q-pa-none vh-55"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
        >
          <!-- <div style="width: 95%;" class="text-white" v-for="(item, index) in datachat" :key="index">
                    <div class="q-ma-none row flexchat" v-if="item.ismodel == true">
                        <b class="text-pink-6 text-comment-18">{{ item.name }}:</b>
                        <p class="text-comment-14 text-pink-6 q-ma-none">
                            {{ item.text }}
                        </p>
                    </div>
                    <div class="q-ma-none row flexchat" v-else>
                        <b class="text-grey text-comment-18">{{ item.name }}:</b>
                        <p class="text-black text-comment-14 q-ma-none">
                            {{ item.text }}
                        </p>
                    </div>
                </div> -->
          <q-chat-message
            :class="item.id !== pcm.user.id ? 'row q-ml-md': 'row justify-end q-mr-md'"
            :sent="item.id !== pcm.user.id"
            :label-sanitize="true"
            v-for="(item, index) in datachat"
            :key="index"
            :bg-color="item.ismodel ? 'pink-6' : 'amber-7'"
            :name="item.name"
            :avatar="item.avatar"
            :text="[item.text]"
            :stamp="
              getdatediff(item.date).month !== 0
                ? `${getdatediff(item.date).month} months ago`
                : getdatediff(item.date).day !== 0
                ? `${getdatediff(item.date).day} days ago`
                : getdatediff(item.date).hr !== 0
                ? `${getdatediff(item.date).hr} hrs ago`
                : `${getdatediff(item.date).min} min ago`
            "
          />
        </q-scroll-area>
        <!-- <div class="vw-25 h-100">
                <q-input v-on:keyup.enter="send_comment()" v-model="chat_send" placeholder="Ваше сообщение" class="sendfix text-white h-v bg-white col-10" />
                <q-btn class="col-2" flat @click="send_comment()">
                    <q-icon color="grey" name="mdi-send" class="mb0" />
                </q-btn>
            </div> -->
        <div class="row fixed-bottom-right w-vw-chat">
          <q-input
            v-on:keyup.enter="send_comment()"
            v-model="chat_send"
            placeholder="Ваше сообщение"
            borderless
            :color="pcm.controls.dark ? 'dark' : 'white'"
            :input-class="`text-body1 backy-cmt ${
              pcm.controls.dark ? 'text-white' : 'text-dark'
            }  q-my-md q-pl-md q-ml-none`"
            class="col-10 backy-cmt2 q-my-xs q-ml-xs"
          >
            <template v-slot:prepend>
              <q-fab
                v-model="fabLeft"
                vertical-actions-align="left"
                :class="`${
                  pcm.controls.dark ? 'text-white' : 'text-dark'
                } q-my-auto text-center q-pa-none`"
                icon="keyboard_arrow_up"
                direction="up"
              >
                <q-fab-action
                  label-position="right"
                  color="pink-6"
                  icon="vpn_lock"
                  label="Приват"
                />
                <q-fab-action
                  label-position="right"
                  color="pink-3"
                  icon="redeem"
                  label="Подарить токены"
                />
              </q-fab>
            </template>
          </q-input>

          <q-btn
            color="green"
            class="btnsend q-my-auto q-mx-auto text-center"
            align="center"
            icon="mdi-send"
            outline
            round
            text-color="green"
            @click="send_comment()"
          >
          </q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="report" maximized persistent></q-dialog>
    <q-dialog v-model="giftDialog">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            Вы можете подарить не более {{ userToken }} токенов
          </p>
          <q-input
            rounded
            outlined
            dense
            dark
            class="col-12 q-px-xl q-mt-md q-mx-lg text-white"
            v-model="amountGift"
            placeholder="Сумма токенов"
          />
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="() => null"
            style="border-radius: 30px"
            >Да</q-btn
          >
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="giftDialog = false"
            >Нет</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="vibroDialog">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            У вас имеется {{ userToken }} токенов
          </p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="test_lush(1)"
            style="border-radius: 30px"
            >1 секунда</q-btn
          >
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="test_lush(5)"
            style="border-radius: 30px"
            >5 секунд</q-btn
          >
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="test_lush(10)"
            style="border-radius: 30px"
            >10 секунд</q-btn
          >
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="test_lush(15)"
            style="border-radius: 30px"
            >15 секунд</q-btn
          >

          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="vibroDialog = false"
            >отмена</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="privateStart" v-if="userToken > sumPrivat*10">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 64, 90, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            Внимание у вас {{ userToken }} токенов за приват модель просит
            {{ sumPrivat }} в минуту. Вы хотите начать видеозвонок?
          </p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="SuccPrivate()"
            style="border-radius: 30px"
            >Да</q-btn
          >
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="privateStart = false"
            >Нет</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
       <q-dialog v-model="privateStart2" v-if="userToken > sumPrivat*10">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            Внимание у вас {{ userToken }} токенов за приват модель просит
            {{ sumPrivat }} в минуту. Вы хотите начать приват?
          </p>
          <q-btn
            class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs"
            @click="SuccPrivate2()"
            style="border-radius: 30px"
            >Да</q-btn
          >
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="privateStart = false"
            >Нет</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showTransaction">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
           этот приватный чат обойдется вам в {{ transaction.total }} токенов
          </p>
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="showTransaction = false"
            >close</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="privateStart" v-if="userToken <= sumPrivat">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            У вас недостаточно токенов для привата модель просит
            {{ sumPrivat }} токенов за минуту (>10min)
          </p>
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="privateStart = false"
            >ОК</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="privateStart2" v-if="userToken <= sumPrivat">
      <q-card
        class="text-white fit flex flex-center"
        style="background: rgba(254, 44, 85, 0.7)"
      >
        <div class="justify-center row">
          <q-avatar class="col-12" icon="videocam"></q-avatar>
          <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
            У вас недостаточно токенов для привата модель просит
            {{ sumPrivat }} токенов за минуту (>10min)
          </p>
          <q-btn
            class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs"
            style="border-radius: 30px"
            @click="privateStart = false"
            >ОК</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import http from "../../http-common";
import { LocalStorage, date } from "quasar";
import Hls from "hls.js";
import { mapState } from "vuex";

export default {
  name: "StreamWatch",
  computed: {
    player() {
      return this.$refs.Myplyr.player;
    },
    ...mapState(["pcm"]),
  },
  components: {},
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      privateStart: false,
      hls: null,
      chat_send: null,
      madels: 95,
      sub: "sub",
      is_private_chat: false, 
      report: false,
      transaction: {
        total: 0
      }, 
      showTransaction:false,
      muted: true,
      link: null,
      datachat: [],
      chatmess: null,
      datamodel: null,
      privat: false,
      offline: false,
      videoHD: true,
      load: true,
      privateStart2: false,
      giftDialog: false,
      vibroDialog: false,
      amountGift: null,
      userToken: null,
      streamDesc: null,
      tags: null,
      target: null,
      sum: null,
      sumPrivat: null,
      cMode: false,
      botDesk: null,
      showPlayer:true,
      streamid:null,
      botTime: null,
      modelavatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      useravatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      chatplayer: null,
      vibroenable: false,
      fabLeft: false,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
    };
  },
  sockets: {
    cl_control_streams: function(res){
      if(res.status){
        this.showTransaction = true
        this.transaction.total = res.payload.total;
        this.send_message(`${this.pcm.user.un} is no longer in private`)
      } else [
        this.$q.notify({
          type: "negative",
          messaging: "transaction error"
        })
      ]
    },
    streams_status: function(res){
      let vm = this
    //  console.log(res, res.streamid,this.streamid , this.$route.params.modelid );
     if(Number(res.streamid) === Number(this.$route.params.modelid) && Number(this.streamid) !== Number(res.streamid)){
       //console.log("second",res);
       this.streamid = Number(res.streamid)
       
       this.$q.notify({
        type:'negative',
        classes:"Oswald-semibold",
       icon: 'contactless',
        message: `модель не в эфире !`,
        caption: `перенаправление на главную страницу.`,
      progress: true,
      color: 'brown',
      textColor: 'white',
      classes: 'glossy',
      onDismiss:()=>{
        vm.$router.push("/")
      }
      })
     }
    },
    applicationstatus: function (response) {
      this.vibroenable = response.status;
    },
    Vibration: function (res) {
      if (res.status == "gift sended") {
        this.$q.notify({
          message: "Вы включили модели вибратор",
          color: "pink",
        });
      } else {
        this.$q.notify({
          message: "Что-то пошло не так",
          color: "red",
        });
      }
    },
    cl_newMassage: function (response) {
      let jsonobj = {
        text: response.text,
        date: response.date,
        name: response.name,
        models: response.models,
        ismodel: response.ismodel,
        avatar: response.avatar,
        id: response.id,
      };
      this.datachat.push(jsonobj);
      setTimeout(() => {
        this.$refs.chatscroll.setScrollPosition(this.$refs.chatscroll.scrollSize);
      }, 500);
    },

    cl_privateRoute(response) {
       console.log("response from private stream:",response);
      if (response.status == "ready") {
    //     this.$socket.unsubscribe("cl_newMassage_private")
    //    this.$socket.on("cl_newMassage_private",function (response) {
    //   let jsonobj = {
    //     text: response.text,
    //     date: response.date,
    //     name: response.name,
    //     models: response.models,
    //     ismodel: response.ismodel,
    //     avatar: response.avatar,
    //     id: response.id,
    //   };
    //   this.datachat.push(jsonobj);
    //   setTimeout(() => {
    //     this.$refs.chatscroll.setScrollPosition(this.$refs.chatscroll.scrollSize);
    //   }, 500);
    // })
        this.$q.notify({
          color: "pink-6",
          message: "Модель согласилась на приват",
        });
        this.$router.push({
          path: `/private/${response.payload.chatkey}/${response.payload.userid}/${response.payload.modelid}/called`,
        });
         setTimeout(()=>{
            location.reload()
        }, 500)
      } else {
        this.$q.notify({
          color: "pink-6",
          message: "Модель отказала вам в привате",
        });
      }
    },
      cl_privateRoute2(response) {
       console.log("response from private stream:",response);
      if (response.status == "ready") {
         this.$q.notify({
          color: "pink-6",
          message: "Модель accepted (you are the only one can see the stream)",
        });
        this.is_private_chat = true
      } else {
        this.$q.notify({
          color: "pink-6",
          message: "Модель отказала вам в привате",
        });
      }
    },
    cl_getRouteMain: function (response) {
      if ((response.private = "N")) {
      }
    },
    cl_changestreamdata: function (response) {
      console.log(response);
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode; // разрешить подглядывания
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
      this.modelavatar = response.model.avatar;
    },
    cl_getstreaminfo: function (response) {
      this.streamDesc = response.streamDesc; //описание стрима
      this.tags = response.tags; // теги
      this.target = response.target; // цель сбор средств
      this.sum = response.sum; //сумма средств
      this.sumPrivat = response.sumPrivat; // сумма привата
      this.cMode = response.cMode; // разрешить подглядывания
      this.botDesk = response.botDesk; // описание бота
      this.botTime = response.botTime; // тайминг бога
    },
    cl_getuseravatar: function (response) {
      this.useravatar =
        response.status === "ok"
          ? response.avatar
          : "https://cdn.quasar.dev/img/boy-avatar.png";
    },
  },
  created() {
    this.src = this._G.recUrl +
          "/liveHD/model" +
          this.$route.params.modelid +
          "/index.m3u8"+`?id=${this.pcm.user.id}&token=abcsf123nk21d`;
          // stream default url to start 
    this.$socket.emit("s_changePage", {
      page: "stream",
      model: this.$route.params.modelid,
      userid: this.pcm.user.id,
      token: this.pcm.user.tk,
    });
    var videol = this.$route.params.modelid;
    this.$socket.emit("s_getstreaminfo", {
      token: this.pcm.user.tk,
      modelid: videol,
    });
    this.$socket.emit("s_getuseravatar", {
      userid: this.pcm.user.id,
    });

    this.link =
      this._G.recUrl +
      "/liveHD/model" +
      this.$route.params.modelid +
      "/index.m3u8"+`?id=${this.pcm.user.id}&token=abcsf123nk21d`;
    this.chatplayer = this.link;
    http({
      method: "post",
      url: "/models_one",
      data: {
        modelid: this.$route.params.modelid,
      },
    }).then((response3) => {
      this.datamodel = response3.data;
    });
    http({
      method: "get",
      url: "/balance",
      headers: {
        "x-access-token": this.pcm.user.tk,
      },
    }).then((response2) => {
      this.userToken = response2.data.balance;
    });
  },
  beforeDestroy() {
    this.closePrivatChat()
    this.$socket.emit("s_changePage", {
      page: "exitstream",
      id: this.$route.params.modelid,
    });
  },
  methods: {
    closePrivatChat(){
     if(this.pcm.auth){
      //  this.$socket.unsubscribe("cl_newMassage_private");
      //  this.$socket.subscribe("cl_newMassage")
      this.$socket.emit("control_streams", {
        token: this.pcm.user.tk,
        payload:{
            type: "close",
          modelid: this.$route.params.modelid,
          user_in_private: this.pcm.user.id
        }
      })
      this.is_private_chat = false
     }
    },
     switchSrc: function () {
      this.videoHD = !this.videoHD;
      this.src = this.videoHD
        ? this._G.recUrl +
          "/liveHD/model" +
          this.$route.params.modelid +
          "/index.m3u8" +`?id=${this.pcm.user.id}&token=abcsf123nk21d`
        :  this._G.recUrl +
          "/liveSD/model" +
          this.$route.params.modelid +
          "/index.m3u8"+`?id=${this.pcm.user.id}&token=abcsf123nk21d`;
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
    test_lush(second) {
      this.$socket.emit("Vibration", {
        token: this.pcm.user.tk,
        modelid: this.$route.params.modelid,
        amount: second,
      });
      this.vibroDialog = false;
    },
     SuccPrivate2() {
      this.$socket.emit("s_StartPrivate2", {
        token: this.pcm.user.tk,
        userid: this.pcm.user.id,
        name: this.pcm.user.un,
        modelid: this.$route.params.modelid,
      });
      this.privateStart2 = false;
      this.$q.notify({
        color: "pink-6",
        message: "Ожидаем ответа от модели",
      });
    },
    SuccPrivate() {
      this.$socket.emit("s_StartPrivate", {
        token: this.pcm.user.tk,
        userid: this.pcm.user.id,
        name: this.pcm.user.un,
        modelid: this.$route.params.modelid,
      });
      this.privateStart = false;
      this.$q.notify({
        color: "pink-6",
        message: "Ожидаем ответа от модели",
      });
    },
    // playerInitialize() {
    //   // this.player = videojs('streamVideo');
    // },
    // playerDispose() {
    //   this.player.dispose();
    // },
    // playerPlay() {
    //   this.player.play();
    // },
    // playerPause() {
    //   this.player.pause();
    // },
    // playerSetSrc(url) {
    //   this.player.src(url);
    //   this.player.play();
    // },
    // playerSetVolume(float) {
    //   this.player.volume(float);
    // },
    // playerSetPoster(url) {
    //   this.player.poster(url);
    // },
    // playerSetTime(time) {
    //   this.player.currentTime(time);
    // },
    // playerEventEnded() {
    //   console.log('ended');
    // },
    // playerEventVolume() {
    //   this.volume = this.player.volume();
    // },
    // playerEventError() {
    //   console.log(this.playerGetError())
    // },
    // playerGetPaused() {
    //   return this.player.paused();
    // },
    // playerGetTime() {
    //   return this.player.currentTime();
    // },
    // playerGetError() {
    //   return this.player.error().message;
    // },
    // playerSetupEvents() {
    //   this.player.on('ended', function() {
    //     var a = window.playerEvents.playerEventEnded();
    //   });
    //   this.player.on('volumechange', function() {
    //     window.playerEvents.playerEventVolume();
    //   });
    //   this.player.on('error', function() {
    //     window.playerEvents.playerEventError();
    //   });
    // },
    giftTokenDialog() {
      if (this.amountGift <= 0 || this.amountGift == null) {
        this.$q.notify({
          color: "negative",
          message: "Неверное количество токенов",
        });
      } else {
        http({
          method: "get",
          url: "/donat",
          headers: {
            "x-access-token": this.pcm.user.tk,
            model: this.$route.params.modelid,
            amount: this.amountGift,
          },
        }).then((response) => {
          if (response.data.status == "ok") {
            this.$q.notify({
              color: "green",
              message: "Подарок отправлен",
            });
            this.giftDialog = false;
          } else {
            this.$q.notify({
              color: "negative",
              message: "Что-то пошло не так!",
            });
          }
        });
      }
    },
    send_comment() {
      if (
        this.chat_send == null ||
        this.chat_send == "" ||
        this.chat_send == " " ||
        !this.chat_send.trim()
      ) {
        this.$q.notify({
          // ограничение на 3 или 2 буквы тут будут бесполезны из за особенности русского языка
          color: "pink-6",
          message: "Сообщение пустое",
        });
        return;
      }
      console.log(this.chat_send);
      this.$socket.emit(
        "s_streamchatsend",
        {
          username: this.pcm.user.un,
          modelid: this.$route.params.modelid,
          textmess: this.chat_send,
          avatar: this.useravatar,
          id: this.pcm.user.id,
        },
        (err) => console.log("message sended:", err)
      );
      this.chat_send = null;
      // var data = {
      //   username: this.pcm.user.un,
      //   modelid: this.$route.params.modelid,
      //   textmess: this.chat_send
      // };
      // http({
      //   method: "post",
      //   url: "/create_comments_on",
      //   headers: {
      //     "x-access-token": this.pcm.user.tk
      //   },
      //   data: data
      // }).then(response => {
      //   this.chat_send = "отправка сообщения";
      //   //////////////////////////
      //   if (response.data.result == "created") {
      //     http({
      //       method: "get",
      //       url: "/search_comments",
      //       headers: {
      //         modelid: this.$route.params.modelid
      //       }
      //     }).then(response2 => {
      //       this.chat_send = null;
      //       this.datachat = response2.data.data;
      //     });
      //   }
      //   ///////////////////////////
      // });
    },
    send_message(val) {
     
      this.$socket.emit(
        "s_streamchatsend",
        {
          username: this.pcm.user.un,
          modelid: this.$route.params.modelid,
          textmess: val,
          avatar: this.useravatar,
          id: this.pcm.user.id,
        },
        (err) => console.log("message sended:", err)
      );  
    },
  },
};
</script>

<style scoped>
.overlay h1 {
  text-align: center;
  color: #fff;
  font-size: 70px;
  margin-top: 17%;
}

.purp {
  color: #fe2c55;
}
</style>
>
