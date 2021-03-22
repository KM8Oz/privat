<template>
  <q-page class="bg-black">
    <div class="desktop-only">
      <desktop></desktop>
    </div>
    <div class="mobile-only vh100">
      <mobile></mobile>
    </div>
  </q-page>
</template>

<script>
import Desktop from "./desktop/deposit.vue";
import Mobile from "./mobile/deposit.vue";
import { LocalStorage } from 'quasar';

export default {
  components: {
    desktop: Desktop,
    mobile: Mobile
  },
  data() {
    return {};
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
