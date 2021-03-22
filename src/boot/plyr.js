import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true },
    disableContextMenu:true,
    playsinline: true,
    loadSprite: true,
  },
  emit: ['ended']
})