import Vue from "vue";
import VueRouter from "vue-router";
//import VueNativeSock from 'vue-native-websocket'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

// import WebCam from 'vue-web-cam'
// // import http from '../http-common';
// Vue.use(WebCam)
/*
Vue.use(VueNativeSock, 'wss://pcm-rtc-admin.nxboost.com/one2one', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})
*/
import routes from "./routes";

Vue.use(VueRouter);



export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
   // scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: 'history',
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
   // mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
