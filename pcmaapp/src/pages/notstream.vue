<template>
  <q-page class="transparent">
    <div class="desktop-only">
      <VideoCaptureD :uploadUrl="uploadUrl" v-model="videoUrl" />
    </div>
    <div class="mobile-only">
      <VideoCapture :uploadUrl="uploadUrl" v-model="videoUrl" />
    </div>
  </q-page>
</template>

<script>
import VideoCapture from "./VideoCapture";
import VideoCaptureD from "./VideoCaptureD";
import "../css/record.scss";
export default {
  components: {
    VideoCapture,
    VideoCaptureD
  },
  data() {
    return {
      videoUrl: null,
      // uploadUrl: "http://localhost:3000/uploads/"
      uploadUrl: "https://rec.p2pbet.tech/"
    };
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #049161;
  video::-webkit-media-controls-panel {
  background-image: linear-gradient(transparent, transparent) !important;
}

}
</style>
