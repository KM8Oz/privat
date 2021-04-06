<!-- some .vue file -->

<template>
  <!-- ...... -->
  <q-select
    v-model="lang"
    :options="langOptions"
    :label="Languages"
    :class="pcm.controls.dark ? 'language-switcher-darkmode' : 'language-switcher-lightmode'"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
  <!-- ...... -->
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:"languageswitcher",
  data() {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en', label: 'English' },
         { value: 'ru', label: 'Русский' },
          { value: 'ar', label: 'العربية' },
           { value: 'fr', label: 'français' },
            { value: 'es', label: 'español' },
      ]
    }
  },
  computed:{
   ...mapState(["pcm"])
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>