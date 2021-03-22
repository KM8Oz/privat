"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _newmodels = _interopRequireDefault(require("../components/newmodels"));

var _nemodelmobile = _interopRequireDefault(require("../components/nemodelmobile"));

var _recomendations = _interopRequireDefault(require("../components/recomendations"));

var _listfollowings = _interopRequireDefault(require("../components/listfollowings"));

var _streamcard = _interopRequireDefault(require("../components/streamcard.vue"));

var _profilebar = _interopRequireDefault(require("../components/profilebar.vue"));

var _hlsPlayer = _interopRequireDefault(require("../components/hlsPlayer.vue"));

var _stream = _interopRequireDefault(require("../components/stream.vue"));

var _vueLazyloadVideo = _interopRequireDefault(require("vue-lazyload-video"));

var _Vkontakte = _interopRequireDefault(require("vue-goodshare/src/providers/Vkontakte.vue"));

var _Odnoklassniki = _interopRequireDefault(require("vue-goodshare/src/providers/Odnoklassniki.vue"));

var _Facebook = _interopRequireDefault(require("vue-goodshare/src/providers/Facebook.vue"));

var _MoiMir = _interopRequireDefault(require("vue-goodshare/src/providers/MoiMir.vue"));

var _Twitter = _interopRequireDefault(require("vue-goodshare/src/providers/Twitter.vue"));

var _LiveJournal = _interopRequireDefault(require("vue-goodshare/src/providers/LiveJournal.vue"));

var _LinkedIn = _interopRequireDefault(require("vue-goodshare/src/providers/LinkedIn.vue"));

var _Tumblr = _interopRequireDefault(require("vue-goodshare/src/providers/Tumblr.vue"));

var _Pinterest = _interopRequireDefault(require("vue-goodshare/src/providers/Pinterest.vue"));

var _Reddit = _interopRequireDefault(require("vue-goodshare/src/providers/Reddit.vue"));

var _Email = _interopRequireDefault(require("vue-goodshare/src/providers/Email.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import VueLazyload from 'vue-lazyload'
// file: /src/boot/register-my-component.js
// import Mobileplayer from '../components/video_mobile.vue' 
//import QmSwiper from '../components/mobileSwiper'
// we globally register our component with Vue
_vue["default"].component('q-Vkontakte', _Vkontakte["default"]);

_vue["default"].component('q-Odnoklassniki', _Odnoklassniki["default"]);

_vue["default"].component('q-Facebook', _Facebook["default"]);

_vue["default"].component('q-MoiMir', _MoiMir["default"]);

_vue["default"].component('q-Twitter', _Twitter["default"]);

_vue["default"].component('q-LinkedIn', _LinkedIn["default"]);

_vue["default"].component('q-Tumblr', _Tumblr["default"]);

_vue["default"].component('q-Pinterest', _Pinterest["default"]);

_vue["default"].component('q-Reddit', _Reddit["default"]);

_vue["default"].component('q-LiveJournal', _LiveJournal["default"]);

_vue["default"].component('q-Email', _Email["default"]);

_vue["default"].component('q-listrec', _recomendations["default"]);

_vue["default"].component('q-followings', _listfollowings["default"]);

_vue["default"].component('q-streamcard', _streamcard["default"]); // Vue.component('q-mvideoui', Mobileplayer)


_vue["default"].component('q-hls', _hlsPlayer["default"]);

_vue["default"].component('q-stream', _stream["default"]); // we globally register our component with Vue


_vue["default"].component('q-newmodel', _newmodels["default"]);

_vue["default"].component('q-newmodelv2', _nemodelmobile["default"]);

_vue["default"].component('q-profilebar', _profilebar["default"]); //vue.component('q-mswiper', QmSwiper)


_vue["default"].use(_vueLazyloadVideo["default"]);