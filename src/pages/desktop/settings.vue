<template>
  <q-layout :class="pcm.controls.dark ? 'bg-dark profileminfix text-white': 'bg-white profileminfix text-black'">
    <div class="row settings-page-wrapper">
      <div class="col-lg-2 col-md-3 mt-vh-4">
      <q-followings />  
      </div>
      <div v-if="!auth" class="flex justify-center q-mt-xl col">
        <h5></h5>
      </div>
      <div
        v-else
        class="col-lg-7 col-md-5 mt-vh-4 d-flex justify-content-center fullpageMT"
      >
        <!--настройки-->
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="w-60 h-100 m-mx-auto"
        >
          <div class="flex column setting-border">
            <q-avatar size="15vh" class="row setting-border-avatar disabledivinavatar" v-if="isModel">
              <q-img
                v-if="ava == null"
                class="q-pa-none"
                :src="thisModel.avatars.replace('.camsguns.com','.cg.house')"
              >
                <q-file
                  @input="getImgBase64()"
                  v-model="ava"
                  accept=".jpg, image/*"
                  outlined
                  class="w-100 h-100 q-pa-none h-auto-fix"
                >
                </q-file>
              </q-img>
              <q-img v-else class="q-pa-none" :src="base64ava">
                <q-file
                  @input="getImgBase64()"
                  v-model="ava"
                  accept=".jpg, image/*"
                  outlined
                  class="w-100 h-100 q-pa-none h-auto-fix"
                >
                </q-file>
              </q-img>
            </q-avatar>
            <q-btn
              v-else
              rounded
              class="roundetnorm row"
              @click="getAvatarsStandart()"
            >
              <q-avatar size="15vh" class="disabledivinavatar ">
                <q-img
                  v-if="newava == null"
                  class="q-pa-none"
                  :src="thisModel.avatars.replace('.camsguns.com','.cg.house')"
                >
                </q-img>
                <q-img v-else class="q-pa-none" :src="newava"> </q-img>
              </q-avatar>
            </q-btn>
            <div class="row justify-center">
              <div class="col-3  ">
               <p class="text-center oswald-bold text-30 q-ma-none">
                    {{ thisModel.name }}
                  </p>
                    <!-- <p class=" text-comment-18 q-ma-none">
                  @{{ username }}
                </p> -->
              </div>
              <!-- <q-btn rounded no-caps class="q-mt-sm" dense color="pink-13">
                <p class="text-white q-mx-sm q-mb-none">Подписаться</p>
              </q-btn> -->
            </div>
            <!-- @click="" -->
          </div>
          <div class="mt-vh-2">
            <p class="text-fxl text-weight-bold ">{{$t('settings.name')}}</p>
            <!-- <p class="text-comment-14  text-graydg q-mb-none">
                        {{ thisModel.name }}
                    </p> -->
            <q-item tag="label" v-ripple class="mt-vh-2 q-pl-none">
              <q-item-section avatar>
                <q-btn
                  flat
                  icon="create"
                  color="pink-6"
                  class="h-mc ml-auto"
                  @click="
                    dialogmain = true;
                    resetName = true;
                  "
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  :title="$t('settings.accept')"
                  class="text-body1 text-weight-regular gray-1337"
                >
                  {{ thisModel.name }}</q-item-label
                >
              </q-item-section>
            </q-item>
            <!-- <q-btn class="fixbtn" unelevated flat color="black" :glossy="false" :ripple="false" @click="
                dialogmain = true;
                resetName = true;
              ">
                        <p class="text-pink-dg text-comment-14 q-ma-none text-initial">
                            Изменить имя
                        </p>
                    </q-btn> -->
          </div>

          <div class="mt-vh-2">
            <p class="text-fxl text-weight-bold ">{{$t('settings.username')}}</p>
            <q-item tag="label" v-ripple class="mt-vh-2 q-pl-none">
              <q-item-section avatar>
                <q-btn
                  flat
                  icon="create"
                  color="pink-6"
                  class="h-mc ml-auto"
                  @click="
                    dialogmain = true;
                    resetUserName = true;
                  "
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  title="Разрешить подглядывания"
                  class="text-body1 text-weight-regular gray-1337"
                >
                  {{ username }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
          <div class="mt-vh-2">
            <p class="text-fxl text-weight-bold q-ma-none">{{$t('settings.password')}}</p>
            <q-item tag="label" v-ripple class="mt-vh-2 q-pl-none">
              <q-item-section avatar>
                <q-btn
                  flat
                  icon="create"
                  color="pink-6"
                  class="h-mc ml-auto"
                  @click="
                    dialogmain = true;
                    resetPassword = true;
                  "
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  title="Разрешить подглядывания"
                  class="text-body1 text-weight-regular gray-1337"
                >
                  ***********
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="mt-vh-2">
            <p class="text-fxl text-weight-bold q-ma-none">{{$t('settings.email')}}</p>
            <q-item tag="label" v-ripple class="mt-vh-2 q-pl-none">
              <q-item-section avatar>
                <q-btn
                  flat
                  icon="create"
                  color="pink-6"
                  class="h-mc ml-auto"
                  @click="
                    dialogmain = true;
                    resetEmail = true;
                  "
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  title="Разрешить подглядывания"
                  class="text-body1 text-weight-regular gray-1337"
                >
                  {{ thisModel.email }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="mt-vh-4 mb-vh-4" v-if="isModel">
            <!-- get streaming token-->
            <q-btn
              class="fixbtn"
              unelevated
              rounded
              @click="getstreamkeyOB()"
              color="pink-6"
            >
              <p
                class="mr-vw-1 ml-vw-1 text-white text-comment-14 q-ma-none text-initial"
              >
                {{$t('settings.stream_key')}}:
              </p>
            </q-btn>
            <q-card
              v-if="submitResult.status"
              flat
              bordered
              class="q-mt-md bg-grey-white"
            >
              <q-card-section
                class="text-comment-16 flex-center-between"
                >{{$t('settings.obs')}}:
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-input v-model="streamingUrl" readonly label-slot>
                  <template v-slot:append>
                    <q-icon
                      name="content_paste"
                      @click="copy"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-separator />

              <q-input
                v-model="submitResult.value"
                filled
                autogrow
                readonly
                label-slot
              >
                <template v-slot:append>
                  <q-icon
                    name="content_paste"
                    @click="copy2"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-separator />

              <q-input
                value="'https://cg.house/chat?box=true'"
                filled
                autogrow
                readonly
                label-slot
              >
                <template v-slot:append>
                  <q-icon
                    name="content_paste"
                    @click="copy3"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-card>
          </div>
          <q-btn
            v-if="!isModel"
            class="mt-vh-4 fixbtn"
            unelevated
            rounded
            color="pink-6"
            to="/become_a_model"
          >
            <p
              class="mr-vw-1 ml-vw-1 text-white text-comment-14 q-ma-none text-initial"
            >
              {{$t('become_model.title')}}
            </p>
          </q-btn>
        </q-scroll-area>
      </div>

      <!--Рекомендации-->
      <div class="col-3">
      <q-listrec />
      </div>

    </div>

    <q-dialog
      v-model="dialogmain"
      @hide="clearAll()"
      content-style="dialog"
      content-class="card-bg "
    >
      <q-card flat class="mw-i vw-25 rounded-14">
        <div v-if="true">
          <p
            v-if="resetName"
            class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center"
          >
            Изменить имя
          </p>
          <p
            v-else-if="resetUserName"
            class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center"
          >
            Изменить имя пользователя
          </p>
          <p
            v-else-if="resetPassword"
            class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center"
          >
            Изменить пароль
          </p>
          <p
            v-else-if="resetEmail"
            class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center"
          >
            Изменить Email
          </p>
          <q-separator />
          <q-form>
            <q-input
              v-if="resetName"
              v-model="resetNameLabel"
              ref="user"
              label="Ваше новое имя"
              outlined
              lazy-rules
              class="mt-vh-5 text-body1 q-ml-xs mx-vw-1 h-vh-4-st q-pa-none"
              input-class="text-body1 q-ml-xs"
              type="text"
              :rules="[
                (val) =>
                  (val && val.length > 3) ||
                  'Поле пустое или меньше 3 символов',
              ]"
            >
            </q-input>
            <q-input
              v-else-if="resetUserName"
              v-model="resetUserNameLabel"
              ref="user"
              label="Ваш новое имя пользователя"
              outlined
              lazy-rules
              mask="@xxxxxxxxxxxxxxx"
              class="mt-vh-5 text-body1 q-ml-xs mx-vw-1 h-vh-4-st q-pa-none"
              input-class="text-body1 q-ml-xs"
              type="text"
              :rules="[
                (val) =>
                  (val && val.length > 3) ||
                  'Поле пустое или меньше 3 символов',
              ]"
            >
            </q-input>
            <div v-else-if="resetPassword">
              <q-input
                v-model="resetPasswordLabel"
                label="Новый пароль"
                outlined
                lazy-rules
                class="mt-vh-5 text-body1 q-ml-xs mx-vw-1 h-vh-4-st q-pa-none"
                input-class="text-body1 q-ml-xs"
                type="password"
                :rules="[
                  (val) =>
                    (val && val.length > 3) ||
                    'Пароль должен быть более 3 символов',
                ]"
              >
              </q-input>
              <q-input
                v-model="resetTryPasswordLabel"
                label="Повторите пароль"
                outlined
                type="password"
                class="mt-vh-5 text-body1 q-ml-xs mx-vw-1 h-vh-4-st q-pa-none"
                input-class="text-body1 q-ml-xs"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 3 && val == resetPasswordLabel) ||
                    'Пароли не совпадают',
                ]"
              >
              </q-input>
            </div>
            <q-input
              v-else-if="resetEmail"
              v-model="resetEmailLabel"
              label="Email"
              outlined
              lazy-rules
              class="mt-vh-5 text-body1 q-ml-xs mx-vw-1 h-vh-4-st q-pa-none"
              input-class="text-body1 q-ml-xs"
              type="email"
              :rules="[
                (val) =>
                  (validateEmail(val) && val.length > 0) || 'Укажите email',
              ]"
            >
            </q-input>
            <q-separator class="mt-vh-5" />
            <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
              <q-btn
                label="Отменить"
                @click="clearAll()"
                text-color="black"
                flat
                class="w-50 text-comment-14 h-vh-1080-50px"
              />
              <q-separator vertical />
              <q-btn
                label="Сохранить"
                @click="controllerSend()"
                text-color="black"
                flat
                :disable="!validatedisable()"
                class="w-50 text-comment-14 h-vh-1080-50px"
              />
            </q-card-actions>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script src="https://static.yamoney.ru/checkout-js/v1/checkout.js"></script>
<script>

import { copyToClipboard } from "quasar";
import { LocalStorage } from "quasar";
import http from "../../http-common";
import { mapState } from 'vuex';
export default {
  name: "App",
  components: {

  },
  data() {
    return {
      streamingUrl: "rtmp://rtmp.cg.house/liveHD",
      showkey: false,
      dialogmain: false,
      resetName: false,
      resetUserName: false,
      resetPassword: false,
      resetEmail: false,
      resetNameLabel: null,
      resetUserNameLabel: null,
      resetPasswordLabel: null,
      resetTryPasswordLabel: null,
      resetEmailLabel: null,
      isModel: false,
      balance: null,
      withdrawDialog: false,
      currency: null,
      amount: null,
      depositDialog: false,
      yad: false,
      amount_deposit: null,
      order_id: 0,
      listavatars: null,
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      playedid: null,
      ava: null,
      base64ava: null,
      newava: null,
      token: null,
      username: null,
      userid: null,
      name: LocalStorage.getItem("name"),
      readerFile: new FileReader(),
      submitResult: {
        status: false,
        value: null,
      },
      thisModel: {
        avatars: null,
        createdAt: null,
        is_vip: null,
        name: null,
        pub_streamid: null,
        sec_streamid: null,
        updatedAt: null,
        email: null,
        videos: {},
      },
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
  sockets: {
    getstreamkey(data) {
      this.submitResult.status = data.status;
      this.submitResult.value = data.key;
    },
    cl_authcontroll: function (response) {
      if (response.massage == "auth") {
        this.auth = true;
      } else if (response.massage == "deauth") {
        this.auth = false;
      }
    },
    cl_subscribeControle: function (response) {
      // if (response.opennotifs) {
      //   initializerFirebase(),
      //     askForPermissioToReceiveNotifications(response.id, Platform.is);
      // }
      if (response.status == "ok") {
        this.recModels[response.index].issubscribe = true;
        this.$q.notify({
          color: "pink-6",
          message: "Подписка на " + response.name + " оформлена",
        });
      }
      if (response.status == "removed") {
        this.recModels[response.index].issubscribe = false;
        this.$q.notify({
          color: "pink-6",
          message: "Вы отказались от подписки на " + response.name,
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
    },
    cl_getuserinfos: function (response) {
      console.log(response);
      this.thisModel = response;
      if (this.username != response.username) {
        if (response.username != null || response.username != "") {
          this.username = response.username;
          this.resetUserNameLabel = response.username;
        }
      }
      if (this.thisModel.name != response.name) {
        if (response.name != null || response.name != "") {
          this.thisModel.name = response.name;
          this.resetNameLabel = response.name;
        }
      }
      if (this.thisModel.name != response.email) {
        if (response.email != null || response.email != "") {
          this.resetEmailLabel = response.email;
          this.thisModel.email = response.email;
        }
      }
    },
    cl_changet: function (response) {
      if (response.status != "ok") {
        this.$q.notify("Возникла непредвиденная ошибка");
        return;
      }
      this.$socket.emit("getuserinfo", {
        token: this.pcm.user.tk,
        username: this.pcm.user.un,
      });
      http({
        method: "get",
        url: "/models",
        headers: {
          "x-access-token": this.pcm.user.tk,
        },
      }).then((response) => {
        this.recModels = response.data;
      });
    },
  },
  beforeMount(){
        this.token = this.pcm.user.tk
      this.username = this.pcm.user.un
      this.userid = this.pcm.user.id
      this.auth = this.pcm.auth;
      this.isModel = this.pcm.user.rol;
   if (this.auth == false) {
      this.$router.push("/");
    } else {
          this.$socket.emit("s_chagePage", {
      page: "index",
    });
    this.$socket.emit("getuserinfo", {
      token: this.pcm.user.tk,
      username: this.pcm.user.un,
    });
     http({
      method: "post",
      url: "/getavatars",
      data: {
        size: 10,
      },
    }).then((res) => {
      this.listavatars = res.data;
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
  mounted() {
    // const checkout = YandexCheckout(
    //   "7CD398BA5F300CE05CE19E46EA4ACA4EB5AA9728AF031DA21ED6D331B685BB02"
    // );
  },
  created() {

  },
  beforeCreate() {

  },

  methods: {
    copy(evt) {
      copyToClipboard(this.streamingUrl);
      this.$q.notify({
        color: "pink-6",
        message: "Ключ скопирован в буфер обмена",
      });
    },
    copy2(evt) {
      copyToClipboard(this.submitResult.value);
      this.$q.notify({
        color: "pink-6",
        message: "URL скопирован в буфер обмена",
      });
    },
    copy3(evt) {
      copyToClipboard('https://cg.house/chat?box=true');
      this.$q.notify({
        color: "pink-6",
        message: "URL скопирован в буфер обмена",
      });
    },
    getstreamkeyOB() {
      this.$socket.emit("streamkey", {
        token: this.pcm.user.tk,
      });
    },
    subscribe(modelid, modell, index) {
      this.$socket.emit("subscribeControle", {
        sender: this.pcm.user.id,
        receiver: modelid,
        token: this.pcm.user.tk,
        index: index,
      });
    },
    getAvatarsStandart() {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      var i = getRandomInt(19);
      this.newava = this.listavatars[i];
      this.$socket.emit("changeuseravatar", {
        token: this.pcm.user.tk,
        src: this.newava,
      });
    },

    validatedisable() {
      //  resetName
      // -resetUserName
      // -resetPassword
      // -resetEmail

      // resetNameLabel:null,
      // resetUserNameLabel:null,
      // resetPasswordLabel:null,
      // resetTryPasswordLabel:null,
      // resetEmailLabel:null,
      if (this.resetName) {
        if (this.resetNameLabel == null) {
          return false;
        }
        return this.resetNameLabel.length > 3;
      } else if (this.resetUserName) {
        if (this.resetUserNameLabel == null) {
          return false;
        }
        return this.resetUserNameLabel.length > 3;
      } else if (this.resetPassword) {
        if (
          this.resetPasswordLabel === null ||
          this.resetTryPasswordLabel == null
        ) {
          return false;
        }
        return (
          this.resetPasswordLabel.length > 3 &&
          this.resetPasswordLabel == this.resetTryPasswordLabel
        );
      } else if (this.resetEmail) {
        return this.validateEmail(this.resetEmailLabel);
      } else {
        return false;
      }
    },
    setchange(type) {
      if (type == "ImgSend") {
        if (this.base64ava == null) {
          this.$q.notify("Возникла непредвиденная ошибка");
          return;
        }
        this.$socket.emit("settings", {
          token: this.pcm.user.tk,
          type: "setAvatar",
          new: this.base64ava,
        });
      } else if (type == "newName") {
        if (this.resetNameLabel == null || this.resetNameLabel.lenght < 3) {
          this.$q.notify("Возникла непредвиденная ошибка");
          return;
        }
        this.$socket.emit("settings", {
          token: this.pcm.user.tk,
          type: "setName",
          new: this.resetNameLabel,
        });
        this.resetName = false;
        this.dialogmain = false;
      } else if (type == "newUserName") {
        if (
          this.resetUserNameLabel == null ||
          this.resetUserNameLabel.lenght < 3
        ) {
          this.$q.notify("Возникла непредвиденная ошибка");
          return;
        }
        this.$socket.emit("settings", {
          token: this.pcm.user.tk,
          type: "setUsername",
          new: this.resetUserNameLabel,
        });
        this.resetUserName = false;
        this.dialogmain = false;
      } else if (type == "newPassword") {
        if (
          this.resetPasswordLabel == null ||
          this.resetPasswordLabel.lenght < 3 ||
          this.resetPasswordLabel != this.resetTryPasswordLabel
        ) {
          this.$q.notify("Возникла непредвиденная ошибка");
          return;
        }
        this.$socket.emit("settings", {
          token: this.pcm.user.tk,
          type: "setPassword",
          new: this.resetPasswordLabel,
        });
        this.resetPassword = false;
        this.dialogmain = false;
      } else if (type == "newEmail") {
        if (!this.validateEmail(this.resetEmailLabel)) {
          this.$q.notify("Возникла непредвиденная ошибка");
          return;
        }
        this.$socket.emit("settings", {
          token: this.pcm.user.tk,
          type: "setEmail",
          new: this.resetEmailLabel,
        });
        this.resetEmail = false;
        this.dialogmain = false;
      }
    },
    controllerSend() {
      if (this.resetName) {
        this.setchange("newName");
      } else if (this.resetUserName) {
        this.setchange("newUserName");
      } else if (this.resetPassword) {
        this.setchange("newPassword");
      } else if (this.resetEmail) {
        this.setchange("newEmail");
      } else {
        this.$q.notify("Возникла непредвиденная ошибка");
        return;
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    clearAll() {
      this.dialogmain = false;
      this.resetName = false;
      this.resetUserName = false;
      this.resetPassword = false;
      this.resetEmail = false;
      this.resetNameLabel = this.thisModel.name;
      this.resetUserNameLabel = this.thisModel.username;
      this.resetEmailLabel = this.thisModel.email;
    },
    getImgBase64() {
      this.readerFile.readAsDataURL(this.ava);
      this.readerFile.onload = (event) => {
        this.base64ava = this.readerFile.result;
        this.setchange("ImgSend");
      };
    },
    debug() {},
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
        console.log(response2.data);
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
        console.log(response2);
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
.settings-page-wrapper{
  width: 100%;
  max-width: 1400px;
  margin: 0px auto;
}
</style>
