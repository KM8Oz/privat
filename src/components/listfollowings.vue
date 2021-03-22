<template>
  <q-list
    :class="`menu-list ${pcm.controls.dark ? 'text-white' : 'text-black'} q-pa-none`"
  >
    <q-item clickable v-ripple class="q-pa-none h-vh-6-st">
      <q-item-section avatar class="ml-vw-1 col-1 q-pr-none q-mr-xs">
        <q-icon size="3vh" name="home" :class="`${tabs === 'recs' ? 'text-pink-6' : ''}`"/>
      </q-item-section>
      <q-item-section
        @click="changeTab('recs')"
        :class="`${tabs === 'recs' ? 'text-pink-6 oswald-semibold' : ''} text-fxl ml-vw-1 oswald-semibold`"
        >Рекомендуемые</q-item-section
      >
    </q-item>
    <q-item clickable v-ripple class="q-pa-none h-vh-6-st">
      <q-item-section avatar class="ml-vw-1 col-1 q-pa-none q-mr-xs">
        <q-icon size="3vh" name="people_outline"  :class="`${tabs === 'recs' ? '' : 'text-pink-6'} `"/>
      </q-item-section>
      <q-item-section
        @click="changeTab('home')"
        :class="`${tabs === 'home' ? 'text-pink-6 oswald-semibold' : ''} ml-vw-1 text-fxl oswald-semibold`"
        >Подписки</q-item-section
      >
    </q-item>

    <!-- <q-separator class="bg-grey-4" /> -->
    <q-item v-if="!this.recModels">
      <q-item-label caption class="text-xl text-weight-thin text-black"
        >Здесь появятся аккаунты, на которые вы подписаны</q-item-label
      >
    </q-item>
    <div v-else>
      <!-- <div class="text-xl mt-vh-2 ml-vw-1 text-grey-8">
                    Ваши аккаунты из топа
                </div> -->
      <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-vh-70">
        <div
          clickable
          v-for="(subs, index) in this.recModels"
          :key="index"
          @click="getdata(subs.userId)"
        >
          <q-item
            clickable
            v-ripple
            class="q-pa-none h-vh-6-st"
            :to="'/user/' + subs.userId"
            v-if="subs.issubscribe"
          >
            <div class="row items-center q-mb-none ml-vw-1">
              <q-avatar size="5vh">
                <img class="bordavatar" :src="subs.avatars" />
              </q-avatar>
              <div class="q-mt-md q-ml-sm">
                <p class="text-xl col-10 text-weight-medium q-mb-none oswald-regular">
                  {{ subs.name }}
                </p>
                <p class="text-grey-8 text-md">@{{ subs.username }}</p>
              </div>
              <div class="row justify-end col q-pt-none"></div>
            </div>
          </q-item>
        </div>
      </q-scroll-area>
      <div class="q-pa-md q-gutter-sm row no-wrap items-end content-stretch"    v-if="showMore">
        <q-btn
     
          flat
          color="pink-6"
          label="больше видео"
          @click="more"
          class="col-12 self-end"
        />
      </div>
    </div>
  </q-list>
</template>
<script>
import http from "../http-common";
import { LocalStorage } from "quasar";
import { Platform } from "quasar";
import { askForPermissioToReceiveNotifications } from "../firebase";
import { mapState } from "vuex";
export default {
  model: {
    prop: "tabs",
    event: "change",
  },
  props: {
    tabs: String,
    index: Number,
  },
  data() {
    return {
      showMore: false,
      width: window.innerWidth,
      height: window.innerHeight,
      modelsmore: null,
      recModels: null,
      auth: false,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
    };
  },
  watch: {
    index: function(val){
      // console.log(val, (this.pcm.slides.length - 1 ));
     val >= (this.pcm.slides.length - 1 ) ? this.showMore = true : this.showMore = false
    }
  },
  computed: {
    ...mapState(["pcm"]),
  },
  beforeMount() {
    http({
      method: "get",
      url: "/models",
      headers: {
        "x-access-token": this.pcm.user.tk,
      },
    }).then((response) => {
      // console.log("models data:",response.data)
      if (response) {
        this.auth = true;
        this.recModels = response.data;
      } else {
        this.$q.notify({
          color: "pink-6",
          message: "try to sign in please",
          classes: "glossy",
          timeout: 500,
        });
      }
    });
  },
  mounted() {},
  sockets: {
    cl_authcontroll: function (response) {
      if (response.massage == "auth") {
        this.auth = true;
      } else if (response.massage == "deauth") {
        this.auth = false;
      }
    },
    cl_subscribeControle: function (response) {
      //#//===--- this is for nnotification don't touch it please ----===//#//

      if (response.status == "added") {
        this.recModels[response.index].issubscribe = false;
        this.$q.notify({
          color: "pink-6",
          message: "Подписка на " + response.name + " оформлена",
          classes: "glossy",
          timeout: 500,
        });
      }
      if (response.status == "removed") {
        this.recModels[response.index].issubscribe = true;
        this.$q.notify({
          color: "pink-6",
          message: "Вы отказались от подписки на " + response.name,
          classes: "glossy",
          timeout: 500,
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
      if (response.opennotifs) {
        askForPermissioToReceiveNotifications(response.id, Platform.is);
      }
    },
  },
  methods: {
    changeTab: function (tab) {
      if (location.pathname !== "/") {
        this.$router.push("/");
        this.$nextTick(() => {
          this.$emit("change", tab);
        });
      } else {
        this.$emit("change", tab);
      }
    },
    subscribe(modelid, modell, index, avatars) {
      //console.log(modelid);
      this.$socket.emit("subscribeControle", {
        sender: this.pcm.user.id,
        receiver: modelid,
        token: this.pcm.user.tk,
        index: index,
        avatar: avatars,
      });
    },
    getdata: function (id) {
      this.$socket.emit("getuserinfoprofile", {
        id: id,
      });
      setTimeout(
        () =>
          this.$socket.emit("checkifsubrs", { userid: this.pcm.user.id, modelid: id }),
        1000
      );
    },
    more: function () {
      this.$store.dispatch("pcm/moreVideos", { socket: this.$socket });
    },
    less: function () {},
  },
};
</script>
