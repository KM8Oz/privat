
<template>
  <q-page class="bg-white text-white">
    <div v-if="$q.platform.is.mobile" class="mobile-only">
      <mobile></mobile>
    </div>

    <div v-if="$q.platform.is.desktop" class="desktop-only">
      <desktop></desktop>
    </div>
  </q-page>
</template>

<script>
import http from "../http-common";
import Desktop from "./desktop/profile.vue";
import Mobile from "./mobile/profile.vue";

export default {
  name: "PageIndex",
  components: {
    desktop: Desktop,
    mobile: Mobile
  },

  data() {
    return {
      bal: "100.00",
      nnologin: false,
      nologin: true,
      username: null,
      password: null,
      signupform: false,
      accept: false,
      roles: "",
      name: localStorage.getItem("username")
    };
  },
  methods: {
    create_model() {
      http({
        method: "post",
        url: "/create_model_chat",
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then(response => {
        // console.log(response);
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
      });
    },
    */
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
        roles: this.roles
      };

      http
        .post("/signup", data)
        .then(response => {
          if (response.data.mess == "ok") {
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
        .catch(err => {
          this.$q.notify("ошибка попробуйте снова и проверьте форму");
          this.nologin = false;
          this.signupform = true;
          this.nnologin = false;
        });
    },
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
        } else if (response.data.auth == "false") {
          this.$q.notify(response.data.reason);
          this.nologin = false;
          this.signupform = true;
          this.nnologin = false;
        }
      });
    }
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
        this.nologin = false;
        this.signupform = false;
        this.auth = true;
        this.nnologin = true;
      } else {
        this.nologin = true;
        this.nnologin = false;
      }
    });
  }
};
</script>
<style >
.mt10 {
  margin-top: 10vh;
}
</style>>
