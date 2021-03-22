
<template>
  <q-page class="bg-white text-white">

    <div v-if="$q.platform.is.desktop">
      <desktop></desktop>
    </div>

    <div v-if="$q.platform.is.mobile">
      <mobile></mobile>
    </div>

    
  </q-page>
</template>

<script>
import http from "../http-common";
import Desktop from "./desktop/settings.vue";
import Mobile from "./mobile/settings.vue";
import { LocalStorage } from 'quasar';

export default {
  name: "PageIndex",
  components: {
    desktop: Desktop,
    mobile: Mobile
  },
};
</script>
<style >
.mt10 {
  margin-top: 10vh;
}
</style>>
