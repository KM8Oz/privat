<template>
  <q-page class="bg-black">
    <div class="desktop-only" v-if="$q.platform.is.desktop">
      <desktop></desktop>
    </div>
    <div class="mobile-only" v-if="$q.platform.is.mobile">
      <mobile></mobile>
    </div>
  </q-page>
</template>

<script>
import Desktop from "./desktop/live.vue";
import Mobile from "./mobile/live.vue";
export default {
  name: "App",
  components: {
    desktop: Desktop,
    mobile: Mobile
  },
  data() {
    return {};
  },

  methods: {}
};
</script>