<template>
    <q-page class="row bg-white">
        <div class="col-8 fullpage" v-if="!$route.query.box">
            <div class="row col-12 flex-center-div">
                <video id="video" class="col-12 bg-black fullpage" autoplay muted></video>
                <q-btn round class="fixed" color="white" @click="streamControl()" style=" margin-top:85vh; height:3vw; width:3vw;">
                    <q-icon class="text-black" name="play_arrow" v-if="!streamStarted" />
                    <q-icon class="text-black" name="stop" v-else />
                </q-btn>
            </div>
        </div>
        <div :class="pcm.controls.dark ? !$route.query.box ? 'col-4 bg-dark' : 'col-12 bg-dark':!$route.query.box ? 'col-4' : 'col-12'">
            <div class="w-100 h-vh-30">
                <q-card class="fit">
                    <q-card-section class="row video_traslation_header">
                        <div class="col justify-center items-center ">
                            <div class="row fit">
                                <q-avatar>
                                    <img  :src="modeldata ? modeldata.avatar : null" />
                                     
                                </q-avatar>
                                <div class="col model_username" v-if="modeldata">
                                    <!-- <p class="col-12 q-mb-none text-subtitle1 mt-vh-05 text-nowrap">
                                        {{ modeldata.name }}
                                    </p> -->
                                    <p class="col-12 cuttext text-nowrap text-comment-14 q-mb-none h-vh-3 q-pl-xs">
                                        @{{ modeldata.username }}
                                    </p>
                                </div>
                                <q-icon size="30px" v-if="vibroenable === 'enabled'">
                                    <q-img src="../../assets/vibro2000.svg"></q-img>
                                </q-icon>
                            </div>
                        </div>
                        <div class="col stream_animated">
                            <p class="text-body1 q-my-none text-weight-light">{{ streamDesc }} : #{{ tags }}</p>
                        </div>
                        <q-btn label="закрыть приват" v-if="closePrivate2show" glossy color="red" @click="closePrivate2" class="close_private_stream"/>
                         <q-tabs :class="pcm.controls.dark ? 'tabschat bg-dark text-white' : 'tabschat' " v-model="tabpanel" dense  active-color="pink-6" indicator-color="pink-6" align="justify" narrow-indicator>
                            <q-tab name="chat">
                                <p class="q-ma-none text-comment-18">Чат</p>
                            </q-tab>
                            <q-tab name="persons">
                                <p class="q-ma-none text-comment-18">Пользователи</p>
                            </q-tab>
                            <!-- <q-tab name="donat">
                    <p class="q-ma-none text-comment-18">Донат</p>
                  </q-tab> -->
                            <q-tab name="settings">
                                <p class="q-ma-none text-comment-18">Настройки</p>
                            </q-tab>
                        </q-tabs>
                    </q-card-section>
                </q-card>
            </div>           
            
             <q-tab-panels v-model="tabpanel" animated>
                                <q-tab-panel name="persons" :class="pcm.controls.dark ?'q-pa-none h-vh-75 bg-dark':'q-pa-none h-vh-75 '">
                                    <q-scroll-area  class="row q-px-xs vh-55" :thumb-style="thumbStyle" :bar-style="barStyle">
                                       <q-list bordered separator>
      <q-item clickable v-ripple v-for="(viewer,index) in viewers"  :key="index" v-show="viewer.username != pcm.user.un">
        <q-item-section :class="pcm.controls.dark ? 'text-white viewers_username oswald-semibold':'text-black viewers_username oswald-semibold'">
            {{viewer.username}}
        </q-item-section>
        <template side>
            <q-icon size="20px" :name="viewer.connected? 'check_circle':'unpublished'" :color="viewer.connected? 'green': 'orange'"/>
        </template>
      </q-item>
    </q-list>
                                    </q-scroll-area>
                                </q-tab-panel>
                <q-tab-panel name="chat" :class="pcm.controls.dark ?'q-pa-none h-vh-75 bg-dark':'q-pa-none h-vh-75 '">
                    <q-scroll-area ref="chatscroll" v-if="datachat.length > 0" class="row q-px-md vh-55" :thumb-style="thumbStyle" :bar-style="barStyle">
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
                        <q-chat-message :class="`row  ${item.id !== pcm.user.id ? 'justify-start':''}`" :sent="item.id !== pcm.user.id" :label-sanitize="true" v-for="(item, index) in datachat" :key="index" :bg-color="item.ismodel ? 'pink-6' : 'amber-7'" :name="item.name" :avatar="item.avatar" :text="[item.text]" :stamp="
                  getdatediff(item.date).month !== 0
                    ? `${getdatediff(item.date).month} months ago`
                    : getdatediff(item.date).day !== 0
                    ? `${getdatediff(item.date).day} days ago`
                    : getdatediff(item.date).hr !== 0
                    ? `${getdatediff(item.date).hr} hrs ago`
                    : `${getdatediff(item.date).min} min ago`
                " />
                    </q-scroll-area>
                    <!-- <div class="vw-25 h-100">
                    <q-input v-on:keyup.enter="send_comment()" v-model="chat_send" placeholder="Ваше сообщение" class="sendfix text-white h-v bg-white col-10" />
                    <q-btn class="col-2" flat @click="send_comment()">
                        <q-icon color="grey" name="mdi-send" class="mb0" />
                    </q-btn>
                </div> -->
                    <div :class="!$route.query.box ? 'row fixed-bottom-right  w-vw-chat2': 'row fixed-bottom-right  w-vw-chat3' ">
                        <q-input v-on:keyup.enter="send_comment()" v-model="chat_send" placeholder="Ваше сообщение" borderless :color="pcm.controls.dark ? 'dark' : 'white'" :input-class="`text-body1 backy-cmt ${
                  pcm.controls.dark ? 'text-white' : 'text-dark'
                }  q-my-md q-pl-md q-ml-none`" class="col-10 backy-cmt2 q-my-xs q-ml-xs">
                            <!-- <template v-slot:prepend>
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
</template>-->
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
            </q-tab-panel>
            <q-tab-panel name="settings" :class="pcm.controls.dark ?'q-pa-none settings_scroller text-white bg-dark':'q-pa-none settings_scroller text-dark'">
                <q-scroll-area ref="commentsscroll" class="comdial ml-vw-1 q-pa-none settings_scroller mr-vw-1 flex" :thumb-style="thumbStyle" :bar-style="barStyle">
                    <q-card-section class="q-mt-md w-mxc q-pa-none row">
                        <p class="col text-fxl font-weight-bolder line-height-1">
                            Настройки доната
                        </p>
                    </q-card-section>
                    <q-input autogrow maxlength="70" 
                     rounded outlined v-model="target" bg-color="white"  input-class="text-body1 q-mx-md q-mb-xs" 
                     placeholder="Цель сбора Токенов" dense />
                    <q-input class="mt-vh-1 w-50" bg-color="white" type="number"  input-class="text-body1 q-mx-md q-mb-xs text-weight-bold text-center" rounded outlined v-model.number="sum" placeholder="Сумма" dense />

                    <q-card-section class="mt-vh-2 q-pb-none w-mxc q-pa-none row">
                        <p class="col text-fxl  font-weight-bolder line-height-1">
                            Настройки привата
                        </p>
                    </q-card-section>
                    <q-input bg-color="white" class="w-50"  input-class="text-body1 q-mx-md q-mb-xs text-weight-bold text-center" rounded v-model.number="sumPrivat" type="number"  placeholder="Стоимость минуты привата" outlined dense />
                    <q-checkbox v-model="cMode" color="pink" class="mt-vh-2 text-overline flex-center" dark dense size="40px">
                        <p class=" q-ma-none">
                            Разрешить подглядывания
                        </p>
                    </q-checkbox>

                    <q-card-section class="mt-vh-2 q-pb-none w-mxc q-pa-none row">
                        <p class="col text-fxl  font-weight-bolder line-height-1">
                            Настройки бота
                        </p>
                    </q-card-section>
                    <q-input class="mt-vh-1" bg-color="white"  input-class="text-body1 q-mx-md q-mb-xs" rounded  autogrow outlined v-model="botDesk" placeholder="Текст сообщения бота" dense />
                    <q-input class="mt-vh-1  w-50" bg-color="white"  input-class="text-body1 text-weight-bold text-center q-mx-md q-mb-xs" rounded  v-model.number="botTime" type="number" placeholder="Таймаут" outlined dense />

                    <q-card-section class="mt-vh-2 q-pb-none w-mxc q-pa-none row">
                        <p class="col text-fxl  font-weight-bolder line-height-1">
                            Настройки Лаша
                        </p>
                    </q-card-section>
                    <q-input class="mt-vh-1  w-50" bg-color="white"  input-class="text-body1 text-center text-weight-bold q-mx-md q-mb-xs" rounded  v-model.number="priceSecond" type="number" placeholder="Стоимость секунды" outlined dense />
             
               <div class="w-100 flex flex-center">
                            <q-btn
              dense
              rounded
              no-caps
              class=" h-15 text-subtitle1 mb-vh-4 mt-vh-2 q-px-xl  b-border"
              color="pink-6"
              @click="cl_changestreaminfo()"
              label="Сохранить"
            />
               </div>
                </q-scroll-area>
            </q-tab-panel>
        </q-tab-panels>
    </div>

    <q-dialog v-model="showprivate">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 64, 95, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="videocam"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    {{ userprivate }} зовет вас в видеозвонок
                </p>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="SuccPrivate()" style="border-radius: 30px">Согласна</q-btn>
                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="canselPrivate()">Нет</q-btn>
            </div>
        </q-card>
    </q-dialog>
       <q-dialog v-model="showprivate2">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="videocam"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    {{ userprivate }} зовет вас в приват
                </p>
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="SuccPrivate2()" style="border-radius: 30px">Согласна</q-btn>
                <q-btn class="text-weight-bold bg-grey text-white col-4 q-ml-sm q-mt-xs" style="border-radius: 30px" @click="canselPrivate2()">Нет</q-btn>
            </div>
        </q-card>
    </q-dialog>
        <q-dialog v-model="LogInSessionst" @hide="clearAll()" content-style="dialog" content-class="card-bg ">
            <q-card flat class="mw-i w-reg rounded-14">
                <div>
                 <div >
                            <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Вход</p>
                            <q-separator class="bg-grey-4" />
                            <q-form>
                                <q-input input-class="q-ml-md q-mr-md text-subtitle2 text-weight-light" class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-5 q-pa-none" v-model="username" label="Ваш логин" outlined lazy-rules rounded type="email" :rules="[(val) => val && val.length > 0]">
                                </q-input>
                                <q-input input-class="q-ml-md q-mr-md text-subtitle2 q-pt-none text-weight-light" class="mt-vh-2 q-mb-md text-comment-14 mx-vw-1 h-vh-5 q-pa-none" v-model="password" label="Пароль" outlined rounded lazy-rules type="password" :rules="[(val) => val && val.length > 0]">
                                </q-input>
                                <q-separator class="bg-grey-4" />
                                <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                                    <!-- <q-btn label="Зарегистрироваться" @click="qController('register')" text-color="black" flat class="w-50 text-comment-14 h-vh-1080-50px" /> -->
                                    <!-- :disable ="func" == quasar error  -->
                                    <q-btn label="Войти" @click="authUser()" text-color="black" flat class="w-50 text-comment-14 h-vh-1080-50px" />
                                </q-card-actions>
                            </q-form>
                    </div>
                </div>
            </q-card>
        </q-dialog>
    <q-dialog v-model="closeprivate">
        <q-card class="text-white fit flex flex-center" style="background: rgba(254, 44, 85, 0.7)">
            <div class="justify-center row">
                <q-avatar class="col-12" icon="videocam"></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center col-10" style="font-size: 2vw">
                    У {{ userprivate }} закочились токены
                </p>
                
                <q-btn class="text-red bg-white text-weight-bold col-4 q-mr-sm q-mt-xs" @click="closeprivate = false" style="border-radius: 30px">ОК</q-btn>
            </div>
        </q-card>
    </q-dialog>
</q-page>
</template>

<script>
import Loader from "../Loader.vue";
import http from "../../http-common";
import {
    LocalStorage,
    date
} from "quasar";
import { mapState } from 'vuex';
import { initializerFirebase, askForPermissioToReceiveNotifications } from "../../firebase";
export default {
    name: "VideoCapture",
    data() {
        return {
            priceSecond: 1000,
            chat_send: null,
            fabLeft: null,
            private2:{
                start_time:null
            },
            vibroenable: false,
            datachat: [],
            closePrivate2show:false,
            connection: null,
            viewers:null,
            sockestsIte:null,
            mediaRecorder: null,
            streamStarted: false,
            LogInSessionst:false,
            tabpanel: "chat",
            thumbStyle: {
                display: "none"
            },
            barStyle: {
                display: "none"
            },
            username: null,
            myname: LocalStorage.getItem("name"),
            useravatar: null,
            streamDesc: null,
            datamodel: null,
            modeldata: null,
            showprivate2:false,
            tags: null,
            target: null,
            sum: null,
            sumPrivat: null,
            cMode: false,
            botDesk: null,
            botTime: null,
            password:null,
            userprivate: null,
            showprivate: false,
            userprivateid: null,
            closeprivate: false,
            isPrivate: false,
            alluser: null,
            donat: null,
            mediaStream: null,
            video: null
        };
    },
    computed: {
        ...mapState(['pcm'])
    },
    created() {
        //console.log(this.pcm.auth);
        if (!this.pcm.auth) {
            if (!this.$route.query.box) {
                this.$router.push('/')
            } else {
                this.LogInSessionst = true
            }
        } else {
            this.username = this.pcm.user.un;
            this.auth = this.pcm.auth;
            this.ismodel = this.pcm.user.rol
        }
    },
    beforeDestroy() {
        clearInterval(this.sockestsIte)
        this.stop();
        if (
            this.mediaStream &&
            this.mediaStream.stream &&
            this.mediaStream.stream.getTracks()[0]
        ) {
            this.mediaStream.stream.getTracks().forEach(track => track.stop());
            delete this.mediaStream;
        }
        if (
            this.mediaRecorder &&
            this.mediaRecorder.stream &&
            this.mediaRecorder.stream.getTracks()[0]
        ) {
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            this.mediaRecorder.stop();
            delete this.mediaRecorder;
        }
    },
    sockets: {
        cl_privateRoute(response) {
            //   console.log("response from private stream:",response);
            if (response.status == "ready") {
                this.$router.push({
                    path: `/private/${response.payload.chatkey}/${response.payload.modelid}/${response.payload.userid}/caller/`,
                });
                setTimeout(() => {
                    location.reload()
                }, 500)
            } else {
                // this.$q.notify({
                //   color: "pink-6",
                //   message: "Модель отказала вам в привате",
                // });
            }
        },
        applicationstatus: function(response) {
            this.vibroenable = response.status
        },
        cl_getalluser: function(response) {
            console.log(responce)
            this.alluser = response.alluser;
        },
        Vibration(response) {
            console.log(response)
        },
        // cl_newdonat: function (response) {
        //   this.donat = response.alluser
        // },
        cl_newMassage: function(response) {
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

        cl_streamcloused: function(response) {
            if ((response.reason = "clien have no money")) {
                this.closeprivate = true;
            }
            this.stop();
        },

        cl_StartPrivate: function(response) {
            this.userprivate = response.userprivate;
            this.userprivateid = response.userprivateid;
            this.showprivate = true;
        },
        cl_StartPrivate2: function(response) {
            this.userprivate = response.userprivate;
            this.userprivateid = response.userprivateid;
            this.showprivate2 = true;
        },
        cl_broadcastNewInfo: function(response) {
            this.target = response.target; // цель сбор средств
            this.sum = response.sum; //сумма средств
            this.sumPrivat = response.sumPrivat; // сумма привата
            this.cMode = response.cMode;
            this.botDesk = response.botDesk; // описание бота
            this.botTime = response.botTime; // тайминг бога
        },
        cl_changetstreaminfo: function(response) {
            if (response == "ready") {
                this.$q.notify({
                    color: "pink-6",
                    message: "Настройки изменены"
                });
            }
        },
        cl_control_streams: function(res){
            console.log(res);
         if(res.status){
             if(res.payload){
         this.$q.notify({
             type:"positive",
             message:`приватный чат закрыт пользователем { всего: ${res.payload.total}}`
         })
             } else {
      this.$q.notify({
             type:"positive",
             message:"private stream started"
         })
         this.closePrivate2show =true
             }
         this.private2.start_time = new Date();
         } 
        },
        cl_changestreamdata: function(response) {
            // console.log(responce);
            this.streamDesc = response.streamDesc; //описание стрима
            this.tags = response.tags; // теги
            this.target = response.target; // цель сбор средств
            this.sum = response.sum; //сумма средств
            this.sumPrivat = response.sumPrivat; // сумма привата
            this.cMode = response.cMode;
            this.botDesk = response.botDesk; // описание бота
            this.botTime = response.botTime; // тайминг бога
            this.priceSecond = response.priceSecond // Стоимость секунды Lush
        },
        cl_getstreaminfo: function(response) {
            // console.log('streamInfos:',response)
            //this.modelavatar = response.avatar
            this.modeldata = response.model
            this.streamDesc = response.streamDesc; //описание стрима
            this.tags = response.tags; // теги
            this.target = response.target; // цель сбор средств
            this.sum = response.sum; //сумма средств
            this.sumPrivat = response.sumPrivat; // сумма привата
            this.cMode = response.cMode;
            this.botDesk = response.botDesk; // описание бота
            this.botTime = response.botTime; // тайминг бога
        },
        cl_getmyavatar: function(response) {
            this.useravatar =
                response.avatar != null ?
                response.avatar :
                "https://cdn.quasar.dev/img/boy-avatar.png";
        },
        cl_streamClose: function(response) {
            if ((response.reason = "clien have no money")) {
                this.stop();
                this.$q.notify({
                    color: "pink-6",
                    message: "У пользователя недостаточно токенов"
                });
            }
        },
        applicationstatus: function(data) {
            // console.log(data);
        }
    },
    mounted() {
        // console.log(this.$route.query.box)
    this.sockestsIte = setInterval(()=>{
 this.findAllSockets()
    }, 2000)
      
    },
    beforeMount() {
        this.$socket.emit("s_changePage", {
            page: "stream",
            model: this.pcm.user.id,
            userid: this.pcm.user.id,
            token: this.pcm.user.tk
        });
        this.$socket.emit("s_getstreaminfo", {
            token: this.pcm.user.tk,
            modelid: this.pcm.user.id
        });
        this.$socket.emit("s_ModelStream", {
            userid: this.pcm.user.id
        });
        this.$socket.emit("s_getmyavatar", {
            userid: this.pcm.user.id
        });
        http({
            method: "post",
            url: "/models_one",
            data: {
                modelid: this.$route.params.modelid
            }
        }).then(response3 => {
            this.datamodel = response3.data;
        });
        // setInterval(
        //   function () {
        //     http({
        //       method: "get",
        //       url: "/search_comments_model",
        //       headers: {
        //         "x-access-token": this.pcm.user.tk,
        //       },
        //     }).then((response2) => {
        //       this.datachat = null;
        //       this.datachat = response2.data;
        //     });
        //   }.bind(this),
        //   3000
        // );
        // http({
        //   method: "get",
        //   url: "/search_comments_model",
        //   headers: {
        //     "x-access-token": this.pcm.user.tk,
        //   },
        // }).then((response2) => {
        //   this.datachat = null;
        //   this.datachat = response2.data;
        // });
        var vm = this;
        if (!this.$route.query.box) {
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true
                })
                .then(function(stream) {
                    var options = {
                        mimeType: "video/webm"
                    };
                    vm.mediaStream = {
                        stream
                    };
                    let video = document.querySelector("video");
                    video.srcObject = stream;
                    video.onloadedmetadata = function(e) {
                        let video = document.querySelector("video");
                        video.play();
                    };
                });
        }

    },
    methods: {
          closePrivate2(){
     if(this.pcm.auth){
      //  this.$socket.unsubscribe("cl_newMassage_private");
      //  this.$socket.subscribe("cl_newMassage")
      this.$socket.emit("control_streams", {
        token: this.pcm.user.tk,
        payload:{
            type: "close",
          modelid:this.pcm.user.id,
          user_in_private: this.userprivateid
        }
      })
      this.closePrivate2show = false
    //   this.is_private_chat = false
     }
    },
        findAllSockets: function(){
 this.$socket.emit("findAllInRoom", {room: "chat"+this.pcm.user.id, token: this.pcm.user.tk}, (res)=>{
          this.viewers = res.sockests
         // console.log(res);
        })
        },
        clearAll() {
            this.username = new String("");
            this.password = new String("");
        },
        LogInSession() {
            if (this.auth) {
                this.$socket.emit("s_authcontroll", {
                    massage: "auth",
                });
                this.$socket.emit("s_getmyavatar", {
                    userid: this.pcm.user.id,
                });
                this.$nextTick(() => {
                    location.reload()
                })
            }
        },
        authUser() {
            var data = {
                username: this.username,
                password: this.password,
            };
            http.post("/signin", data).then((response) => {
                if (response.data.stat == "ok") {
                    const token = response.data.reason;
                    const userid = response.data.userId;
                    const username = response.data.username;
                    const name = response.data.name;
                    this.$q.cookies.set('sspcm', { sstk: token, ssur: name, ssuid: userid, ssun: username, ssrol: response.data.model }, {
                        expires: '1d'
                    })
                    this.auth = true;
                    let vm = this
                    this.LogInSessionst = false;
                    delete this.password;
                    delete this.passAgain;
                    this.LogInSession();
                    initializerFirebase().then(() =>
                        askForPermissioToReceiveNotifications(
                            response.data.userId,
                            vm.$q.platform.is
                        ).then(() => console.log("permession requested"))
                    );
                } else {
                    this.$q.notify({
                        color: "negative",
                        message: "Неверный логин или пароль",
                    });
                }
            }).catch((err)=>{
           console.log("sign err:", err);
            });
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
        canselPrivate() {
            this.$socket.emit("s_cancelPrivate", {
                token: this.pcm.user.tk,
                modelid: this.pcm.user.id,
                userid: this.userprivateid
            });
            this.showprivate = false;
        },
        canselPrivate2() {
            this.$socket.emit("s_cancelPrivate2", {
                token: this.pcm.user.tk,
                modelid: this.pcm.user.id,
                userid: this.userprivateid
            });
            this.showprivate = false;
        },
        // checked(e){
        // console.log('checked  ',e)
        // },
        SuccPrivate() {
            this.$socket.emit("s_StartPrivateModel", {
                token: this.pcm.user.tk,
                modelid: this.pcm.user.id,
                userid: this.userprivateid,
                payload: {
                    userid: this.userprivateid,
                    modelid: this.pcm.user.id,
                    price: this.sumPrivat
                }
            });
            this.showprivate = false;
            this.stop();
            // this.startPrivate();
            this.isPrivate = true;
        },
        SuccPrivate2() {
            this.$socket.emit("control_streams", {
                token: this.pcm.user.tk,
                payload:{
                    type:"update",
                 modelid:this.pcm.user.id,
                 user_in_private: this.userprivateid,
                 is_private: true
                }
            });
            this.showprivate2 = false;
            // this.startPrivate();
            this.isPrivate = true;
        },
        cl_changestreaminfo() {
            if (
                this.target != null &&
                this.sum != null &&
                this.sumPrivat != null &&
                this.sumPrivat != 0 &&
                this.botDesk != null &&
                this.botTime != null
            ) {
                this.$socket.emit("changestreamdata", {
                    token: this.pcm.user.tk,
                    target: this.target,
                    sum: this.sum,
                    sumPrivat: this.sumPrivat,
                    cMode: this.cMode,
                    botDesk: this.botDesk,
                    botTime: this.botTime,
                    priceSecond: this.priceSecond // Стоимость секунды Lush
                });
            } else {
                this.$q.notify({
                    color: "pink-6",
                    message: "Ошибка изменения поля пустые или неверны"
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
            this.$socket.emit(
                "s_streamchatsend", {
                    username: this.pcm.user.un,
                    modelid: this.pcm.user.id,
                    textmess: this.chat_send,
                    avatar: this.modeldata.avatar,
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
        streamControl() {
            if (this.streamStarted) {
                this.isPrivate = false;
                this.stop();
            } else {
                this.start();
            }
        },
        //  start(){
        //    this.connection = new WebSocket("wss://record.camsguns.com/streams?token=" + this.pcm.user.tk +"");
        //    this.mediaRecorder.addEventListener('dataavailable',videoDataHandler)
        //    this.streamStarted = true;
        //  },
        //  stop() {
        //    this.connection.close();
        //    this.mediaRecorder.removeEventListener('dataavailable',videoDataHandler);
        //    this.streamStarted = false;
        //  },
        start() {
            var websocketEndpoint =
                this._G.wsRecordURL + "/streams?token=" + this.pcm.user.tk;
            this.connection = new WebSocket(websocketEndpoint);
            let vm = this
            this.connection.onopen = function() {
                vm.mediarecordGrub(vm.mediaStream.stream);
                console.log('socket channel opened');
            }


        },
        mediarecordGrub(stream) {
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: "video/webm",
                videoBitsPerSecond: 1000000,
                audioBitsPerSecond: 92000,
                audioBitrateMode: "variable"
            });
            this.mediaRecorder.start(2000);
            var video = document.querySelector("video");
            this.mediaRecorder.ondataavailable = this.videoDataHandler;
            this.streamStarted = true;
            this.$socket.emit('saveid', { status: true, modelid: this.pcm.user.id })
        },
        startPrivate() {
            var websocketEndpoint =
                this._G.wsRecordURL + "/private?token=" +
                this.pcm.user.tk +
                "&modelid=" +
                this.pcm.user.id +
                "&userid=" +
                this.userprivateid +
                "";
            this.connection = new WebSocket(websocketEndpoint);
            this.mediarecordGrub(this.mediaStream.stream);
            this.streamStarted = true;
        },
        stop() {
            if (
                this.mediaRecorder &&
                this.mediaRecorder.stream &&
                this.mediaRecorder.stream.getTracks()[0]
            ) {
                this.mediaRecorder.stop();
            }
            if (this.connection) {
                this.connection.close();
            }
            this.streamStarted = false;
        },
        videoDataHandler(event) {
            //this.isUploading = true;
            //  console.log("blobs:",event);
            let reader = new FileReader();
            reader.readAsArrayBuffer(event.data);
            if (this.connection) {
                reader.onloadend = () => {
                    this.connection.send(reader.result);
                };
            }
        }
    }
};
</script>

<style>
.mbb50 {
    width: 100%;
    margin-bottom: 10vh;
}
.q-message-received {
    display: flex !important;
    justify-content: flex-end !important;
}
.purp {
    color: #fe2c55;
}
</style>
