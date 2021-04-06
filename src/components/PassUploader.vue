<template>
  <q-uploader
    label="Документ удостоверяющий личность"
    :factory="factoryFn"
    color="pink"
    style="width: auto"
     multiple
    max-files="2"
    accept=".jpg, image/*"
    @rejected="onRejected"
  />
</template>

<script>
import { LocalStorage } from 'quasar';
export default {
  methods: {
      onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    }
  ,
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        // Retrieve JWT token from your store.
        const token = LocalStorage.getItem("token");
        //console.log(file);
        resolve({
          url: 'https://back.cg.house/passuploader/upload',
          method: 'POST',
          headers: [
            { name: 'Content-Type', value: 'application/json-patch+json'},
            { name: 'Authorization', value: `${token}` }
          ],
          body:file
        })
      })
    }
  }
}
</script>