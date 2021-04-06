<template>
    <q-layout class="text-transparent" view="lhh lpr lff">
        <div v-if="$q.platform.is.mobile">
    
        </div>
        <div v-if="$q.platform.is.desktop && !$route.query.box" :class="`head q-mb-none ${pcm.controls.dark? 'bg-dark': 'bg-white'}`">
            <q-header :class="`head ${pcm.controls.dark? 'bg-dark': 'bg-white'}`">
                <q-toolbar flat :class="`head ${pcm.controls.dark? 'bg-dark': 'bg-white'} q-pa-none`">
                    <q-toolbar>
                        <q-btn to="/" @click="forcego" v-ripple="false" class="ml-vw-1 head icohead no-shadow w-vw-6">
                            <q-avatar class="head icohead absolute-center h-50 w-vw-6">
                                <img src="../assets/PCMLogo.svg" class="head icohead border-initial absolute-center h-50 w-vw-6" />
                            </q-avatar>
                        </q-btn>
                        <q-toolbar-title class="head flex-center-vertical">
                            <p class="h-100 w-mx text-comment-18 text-red q-ma-none h-mc ml-vw-10 oswald-semibold">
                                {{$t("version")}}
                            </p>
                        </q-toolbar-title>
                    </q-toolbar>
                    <q-tabs align="right" v-model="tab" dense no-caps :indicator-color="enableindicator" :class="`head ${pcm.controls.dark? 'bg-dark text-white':'bg-white text-black'} q-mr-md col-lg-6 col-xs-6 col-md-6`">
                        <q-route-tab class="head col-3" name="home" to="/">
                            <p class="q-pa-none q-ma-none absolute-center text-xl oswald-semibold">{{$t("menu.main")}}</p>
                        </q-route-tab>
    
                        <q-route-tab class="head col-3" name="lives" to="/live" :disable="!auth">
                            <p class="q-pa-none q-ma-none absolute-center text-xl oswald-semibold">{{$t("menu.lives")}}</p>
                        </q-route-tab>
                        <q-route-tab class="head col-3" to="/create" v-if="ismodel">
                            <p class="q-pa-none q-ma-none absolute-center text-xl oswald-semibold">{{$t("menu.record")}}</p>
                        </q-route-tab>
    
                        <q-route-tab class="head col-3" to="/newstream" v-if="ismodel">
                            <p class="q-pa-none q-ma-none absolute-center text-xl oswald-semibold">{{$t("menu.streaming")}}</p>
                        </q-route-tab>
    
                        <!--q-route-tab class="col-2" name="categories" to="/categories"><p class="absolute-center" style="font-size:2.5vh; !imported">Категории</p></q-route-tab>-->
                    </q-tabs>
    
                    <div v-if="pcm.auth" class="row mr-vw-1">
                        <q-avatar class="vh5box">
                            <img class="absolute-center b-border cursor-pointer" :src="useravatar.replace('.camsguns.com','.cg.house')" />
                            <q-menu fit transition-show="jump-down" transition-hide="jump-up" no-refocus content-class="r-border">
                                <div :class="`row  no-wrap q-pa-md ${pcm.controls.dark ? 'bg-dark text-white' : ''} `">
                                    <div class="col-8">
                                        <div class="text-h6 q-mb-md text-weight-light text-center oswald-semibold">
                                            {{$t('setting')}}
                                        </div>
                                        <q-toggle v-model="theme" checked-icon="nights_stay" color="pink" unchecked-icon="wb_sunny" class="oswald-bold" :label="$t('mode')" />
                                        <q-toggle v-model="muteall" checked-icon="volume_off" color="pink" class="oswald-bold" unchecked-icon="volume_up" :label="$t('mute_all')" />
                                        <!-- <q-toggle v-model="language" checked-icon="img:https://rec.cg.house/statics/america.svg" icon-color="white" color="white" class="oswald-bold language_toggle" unchecked-icon="img:https://rec.cg.house/statics/russia.svg" :label="pcm.controls.language === 'ru'? 'язык': 'language' " /> -->
                                        <q-langSwitcher/>
                                        <q-installer />
                                    </div>
                                    <!-- <q-separator vertical inset class="q-mx-lg bg-grey-4"/> -->
                                    <div class="col-3 items-center">
                                        <q-avatar class="cursor-pointer" size="70px" @click="$router.push('/profile')">
                                            <img :src="useravatar.replace('.camsguns.com','.cg.house')" />
                                        </q-avatar>
    
                                        <div class="text-subtitle1 q-mt-md q-mb-xs text-weight-light oswald-regular">
                                            {{ pcm.user.un }}
                                        </div>
    
                                        <q-btn color="red" label="выход" push size="sm" class="q-px-xs" @click="logout()" v-close-popup />
                                    </div>
                                </div>
                            </q-menu>
                            <!-- <q-menu class="min-vw-10">
                                <q-list class="min-vw-10">
                                    <q-item v-if="!ismodel" to="/become_a_model" clickable v-close-popup>
                                        <q-item-section class="absolute-center text-xl text-center w-100">Стать Моделью</q-item-section>
                                    </q-item>
                                    <q-item to="/profile" clickable v-close-popup>
                                        <q-item-section class="absolute-center text-xl">Профиль</q-item-section>
                                    </q-item>
                                    <q-item clickable @click="logout(), Disconnect()" v-close-popup>
                                        <q-item-section class="absolute-center text-xl">Выйти</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu> -->
                        </q-avatar>
                    </div>
                    <div v-else-if="!pcm.auth">
                        <q-btn color="pink" @click="sigInController(true, false)" class="divlist q-mr-md text-white btn-fixed-width b-border" label="логин" rounded>
                        </q-btn>
                    </div>
                </q-toolbar>
                <!-- <q-separator class="bg-grey-4" /> -->
            </q-header>
        </div>
    
        <q-dialog v-model="LogInSessionst" @hide="clearAll()" content-style="dialog" content-class="card-bg ">
            <q-card flat class="mw-i w-reg rounded-14">
                <div>
                    <div v-if="sign === 'register'">
                        <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Регистрация</p>
                        <q-separator class="bg-grey-4" />
                        <q-form>
                            <q-input input-class="q-ml-md q-mr-md q-pa-md text-weight-regular" class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-5 q-pa-none" v-model="username" ref="user" label="Ваш логин" outlined lazy-rules rounded type="text" @input="eventValidRed()" :rules="[(val) => (val && val.length > 0) || 'Укажите ваше имя']">
                            </q-input>
                            <q-input input-class="q-ml-md q-mr-md q-pa-md text-weight-regular" class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-5 q-pa-none" v-model="email" label="Email" outlined rounded lazy-rules type="email" @input="eventValidRed()" :rules="[
                      (val) => (validateEmail(val) && val.length > 0) || 'Укажите email',
                    ]">
                            </q-input>
                            <q-input input-class="q-ml-md q-mr-md q-pa-md text-weight-regular" class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-5 q-pa-none" v-model="password" label="Пароль" outlined lazy-rules rounded type="password" @input="eventValidRed()" :rules="[(val) => (val && val.length > 0) || 'Придумайте пароль']">
                            </q-input>
                            <q-input v-model="passAgain" ref="pass" label="Повторите пароль" outlined type="password" rounded input-class="q-ml-md q-mr-md q-pa-md text-weight-regular" class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-5 q-pa-none" lazy-rules @input="eventValidRed()" :rules="[
                      (val) => (val == password && val.length > 0) || 'Пароли не совпадают!',
                    ]">
                            </q-input>
                            <q-checkbox v-model="okay" class="mt-vh-2 mx-vw-1" dense size="4vh" @input="eventValidRed()">
                                <p class="text-comment-14 gray-1337 q-ma-none">
                                    Согласие на обработку моих персональных данных
                                </p>
                            </q-checkbox>
                            <!-- <div>
                    <q-btn
                      label="Подтвердить"
                      @click="createUser()"
                      color="pink"
                      text-color="white"
                      class="full-width"
                    />
                    <div class="text-center q-mt-sm">
                      <p class="q-mb-sm">или</p>
                    </div>
                    <q-btn
                      label="Уже есть аккаунт?"
                      @click="signUp = false"
                      color="pink"
                      text-color="white"
                      class="full-width"
                    />
                  </div> -->
                            <q-separator class="mt-vh-5 bg-grey-4" />
                            <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                                <q-btn label="Назад" @click="qController('login')" text-color="black" flat class="w-50 text-comment-14 h-vh-1080-50px" />
                                <q-separator vertical class="bg-grey-4" />
                                <q-btn label="Зарегистрироваться" @click="createUser()" text-color="black" flat :disable="!validateReg" class="w-50 text-comment-14 h-vh-1080-50px" />
    
                                <!-- :disable ="func" == quasar error  -->
                            </q-card-actions>
                        </q-form>
                    </div>
    
                    <div v-else>
                        <div v-if="sign === 'resertpass'">
                            <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Восстановление</p>
                            <q-separator class="bg-grey-4" />
                            <q-form>
                                <p class="q-mt-none mb-vh-2 mt-vh-2 text-comment-14 textgray text-center">
                                    Введите e-mail, чтобы восстановить пароль.<br />Мы пришлем инструкцию на указанную почту.<br />Если вы не получили письмо в течение 10<br />минут, проверьте папку «Спам».
                                </p>
                                <q-input input-class="q-ml-xs q-mr-md text-subtitle2  text-weight-light" v-model="email" label="Email" outlined lazy-rules class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none" type="email" :rules="[
                        (val) => (validateEmail(val) && val.length > 0) || 'Укажите email',
                      ]">
                                </q-input>
                                <q-separator class="mt-vh-5 bg-grey-4" />
                                <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                                    <q-btn label="Отмена" @click="qController('login')" text-color="black" flat class="w-50 text-comment-14 h-vh-1080-50px" />
                                    <q-btn label="Восстановить" @click="resetPassword()" text-color="black" flat :disable="!validateReset" class="w-50 text-comment-14 h-vh-1080-50px" />
                                    <q-separator vertical class="bg-grey-4" />
                                    <!-- :disable ="func" == quasar error  -->
                                </q-card-actions>
                            </q-form>
                        </div>
                        <div v-else>
                            <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Вход</p>
                            <q-separator class="bg-grey-4" />
                            <q-form>
                                <q-input input-class="q-ml-md q-mr-md text-subtitle2 text-weight-light" class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-5 q-pa-none" v-model="username" label="Ваш логин" outlined lazy-rules rounded type="email" :rules="[(val) => val && val.length > 0]">
                                </q-input>
                                <q-input input-class="q-ml-md q-mr-md text-subtitle2 q-pt-none text-weight-light" class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-5 q-pa-none" v-model="password" label="Пароль" outlined rounded lazy-rules type="password" :rules="[(val) => val && val.length > 0]">
                                </q-input>
                                <q-btn flat class="flex mt-vh-2 mb-vh-2 text-comment-14 mx-vw-1" :ripple="false" color="pink" @click="qController('resertpass')">
                                    <p class="full-height q-ma-none text-center my-auto text-comment-14">
                                        Забыли Пароль?
                                    </p>
                                </q-btn>
                                <q-separator class="bg-grey-4" />
                                <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                                    <q-btn label="Зарегистрироваться" @click="qController('register')" text-color="black" flat class="w-50 text-comment-14 h-vh-1080-50px" />
                                    <q-separator vertical class="bg-grey-4" />
                                    <!-- :disable ="func" == quasar error  -->
                                    <q-btn label="Войти" @click="authUser()" text-color="black" flat class="w-50 text-comment-14 h-vh-1080-50px" />
                                </q-card-actions>
                            </q-form>
                        </div>
                    </div>
                </div>
            </q-card>
        </q-dialog>
        <q-dialog v-model="confirm" persistent transition-show="flip-down" transition-hide="flip-up">
            <q-card class="bg-pink text-white">
                <q-bar>
                    <!-- <q-icon name="network_wifi"></q-icon>
              <q-icon name="network_cell"></q-icon>
              <q-icon name="battery_full"></q-icon>
              <div>9:34</div> -->
    
                    <q-space></q-space>
                </q-bar>
    
                <q-card-section>
                    <div class="text-h5">Id confirmation</div>
                </q-card-section>
    
                <q-card-section class="q-pt-none text-h6">
                    this is a simple id verification to avoid to serve your comforte in our community
                </q-card-section>
                <q-card-actions align="right" class="text-center">
                    <q-btn flat label="stay unverified" v-close-popup></q-btn>
                    <q-btn flat label="verify" glossy @click="virification()"></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="resetUrlPass" @hide="clearAll()" content-style="dialog" content-class="card-bg ">
            <q-card flat class="mw-i vw-25 rounded-14">
                <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Восстановление</p>
                <q-separator class="bg-grey-4" />
                <q-form>
                    <p class="q-mt-none mb-vh-2 mt-vh-5 text-comment-14 textgray text-center">
                        Введите новый пароль
                    </p>
                    <q-input input-class="q-ml-xs q-mr-md text-weight-regular" v-model="resetPasswordInput" label="Пароль" outlined lazy-rules class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none" type="password" @input="validateNewPassE()" :rules="[(val) => (val && val.length > 0) || 'Придумайте пароль']">
                    </q-input>
                    <q-input input-class="q-ml-xs q-mr-md text-weight-regular" v-model="resetTryPasswordInput" ref="pass" label="Повторите пароль" outlined type="password" class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none" lazy-rules @input="validateNewPassE()"
                        :rules="[
                  (val) =>
                    (val == resetPasswordInput && val.length > 0) || 'Пароли не совпадают!',
                ]">
                    </q-input>
                    <q-separator class="mt-vh-5 bg-grey-4" />
                    <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                        <q-btn label="Отмена" @click="resetUrlPass = false" text-color="black" flat class="w-50 text-comment-14 h-vh-1080-50px" />
                        <q-btn label="Восстановить" @click="resetNewPass()" text-color="black" flat :disable="!validateNewPass" class="w-50 text-comment-14 h-vh-1080-50px" />
                        <q-separator vertical class="bg-grey-4" />
                        <!-- :disable ="func" == quasar error  -->
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-dialog>
        <q-page-container class="q-pa-none fit absolute" style="padding-top: 0px">
            <router-view></router-view>
        </q-page-container>
    </q-layout>
    <!-- <q-pull-to-refresh
         :disable="disloader"
          @refresh="refresh"
          color="orange-2"
          bg-color="black"
          icon="autorenew"
        >
     </q-pull-to-refresh> -->
</template>

<script>
//import EssentialLink from "components/EssentialLink";
// import http from "../http-common";
import http from "../http-common";
import "../css/main.scss";
import { Cookies, SessionStorage } from "quasar";
import { Platform } from "quasar";
import { openURL } from "quasar";
import { initializerFirebase, askForPermissioToReceiveNotifications } from "../firebase";
import { mapState } from "vuex";
export default {
    name: "MainLayout",
    //components: {
    //  EssentialLink,
    //},
    data() {
        return {
            sign: "login",
            LogInSessionst: false,
            tab: "",
            theme: false,
            muteall: false,
            enableindicator: "pink",
            auth: false,
            ismodel: false,
            page: "lives",
            // Объекты авторизации
            signin: false,
            username: new String(""),
            email: new String(""),
            password: new String(""),
            passAgain: new String(""),
            validateAuth: false,
            okay: false,
            language: false,
            validateReg: false,
            validateReset: false,
            resetPass: false,
            resetUrlPass: false,
            resetcode: new String(""),
            resertusername: new String(""),
            resetPasswordInput: new String(""),
            resetTryPasswordInput: new String(""),
            validateNewPass: false,
            useravatar: "https://cdn.quasar.dev/img/boy-avatar.png",
            confirm: false,
        };
    },
    computed: {
        ...mapState(["pcm"]),
        disloader: function() {
            return !!(location.pathname != "/" | !this.$q.platform.is.mobile);
        }
    },
    watch: {
        language: function(val) {
            this.$store.dispatch("pcm/switch_language", { lang: val ? 'en' : 'ru' })
        },
        muteall: function(val) {
            this.$store.dispatch("pcm/muteall", { status: val });
        },
        theme: function(val) {
            this.$store.dispatch("pcm/theme", { status: val });
        }
    },
    beforeCreate() {
        this._G.fotervisible =
            this.$router.currentRoute.fullPath == "/" ||
            this.$router.currentRoute.fullPath == "/videos";
        this.$router.afterEach((to, from) => {
            if (to.fullPath == "/videos" || to.fullPath == "/") {
                this._G.fotervisible = true;
            } else {
                this._G.fotervisible = false;
            }
            if (to.fullPath == "/profile" || to.fullPath == "/profile/settings") {
                this.enableindicator = "transparent";
            } else {
                this.enableindicator = "pink";
            }
        });

        Date.RussianParse = function(String) {
            return Date.parse(
                String.split(".")[1] + "." + String.split(".")[0] + "." + String.split(".")[2]
            );
        };
        Date.prototype.tryMinuts = function() {
            if (this.getMinutes() < 10) {
                return "0" + this.getMinutes();
            } else {
                return this.getMinutes();
            }
        };
        Date.prototype.tryHours = function() {
            if (this.getHours() < 10) {
                return "0" + this.getHours();
            } else {
                return this.getHours();
            }
        };
        Date.prototype.tryDate = function() {
            if (this.getDate() < 10) {
                return "0" + this.getDate();
            } else {
                return this.getDate();
            }
        };
        Date.prototype.tryMonth = function() {
            if (this.getMonth() < 10) {
                return "0" + this.getMonth();
            } else {
                return this.getMonth();
            }
        };
    },
    sockets: {
        getverificationurl: function(data) {
            // openURL(data.url)
        },
        authStatus: function(data) {
            this.auth = data.status;
        },
        verify_user: function(res) {
            if (res.status) {
                this.confirm = true;
            }
        },
        cl_getmyavatar: function(response) {
            this.useravatar =
                response.avatar != null ?
                response.avatar :
                "https://cdn.quasar.dev/img/boy-avatar.png";
        },
    },
    beforeMount() {
        this.theme = this.pcm.controls.dark
        this.auth = this.pcm.user.auth;
        this.ismodel = this.pcm.user.rol;
    },
    created: function() {
        this.$root.$on('login', () => {
            this.LogInSessionst = !this.LogInSessionst
        })
        this.$root.$on('fullscreen', (req) => {
            if (req.state) {
                this.$q.fullscreen.request()

                    .then(() => { // v1.5.0+
                        this.$store.commit('pcm/fullscreen', { state: true });
                    })
                    .catch(err => { // v1.5.0+
                        // oh, no!!!
                    })
            } else {
                this.$q.fullscreen.exit()
                    .then(() => { // v1.5.0+

                        this.$store.commit('pcm/fullscreen', { state: false });
                    })
                    .catch(err => { // v1.5.0+
                        // oh, no!!!
                    })
            }
        })

    },
    mounted() {
        let vm = this;
        initializerFirebase().then(() =>
            askForPermissioToReceiveNotifications(
                vm.pcm.user.id,
                Platform.is
            ).then(() => console.log("permession requested"))
        );
        this.registerSocketId()
        let vh = window.innerHeight * 0.01;
        this.$socket.emit("checkAuth", { id: this.pcm.user.id });
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        // for(var i; i<=girlsVideos.length; i++){

        // }
        window.addEventListener("resize", () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
        if (
            this.$router.currentRoute.fullPath == "/profile" ||
            this.$router.currentRoute.fullPath == "/profile/settings"
        ) {
            this.enableindicator = "transparent";
        }
        if (this.pcm.auth) {
            this.ismodel = this.pcm.user.rol
            this.auth = this.pcm.auth;
            this.$socket.emit("s_getmyavatar", {
                userid: this.pcm.user.id,
            });
            this.$socket.emit("s_authcontroll", {
                massage: "auth",
            });
        } else {
            this.auth = false;
            this.ismodel = false;
        }
        this._G.auth = this.auth;

        if (Object.keys(this.$router.currentRoute.query).length != 0) {
            var urlGet = this.$router.currentRoute.query;
            if (urlGet.resertpass == "true") {
                //upCast
                if (
                    urlGet.code != null &&
                    urlGet.code != "" &&
                    urlGet.username != null &&
                    urlGet.username != ""
                ) {
                    this.resetcode = urlGet.code;
                    this.resertusername = urlGet.username;
                    this.resetUrlPass = true;
                }
            }
        }
    },
    methods: {
        registerSocketId: function() {
            this.$socket.emit("register_socket_id", { username: this.pcm.user.un, connected: this.pcm.auth, userid: this.pcm.user.id })
        },
        refresh(done) {

            setTimeout(() => {
                // this.items.push({}, {}, {}, {}, {}, {}, {}) 
                let isitrefrsh = !!(location.pathname != "/" | !this.$q.platform.is.mobile);
                if (isitrefrsh) {
                    this.$root.$emit('tagsRefreshEvent', true)
                }

                done()
            }, 1000)
        },
        reload() {
            this.$router.go('/profile')
            this.$nextTick(() => {
                this.$router.go('/')
            })

        },
        forcego() {
            //    this.$forceUpdate();
            setTimeout(() => {
                location.reload();
            }, 300);
        },
        sigInController() {
            this.LogInSessionst = !this.LogInSessionst;
        },
        qController(a) {
            this.sign = a;
        },
        virification() {
            console.log("sending ....");
            var data = !!this.pcm.user.id ? {
                userstate: this.auth,
                id: this.pcm.user.id,
                token: this.pcm.user.tk,
            } : {
                userstate: !!this.pcm.user.id,
            };
            this.$socket.emit("getverificationurl", data);
        },
        validateNewPassE() {
            this.validateNewPass =
                this.resetPasswordInput == this.resetTryPasswordInput &&
                this.resetPasswordInput.length > 0;
        },
        validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        eventValidReset() {
            this.validateReset = this.validateEmail(this.email);
        },
        eventValidRed() {
            this.validateReg =
                this.password.length > 0 &&
                this.username.length > 0 &&
                this.passAgain.length > 0 &&
                this.validateEmail(this.email) &&
                this.okay;
            // i dont use callback i know who i am
        },
        eventValidAuth() {
            this.validateAuth = this.password.length > 0 && this.username.length > 0;
            // i dont use callback i know who i am
        },
        resetPassword() {
            let data = {
                email: this.email,
            };
            http.post("/passwordrecovery", data).then((response) => {
                if (response.data.status == "ok") {
                    this.$q.notify("email успешно отправлен");
                    this.resetPass = false;
                    this.$set(this._G, "sign", false);
                } else {
                    this.$q.notify("Пользователь не найден или не существует");
                }
            });
        },
        resetNewPass() {
            let data = {
                code: this.resetcode,
                Username: this.resertusername,
                newpassword: this.resetPasswordInput,
            };
            http.post("/resetpassword", data).then((response) => {
                if (response.data.status == "ok") {
                    this.$q.notify("Пароль изменен");
                    this.resetUrlPass = false;
                    this.resetcode = new String("");
                    this.resertusername = new String("");
                    this.resetPasswordInput = new String("");
                    this.resetTryPasswordInput = new String("");
                } else {
                    this.$q.notify("Сылка неверна или устарела");
                }
            });
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
        createUser() {
            var data = {
                username: this.username,
                password: this.password,
                roles: [],
                email: this.email,
            };
            this.$refs.user.validate();
            this.$refs.pass.validate();
            if (this.$refs.user.hasError || this.$refs.pass.hasError) {
                this.formHasError = true;
            } else {
                http.post("/signup", data).then((response) => {
                    if (response.data.mess == "ok") {
                        this.auth = true;
                    } else {
                        this.auth = false;
                        this.LogInSessionst = false;
                        this.$q.notify(response.data.status);
                    }
                });
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
                    const useridid = response.data.userId;
                    const user = response.data.username;
                    const name = response.data.name;
                    this.$q.cookies.set('sspcm', { sstk: token, ssur: user, ssuid: useridid, ssun: user, ssrol: response.data.model }, {
                        expires: '1d'
                    })
                    this.auth = true;
                    this.LogInSessionst = false;
                    delete this.password;
                    delete this.passAgain;
                    this.LogInSession();

                } else {
                    this.$q.notify({
                        color: "negative",
                        message: "Неверный логин или пароль",
                    });
                }
            });
        },
        // Disconnect() {
        //   this.auth = false;
        //   this._G.auth = this.auth;
        //   this.ismodel = false;
        //   LocalStorage.set("token", null);
        //   LocalStorage.set("username", null);
        //   LocalStorage.set("userid", null);
        //   LocalStorage.set("name", null);
        //   LocalStorage.set("ismodel", null);
        //   this.$socket.emit("s_authcontroll", {
        //     massage: "deauth",
        //   });
        //   this.clearAll();
        //   if (
        //     this.$router.currentRoute.fullPath != "/" &&
        //     this.$router.currentRoute.fullPath != "/videos"
        //   ) {
        //     this.$router.push("/");
        //   }
        // },
        clearAll() {
            this.username = new String("");
            this.password = new String("");
            this.passAgain = new String("");
            this.email = new String("");
        },
        logout() {
            http({
                method: "get",
                url: "/logout",
                headers: {
                    "x-access-token": this.pcm.user.tk,
                },
            }).then((response) => {
                this.nologin = true;
                this.nnologin = false;
                this.$nextTick(() => {
                    SessionStorage.remove("sspcm");
                    Cookies.remove("sspcm");
                    this.$nextTick(() => {
                        location.reload()
                    })
                })
            });

        },
    },
};
</script>

<style lang="scss">
.language_toggle {
    .q-toggle__label {
        width: 50px;
    }
}
</style>