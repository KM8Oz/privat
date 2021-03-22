<template>
  <q-page class="bg-white">
    <div class="row">
      <div class="col-3 q-pd-xs q-pr-xs" v-for="girlVideo in girlsVideos" :key="girlVideo.id">
        <router-link :to="'/'+girlVideo.link">
          <q-card class="my-card">
            <q-img :src="img(girlVideo.screen)" basic>
              <div class="absolute-bottom text-subtitle2 text-center">@{{girlVideo.username}}</div>
            </q-img>
          </q-card>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import http from "../../http-common";

export default {
  data() {
    return {
      girlsVideos: []
    };
  },
  beforeCreate() {
    http({
      method: "get",
      url: "/models_online",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response => {
      this.girlsVideos = response.data;
    });
    setInterval(
      function() {
        http({
          method: "get",
          url: "/models_online",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response => {
          this.girlsVideos = response.data;
        });
      }.bind(this),
      5000
    );
  },
  methods: {
    img(img) {
      return img + "?time=" + new Date();
    }
  }
};
</script>
<style scoped>
.vh100 {
  height: 90vh;
  width: 100%;
}
.vh40 {
  height: 20vh;
  width: 100%;
}
.mpb50 {
  padding-top: 20vh;
  height: 40vh;
}
.zi200 {
  z-index: -200;
}
.bott {
  margin-bottom: 0px;
}
.mb0 {
  padding-top: 30vh;
}
.vh100 {
  height: 100vh;
}
.zi200 {
  z-index: 200;
}
</style
>>
