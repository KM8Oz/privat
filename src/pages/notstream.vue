<template>
<q-page class="transparent">
    <div v-if="$q.platform.is.desktop">
        <VideoCaptureD :uploadUrl="uploadUrl" v-model="videoUrl" />
    </div>
    <div v-if="$q.platform.is.mobile">
        <VideoCapture :uploadUrl="uploadUrl" v-model="videoUrl" />
    </div>
</q-page>
</template>

<script>
import VideoCapture from "./mobile/VideoCapture";
import VideoCaptureD from "./desktop/VideoCaptureD";
import {
    LocalStorage
} from 'quasar';
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
            uploadUrl: this._G.recUrl + "/"
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
