<template>
<q-page class="bg-white fullpage" style="overflow: auto;">
    <div class="h-vh-50 bg-black">
        <!-- <video
        id="videoElement"
        autoplay
        muted
        playsinline
        class="full-width"
        style="height:33vh; width:100%;"
        webkit-playsinline
        wmode="opaque"
        :src="link"
      ></video> -->
        <!-- <video-player ref="streamplayer" :options="videoOptions" :configs="{ hls: true }"></video-player> -->
        <video ref="videoRef" src="" class="w-100 h-100" autoplay></video>
    </div>

    <div class="row v-vh-44">
        <div class="col-12 row">
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
                        <p class="q-ma-none text-xl ml-vw-05">{{tags}}</p>
              </div>-->
                        <q-card-section class="q-ma-none q-pa-none">
                            <div class="row justify-between mt-vh-3">
                                <div class="row ml-vw-05">
                                    <q-avatar size="8vh">
                                        <img class="bordavatar" :src="modelavatar.replace('.camsguns.com','.cg.house')" />
                                    </q-avatar>
                                    <div class="row ml-vw-05" v-if="datamodel">
                                        <p class="text-black col-12 q-mb-none text-fxl mt-vh-05 text-nowrap">
                                            {{ datamodel.modelname }}
                                            <q-badge color="pink-6" class="q-ml-sm text-black-50 q-mb-none" align="middle">
                                                <span class="dot q-mr-xs bg-white"></span> live
                                            </q-badge>
                                        </p>
                                        <p class="text-grey-8 col-12 cuttext text-nowrap text-xl q-mb-none h-vh-3">
                                            @{{ datamodel.UuserId.username }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row text-max2-14 ml-vw-05 q-ma-none">
                                <p class="text-xl q-ma-none">{{ streamDesc }}</p>
                            </div>
                            <!-- {{tags(open_post_data.tags)}} -->
                            <p class="text-black cuttext text-xl mb-1 q-ma-none h-mc ml-vw-05">
                                {{ tags }}
                            </p>
                            <p class="text-black cuttext text-comment-14 mb-1 q-ma-none h-mc ml-vw-05">
                                У вас {{ userToken }} токенов, Стоимость стрима
                                {{ sumPrivat }} в минуту
                            </p>
                        </q-card-section>
                        <div class="row mt-vh-1 ml-vw-05">
                            <!-- <q-btn
                  dense
                  rounded
                  no-caps
                  class
                  color="pink-6"
                  style="height:min(5vh,30px);"
                  @click="privateStart = true"
                >
                  <p class="q-ma-none q-pa-none text-xl">Приват</p>
                </q-btn> -->
                            <q-btn dense rounded outline color="pink-6" no-caps class="ml-vw-05" style="height:min(5vh,30px);" @click="giftDialog = true">
                                <p class="q-ma-none q-pa-none text-xl nowarp">
                                    Подарить токены
                                </p>
                            </q-btn>
                            <!-- <q-btn
                  dense
                  rounded
                  outline
                  color="pink-6"
                  no-caps
                  class="ml-vw-05"
                  @click="checklive()"
                >
                  <p class="q-ma-none q-pa-none text-xl">Подписаться</p>
                </q-btn> -->
                        </div>
                    </q-card-section>
                    <q-separator />
                </q-card>
            </div>
            <q-scroll-area ref="chatscroll" class="comdial ml-vw-1 q-pa-none h-vh-20 w-100" :thumb-style="thumbStyle" :bar-style="barStyle">
                <div style="width: 95%;" class="text-white" v-for="item in datachat" :key="item.date">
                    <div class="q-ma-none row flexchat" v-if="item.ismodel == true">
                        <b class="text-pink-6 text-fxl">{{ item.name }}:</b>
                        <p class="text-xl text-pink-6 q-ma-none">
                            {{ item.text }}
                        </p>
                    </div>
                    <div class="q-ma-none row flexchat" v-else>
                        <b class="text-grey text-fxl">{{ item.name }}:</b>
                        <p class="text-black text-xl q-ma-none">
                            {{ item.text }}
                        </p>
                    </div>
                </div>
            </q-scroll-area>
            <div class="w-100 row absolute-bottom-right  h-vh-5-st">
                <q-input v-on:keyup.enter="send_comment()" v-model="chat_send" placeholder="Ваше сообщение" class="sendfix text-white h-i bg-white col-10" />
                <q-btn class="col-2 h-vh-5-st" flat @click="send_comment()">
                    <q-icon color="grey" name="mdi-send" class="h-vh-5-st q-pa-none q-ma-none" />
                </q-btn>
            </div>
        </div>
    </div>
    <q-dialog v-model="giftDialog">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="card_giftcard"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    Вы можете подарить не более {{ userToken }} токенов
                </p>
                <q-input rounded outlined dense dark class="col-12 q-px-xl q-mt-md q-mx-lg text-white" v-model="amountGift" placeholder="Сумма токенов" />
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="giftTokenDialog()" style="border-radius: 30px">Да</q-btn>
                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="giftDialog = false">Нет</q-btn>
            </div>
        </q-card>
    </q-dialog>
</q-page>
</template>

<script>
import http from "../../http-common";
// import videoPlayer from "../../components/VideoPlayer";
// import EasyPlayer from "@easydarwin/easyplayer";
import Hls from "hls.js";

import {
    LocalStorage
} from "quasar";
import {
    log
} from "video.js";
export default {
    components: {
        // VuePlyr,
        // videojs,
        // resolutionswitch,
        // VideoPlayer
        // contribhls,
        // videyoutube,
        // videojsvimeo,
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
            chatmess: null,
            datamodel: null,
            privat: false,
            offline: false,
            load: true,
            giftDialog: false,
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
            amount_bounty: null,
            bal: 0,
            bounty: false,
            chat_send: null,
            madels: 95,
            sub: "sub",
            checklive: false,
            muted: true,
            link: null,
            datachat: [],
            chatmess: null,
            interval: null,
            videol: null,
            thumbStyle: {
                display: "none"
            },
            barStyle: {
                display: "none"
            },
            // videoOptions1: {
            //   flash: {
            //     swf:
            //       "https://cdnjs.cloudflare.com/ajax/libs/video.js/6.6.3/video-js.swf"
            //   },
            //   controlBar: {
            //     fullscreenToggle: false
            //   },
            //   nativeControlsForTouch: true,
            //   autoplay: true,
            //   controls: true,
            //   sources: [
            //     {
            //       src:
            //         "https://rec.camsguns.com/99/" +
            //         this.$route.params.modelid +
            //         ".m3u8",
            //       // type: "application/x-mpegURL"
            //       type: "application/vnd.apple.mpegurl"

            //     }
            //   ]
            // },
            videoOptions: {
                source: {
                    src: this._G.recUrl + "/99/" +
                        this.$route.params.modelid +
                        ".m3u8",
                    // type: "application/x-mpegURL"
                    type: "application/vnd.apple.mpegurl",
                    withCredentials: false
                },
                live: true
            }
        };
    },
    // components: { EasyPlayer },
    mounted() {
        this.videol = this.$route.params.modelid;
        this.$socket.emit("s_getPrivateinfo", {
            token: LocalStorage.getItem("token"),
            modelid: this.$route.params.modelid,
            userid: LocalStorage.getItem("userid")
        });
        this.$socket.emit("s_changePage", {
            page: "stream",
            model: this.$route.params.modelid,
            userid: LocalStorage.getItem("userid"),
            token: LocalStorage.getItem("token")
        });
        this.$socket.emit("s_getstreaminfo", {
            token: LocalStorage.getItem("token"),
            modelid: this.$route.params.modelid
        });
        this.$socket.emit("s_getuseravatar", {
            userid: this.$route.params.modelid
        });
        this.chatplayer = this.link;

        var videoSrc = "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8";
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(videoSrc.replace('.camsguns.com','.cg.house'));
            hls.attachMedia(this.$refs.videoRef);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                this.$refs.videoRef.play();
            });
            console.log("hls supported");
        }
        // hls.js is not supported on platforms that do not have Media Source
        // Extensions (MSE) enabled.
        //
        // When the browser has built-in HLS support (check using `canPlayType`),
        // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
        // element through the `src` property. This is using the built-in support
        // of the plain video element, without using hls.js.
        //
        // Note: it would be more normal to wait on the 'canplay' event below however
        // on Safari (where you are most likely to find built-in HLS support) the
        // video.src URL must be on the user-driven white-list before a 'canplay'
        // event will be emitted; the last video event that can be reliably
        // listened-for when the URL is not on the white-list is 'loadedmetadata'.
        else if (this.$refs.videoRef.canPlayType("application/vnd.apple.mpegurl")) {
            this.$refs.videoRef.src = videoSrc.replace('.camsguns.com','.cg.house');
            console.log("meta data loaded");
            this.$refs.videoRef.addEventListener("loadedmetadata", function () {
                this.$refs.videoRef.play();
            });
        }
        http({
            method: "get",
            url: "/balance",
            headers: {
                "x-access-token": LocalStorage.getItem("token")
            }
        }).then(response2 => {
            this.bal = response2.data.balance;
            this.userToken = response2.data.balance;
        });

        this.link =
            this._G.recUrl + "/99/" + this.$route.params.modelid + ".m3u8";
    },
    sockets: {
        cl_sendMeBalance: function (response) {
            this.userToken = response.balance;
        },
        cl_getPrivateinfo: function (response) {
            this.chatplayer = response.src.replace('.camsguns.com','.cg.house');
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(response.src.replace('.camsguns.com','.cg.house'));
                hls.attachMedia(this.$refs.videoRef);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    this.$refs.videoRef.play();
                });
            }
            // hls.js is not supported on platforms that do not have Media Source
            // Extensions (MSE) enabled.
            //
            // When the browser has built-in HLS support (check using `canPlayType`),
            // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
            // element through the `src` property. This is using the built-in support
            // of the plain video element, without using hls.js.
            //
            // Note: it would be more normal to wait on the 'canplay' event below however
            // on Safari (where you are most likely to find built-in HLS support) the
            // video.src URL must be on the user-driven white-list before a 'canplay'
            // event will be emitted; the last video event that can be reliably
            // listened-for when the URL is not on the white-list is 'loadedmetadata'.
            else if (
                this.$refs.videoRef.canPlayType("application/vnd.apple.mpegurl")
            ) {
                this.$refs.videoRef.src = response.src.replace('.camsguns.com','.cg.house');
                this.$refs.videoRef.addEventListener("loadedmetadata", function () {
                    this.$refs.videoRef.play();
                });
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
    beforeDestroy() {
        this.link = null;
        this.$socket.emit("s_clouseprivate", {
            token: LocalStorage.getItem("token"),
            modelid: this.$route.params.modelid,
            userid: LocalStorage.getItem("userid"),
        });
    },

    methods: {
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
        play() {
            this.$refs.videoRef.play();
        },
        list_comments() {
            http({
                method: "get",
                url: "/search_comments",
                headers: {
                    modelid: this.$route.params.modelid
                }
            }).then(response2 => {
                this.datachat = null;
                this.datachat = response2.data.data;
            });
        },
        donat() {
            http({
                method: "get",
                url: "/donat",
                headers: {
                    "x-access-token": LocalStorage.getItem("token"),
                    model: this.$route.params.modelid,
                    amount: this.amount_bounty
                }
            }).then(response => {
                if (response.data.status == "ok") {
                    this.$q.notify("Подарок отправлен");
                    this.bounty = false;
                } else {
                    this.$q.notify(response.data.status);
                }
            });
        },
        reward() {
            this.bounty = true;
        },
        // send_comment() {
        //   var data = {
        //     username: LocalStorage.getItem("username"),
        //     modelid: this.$route.params.modelid,
        //     textmess: this.chat_send
        //   };
        //   http({
        //     method: "post",
        //     url: "/create_comments_on",
        //     headers: {
        //       "x-access-token": LocalStorage.getItem("token")
        //     },
        //     data: data
        //   }).then(response => {
        //     this.chat_send = "отправка сообщения";
        //     //////////////////////////
        //     if (response.data.result == "created") {
        //       http({
        //         method: "get",
        //         url: "/search_comments",
        //         headers: {
        //           modelid: this.$route.params.modelid
        //         }
        //       }).then(response2 => {
        //         this.chat_send = null;
        //         this.datachat = response2.data;
        //       });
        //     }
        //     ///////////////////////////
        //   });
        // },
        unmuted() {
            this.muted = false;
            var video = document.getElementById("videoElement");

            video.muted = !video.muted;
        },
        muteddd() {
            this.muted = true;
            var video = document.getElementById("videoElement");

            video.muted = !video.muted;
        }
    }
};
</script>

<style scoped>
.vh100 {
    height: 95vh;
    width: 100vw;
}

.vh30 {
    height: 33vh;
}

.mt10 {
    margin-top: 20px;
}

.roz {
    fill: #fe2c55;
}

.w50 {
    width: 70%;
}

.w501 {
    width: 30%;
}

.mt30 {
    margin-top: 35vh;
}

.mtm30 {
    margin-top: 27vh;
}

.mtm20 {
    margin-top: -10vh;
    margin-right: 80vh;
    z-index: 200;
}

.fullscreen-bg {
    overflow: hidden;
    z-index: -100;
    position: relative;
    width: 120%;
    height: 32vh;
    padding-top: 45%;
}

.fullscreen-bg__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 32vh;
}

.overlay {
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 120%;
    height: 32vh;
    z-index: 4;
}

.overlay h1 {
    text-align: center;
    color: #fff;
    font-size: 70px;
    margin-top: 17%;
}

.mb50 {
    margin-bottom: 9vh;
    width: 80%;
    height: 40px;
}

.mb501 {
    margin-bottom: 9vh;
    width: 20%;
    margin-left: 80%;
    height: 40px;
    color: white;
    border-radius: 0px;
}

.mbb50 {
    width: 100%;
    margin-bottom: 60px;
}

.purp {
    color: #fe2c55;
}
</style>
