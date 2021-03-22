<template>
  <div class="bg-white row">
    <div class="col-lg-2 col-md-3 mt-vh-4">
      <q-list class="menu-list text-black q-pa-none">
        <q-item clickable v-ripple class="q-pa-none h-vh-5-st">
          <q-item-section avatar class="ml-vw-1 col-1 q-pr-none">
            <q-icon size="3.1vh" name="home" class="text-pink-6" />
          </q-item-section>

          <q-item-section class="text-pink-6 text-fxl ml-vw-1">Рекомендуемые</q-item-section>
        </q-item>
        <q-item clickable v-ripple class="q-pa-none h-vh-5-st">
          <q-item-section avatar class="ml-vw-1 col-1 q-pa-none">
            <q-icon size="3.1vh" name="people_outline" />
          </q-item-section>
          <q-item-section class="ml-vw-1 text-fxl">Подписки</q-item-section>
        </q-item>
        <q-separator class="bg-grey-4" />

        <q-item v-if="!subscribListL">
          <q-item-label
            caption
            class="text-xl text-weight-thin text-black"
          >Здесь появятся аккаунты, на которые вы подписаны</q-item-label>
        </q-item>

        <div v-else>
          <div class="text-xl mt-vh-2 ml-vw-1 text-grey-8">Ваши аккаунты из топа</div>
          <div clickable v-for="sub in subscribList" :key="sub.id">
            <div class="row items-center q-mb-none ml-vw-1">
              <q-avatar size="5vh">
                <img class="bordavatar" :src="sub.avatar" />
              </q-avatar>
              <div class="q-mt-md q-ml-sm">
                <p class="text-xl col-10 text-weight-medium q-mb-none">{{sub.modelname}}</p>
                <p class="text-grey-8 text-md">@{{sub.modelusername}}</p>
              </div>

              <div class="row justify-end col q-pt-none"></div>
            </div>
          </div>
        </div>
      </q-list>
    </div>
    <div class="col-lg-7 col-md-5 mt-vh-4 d-flex justify-content-center fullpageMT">
      <div class="m-mx-23 h-100">
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-100">
          <q-card-section class="q-pb-none w-mxc q-pa-none row">
            <p class="col text-fxl text-black font-weight-bolder line-height-1">Анкета модели</p>
          </q-card-section>
          <q-input
            class="mt-vh-2 text-comment-14"
            autogrow
            maxlength="60"
            outlined
            v-model="name"
            placeholder="Имя"
            dense
            :rules="[ val => val && val.length >= 3 || 'Минимум 3 буквы']"
          />
          <q-input
            class="mt-vh-2 text-comment-14"
            autogrow
            maxlength="60"
            outlined
            v-model="surName"
            placeholder="Фамилия"
            dense
            :rules="[ val => val && val.length >= 3 || 'Минимум 3 буквы']"
          />
          <q-input
            class="mt-vh-2 text-comment-14"
            autogrow
            maxlength="60"
            outlined
            v-model="lastName"
            placeholder="Отчество"
            dense
            :rules="[ val => val && val.length >= 3 || 'Минимум 3 буквы']"
          />

          <q-input
            class="mt-vh-2 text-comment-14"
            outlined
            v-model="date"
            placeholder="Дата Рождения"
            mask="##.##.####"
            :rules="[ val => val && tryDate(val) || 'Неверная дата']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="DD.MM.YYYY" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div class="mt-vh-2">
            <q-file
              v-model="files"
              label="Документ удостоверяющий личность"
              outlined
              multiple
              dense
            />
          </div>

          <q-checkbox v-model="perd" class="mt-vh-2" dense size="4vh">
            <p
              class="text-comment-14 gray-1337 q-ma-none"
            >Я даю согласие на обработку моих персональных данных</p>
          </q-checkbox>
          <div class="flex-center-div">
            <q-btn dense rounded no-caps class="w-20 mt-vh-4" color="pink-6" @click="sendData()">
              <!-- @click="" -->
              <p class="absolute-center text-comment-14">Отправить</p>
            </q-btn>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <!--Рекомендации-->
    <div class="col-lg-3 col-md-4">
      <q-card class="text-black mt-vh-4 q-pa-none q-card-fix">
        <q-card-section class="q-pb-none">
          <div class="row items-baseline">
            <p class="col text-fxl font-weight-bolder line-height-1">Рекомендуемые девушки</p>
            <p class="col text-pink text-xl" align="right">Все</p>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pr-none">
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-vh-30">
            <div
              v-for="modell in this.recModels"
              :key="modell.userId"
              class="row items-center q-mb-none mr-vw-1"
            >
              <q-avatar size="5vh">
                <img class="bordavatar" :src="modell.avatars" />
              </q-avatar>
              <div class="q-mt-md q-ml-sm" v-if="modell.UuserId != undefined">
                <p class="text-xl col-10 text-weight-medium q-mb-none">{{modell.UuserId.username}}</p>
                <p class="text-md">@{{modell.UuserId.username}}</p>
              </div>

              <div class="row justify-end col q-pt-none">
                <q-btn
                  @click="subscribe(model.userId)"
                  dense
                  rounded
                  outline
                  color="pink-6"
                  no-caps
                >
                  <p class="q-ma-none text-md q-pa-none q-ma-none mx-vw-1">Подписаться</p>
                </q-btn>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>

      <!--Категории-->

      <!--<q-card class="text-black q-mt-md q-mr-xl">
          <q-card-section>
            <div class="row items-baseline"></div>
            <div class="row items-baseline">
              <p class="col" style="font-size: 20px">Категории</p>
              <p align="right" class="col text-pink">Все</p>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none" style="overflow: auto;height: 30vh">
            <div class="row items-center q-mb-none">
              <q-avatar size="40px">
                <img
                  style="border: 1px solid #ffffff;"
                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                />
              </q-avatar>
              <div class="q-ml-sm">
                <p
                  style="font-size: 14px"
                  class="col-10 text-weight-medium q-mb-none text-weight-medium"
                >#Название категории</p>
              </div>

              <div class="row justify-end col">
                <q-btn dense flat icon="keyboard_arrow_right" no-caps class="q-ml-sm"></q-btn>
              </div>
            </div>
          </q-card-section>
      </q-card>-->
    </div>
  </div>
</template>

<script>
//cl - client
//s - server
// cts - client to server
// stc - server to client
import http from "../../http-common";
export default {
  data() {
    return {
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      files: null,
      date: null,
      name: null,
      surName: null,
      lastName: null,
      perd: false,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
    };
  },
  sockets: {
    cl_sendModelVerify: function (response) {
      if (response.status == "ok") {
        this.$q.notify({
          message: "Заявка отправлена на рассмотрение",
          color: "pink-6",
        });
      } else {
        this.$q.notify({
          message:
            "Ошибка сервера:" +
            response.status +
            " просим попробовать позже или обратиться в техподдержку",
          color: "pink-6",
        });
      }
    },
    connect: function () {
      console.log("socket connected");
    },
  },
  computed: {},
  mounted() {
    this.$socket.emit("s_chagePage", {
      page: "become_a_model",
    });
  },
  updated() {},
  created() {
    // рекомендованные модели
    http({
      method: "get",
      url: "/models",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.recModels = response.data;
    });
  },
  beforeCreate() {
    http({
      method: "get",
      url: "/podplist",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.subscribListL = true;
      this.subscribList = response.data;
    });
  },
  beforeDestroy() {},
  methods: {
    sendData() {
      if (
        this.files != null &&
        this.tryDate(this.date) &&
        this.name.length > 2 &&
        this.surName.length > 2 &&
        this.lastName.length > 2 &&
        this.perd
      ) {
        let myobj = {
          Name: this.name,
          SurName: this.surName,
          LastName: this.lastName,
          DateO: this.date,
          Files: this.files,
          OK: this.perd,
        };
        this.$socket.emit("s_modelRequest", {
          token: localStorage.getItem("token"),
          obj: myobj,
        });
      } else {
        this.$q.notify({
          message: "Ошибка в заполнении формы",
          color: "pink-6",
        });
      }
    },
    tryDate(String) {
      if (String == null) {
        return false;
      }
      var paramD = new Date(
        Date.parse(
          String.split(".")[1] +
            "/" +
            String.split(".")[0] +
            "/" +
            String.split(".")[2]
        )
      );
      var thisD = new Date();
      if (paramD == "Invalid Date") {
        return false;
      }
      if (thisD - paramD > 3122064000000) {
        // > 99 yo
        return false;
      }
      if (thisD - paramD > 567648000000) {
        // > 18 yo
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>