import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from '../store'

Vue.use(new VueSocketIO({
  //debug: true,
  // connection: 'https://io.cg.house/'
  vuex: {
    store,
    actionPrefix: "SOCKET_",
  },
  connection: Vue.prototype._G.ioUrl
}))