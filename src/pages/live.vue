<template>
  <q-page class="bg-white">
      <div class="mobile-only vh100" v-if="$q.platform.is.mobile">
      <mobile></mobile>
    </div>

    <div class="desktop-only" v-if="$q.platform.is.desktop">
      <desktop></desktop>
    </div>
  </q-page>
</template>

<script>
import Desktop from "./desktop/tran.vue";
import Mobile from "./mobile/tran.vue";
import { LocalStorage } from 'quasar';
import { mapState } from 'vuex';

export default {
  components: {
    desktop: Desktop,
    mobile: Mobile
  },
  beforeMount(){
    if(!this.pcm.auth){
     this.$router.push('/')
    }
  },
  data() {
    return {};
  },
  computed:{
   ...mapState(['pcm'])
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
