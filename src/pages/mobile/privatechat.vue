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
    <div class="grid-videos">
      <div class="panel">
        <div
          class="paneltools"
          @click="animated = animated === 'slidein' ? 'slideout' : 'slidein'"
        ></div>
        <div :class="`chat ${animated}`">
          <button class="startCall" @click="makeCall">call</button>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
// import { peer  } from "../utils/serverConnect"
// import { leaps } from "leaps";
import Urlp from "url-parse";
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
      calledMedia: null,
      called: null,
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
     return {query:{key:location.pathname.split("/")[2], id:location.pathname.split("/")[3], code:location.pathname.split("/")[4]}}
    },
    userid() {
 
      return  location.pathname.split("/")[2]? Number(location.pathname.split("/")[2]) : Number((Math.random() * 10).toFixed()) / 2 > 3 ? 165 : 143;
    },
  },

  mounted() {
      //   console.log("router:",location.pathname.split("/")[3]);
     console.log("router params:",this.params)
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
this.$socket.unsubscribe("chat_msg")
this.$socket.emit("leave", this.params.query.key)
  },
  methods: {
    sendMessage(msg) {
      console.log("connection:",this.connection);
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.messageList.push(msg);
     
      }
    },
    makeCall() {
      this.$socket.emit("peers", {
        type: "get",
        payload: {
          userid: this.params.query.code ,
        },
      });
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
          video.setAttribute("playsinline", true);
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
          video.setAttribute("playsinline", true);
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
    chat_msg:function(data){
    console.log(JSON.parse(data.msg));
this.filter(data).then((msg)=>{
 this.messageList.push(msg);
})
      this.isChatOpen = data.open

    },
    peer_res: function (res)  {
      let vm = this;
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
          video.setAttribute("playsinline", true);
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
</style>
