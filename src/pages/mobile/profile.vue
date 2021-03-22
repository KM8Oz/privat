<template>
  <div class="bg-white fullpage flex-center-vertical text-black" >
    <div v-if="nnologin">
      <div v-if="ismodel">
        <transition name="slide"><mmodel class="fullpage" :pravite="true"></mmodel></transition>
      </div>
      <div v-if="!ismodel">
        <transition name="slide"><muser class="fullpage" :pravite="true"></muser></transition>
      </div>
    </div>
    <div v-if="!nnologin">
      <q-btn
        flat
        class="mbackbut"
        icon="arrow_back"
        size="2vh"
        @click="routeback()"
      />
      <p class="flex flex-center text-m-24  q-ma-none">Вход</p>
      <q-form class="flex flex-center ">
        <q-input
          class="w-100 q-mt-md q-mx-lg"
          input-class="text-h6 text-weight-regular text-left q-mb-xs q-ml-md q-py-xs q-px-xs"
          v-model="username"
          outlined dense
          rounded
          placeholder="Логин"
        />

        <q-input
          dense
           class="w-100 q-mt-md q-mx-lg"
          outlined
          input-class="text-h6 text-weight-regular text-left q-mb-xs q-ml-md q-py-xs q-px-xs"
          type="password"
          rounded
          v-model="password"
          placeholder="Пароль"
        />

        <div class="w-vw-90  mt-vh-2 flex-center-div">
          <q-btn
            label="Забыли пароль?"
            @click="resetpass()"
            color="pink-6"
            flat
            class="text-m-sm minheightbutfix"
          />
        </div>

        <q-btn
          class="w-vw-40  mt-vh-3"
          label="Войти"
          @click="signinstart()"
          dense
          rounded
          color="pink-6"
        />
      </q-form>
    </div>
    <div class="w-100" v-if="signupform">
      <q-btn
        flat
        class="mbackbut"
        icon="arrow_back"
        size="2vh"
        @click="routesig()"
      />
    <!--  <h6 dark class="flex flex-center">Регистрация</h6>
      <q-form class="flex flex-center">
        <q-input
          dense
          rounded
          outlined
          v-model="regname"
          label="Ваше имя"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Укажите Ваше имя']"
        />
        <q-input
          dense
          rounded
          outlined
          v-model="username"
          label="Ваш логин"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Укажите Ваш логин']"
        />
        <q-input
          dense
          rounded
          outlined
          v-model="regemail"
          label="Ваш email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Укажите Ваш email']"
        />
        <q-input
          dense
          rounded
          outlined
          type="password"
          v-model="password"
          label="Ваш пароль"
          lazy-rules
          :rules="[
            val => (val && val.length >= 7) || 'Требуется больше 8 символов'
          ]"
        />
        <input type="hidden" name="['user']" dark v-model="roles" />

        <div>
          <q-btn
            label="Зарегистрироваться"
            dense
            rounded
            @click="signupstart()"
            color="purple-13"
          />
          <q-btn
            label="Вход"
            @click="signin()"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form> -->
      <p class="q-mt-none mb-vh-2 mt-vh-2 text-m-24  text-center">
        Регистрация
      </p>
      <q-form class="w-vw-90 ma-auto">
        <q-input
          v-model="username"
          ref="user"
          placeholder="Ваш логин"
          rounded
          outlined
          lazy-rules
      class="w-100 q-mt-md "
          input-class="text-h6 text-weight-regular text-left q-mb-xs q-ml-md q-py-xs q-px-xs"
          type="text"
          @input="eventValidRed()"
          :rules="[val => (val && val.length > 0) || 'Укажите ваше имя']"
        >
        </q-input>
        <q-input
          v-model="email"
          placeholder="Email"
          outlined
           rounded
          lazy-rules
           class="w-100 q-mt-md "
          input-class="text-h6 text-weight-regular text-left q-mb-xs q-ml-md q-py-xs q-px-xs"
          type="email"
          @input="eventValidRed()"
          :rules="[
            val => (validateEmail(val) && val.length > 0) || 'Укажите email'
          ]"
        >
        </q-input>
        <q-input
          v-model="password"
          placeholder="Пароль"
          outlined
           rounded
          lazy-rules
        class="w-100 q-mt-md "
          input-class="text-h6 text-weight-regular text-left q-mb-xs q-ml-md q-py-xs q-px-xs"
          type="password"
          @input="eventValidRed()"
          :rules="[val => (val && val.length > 0) || 'Придумайте пароль']"
        >
        </q-input>
        <q-input
          v-model="passAgain"
          ref="pass"
          placeholder="Повторите пароль"
          type="password"
          outlined
          rounded
              class="w-100 q-mt-md "
          input-class="text-h6 text-weight-regular text-left q-mb-xs q-ml-md q-py-xs q-px-xs"
          lazy-rules
          @input="eventValidRed()"
          :rules="[
            val => (val == password && val.length > 0) || 'Пароли не совпадают!'
          ]"
        >
        </q-input>
        <q-checkbox
          v-model="okay"
          class="mt-vh-2 mobilepadding mx-vw-1 text-subtitle2"
          color="green"
          size="5vh"
          @input="eventValidRed()"
        >
          <p class="text-comment-14 gray-1337 q-ma-none ">
            Согласие на обработку моих персональных данных
          </p></q-checkbox
        >
        <div>
                <q-btn
                  label="Подтвердить"
                  @click="createUser()"
                  outline
                  rounded
                  text-color="pink"
                  class="full-width q-mt-md"
                />
                <div class="text-center q-mt-sm">
                  <p class="q-mb-sm">или</p>
                </div>
                <q-btn
                  label="Уже есть аккаунт?"
                  @click="signUp = false"
                   outline
                  rounded
                  text-color="pink"
                  class="full-width"
                />
              </div> 
        <div class="d-flex">
          <q-btn
            label="Зарегистрироваться"
            @click="createUser()"
            text-color="black"
            dense
            rounded
            color="pink-6"
            :disable="!validateReg"
            class="w-vw-40 text-comment-14 btnwhitedis ml-auto mr-auto  mt-vh-4 h-vh-1080-50px"
          />
          <!-- :disable ="func" == quasar error  -->
        </div>
      </q-form>
    </div>
    <div v-if="resetPass" class="w-100">
      <q-btn
        flat
        class="mbackbut"
        icon="arrow_back"
        size="2vh"
        @click="routesig()"
      />
      <p class="q-mt-none mb-vh-2 mt-vh-2 text-m-24 text-center">
        Восстановление
      </p>
      <q-form>
        <p
          class="q-mt-none mb-vh-2 mt-vh-2 text-comment-18 textgray text-center"
        >
          Введите e-mail, чтобы восстановить пароль.<br />Мы пришлем инструкцию
          на указанную почту.<br />Если вы не получили письмо в течение 10<br />минут,
          проверьте папку «Спам».
        </p>
        <q-input
          v-model="email"
          label="Email"
          outlined
          lazy-rules
          class="mt-vh-2 text-comment-14  mobilepadding w-vw-90 ma-auto h-vh-5-st q-pa-none"
          type="email"
          @input="eventValidReset()"
          :rules="[
            val => (validateEmail(val) && val.length > 0) || 'Укажите email'
          ]"
        >
        </q-input>
        <div class="d-flex">
          <q-btn
            label="Восстановить"
            @click="resetPassword()"
            text-color="black"
            dense
            rounded
            color="pink-6"
            :disable="!validateReset"
            class="w-vw-40 text-comment-14 btnwhitedis ml-auto mr-auto  mt-vh-4 h-vh-1080-50px"
          />
          <!-- :disable ="func" == quasar error  -->
        </div>
      </q-form>
    </div>
    <div class="authbot">
      <div v-if="nologin" class="flex-center-div">
        <p class="textgray w-mxc  q-ma-none">
          Ещё нет аккаунта?
          <q-btn
            label="Зарегистрируйтесь"
            @click="signup()"
            color="pink-6"
            flat
            class="text-m-sm minheightbutfix"
          />
        </p>
      </div>
    </div>
    <div
      v-if="!nologin && ismodel == null && !signupform && !resetPass"
      class="w-100 d-flex"
    >
      <q-spinner color="pink-6" size="15vw" class="ma-auto" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import http from "../../http-common";
import MModel from "./profile_model.vue";
import MUser from "./profile_user.vue";
export default {
  name: "profile",
  components: {
    mmodel: MModel,
    muser: MUser
  },
  data() {
    return {
      ismodel: false,
      nnologin: false,
      nologin: false,
      regname: null,
      regemail: null,
      signupform: false,
      accept: false,
      roles: "USER",
      username: new String(""),
      email: new String(""),
      password: new String(""),
      passAgain: new String(""),
      validateAuth: false,
      okay: false,
      validateReg: false,
      validateReset: false,
      resetPass: false,
      resetUrlPass: false,
      resetcode: new String(""),
      resertusername: new String(""),
      resetPasswordInput: new String(""),
      resetTryPasswordInput: new String(""),
      validateNewPass: false
    };
  },
  computed:{
  ...mapState(['pcm'])
  },
  beforeMount() {
   //console.log( this.pcm);
    this._G.fotervisible = false;
   this.ismodel = this.pcm.user.rol
   this.auth = this.pcm.auth
   this.token = this.pcm.user.tk
   this.username =  this.pcm.user.un
   this.userid = this.pcm.user.id
   this.nnologin = this.auth
    // http({
    //   method: "get",
    //   url: "/verify_sess",
    //   headers: {
    //     "x-access-token": this.pcm.user.tk
    //   }
    // }).then(response2 => {
    //   if (response2.data.session == "YES") {
    //     if (response2.data.ismodel == "Y") {
    //       this.ismodel = true;
    //       this.nnologin = true;
    //     } else {
    //       this.ismodel = false;
    //       this.nnologin = true;
    //     }
    //     this.nologin = false;
    //   } else {
    //     this.nologin = true;
    //   }
    // });
  },
  methods: {
     onright: function(){
      this.$router.push('/')
    },
    createUser() {
      var data = {
        username: this.username,
        password: this.password,
        roles: [],
        email: this.email
      };
      this.$refs.user.validate();
      this.$refs.pass.validate();
      if (this.$refs.user.hasError || this.$refs.pass.hasError) {
        this.formHasError = true;
      } else {
        http.post("/signup", data).then(response => {
          if (response.data.mess == "ok") {
             this.$q.notify({
              message: "успешная регистрация можете войти",
              color: "green"
           });
             this.routesig()
          } else {
            this.$q.notify({
             message: `Ошибка регистрации попробуйте позднее: \n ${response.data.status}`,
              multiLine:true,
              color: "red"
              })
          }
          this.routesig()
        });
        this.sign = false;
      }
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
        email: this.email
      };
      http.post("/passwordrecovery", data).then(response => {
        if (response.data.status == "ok") {
          this.$q.notify("email успешно отправлен");
          this.routesig()
        } else {
          this.$q.notify("Пользователь не найден или не существует");
        }
      });
    },
    routeback() {
      this.$root.$emit('changepage',1)
    },
    routesig() {
      this.signin()
    },
    signup() {
      this.resetPass = false;
      this.nologin = false;
      this.signupform = true;
      this.nnologin = false;
    },
    signin() {
      this.resetPass = false;
      this.nologin = true;
      this.signupform = false;
      this.nnologin = false;
    },
    resetpass() {
      this.resetPass = true;
      this.signupform = false;
      this.nologin = false;
      this.nnologin = false;
    },
    signupstart() {
      this.nologin = false;
      this.signupform = false;
      var data = {
        username: this.username,
        password: this.password,
        roles: this.roles,
        name: this.regname,
        email: this.regemail
      };

      http
        .post("/signup", data)
        .then(response => {
          if (response.data.mess == "ok") {
            this.$q.notify({
              message: "успешная регистрация можете войти",
              color: "green"
            });
            this.nologin = true;
            this.signupform = false;
            this.nnologin = false;
          } else if (response.data.auth == "false") {
            this.$q.notify(response.data.reason);
            this.nologin = false;
            this.signupform = true;
            this.nnologin = false;
          } else {
            this.nologin = false;
            this.signupform = true;
            this.nnologin = false;
          }
        })
        .catch(error => {
          if (error.response.data.status === "Username is already taken!") {
            this.$q.notify({
              message: "логин занят",
              color: "purple"
            });
          } else if (
            error.response.data.status === "Email is already in use!"
          ) {
            this.$q.notify({
              message: "email занят",
              color: "purple"
            });
          }

          this.nologin = false;
          this.signupform = true;
          this.nnologin = false;
        });
    },
    /*
    logout() {
      http({
        method: "get",
        url: "/logout",
        headers: {
          "x-access-token": LocalStorage.getItem("token")
        }
      }).then(response => {
        this.nologin = true;
        this.nnologin = false;
        this.$router.push("/");
      });
    },
    */
    signinstart() {
      this.nologin = false;
      this.signupform = false;
      var data = {
        username: this.username,
        password: this.password
      };

      http.post("/signin", data).then(response => {
        if (response.data.stat == "ok") {
          this.nologin = false;
          this.signupform = true;
          const name = response.data.name;
          const token = response.data.reason;
          const user = this.username;
          const useridid = response.data.userId;
          // LocalStorage.set("token", token);
          // LocalStorage.set("username", user);
          // LocalStorage.set("userid", useridid);
          // LocalStorage.set("name", name);
          // cockies
              this.$q.sessionStorage.set('sspcm',{sstk:token,ssur:user,ssuid:useridid,ssun:user,ssrol:response.data.model})
           this.$q.cookies.set('sspcm',{sstk:token,ssur:user,ssuid:useridid,ssun:user,ssrol:response.data.model},{
            expires:'1d'
          })
          this.nologin = false;
          this.signupform = false;
          this.auth = false;
          this.nnologin = false;
          location.reload();
        } else {
          this.$q.notify(response.data.reason);
          this.nologin = true;
          this.signupform = false;
          this.nnologin = false;
        }
      });
    }
  }
};
</script>
