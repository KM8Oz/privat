/*
export function someMutation (state) {
}
*/
import * as stringSimilarity from 'string-similarity';
import { Cookies, Notify, SessionStorage } from 'quasar';
export default {
  start: (state) => {

    let cr = Cookies.get('sspcm')
    if (cr) {
      state.user = {
        tk: cr?.sstk,
        id: cr?.ssuid,
        un: cr?.ssun,
        rol: (cr?.ssrol === 'Y')
      }
      state.auth = true
    } else {
      // console.log(SessionStorage);
      let cr = SessionStorage.getItem('sspcm')
      if (cr) {
        state.user = {
          tk: cr?.sstk,
          id: cr?.ssuid,
          un: cr?.ssun,
          rol: (cr?.ssrol === 'Y')
        }
        state.auth = true
      } else {
        state.auth = false
      }
    }
  },
  subedVideos: (state, payload) => {
    state.subedvideos = payload.videos.filter(e => e.data[0].subed == true)
  },
  unsubedVideos: (state, payload) => {
    state.unsubedvideos = payload.videos.filter(e => e.data[0].subed == false).sort((a, b) => b.data[0].like - a.data[0].like);
  },
  offlineVideos: (state, payload) => {
    if (state.offlineVideos?.length < 0) { state.slides = payload.videos.sort((a, b) => b.data[0].like - a.data[0].like); }
    state.offlinevideos = payload.videos.sort((a, b) => b.data[0].like - a.data[0].like);
  },
  platform: (state, payload) => {
    state.platform = payload.plt
  },
  useravatar:function(state, payload){
     if(payload.status == 'ok') state.user.avatar = payload.avatar
  },
  updateBots(state, res){
    state.bots = res
   },
  liking: (state, payload) => {   
   // console.log(payload);                          // liking
   if(payload.res.tab){
     if(payload.res.tab === "recs"){
        
        state.unsubedvideos[payload.res.index].liked[0] = payload.res.status,
        state.unsubedvideos[payload.res.index].data[0].like = payload.res.like
       // console.log(state.unsubedvideos[payload.res.index]);
     } else {
      // console.log(state.subedvideos);

        state.subedvideos[payload.res.index].liked[0] = payload.res.status,
        state.subedvideos[payload.res.index].data[0].like = payload.res.like

     }
   } else {
    typeof state.slides == "object"
    ? (
      state.slides[payload.res.index].liked[0] = payload.res.status,
      state.slides[payload.res.index].data[0].like = payload.res.like
    )
    : null;
   }
  },
  switch_language:function(state, payload){
    state.controls.language = payload.lang;
    state.languages.activated = payload.lang === 'ru'? state.languages.ru : state.languages.en;
  },
  subscribing: (state, payload) => {                        // subscribing
    let id = payload.res.id;
    if (payload.res.status == "added") {
      var LOAD = [];
      state.unsubedvideos.forEach((e, i) => {
        !(e.data[0].modelid === id) || (
          state.unsubedvideos[i].data[0].subed = true,
          state.subedvideos.push(state.unsubedvideos[i]),
          state.unsubedvideos.splice(i, 1));
      });
    }
    else if (payload.res.status == "removed") {
      state.subedvideos.forEach((e, i) => {
        !(e.data[0].modelid === id) || (state.subedvideos[i].data[0].subed = false,
          state.unsubedvideos.push(state.unsubedvideos[i]),
          state.subedvideos.splice(i, 1));
      });
    }
    else {
      if (payload.res.log == "you can not follow your self") {
        Notify({
          color: "pink-6",
          message: "Вы не можете подписаться сами на себя ",
        });
      }
    }
  },
  updateSlides: function (state, payload) {
    // update slides
    //console.log(payload.status);
    if (payload.status === "subed") {
      state.slides = state.subedvideos
    } else if (payload.status === "unsubed") {
      state.slides = state.unsubedvideos
    } else {
      state.slides = state.offlinevideos
    }
  },
  commenting: function (state, payload) {
    state.slides[payload?.index].data[0].comm += 1
  },
  commenting_mobile: function (state, payload) {
    console.log(payload);
    if(payload.res.tab){
      if(payload.res.tab === "recs"){
         if(payload.res.auth){
          state.unsubedvideos[payload.res.index].data[0].comm += 1
         }
         
        // console.log(state.unsubedvideos[payload.res.index]);
      } else {
       // console.log(state.subedvideos);
 
         state.subedvideos[payload.res.index].data[0].comm += 1
 
      }
    } else {
     typeof state.slides == "object"
     ? (
       state.slides[payload.res.index].data[0].comm += 1
     )
     : null;
    }
  },
  muteall: function (state, payload) {
    state.controls.mute = payload.status
  },
  fullscreen: function (state, payload) {
    //console.log(payload);
    state.controls.fullscreen = payload.state
  },
   theme: function (state, payload) {
    state.controls.dark = payload.status
  },
  categoSlides: function (state, payload) {
    // console.log(payload);
    if (payload.tags === "Нет_хештега") {
      state.slides = state.offlinevideos.filter(e => !(e.data[0].tags))
      // state.slides = state.offlinevideos.filter(e=>e.data[0].tags )
    } else {
      // console.log(state.offlinevideos.filter(e=>(e.data[0].tags)).map(e=>e={a:e.data[0].tags[0],b:stringSimilarity.compareTwoStrings(e.data[0].tags[0],payload.tags)>=state.search.rate,c:payload.tags}));
      state.slides = state.offlinevideos.filter(e => (e.data[0].tags)).filter(e => stringSimilarity.compareTwoStrings(e.data[0].tags[0], payload.tags) >= state.search.rate)
    }
    // setTimeout(()=>{
    //   console.log(state.slides);
    // },100)
  },
  moreVideos: function (state, payload) {
    const { max, rate } = state.vidControls.number
    const newMax = max + rate
    payload.socket.emit('appVideos', { token: state.user?.tk, size: newMax }, (res) => {
      state.slides = res;
      state.vidControls.number.max = newMax;
      state.vidControls.number.lastIndex = max;
    })
  }
}