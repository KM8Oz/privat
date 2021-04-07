//import { requires } from 'grunt';
import Vue from 'vue'
// import * as store from '../store'
import AxiosPlugin from 'vue-axios-cors';
 
Vue.use(AxiosPlugin)
import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';
import AudioVisual from 'vue-audio-visual';
import Chat from 'vue-beautiful-chat';

Vue.prototype._G={
    fotervisible: '',
    auth: '',
    sign: '',
    signUp: '',
    recUrl: '',
    wsRecordURL: '',
    backUrl: '',
    ioUrl: '',
    forcereload: true
};
Vue.prototype.numeral = numeral;
Vue.prototype._G.fotervisible=false;
Vue.prototype._G.auth=false;
Vue.prototype._G.sign=false;
Vue.prototype._G.signUp=false;
// if(!fetch){
//     module.exports = require('node-fetch');
// }
import numeral from 'numeral';
var BinaryClient = require('binaryjs-client').BinaryClient;
Vue.prototype.BinaryClient = async ()=> new BinaryClient('wss://video.cg.house');
fetch("https://api.exchangeratesapi.io/latest?symbols=USD,RUB").then(async (res)=>{
    Vue.prototype.rates = await res.json()
})
Vue.prototype.$reloadall = function(){
    this.$forceUpdate();
}
// Vue.prototype.store = store

    Vue.prototype._G.recUrl="https://str.cg.house";
    Vue.prototype._G.wsRecordURL="wss://record.cg.house";
    Vue.prototype._G.backUrl="https://back.cg.house";
    Vue.prototype._G.ioUrl="https://io.cg.house";


Vue.use(Chat) 

Vue.use(AudioVisual)
Vue.use(VuePeerJS, new Peer({
  host:'rtc.cg.house',
  port:'443',
  proxied:true,
  path:"/",
  debug:4,
  config:{ 'iceServers': [ 
       {url:'stun:rtc.cg.house:1739'},
       { url: 'stun:stun.l.google.com:19302' },
    {
        url: 'turn:rtc.cg.house:3478',
        credential: 'webrtc@pcm',
        username: 'pcm'
    },
  //   {
  //     url: 'turn:numb.viagenie.ca',
  //     credential: 'JrvgKxrPSNVid77',
  //     username: 'ouazmir@gmail.com'
  // },
] }
}));
// import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//   debug: true,
//   // connection: 'https://io.cg.house/'
//   vuex: {

//     actionPrefix: "SOCKET_",
//   },
//   connection: "https://io.cg.house/"
// }))
Vue.config.productionTip = false

/* eslint-disable no-new */

// Vue.use(new VueRouter({
//   routes: [
//     {
//       path: '/p/:key:id',
//       name: 'videoChat',
//       component: new Vue({
//         el: '#app',
//         components: { App },
//         template: '<App/>'
//       }),
//     },
//   ],
//   mode: 'history',
// }))

// Register Components
// LazyVideo & LazyVideoAsGIF
