<template>
  <div class="grid-1">
    <video
      class="caller"
      src=""
      autoplay
      poster="https://thelinuxuser.com/wp-content/uploads/2020/01/1-2.jpg"
      :controls="false"
    ></video>
    <video
      class="called"
      poster="https://thumbs.dreamstime.com/b/offline-sign-round-ribbon-sticker-tag-171014661.jpg"
      :controls="false"
    ></video>
    <av-media
      type="circle"
      line-color="#fff"
      class="wallframe-called"
      :media="calledMedia"
      :canv-height="250"
    ></av-media>
    <div  class="pricetag">
      <span class="price oswald-semibold">цена/минута:{{streamControl.price}}</span>
    <span class="accountOne oswald-semibold">ваш счет:{{streamControl.accountOne}}</span>
    <span class="total oswald-semibold">сомма: {{streamControl.transfered}}</span>
    </div>
    <!-- <div class="grid-videos">
      <div class="panel">
        <div
          class="paneltools"
          @click="animated = animated === 'slidein' ? 'slideout' : 'slidein'"
        >
        <span class="text-black q-ma-xs ">
          {{countingdown  !== 0 ? countingdown : ""}}
        </span>
        </div>
        <div :class="`chat ${animated}`">
          <button class="startCall" @click="makeCall">start</button>
        </div> 
      </div>
    </div> -->
    <beautiful-chat
      :agentProfile="agentProfile"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :colors="colors"
      :showEmoji="true"
      :showFile="true"
      :participants="participants"
    />
     <q-dialog v-model="request_call" >
        <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Aннуляция"  color="red" v-close-popup />
          <q-btn flat label="Звонить" @click="acceptCall" color="green" v-close-popup />
        </q-card-actions>
      </q-card>
     </q-dialog>
    
  </div>
</template>
<script>
// import { peer  } from "../utils/serverConnect"
// import { leaps } from "leaps";
import Urlp from "url-parse";
import { mapState } from 'vuex';
export default {
  name: "HelloWorld",
  // component:{
  //   leaps
  // },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      id: "idtest",
      animated: "",
      request_call:false, 
      calledMedia: null,
      called: null,
      countingdown:null,
      modelid:null,
      userid:null,
      streamControl:{
       price:0,
       accountOne:0,
       accountedTwo:0,
       transfered:0,
      },
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies th
      caller: null,
      participants:[],
      agentProfile: {
        teamName: "Vue Beautiful Chat",
        imageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      },
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false,
      connection:null
    };
  },
  computed: {
    params:function(){
     return {query:{key:location.pathname.split("/")[2], id:location.pathname.split("/")[3], code:location.pathname.split("/")[4], status: location.pathname.split("/")[5]}}
    },
    userid() {
 
      return  location.pathname.split("/")[2]? Number(location.pathname.split("/")[2]) : Number((Math.random() * 10).toFixed()) / 2 > 3 ? 165 : 143;
    },
    ...mapState(["pcm"])
  },

  mounted() {
      //   console.log("router:",location.pathname.split("/")[3]);
    console.log("router params:",this.params)
   this.saveSocketIdConnected()
    if (this.params.query.status == "caller"){
      console.log("call will be started :", this.params.query.status)
      let i = 0;
     let intr =  setInterval(()=>{
       if(i === 6){
         this.requestUserCall();
         this.startAccounting();
        clearInterval(intr);
       }
        this.countingdown  = 6 - i;
            i++;
        
     }, 1000)
 console.log("video status:",document.getElementsByClassName("caller")[0].playing)//  this.makeCall();
    } else {
      this.startAccounting();
      // called person request a accountinf infos
      console.log("colled request for accounting");
    }
this.fixMobileStyle()
      this.$socket.emit("join", this.params.query.key)
    //  console.info(this.params);
    this.callsRemote();
    this.callerCam();
    let vm = this;
    const dataConnection = this.$peer.connect(this.params.query.key);
    this.$peer.on("open", function (id) {
      console.log("my connectio id :", vm.params.query.id);
     // vm.chatHandler()
      vm.$socket.emit("peers", {
        type: "update",
        payload: {
          userid: vm.params.query.id,
          peerid: id,
          chat: JSON.stringify({}),
          price: 12,
          status: false,
        },
      });
       vm.$socket.emit("peers", {
        type: "participants",
        payload: {
          userids: [Number(vm.params.query.id), Number(vm.params.query.code)],
          id: Number(vm.params.query.id)
        },
      });
    });
  },
  destroyed:()=>{
    this.saveSocketIdDisconnected()
this.$socket.unsubscribe("chat_msg")
this.$socket.emit("leave", this.params.query.key)
  },
  methods: {
    saveSocketIdConnected(){
 if(this.pcm.auth){
     this.$socket.emit("save_socket_id", {id:this.pcm.user.id, status: true})
    } else {
    this.$q.notify({
      type: 'nigative',
      message:"пожалуйста, попробуйте сначала войти в систему!"
    })
    }
    },
      saveSocketIdDisconnected(){
 if(this.pcm.auth){
     this.$socket.emit("save_socket_id", {id:this.pcm.user.id, status: false})
    } 
    // else {
    // // this.$q.notify({
    // //   type: 'nigative',
    // //   message:"пожалуйста, попробуйте сначала войти в систему!"
    // // })
    // }
    },
    stopthecall(){
    this.saveSocketIdDisconnected();
    // this.$peer.disconnect();
    this.stopPaying();
    },
    requestUserCall:function(){
     this.$socket.emit("request_user_call", {userid: Number(this.params.query.id)})
    },
    sendMessage(msg) {
      console.log("connection:",this.connection);
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.messageList.push(msg);
      }
    },
    // accepting call from model 
    acceptCall(){
     this.makeCall();
     this.startPaying();
    },
    // calling model trow peer to peer connection
    makeCall() {
      this.$socket.emit("peers", {
        type: "get",
        payload: {
          userid: this.params.query.code ,
        },
      });
    },
    // start accounting process
    startAccounting(){
      this.$socket.emit("startaccounting", {...this.params.query, rol: this.pcm.user.rol})
    },
    onMessageWasSent(msg) {
      this.messageList.push(msg);
         this.$socket.emit("chat_msg", {room:this.params.query.key,open: this.isChatOpen, msg:JSON.stringify(msg)})
    },
    openChat() {
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
     // this.$socket.emit("leave", this.params.query.key)
      this.isChatOpen = false;
    },
    startPaying(){
    this.$socket.emit("sub_acounting", {type: "start",chatkey: this.params.query.key,  userid: this.userid, modelid: this.modelid, price: Number(this.streamControl.price) })
    },
    stopPaying(){
          this.$socket.emit("sub_acounting", {type: "stop", userid: this.userid, modelid: this.modelid})
    },
    fixMobileStyle(){
window.innerWidth < 600 ? document.getElementsByClassName("sc-chat-window")[0].style.maxHeight = "47%":null;
    },
    callsRemote() {
      let vm = this;
//       this.$peer.on('connection', function(conn) {
//   conn.on('data', function(data){
//     // Will print 'hi!'
//     console.log(data);
//     vm.connection = conn
//     vm.messageList.push(data);
//   });
// });
      this.$peer.on("call", (call) => {
        call.answer(vm.called); // Answer the call with an A/V stream.
        call.on("stream", (remoteStream) => {
          // Show stream in some <video> element.
          let video = document.getElementsByClassName("caller")[0];
          // Show stream in some <video> element.
          var videoStream = new MediaStream(remoteStream.getVideoTracks());
          video.srcObject = remoteStream;
          video.load();
          video.play();
        });
      });
    },
    filter:async function (data){
      console.log(data);
    return {id: this.params.query.code, author:this.participants[0].name, data:JSON.parse(data.msg).data, type:JSON.parse(data.msg).type}
    },
    callerCam() {
      let vm = this;
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function (stream) {
          /* use the stream */  
          vm.called = stream;
          var audioStream = new MediaStream(stream.getAudioTracks());
          var videoStream = new MediaStream(stream.getVideoTracks());
          let video = document.getElementsByClassName("called")[0];
          video.srcObject = videoStream;
          vm.calledMedia = audioStream;
          video.load();
          video.play();
        })
        .catch(function (err) {
          console.log(err);
          /* handle the error */
        });
    },
  },
  sockets: {
    socket_saved:function(res){
    if(res.status == "saved"){
      console.info('socket id saved');
    }
    },
    cl_request_user_call: function(res){
    
     //console.info("data from request call:",res);
     if(res.status){
       this.request_call = true
     } else {
      this.$q.notify({
        type:'nigative',
        message: "что-то не так произошло! пожалуйста, обновите страницу."
      })
     }
    },
    privateChatController:function(data){
      let id = this.pcm.user.id;
      console.info(data.streamInfos);
     if (data){
       this.modelid = Number(data.streamInfos.userId);
       this.userid = Number(data.streamInfos.userId) === Number(this.params.query.code) ? Number(this.params.query.id) : Number(this.params.query.code);
       this.streamControl.price = data.streamInfos.sumPrivat;
        this.streamControl.accountOne = data.balances.filter(e=> id == e.id)[0].balance;
        console.info( {start: true, modelid: data.streamInfos.userId, userid: data.balances.filter(e=>data.streamInfos.userId != e.id )[0].id})
        this.$socket.emit("sub_acounting", {start: true, modelid: data.streamInfos.userId, userid: data.balances.filter(e=>data.streamInfos.userId != e.id )[0].id})
     }
    },
    chat_msg:function(data){
    console.log(JSON.parse(data.msg));
this.filter(data).then((msg)=>{
 this.messageList.push(msg);
})
      this.isChatOpen = data.open
    },
    cl_sub_acounting:function(res){
     if(res.status){
this.streamControl.accountOne = this.params.query.status == "caller" ? res.payload.model : res.payload.user;
this.streamControl.transfered = res.payload.gain
     } else {
       this.$q.notify({
         type:"nigative",
         message:""
       })
     }
    },
    peer_res: function (res)  {
      let vm = this;
      console.log(res.payload);
      if (res.type == "get" && res.status) {
//        let conn =  this.$peer.connect(res.payload.peerid)
//       conn.on('open', function(){
//   // here you have conn.id
//    this.connection = conn
// });

        const call = this.$peer.call(res.payload.peerid, this.called);
        call.on("stream", (remoteStream) => {
          let video = document.getElementsByClassName("caller")[0];
          // Show stream in some <video> element.
          var videoStream = new MediaStream(remoteStream.getVideoTracks());
          video.srcObject = remoteStream;
          video.load();
          video.play();
        });
      } else if(res.type == "participants" && res.status){
      this.participants = res.payload.map(e=>e={imageUrl:'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png', name:e.name,id:e.id}).filter(s=>Number(s.id) !== Number(vm.params.query.id))
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */

.grid-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: stretch;
}
.grid-videos {
  top:0px;
  bottom: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: stretch;
}
.caller {
  width: 100%;
  height: 100%;
  background: black;
}
.called {
  position: absolute;
  left: 0;
 bottom: 51px;
  border-radius: 20px;
  width: 360px;
  margin: 3px;
}
svg{position:unset !important;
top:unset !important ;
left: unset !important;
width:unset !important ;
height: unset !important;
z-index: unset !important;
filter: unset !important;
}
.slideout{
  height: 0px;
  max-height: 0px;
}
.panel {
  width: 100%;
  margin: 0px 3px;
}
.paneltools {
  height: 40px;
  width: 100%;
  min-width: 300px;
  background: #ccc;
  border-radius: 0px 0px 10px 10px;
  z-index: 2;
  position: relative;
  display: flex;
justify-content: center;
}
.chat {
  width: 100%;
  background: #444;
  overflow-y: hidden;
  max-height: 500px; /* approximate max height */
max-height: 0px;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  border-radius: 0px 0px 10px 10px;
  margin-top: -10px;
  display: flex;
justify-content: center;
}
.slidein {
   height: 200px;
   max-height: 400px;
}
.wallframe-called {
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 20px;
  width: 360px;
  margin: 3px;
  height: 266px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width:450px) {
.sc-chat-window{
 min-height: 43px !important;
  
}

}
@media screen and (max-width:600px) {

.wallframe-called,
canvas {
 transform: scale(0.45,0.45);
transform-origin: bottom left;
}
.sc-header--title{
  font-size: 10px;
}
.sc-header{
  min-height:49px;
}

.called {
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 20px;
  width: 160px;
  margin: 3px;
}
}
.wallframe-called,
canvas {
  opacity: 0.3;
}
.startCall {
  height: 3em;
  width: 6em;
  font-size: 0.8em;
  font-weight: bold;
  border-radius: 10px;
  border: unset;
  position: relative;
  top: 14px;
}
.pricetag span{
  font-kerning: initial;
  background: #5e5959cf;
height: 30%;
padding: 7% 10px;
border-radius: 15px;
text-align: inherit;
-webkit-text-stroke: 1px rgb(26, 22, 22);
-moz-text-stroke: 1px rgb(26, 22, 22);
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
text-decoration: none;
}
.pricetag span:hover{
   background: #3d3939cf;
}
.pricetag span::selection { background: transparent; } 
.pricetag{
  position:absolute;
  top:50px;
  right:10px;
  width:200px;
  height:200px;
  background:#f00184ab; 

border-radius: 20px;
display: flex;
justify-content: space-evenly;
flex-direction:column;
align-items: space-around;
color: white;
padding: 0px 9px;
font-size: 1.3em;
}
</style>
