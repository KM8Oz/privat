<template>
  <q-page class="bg-white text-black q-pa-lg" style="overflow: auto;">
    <q-btn @click="clickButton()">регистрация</q-btn>
    <q-btn @click="call()">старт</q-btn>
    <div class="col-6" style="margin-top: 15px;">
      <h2 style="display: block;"></h2>
      <video class="col-3" id="videoInput" controls playsinline="false" autoplay volume="0"></video>
      <video class="col-3" id="videoOutput" controls playsinline="false" autoplay volume="0"></video>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar';
export default {
  data() {
    return {
      checklive: true,
      modelid: "mariuka",
      ansver: null,
      videoInput: null,
      videoOutput: null,
      webRtcPeer: null,
      NO_CALL: 0,
      PROCESSING_CALL: 1,
      IN_CALL: 2,
      callState: null
    };
  },
  beforeCreate() {
    this.videoInput = document.getElementById("videoInput");
    this.videoOutput = document.getElementById("videoOutput");
  },

  mounted() {
    //this.$socket.send(JSON.stringify({ id: "register", name: this.modelid }));
    //this.ansver = "дождитесь регистрации в сети PCM";
    this.$options.sockets.onmessage = function(data) {
      let an = JSON.parse(data.data);
      console.log(data);
      if (an.response == "accepted") {
        this.ansver =
          "вы успешно зарегистрированы в сети, можете запустить трансляцию";
      }
    };
  },
  methods: {
    startCommunication(message) {
      this.webRtcPeer.processAnswer(message.sdpAnswer);
      this.$options.sockets.onmessage = data.then(console.log(data));
    },

    call() {
      var Nmodelid = this.modelid;
      var webRtcPeer;
      var pipeline;
      let wsss = this.$socket;
      var options = {
        localVideo: this.videoInput,
        remoteVideo: this.videoOutput,
        onicecandidate: this.onIceCandidate
      };

      this.webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(
        options,
        function(error) {
          if (error) {
            console.error(error);
          }

          this.generateOffer(function(error, offerSdp) {
            if (error) {
              console.error(error);
            }
            var message = {
              id: "call",
              from: Nmodelid,
              to: "niko",
              sdpOffer: offerSdp
            };
            var jsonMessage = JSON.stringify(message);
            console.log("Sending message: " + jsonMessage);
            wsss.send(jsonMessage);
          });
        }
      );
    },

    onIceCandidate(candidate) {
      console.log("Local candidate" + JSON.stringify(candidate));

      var message = {
        id: "onIceCandidate",
        candidate: candidate
      };
      this.sendMessage(message);
    },

    sendMessage(message) {
      var jsonMessage = JSON.stringify(message);
      console.log("Sending message: " + jsonMessage);
      this.$socket.send(jsonMessage);
    },

    clickButton() {
      this.$socket.send(JSON.stringify({ id: "register", name: this.modelid }));
      this.ansver = "дождитесь регистрации в сети PCM";
    },
    handleSuccess() {
      this.video = document.querySelector("video");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(stream => {
            //console.log(stream);
            //let videoTracks = stream.getVideoTracks();
            // console.log(videoTracks);
            this.video.srcObject = stream;
            this.video.src = window.URL.createObjectURL(stream);
            this.video.play();
          });
      }
    },
    handleError(error) {
      console.log("getUserMedia error:" + error.name, error);
    }
  }
};
</script>
