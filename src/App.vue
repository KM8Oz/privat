<template>
  <div  id="q-app">
    <router-view />
  </div>
</template>

<script>
import {  Platform, Cookies} from 'quasar';
import { mapState } from 'vuex';
export default {
  name: 'App',
  created(){
     this.$store.commit('pcm/start')
     this.$store.dispatch('pcm/platform', Platform.is)
     this.$socket.emit('appVideos',{token:Cookies.get('sspcm')?.sstk, size: this.pcm?.vidControls.number.max ||  20}, (response) => {
      this.$store.dispatch('pcm/videos', response)
    });
  },
  computed:{
    ...mapState(['pcm'])
  }
}
</script>
<style>
  .dot {
    height: 5px;
    width: 5px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
  }

</style>
