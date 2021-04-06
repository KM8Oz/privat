import Vue from 'vue';
import QnewModel from '../components/newmodels'
import QnewModelv2 from '../components/nemodelmobile'
//import 'vue-burger-button/dist/vue-burger-button.css';
//import BurgerButton from 'vue-burger-button';
// import VueLazyload from 'vue-lazyload'
// file: /src/boot/register-my-component.js
// import VueGallery from 'vue-gallery'

// Vue.component('VGallery', VueGallery)
// import 'rtmp-player/dist/rtmp-player.css'
// import rtmpPlayer from 'rtmp-player'
// Vue.use(rtmpPlayer)

import LanguageSwitcher  from "../components/langSwitcher.vue";
import VueProfile from '../components/profile_header'
import ListRec from '../components/recomendations'
import ListFol from '../components/listfollowings'
import StreamCard from '../components/streamcard.vue'
import Profilebar from '../components/profilebar.vue'
import ProfilebarM from '../components/profilebar_mobile.vue'
import HlsPlayer from '../components/hlsPlayer.vue'
import Player from '../components/player.vue'
import Toolbar from '../components/mobiletoolbar.vue'
import SideMOBILE from '../components/side_mobile.vue'
// import Mobileplayer from '../components/video_mobile.vue' 
import Stream from '../components/stream.vue'
import Qcart from '../components/cardhover.vue'
import Tiktok from '../components/tiktok.vue'
import VueLazyLoadVideo from 'vue-lazyload-video'
import VueGoodshareVkontakte from "vue-goodshare/src/providers/Vkontakte.vue";
import VueGoodshareOdnoklassniki from "vue-goodshare/src/providers/Odnoklassniki.vue";
import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue";
import VueGoodshareMoiMir from "vue-goodshare/src/providers/MoiMir.vue";
import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter.vue";
import VueGoodshareLiveJournal from "vue-goodshare/src/providers/LiveJournal.vue";
import VueGoodshareLinkedIn from "vue-goodshare/src/providers/LinkedIn.vue";
import VueGoodshareTumblr from "vue-goodshare/src/providers/Tumblr.vue";
import VueGoodsharePinterest from "vue-goodshare/src/providers/Pinterest.vue";
import VueGoodshareReddit from "vue-goodshare/src/providers/Reddit.vue";
import VueGoodshareEmail from "vue-goodshare/src/providers/Email.vue";
//import QmSwiper from '../components/mobileSwiper'
// we globally register our component with Vue
//Vue.component('burger-button', BurgerButton);
Vue.component('q-silde-mobile', SideMOBILE);
Vue.component('q-vueProfile', VueProfile);
Vue.component('q-cart', Qcart);
Vue.component('q-tiktoolbar', Toolbar);
Vue.component('q-Vkontakte', VueGoodshareVkontakte)
Vue.component('q-Odnoklassniki', VueGoodshareOdnoklassniki)
Vue.component('q-Facebook', VueGoodshareFacebook)
Vue.component('q-MoiMir', VueGoodshareMoiMir)
Vue.component('q-tiktok', Tiktok)
Vue.component('q-Twitter', VueGoodshareTwitter)
Vue.component('q-LinkedIn', VueGoodshareLinkedIn)
Vue.component('q-Tumblr', VueGoodshareTumblr)
Vue.component('q-Pinterest', VueGoodsharePinterest)
Vue.component('q-Reddit', VueGoodshareReddit)
Vue.component('q-LiveJournal', VueGoodshareLiveJournal)
Vue.component('q-Email', VueGoodshareEmail)
Vue.component('q-listrec', ListRec)
Vue.component('q-followings', ListFol)
Vue.component('q-streamcard', StreamCard)
// Vue.component('q-mvideoui', Mobileplayer)
Vue.component('q-hls', HlsPlayer)
Vue.component('q-stream', Stream)
Vue.component('q-player', Player)
Vue.component('q-langSwitcher', LanguageSwitcher);
// we globally register our component with Vue
Vue.component('q-newmodel', QnewModel)
Vue.component('q-newmodelv2',QnewModelv2)
Vue.component('q-profilebar',Profilebar)
Vue.component('q-profilebar-mobile',ProfilebarM)
//vue.component('q-mswiper', QmSwiper)
Vue.use(VueLazyLoadVideo)