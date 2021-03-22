<template>
  <q-layout class="text-transparent" view="lhh lpr lff">
    <div class="mobile-only">
      
      <q-footer class="text-transparent ddd fixed-bottom head" bordered style="position:fixed; ">
        <q-tabs
          v-model="tab"
          class="text-white row"
          dense
          no-caps
          indicator-color="transparent"
        >
          <q-route-tab
            to="/videos"
            class="col-3 iconfooter q-pa-none head"
            dense
            icon="mdi-video-vintage"
          >
            <p class="q-ma-none text-comment-20M">Лента</p>
          </q-route-tab>

          <q-route-tab
            to="/notstream1"
            v-if="ismodel"
            class="col-3 iconfooter q-pa-none head"
            dense
            icon="mdi-camera-plus"
          >
            <p class="q-ma-none text-comment-20M">Запись</p>
          </q-route-tab>

          <q-route-tab
            to="/chat"
            v-if="ismodel"
            class="col-3 iconfooter q-pa-none head"
            dense
            icon="mdi-webcam"
          >
            <p class="q-ma-none text-comment-20M">Начать стрим</p>
          </q-route-tab>

          <q-route-tab
            to="/live"
            v-if="!ismodel"
            class="col-3 iconfooter q-pa-none head"
            dense
            icon="videocam"
          >
            <p class="q-ma-none text-comment-20M">Трансляции</p>
          </q-route-tab>

          <q-route-tab
            to="/categories"
            v-if="!ismodel"
            class="col-3 iconfooter q-pa-none head"
            dense
            icon="search"
          >
            <p class="q-ma-none text-comment-20M">Входящие</p>
          </q-route-tab>
          
          <q-route-tab 
          to="/profile" 
          class="col-3 iconfooter q-pa-none head" 
          dense 
          icon="account_circle"
          >
            <p class="q-ma-none text-comment-20M">Я</p>
          </q-route-tab>

        </q-tabs>
      </q-footer>
    </div>
    <div class="desktop-only head q-mb-none">
      <q-header reveal class="head bg-white" elevated>
        <q-toolbar flat class="head bg-white q-pa-none">
          <q-toolbar-title class="head text-black">
            <q-btn
              to="/"
              flat
              v-ripple="false"
              class="ml-vw-1 head icohead no-shadow"
            >
              <q-avatar class="head icohead absolute-center h-50">
                <img
                  src="../assets/PCMLogo.svg"
                  class="head icohead absolute-center h-50"
                />
              </q-avatar>
            </q-btn>
          </q-toolbar-title>

          <q-tabs
            v-model="tab"
            dense
            no-caps
            indicator-color="pink"
            class="head bg-white text-black q-mr-md col-4 col-md-5"
          >
            <div class="col-8" v-if="!ismodel"></div>
            <q-route-tab class="head col-4" name="lives" to="/live">
              <p class="q-pa-none q-ma-none absolute-center text-xl">В эфире</p>
            </q-route-tab>
            <q-route-tab class="head col-4" to="/notstream1" v-if="ismodel">
              <p class="q-pa-none q-ma-none absolute-center text-xl">
                Записать видео
              </p>
            </q-route-tab>

            <q-route-tab class="head col-4" to="/newstream" v-if="ismodel">
              <p class="q-pa-none q-ma-none absolute-center text-xl">
                Начать стрим
              </p>
            </q-route-tab>

            <!--q-route-tab class="col-2" name="categories" to="/categories"><p class="absolute-center" style="font-size:2.5vh; !imported">Категории</p></q-route-tab>-->
          </q-tabs>

          <div v-if="auth" class="row mr-vw-1">
            <q-avatar class="vh5box">
              <img
                class="absolute-center bordavatar"
                :src="useravatar"
              />
              <q-menu class="min-vw-10">
                <q-list class="min-vw-10">
                  <q-item v-if="!ismodel" to="/become_a_model" clickable v-close-popup>
                    <q-item-section class="absolute-center text-xl text-center w-100"
                      >Стать Моделью</q-item-section
                    >
                  </q-item>
                  <q-item to="/profile" clickable v-close-popup>
                    <q-item-section class="absolute-center text-xl"
                      >Профиль</q-item-section
                    >
                  </q-item>
                  <q-item
                    clickable
                    @click="logout(), Disconnect()"
                    v-close-popup
                  >
                    <q-item-section class="absolute-center text-xl"
                      >Выйти</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-avatar>
          </div>
          <div v-else>
            <q-btn
              color="pink"
              @click="(sign = true), (signUp = false)"
              class="divlist q-mr-md text-white btn-fixed-width"
              dense
            >
              <p class="text-xl absolute-center">
                Вход
              </p>
            </q-btn>
          </div>
        </q-toolbar>
        <q-separator class="bg-grey-4" />
      </q-header>
    </div>

    <q-dialog
      v-model="sign"
      @hide="clearAll()"
      content-style="dialog"
      content-class="card-bg "
    >
      <q-card flat class=" mw-i vw-25 rounded-14">
        <div >
          <div v-if="signUp">
            <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Регистрация</p>
            <q-separator />
            <q-form>
              <q-input
                v-model="username"
                ref="user"
          
                label="Ваш логин"
                outlined
                lazy-rules
                class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="text"
                @input = "eventValidRed()"
                :rules="[
                  (val) => (val && val.length > 0) || 'Укажите ваше имя',
                ]"
              >
              </q-input>
              <q-input
                v-model="email"
          
                label="Email"
                outlined
                lazy-rules
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="email"
                @input = "eventValidRed()"
                :rules="[
                  (val) =>
                    (validateEmail(val) && val.length > 0) || 'Укажите email',
                ]"
              >
              </q-input>
              <q-input
                v-model="password"
          
                label="Пароль"
                outlined
                lazy-rules
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="password"
                @input = "eventValidRed()"
                :rules="[
                  (val) => (val && val.length > 0) || 'Придумайте пароль',
                ]"
              >
              </q-input>
              <q-input
                v-model="passAgain"
                ref="pass"
                label="Повторите пароль"
                outlined
                type="password"
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none "
                lazy-rules
                @input = "eventValidRed()"
                :rules="[(val) => val == password && val.length > 0|| 'Пароли не совпадают!']"
              >
              </q-input>
              <q-checkbox 
              v-model="okay" 
              class="mt-vh-2 mx-vw-1 " 
              dense 
              size = "4vh"
              @input = "eventValidRed()"
              >
              <p class="text-comment-14 gray-1337 q-ma-none ">Согласие на обработку моих персональных данных</p></q-checkbox>
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
              <q-separator class="mt-vh-5 "/>
              <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                <q-btn
                  label="Войти"
                  @click="signUp=false"
                  text-color="black"
                  flat 
                  class="w-50 text-comment-14 h-vh-1080-50px" 
                />
                <q-separator vertical/>
                <q-btn
                  label="Зарегистрироваться"
                  @click="createUser()"
                  text-color="black"
                  flat 
                  :disable="!validateReg"
                  class="w-50 text-comment-14 h-vh-1080-50px"
                />
                
                <!-- :disable ="func" == quasar error  -->
                
              </q-card-actions>
            </q-form>
          </div>
        
          <div v-else>
            <div v-if="resetPass"> 
              <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Восстановление</p>
            <q-separator />
            <q-form>
              <p class="q-mt-none mb-vh-2 mt-vh-2 text-comment-14 textgray text-center">Введите e-mail, чтобы восстановить пароль.<br>Мы пришлем инструкцию на указанную почту.<br>Если вы не получили письмо в течение 10<br>минут, проверьте папку «Спам».</p>
              <q-input
                v-model="email"    
                label="Email"
                outlined
                lazy-rules
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="email"
                @input = "eventValidReset()"
                :rules="[
                  (val) =>
                    (validateEmail(val) && val.length > 0) || 'Укажите email',
                ]"
              >
              </q-input>
              <q-separator class="mt-vh-5"/>
              <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                <q-btn
                  label="Отмена"
                  @click="resetPass = false"
                  text-color="black"
                  flat                   
                  class="w-50 text-comment-14 h-vh-1080-50px" 
                />
                <q-btn
                  label="Восстановить"
                  @click="resetPassword()"
                  text-color="black"
                  flat 
                  :disable ="!validateReset"
                  class="w-50 text-comment-14 h-vh-1080-50px"
                />
                <q-separator vertical/>
                <!-- :disable ="func" == quasar error  -->
              </q-card-actions>
            </q-form>
            </div>
            <div v-else>
            <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Вход</p>
            <q-separator />
            <q-form>
              <q-input
                class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                v-model="username"
                label="Почта"
                outlined
                lazy-rules
                type="email"
                @input = "eventValidAuth()"
                :rules="[(val) => val && val.length > 0]"
              >
              </q-input>
              <q-input
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                v-model="password"
                label="Пароль"
                outlined
                lazy-rules
                type="password"
                @input = "eventValidAuth()"
                :rules="[(val) => val && val.length > 0]"
              >
              </q-input>
              <q-btn flat 
              class="flex mt-vh-2 mb-vh-2 text-comment-14 mx-vw-1" 
              :ripple="false" 
              color="pink"
              @click="resetPass=true;"
                ><p
                  class="full-height q-ma-none text-center my-auto text-comment-14"
                >
                  Забыли Пароль?
                </p></q-btn
              >
              <q-separator/>
              <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                <q-btn
                  label="Зарегистрироваться"
                  @click="signUp = true"
                  text-color="black"
                  flat 
                  class="w-50 text-comment-14 h-vh-1080-50px"
                />
                <q-separator vertical/>
                <!-- :disable ="func" == quasar error  -->
                <q-btn
                  label="Войти"
                  @click="authUser()"
                  text-color="black"
                  flat                   
                  :disable ="!validateAuth"
                  class="w-50 text-comment-14 h-vh-1080-50px" 
                />
              </q-card-actions>
            </q-form>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="resetUrlPass"
      @hide="clearAll()"
      content-style="dialog"
      content-class="card-bg "
    >
    <q-card flat class=" mw-i vw-25 rounded-14">
      <p class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Восстановление</p>
            <q-separator />
            <q-form>
              <p class="q-mt-none mb-vh-2 mt-vh-5 text-comment-14 textgray text-center">Введите новый пароль</p>
              <q-input
                v-model="resetPasswordInput"
                label="Пароль"
                outlined
                lazy-rules
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="password"
                @input = "validateNewPassE()"
                :rules="[
                  (val) => (val && val.length > 0) || 'Придумайте пароль',
                ]"
              >
              </q-input>
              <q-input
                v-model="resetTryPasswordInput"
                ref="pass"
                label="Повторите пароль"
                outlined
                type="password"
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none "
                lazy-rules
                @input = "validateNewPassE()"
                :rules="[(val) => val == resetPasswordInput && val.length > 0|| 'Пароли не совпадают!']"
              >
              </q-input>
              <q-separator class="mt-vh-5"/>
              <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                <q-btn
                  label="Отмена"
                  @click="resetUrlPass = false"
                  text-color="black"
                  flat                   
                  class="w-50 text-comment-14 h-vh-1080-50px" 
                />
                <q-btn
                  label="Восстановить"
                  @click="resetNewPass()"
                  text-color="black"
                  flat 
                  :disable ="!validateNewPass"
                  class="w-50 text-comment-14 h-vh-1080-50px"
                />
                <q-separator vertical/>
                <!-- :disable ="func" == quasar error  -->
              </q-card-actions>
            </q-form>
    </q-card>
    </q-dialog>
        <q-page-container class="q-pa-none" style="padding-top:0px;">
          <router-view></router-view>
        </q-page-container>
  </q-layout>
</template>

<script>
//import EssentialLink from "components/EssentialLink";
// import http from "../http-common";
import http from "../http-common";
import "../css/main.scss";

export default {
  name: "MainLayout",
  //components: {
  //  EssentialLink,
  //},
  data() {
    return {
      tab: "main",
      auth: false,
      ismodel: false,
      page: "lives",
      // Объекты авторизации
      sign: false,
      signUp: false,
      username: new String(""),
      email: new String(""),
      password: new String(""),
      passAgain: new String(""),
      validateAuth:false,
      okay:false,
      validateReg:false,
      validateReset:false,
      resetPass:false,
      resetUrlPass:false,
      resetcode: new String(""),
      resertusername: new String(""),
      resetPasswordInput:new String(""),
      resetTryPasswordInput:new String(""),
      validateNewPass: false,
      useravatar:'https://cdn.quasar.dev/img/boy-avatar.png',
    };
  },
  
  beforeCreate() {
    http({
      method: "get",
      url: "/verify_sess",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response2) => {
      if (response2.data.session == "YES") {
        if (response2.data.ismodel == "Y") {
          this.ismodel = true;
        }
        this.$socket.emit('s_getmyavatar', {
            userid: localStorage.getItem("userid")
          })
        this.auth = true;
      } else {
        this.auth = false;
      }
    });
    Date.RussianParse = function (String) {
      return Date.parse(String.split(".")[1]+"."+String.split(".")[0]+"."+String.split(".")[2])
    };
    Date.prototype.tryMinuts = function () {
      if (this.getMinutes() < 10) {
        return "0" + this.getMinutes();
      } else {
        return this.getMinutes();
      }
    };
    Date.prototype.tryHours = function () {
      if (this.getHours() < 10) {
        return "0" + this.getHours();
      } else {
        return this.getHours();
      }
    };
    Date.prototype.tryDate = function () {
      if (this.getDate() < 10) {
        return "0" + this.getDate();
      } else {
        return this.getDate();
      }
    };
    Date.prototype.tryMonth = function () {
      if (this.getMonth() < 10) {
        return "0" + this.getMonth();
      } else {
        return this.getMonth();
      }
    };
  },
   sockets:{
        cl_getmyavatar: function(response) {
            this.useravatar = (response.avatar != null)?response.avatar:'https://cdn.quasar.dev/img/boy-avatar.png';
        }
      },
  mounted() {
         if(Object.keys(this.$router.currentRoute.query).length != 0){
      var urlGet = this.$router.currentRoute.query;
      if(urlGet.resertpass == "true"){ //upCast
        if(urlGet.code!=null&&urlGet.code !=""&&urlGet.username!=null&&urlGet.username!=""){
          this.resetcode = urlGet.code;
          this.resertusername = urlGet.username;
          this.resetUrlPass = true;
        }
      }
    }
      },
  methods: {
    validateNewPassE(){
      this.validateNewPass = (this.resetPasswordInput == this.resetTryPasswordInput&&this.resetPasswordInput.length>0);
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    eventValidReset(){
        this.validateReset = this.validateEmail(this.email);
    },
    eventValidRed(){
        this.validateReg = this.password.length>0&&this.username.length>0&&this.passAgain.length>0&&this.validateEmail(this.email)&&this.okay;
        // i dont use callback i know who i am
    },
    eventValidAuth(){
        this.validateAuth = this.password.length>0&&this.username.length>0;
        // i dont use callback i know who i am
    },
    resetPassword(){
      let data ={
        email: this.email,
      };
      http.post("/passwordrecovery", data).then((response) => {
        if (response.data.status == "ok") {
          this.$q.notify("email успешно отправлен")
          this.resetPass = false;
          this.sign = false;
        }else{
          this.$q.notify("Пользователь не найден или не существует")
        }
      });
    },
    resetNewPass(){
      let data ={
        code: this.resetcode,
        Username: this.resertusername,
        newpassword:this.resetPasswordInput,
      };
      http.post("/resetpassword", data).then((response) => {
        if (response.data.status == "ok") {
          this.$q.notify("Пароль изменен")
          this.resetUrlPass = false;
          this.resetcode = new String("");
          this.resertusername = new String("");
          this.resetPasswordInput = new String("");
          this.resetTryPasswordInput = new String("");
        }else{
          this.$q.notify("Сылка неверна или устарела")
        }
      });
    },
    LogInSession() {
      http({
        method: "get",
        url: "/verify_sess",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((response2) => {
        if (response2.data.session == "YES") {
          if (response2.data.ismodel == "Y") {
            this.ismodel = true;
          }
          this.auth = true;
          
        } else {
          this.auth = false;
        }
      });

      location.replace("/");
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
          }
          location.replace("/");
        });
        this.sign = false;
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
          localStorage.setItem("token", token);
          localStorage.setItem("username", user);
          localStorage.setItem("userid", useridid);
          localStorage.setItem("name", name);
          this.auth = true;
          this.sign = false;
          this.LogInSession();
          delete this.username;
          delete this.email;
          delete this.password;
          delete this.passAgain;
        } else {
          this.$q.notify({
            color: "negative",
            message: "Неверный логин или пароль",
          });
        }
      });
    },
    Disconnect() {
      this.auth = false;
      localStorage.setItem("token", null);
      localStorage.setItem("username", null);
      localStorage.setItem("userid", null);
      localStorage.setItem("name", null);
      location.replace("/");
    },
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
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((response) => {
        this.nologin = true;
        this.nnologin = false;
      });
    },
  },
};
</script>
