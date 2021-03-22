<template>
  <q-page class="bg-black">
    <div class="desktop-only" v-if="$q.platform.is.desktop">
      <desktop></desktop>
    </div>
    <div class="mobile-only" v-if="$q.platform.is.mobile">
      <q-newmodelv2 />
    </div>
  </q-page>
</template>

<script>
import Desktop from "./desktop/become_a_model.vue";
import { LocalStorage } from 'quasar';
export default {
  name: "App",
  components: {
    desktop: Desktop
  },
  data() {
    return {
        style:{
            height:'h-100'
        }
    };
  },

  methods: {}
};
</script>