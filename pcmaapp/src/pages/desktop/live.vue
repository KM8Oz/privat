<template>
<q-page class="bg-white">
    <div class="row" style="min-height:inherit">
        <div class="col-9">
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
            <div v-if="false" style="background: rgba(254, 44, 85, 0.7)" class="text-white flex flex-center">
                <div class="flex-center row" style="height: 100%;">
                    <p class="q-px-xl q-mt-md q-mx-lg">
                        Модель не онлайн. Уведомить вас о начале стрима?
                    </p>
                </div>
            </div>
            <div class="fullpage">
                <vue-plyr ref="Myplyr" class="fullpage w-100 bigbtnplyr mute-right">
                    <video data-plyr-config='{ "controls": ["play-large","mute"]}' ref="videoRef" src="//" playsinline muted="muted" class="fullpage w-100"></video>
                </vue-plyr>
            </div>
            <div v-if="privat" style="background: rgba(254, 44, 85, 0.7)" class="text-white flex flex-center">
                <div class="justify-center row" style="height: 50vh;max-width: 25vw">
                    <p class="q-px-xl q-mt-md q-mx-lg">Модель в привате</p>
                </div>
            </div>
        </div>
        <div class="col-3">
            <div style="width: 100%;">
                <q-card class="text-black no-shadow">
                    <q-card-section class="q-ma-none q-pa-none">
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
                                        <p class="text-black col-12 q-mb-none text-subtitle1 mt-vh-05 text-nowrap">
                                            {{ datamodel.modelname }}
                                            <q-badge color="pink-6" class="q-ml-sm text-black-50 q-mb-none" align="middle">
                                                <span class="dot q-mr-xs bg-white"></span> live
                                            </q-badge>
                                        </p>
                                        <p class="text-grey-8 col-12 cuttext text-nowrap text-comment-14 q-mb-none h-vh-3">
                                            @{{ datamodel.UuserId.username }}
                                        </p>
                                    </div>
                                    <q-icon v-if="vibroenable == 'enabled'"> <q-img src="../../assets/vibro2000.svg"></q-img> </q-icon>
                                </div>
                            </div>
                            <div class="col text-max2-16 ml-vw-05  q-pl-xs ">
                                <p class="text-body1 q-my-none text-weight-light">{{ streamDesc }}</p>
                                 <p class="text-body1 q-my-none text-weight-light">
                                {{ tags.split(' ').join(' #') }}
                            </p>
                            </div>
                            <!-- {{tags(open_post_data.tags)}} -->
                           
                        </q-card-section>
                        <div class="row q-mt-xs ">
                            <q-btn   rounded size="9px" class="col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs" label="Приват" color="pink-6"  @click="privateStart = true" />
                             <q-btn  rounded size="9px" class=" col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs"  label="Подарить токены" color="pink-6"  @click="giftDialog = true" />
                             <q-btn   rounded size="9px" class=" col self-center q-px-none q-py-xs q-ml-xs q-mb-xs q-mt-xs"  label="Оплатить вибро" color="pink-6"  @click="vibroDialog = true" />
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
            <q-scroll-area ref="chatscroll" class="comdial ml-vw-1 q-pa-none h-vh-72" :thumb-style="thumbStyle" :bar-style="barStyle">
                <div style="width: 95%;" class="text-white" v-for="item in datachat" :key="item.date">
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
                </div>
            </q-scroll-area>
            <div class="vw-25 row absolute-bottom-right  h-vh-5">
                <q-input v-on:keyup.enter="send_comment()" v-model="chat_send" placeholder="Ваше сообщение" class="sendfix text-white h-v bg-white col-10" />
                <q-btn class="col-2" flat @click="send_comment()">
                    <q-icon color="grey" name="mdi-send" class="mb0" />
                </q-btn>
            </div>
        </div>
    </div>
    <q-dialog v-model="report" maximized persistent></q-dialog>
    <q-dialog v-model="giftDialog">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    Вы можете подарить не более {{ userToken }} токенов
                </p>
                <q-input rounded outlined dense dark class="col-12 q-px-xl q-mt-md q-mx-lg text-white" v-model="amountGift" placeholder="Сумма токенов" />
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="()=>null" style="border-radius: 30px">Да</q-btn>
                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="giftDialog = false">Нет</q-btn>
            </div>
        </q-card>
    </q-dialog>
    <q-dialog v-if="vibroenable == 'enabled'" v-model="vibroDialog">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                   У вас имеется {{ userToken }} токенов
                </p>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="test_lush(1);" style="border-radius: 30px">1 секунда</q-btn>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="test_lush(5)" style="border-radius: 30px">5 секунд</q-btn>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="test_lush(10)" style="border-radius: 30px">10 секунд</q-btn>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="test_lush(15)" style="border-radius: 30px">15 секунд</q-btn>

                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="vibroDialog = false">отмена</q-btn>
            </div>
        </q-card>
    </q-dialog>
    <q-dialog v-model="privateStart" v-if="userToken > sumPrivat">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="videocam"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    Внимание у вас {{ userToken }} токенов за приват модель просит
                    {{ sumPrivat }} в минуту. Вы хотите начать приват?
                </p>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="SuccPrivate()" style="border-radius: 30px">Да</q-btn>
                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="privateStart = false">Нет</q-btn>
            </div>
        </q-card>
    </q-dialog>
    <q-dialog v-model="privateStart" v-else>
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="videocam"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    У вас недостаточно токенов для привата модель просит
                    {{ sumPrivat }} токенов за минуту
                </p>
                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="privateStart = false">ОК</q-btn>
            </div>
        </q-card>
    </q-dialog>
</q-page>
</template>

<script>
import http from "../../http-common";
// import videojs from 'video.js';
// import resolutionswitch from 'videojs-resolution-switcher'
// import contribhls from 'videojs-contrib-hls';
// import videyoutube from 'videojs-youtube';
// import videojsvimeo from 'videojs-vimeo';
// import EasyPlayer from 'easy-player';
// import Hls from 'hls.js';
// import VuePlyr from 'vue-plyr';
// import { videoPlayer } from "vue-vjs-hls";
import {
    LocalStorage
} from "quasar";
import Hls from "hls.js";

export default {
    name: "StreamWatch",
    computed: {
        player() {
            return this.$refs.Myplyr.player
        }
    },
    components: {
        // videojs,
        // resolutionswitch,
        // contribhls,
        // videyoutube,
        // videojsvimeo,
    },
    props: {
        options: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data() {
        return {
            privateStart: false,
            hls: null,
            chat_send: null,
            madels: 95,
            sub: "sub",
            report: false,
            muted: true,
            link: null,
            datachat: [],
            chatmess: null,
            datamodel: null,
            privat: false,
            offline: false,
            load: true,
            giftDialog: false,
            vibroDialog:false,
            amountGift: null,
            userToken: null,
            streamDesc: null,
            tags: null,
            target: null,
            sum: null,
            sumPrivat: null,
            cMode: false,
            botDesk: null,
            botTime: null,
            modelavatar: "https://cdn.quasar.dev/img/boy-avatar.png",
            chatplayer: null,
            vibroenable:false,
            thumbStyle: {
                display: "none"
            },
            barStyle: {
                display: "none"
            }
            // playerOptions: {
            //         controls: ['play-large', 'play', 'current-time', 'mute', 'volume', 'settings'],
            //         settings: ['quality'],
            //         currentTime:-1,
            //         invertTime: true,
            //         toggleInvert: false,
            //         debug: true,
            //     },
        };
    },
    sockets: {
        applicationstatus: function(response){
            this.vibroenable = response.status
        },
        Vibration: function(res){
            if(res.status ==  "gift sended"){
                this.$q.notify({
                    message: 'Вы включили модели вибратор',
                    color: 'pink'
                })
            }else{
                this.$q.notify({
                    message: 'Что-то пошло не так',
                    color: 'red'
                })
            }
                 
        },
        cl_newMassage: function (response) {
            let jsonobj = {
                text: response.text,
                date: response.date,
                name: response.name,
                models: response.models,
                ismodel: response.ismodel
            };
            this.datachat.push(jsonobj);
            setTimeout(() => {
                this.$refs.chatscroll.setScrollPosition(
                    this.$refs.chatscroll.scrollSize
                );
            }, 500);
        },

        cl_privateRoute(response) {
            if (response.status == "ready") {
                this.$q.notify({
                    color: "pink-6",
                    message: "Модель согласилась на приват"
                });
                this.$router.push({
                    path: "private/" + this.$route.params.modelid
                });
            } else {
                this.$q.notify({
                    color: "pink-6",
                    message: "Модель отказала вам в привате"
                });
            }
        },
        cl_getRouteMain: function (response) {
            if ((response.private = "N")) {}
        },
        cl_changestreamdata: function (response) {
            this.streamDesc = response.streamDesc; //описание стрима
            this.tags = response.tags; // теги
            this.target = response.target; // цель сбор средств
            this.sum = response.sum; //сумма средств
            this.sumPrivat = response.sumPrivat; // сумма привата
            this.cMode = response.cMode; // разрешить подглядывания
            this.botDesk = response.botDesk; // описание бота
            this.botTime = response.botTime; // тайминг бога
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
            this.modelavatar =
                response.status == "ok" ?
                response.avatar :
                "https://cdn.quasar.dev/img/boy-avatar.png";
        }
    },
    mounted() {
        var videoSrc =
            this._G.recUrl + "/stream/live/model" + this.$route.params.modelid + "/index.m3u8";

        if (Hls.isSupported()) {
            var hls = new Hls({
                // debug: true,
                enableWorker: true,
                liveBackBufferLength: 900,
                levelLoadingMaxRetry: 100,
                manifestLoadingMaxRetry: 200,
                manifestLoadingRetryDelay: 100,
                autoStartLoad: true,
                appendErrorMaxRetry: 100
            });
            hls.loadSource(videoSrc);
            this.player.on('ready', () => {
                setTimeout(() => {
                    hls.attachMedia(this.player.media);
                }, 1000);
                hls.on(Hls.Events.MANIFEST_LOADED, function () {
                    this.player.play();
                })
            })
            // setTimeout(() => {
            //   hls.attachMedia(video);
            //   hls.on(Hls.Events.MANIFEST_LOADED, function() {
            // 
            //     video.play();
            //     console.log("manifest loaded");
            //   });
            // }, 1000);
        } else if (
            this.$refs.videoRef.canPlayType("application/vnd.apple.mpegurl")
        ) {
            this.player.src = videoSrc;
            this.player.addEventListener("canplay", function () {
                console.log("meta data loaded with native support");
                this.player.media.play();
            });
        }
        this.$socket.emit("s_changePage", {
            page: "stream",
            model: this.$route.params.modelid,
            userid: LocalStorage.getItem("userid"),
            token: LocalStorage.getItem("token")
        });
        var videol = this.$route.params.modelid;
        this.$socket.emit("s_getstreaminfo", {
            token: LocalStorage.getItem("token"),
            modelid: videol
        });
        this.$socket.emit("s_getuseravatar", {
            userid: videol
        });
        this.link = this._G.recUrl + "/stream/live/model" + this.$route.params.modelid + "/index.m3u8";
        this.chatplayer = this.link;
        // this.player.source = "https://rec.camsguns.com/99/" + videol + ".m3u8";
        // console.log(this.player);

        // window.playerEvents = this;
        // this.playerInitialize();
        // this.playerSetupEvents();
        // this.playerSetSrc(this.link);
        //  this.player = videojs(document.getElementById("streamVideo"));
        // setInterval(
        //   function () {
        //     http({
        //       method: "get",
        //       url: "/search_comments",
        //       headers: {
        //         modelid: this.$route.params.modelid,
        //       },
        //     }).then((response2) => {
        //       this.load = false;
        //       if (response2.data.status == "Y") {
        //         this.privat = false;
        //         this.offline = false;
        //         this.online = true;
        //         this.datachat = null;
        //         this.datachat = response2.data.data;
        //         this.link = "https://rec.camsguns.com/99/" + videol + ".m3u8";
        //       } else if (response2.data.status == "P") {
        //         this.online = false;
        //         this.privat = true;
        //         this.offline = false;
        //         this.datachat = null;
        //         this.datachat = response2.data.data;
        //         this.link = null;
        //       } else {
        //         this.online = false;
        //         this.privat = false;
        //         this.offline = true;
        //         this.datachat = null;
        //         this.link = null;
        //       }
        //     });
        //   }.bind(this),
        //   3000
        // );
        // if (Hls.isSupported()) {
        //       const hls = new Hls();
        //       hls.loadSource(this.link);
        //       hls.attachMedia(this.player.media);
        //       window.hls = hls;
        //       hls.on(Hls.Events.MANIFEST_PARSED,function(event,data) {
        //         console.log(window.hls)
        //       });
        //   }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        //     this.$refs.videoRef.addEventListener('loadedmetadata', function() {
        //   });
        // }
        // http({
        //   method: "get",
        //   url: "/search_comments",
        //   headers: {
        //     modelid: this.$route.params.modelid,
        //   },
        // }).then((response2) => {
        //   this.load = false;
        //   if (response2.data.status == "Y") {
        //     this.privat = false;
        //     this.offline = false;
        //     this.online = true;
        //     this.datachat = null;
        //     this.datachat = response2.data.data;
        //   } else if (response2.data.status == "P") {
        //     this.online = false;
        //     this.privat = true;
        //     this.offline = false;
        //     this.datachat = null;
        //   } else {
        //     this.online = false;
        //     this.privat = false;
        //     this.offline = true;
        //     this.datachat = null;
        //   }
        //   if (this.offline == true) this.$router.push("/");
        // });
        http({
            method: "post",
            url: "/models_one",
            data: {
                modelid: this.$route.params.modelid
            }
        }).then(response3 => {
            this.datamodel = null;
            this.datamodel = response3.data;
        });
        http({
            method: "get",
            url: "/balance",
            headers: {
                "x-access-token": LocalStorage.getItem("token")
            }
        }).then(response2 => {
            this.userToken = response2.data.balance;
        });
    },
    beforeDestroy() {
        this.link = null;
        if (this.player) {
            // this.player.dispose();
        }
        this.$socket.emit("s_changePage", {
            page: "exitstream",
            id: this.$route.params.modelid
        });
    },
    methods: {
        test_lush(second) {
            this.$socket.emit("Vibration", {
                token: LocalStorage.getItem("token"),
                modelid: this.$route.params.modelid,
                amount: second
            });
            this.vibroDialog = false;
        },
        SuccPrivate() {
            this.$socket.emit("s_StartPrivate", {
                token: LocalStorage.getItem("token"),
                userid: LocalStorage.getItem("userid"),
                name: LocalStorage.getItem("name"),
                modelid: this.$route.params.modelid
            });
            this.privateStart = false;
            this.$q.notify({
                color: "pink-6",
                message: "Ожидаем ответа от модели"
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
                    message: "Неверное количество токенов"
                });
            } else {
                http({
                    method: "get",
                    url: "/donat",
                    headers: {
                        "x-access-token": LocalStorage.getItem("token"),
                        model: this.$route.params.modelid,
                        amount: this.amountGift
                    }
                }).then(response => {
                    if (response.data.status == "ok") {
                        this.$q.notify({
                            color: "green",
                            message: "Подарок отправлен"
                        });
                        this.giftDialog = false;
                    } else {
                        this.$q.notify({
                            color: "negative",
                            message: "Что-то пошло не так!"
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
                    message: "Сообщение пустое"
                });
                return;
            }
            this.$socket.emit(
                "s_streamchatsend", {
                    username: LocalStorage.getItem("username"),
                    modelid: this.$route.params.modelid,
                    textmess: this.chat_send
                },
                err => console.log("message sended:", err)
            );
            this.chat_send = null;
            // var data = {
            //   username: LocalStorage.getItem("username"),
            //   modelid: this.$route.params.modelid,
            //   textmess: this.chat_send
            // };
            // http({
            //   method: "post",
            //   url: "/create_comments_on",
            //   headers: {
            //     "x-access-token": LocalStorage.getItem("token")
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
        unmuted() {
            this.muted = false;
            var video = document.getElementById("streamVideo");
            video.muted = !video.muted;
        },
        muteddd() {
            this.muted = true;
            var video = document.getElementById("streamVideo");
            video.muted = !video.muted;
        }
    }
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
