<template>
  <q-page>
    <div class="mobile-only" v-if="$q.platform.is.mobile">
      <mobile />
    </div>
    <div class="desktop-only" v-if="$q.platform.is.desktop">
      <desktop />
    </div>
  </q-page>
</template>

<script>
import mobile from "./mobile/translation.vue";
import desktop from "./desktop/translation.vue";
import "../css/record.scss";
export default {
  components: {
    mobile,
    desktop
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #049161;
}
</style>