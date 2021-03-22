<template>
  <div class="bg-white fullpage flex-center-vertical text-black">
    <div v-if="nnologin">
      <div v-if="ismodel">
        <mmodel class="fullpage" :pravite="false"></mmodel>
      </div>
      <div v-if="!ismodel">
        <muser class="fullpage" :pravite="false"></muser>
      </div>
    </div>

    <div v-if="nologin">
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
          dense
          class="w-vw-90 mt-vh-2 h-vh-5-st"
          outlined
          v-model="username"
          placeholder="Логин"
        />

        <q-input
          dense
          class="w-vw-90 mt-vh-2 h-vh-5-st"
          outlined
          type="password"
          v-model="password"
          placeholder="Пароль"
        />

        <div class="w-vw-90 mt-vh-2 flex-center-between">
          <q-btn
            label="Забыли пароль?"
            @click="resetpass()"
            color="pink-6"
            flat
            class="text-m-sm minheightbutfix"
          />
        </div>

        <q-btn
          class="w-vw-30 mt-vh-2"
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
      <!-- <h6 dark class="flex flex-center">Регистрация</h6>
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
          label="Ваш логин"
          outlined
          lazy-rules
          class="mt-vh-5 mobilepadding text-comment-14 mx-vw-1 h-vh-5-st q-pa-none"
          type="text"
          @input="eventValidRed()"
          :rules="[val => (val && val.length > 0) || 'Укажите ваше имя']"
        >
        </q-input>
        <q-input
          v-model="email"
          label="Email"
          outlined
          lazy-rules
          class="mt-vh-2 mobilepadding text-comment-14 mx-vw-1 h-vh-5-st q-pa-none"
          type="email"
          @input="eventValidRed()"
          :rules="[
            val => (validateEmail(val) && val.length > 0) || 'Укажите email'
          ]"
        >
        </q-input>
        <q-input
          v-model="password"
          label="Пароль"
          outlined
          lazy-rules
          class="mt-vh-2 mobilepadding text-comment-14 mx-vw-1 h-vh-5-st q-pa-none"
          type="password"
          @input="eventValidRed()"
          :rules="[val => (val && val.length > 0) || 'Придумайте пароль']"
        >
        </q-input>
        <q-input
          v-model="passAgain"
          ref="pass"
          label="Повторите пароль"
          outlined
          type="password"
          class="mt-vh-2 mobilepadding text-comment-14 mx-vw-1 h-vh-5-st q-pa-none "
          lazy-rules
          @input="eventValidRed()"
          :rules="[
            val => (val == password && val.length > 0) || 'Пароли не совпадают!'
          ]"
        >
        </q-input>
        <q-checkbox
          v-model="okay"
          class="mt-vh-2 mobilepadding mx-vw-1 "
          dense
          size="4vh"
          @input="eventValidRed()"
        >
          <p class="text-comment-14 gray-1337 q-ma-none ">
            Согласие на обработку моих персональных данных
          </p></q-checkbox
        >
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
import http from "../../http-common";
import MModel from "./profile_model.vue";
import MUser from "./profile_user.vue";
import { LocalStorage } from 'quasar';
import {
mapState
} from 'vuex';
export default {
  name: "App",
  components: {
    mmodel: MModel,
    muser: MUser
  },
  data() {
    return {
      ismodel: null,
      nnologin: false,
      nologin: false,
      // regname: null,
      // regemail: null,
      signupform: false,
      accept: false,
      roles: "",
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
    ...mapState(["pcm"])
  },
  beforeMount() {
    this._G.fotervisible = false;
    http({
      method: "get",
      url: "/verify_sess",
      headers: {
        "x-access-token": this.pcm?.user?.tk
      }
    }).then(response2 => {
      if (response2.data.session == "YES") {
        if (response2.data.ismodel == "Y") {
          this.ismodel = true;
          this.nnologin = true;
        } else {
          this.ismodel = false;
          this.nnologin = true;
        }
        this.nologin = false;
      } else {
        this.nologin = true;
      }
    });
  },
  mounted() {
    if (this.pcm.auth == false) {
      this.$router.push("/");
    }
    this.$socket.emit("identification", {
      token: this.pcm?.user?.tk,
      update: false,
    });
    this.username = this.pcm?.user?.un;
    // const checkout = YandexCheckout(
    //   "7CD398BA5F300CE05CE19E46EA4ACA4EB5AA9728AF031DA21ED6D331B685BB02"
    // );
  },
  methods: {
   
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
          } else {
            this.$q.notify("Ошибка регистрации попробуйте позднее");
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
      this.$router.push("/");
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
        console.log(response.data);

        if (response.data.stat == "ok") {
          this.nologin = false;
          this.signupform = true;
          const name = response.data.name;
          const token = response.data.reason;
          const user = this.username;
          const useridid = response.data.userId;
          LocalStorage.set("token", token);
          LocalStorage.set("username", user);
          LocalStorage.set("userid", useridid);
          LocalStorage.set("name", name);
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
