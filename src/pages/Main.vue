<template>
<div
         >
 
  <q-page class="bg-white"  >

    <div class="vh100" v-if="$q.platform.is.mobile && show">
      <mobile :videostag='query'></mobile>
    </div>
    <div  v-if="$q.platform.is.desktop && show" >
      <desktop :videostag='query'></desktop>

    </div>
     <loading :active.sync="isLoading" 
          
        :can-cancel="false" 
        :is-full-page="true"></loading>
  </q-page>
</div>
</template>

<script>
import Desktop from "./desktop/index.vue";
import Mobile from "./mobile/index.vue";
import { mapState } from "vuex";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components: {
    desktop: Desktop,
    mobile: Mobile,
      Loading
  },
  props:['query'],
  data() {
    return {
      transitionName:'slide',
      show:false,
      looper:null,
      isLoading:true,
    };
  },
   computed:{
      ...mapState(["pcm"]),
   },
   created() {
+    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
     }

      this.transitionName = transitionName;

      next();
    });
       
  },
  mounted(){
  this.looper = setInterval(() => {
   // console.log(this.pcm.slides.length);
    if(this.pcm.offlinevideos.length != 0 ){
          this.show = true
          this.isLoading = false
          clearInterval(this.looper)
    } 
  }, 500);



  //  this.$verifyReset()
  // this.$verify(options)
  },
};
</script>
<style lang="scss">
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
</style>