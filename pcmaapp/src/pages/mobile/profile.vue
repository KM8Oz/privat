<template>
  <div class="bg-white text-black">
    <div v-if="nnologin">
      <div v-if="ismodel">
        <mmodel></mmodel>
      </div>
      <div v-if="!ismodel">
        <muser></muser>
      </div>
    </div>
    <div class="">
      <div class="q-pa-lg" style="max-width: 400px" v-if="nologin">
        <h4 class="flex flex-center">Войти</h4>
        <q-form class="flex flex-center">
          <q-input
            dense
            rounded
            outlined
            v-model="username"
            label="Ваше имя"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Укажите Ваше имя']"
          />

          <q-input
            dense
            rounded
            outlined
            type="password"
            v-model="password"
            label="Ваш пароль"
            lazy-rules
            :rules="[ val => val && val.length >= 7 || 'Пароль больше 8 символов']"
          />

          <div>
            <q-btn label="Войти" @click="signinstart()" dense rounded color="purple-13" />
            <q-btn label="Регистрация" @click="signup()" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
      <div class="q-pa-lg" style="max-width: 400px" v-if="signupform">
        <h6 dark class="flex flex-center">Регистрация</h6>
        <q-form class="flex flex-center">
          <q-input
            dense
            rounded
            outlined
            v-model="regname"
            label="Ваше имя"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Укажите Ваше имя']"
          />
          <q-input
            dense
            rounded
            outlined
            v-model="username"
            label="Ваш логин"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Укажите Ваш логин']"
          />
          <q-input
            dense
            rounded
            outlined
            v-model="regemail"
            label="Ваш email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Укажите Ваш email']"
          />
          <q-input
            dense
            rounded
            outlined
            type="password"
            v-model="password"
            label="Ваш пароль"
            lazy-rules
            :rules="[ val => val && val.length >= 7 || 'Требуется больше 8 символов']"
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
            <q-btn label="Вход" @click="signin()" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../http-common";
import MModel from "./profile_model.vue";
import MUser from "./profile_user.vue";
export default {
  name: "App",
  components: {
    mmodel: MModel,
    muser: MUser
  },
  data() {
    return {
      ismodel: false,
      nnologin: false,
      nologin: true,
      username: null,
      password: null,
      regname: null,
      regemail: null,
      signupform: false,
      accept: false,
      roles: ""
    };
  },
  beforeCreate() {
    http({
      method: "get",
      url: "/verify_sess",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response2 => {
      if (response2.data.session == "YES") {
        if (response2.data.ismodel == "Y") {
          console.log(response2.data.ismodel);
          this.ismodel = true;
          this.nnologin = true;
        } else {
          this.ismodel = false;
          this.nnologin = true;
        }
        this.nologin = false;
      }
    });
  },
  methods: {
    signup() {
      this.nologin = false;
      this.signupform = true;
      this.nnologin = false;
    },
    signin() {
      this.nologin = true;
      this.signupform = false;
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
          "x-access-token": localStorage.getItem("token")
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

          const token = response.data.reason;
          const user = this.username;
          localStorage.setItem("token", token);
          localStorage.setItem("username", user);
          this.nologin = false;
          this.signupform = false;
          this.auth = true;
          this.nnologin = true;
          location.reload();
        } else if (response.data.auth == "false") {
          this.$q.notify(response.data.reason);
          this.nologin = false;
          this.signupform = true;
          this.nnologin = false;
        }
      });
    }
  }
};
</script>
