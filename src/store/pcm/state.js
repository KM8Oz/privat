
export default () => ({
    subedvideos: [],
    unsubedvideos:[],
    offlinevideos:[],
    search:{
     rate:0.5
    },
    controls: {
      mute:false,
      dark:false,
      fullscreen:false
    },
    vidControls:{
    number:{
      max:20,
      rate:10,
      lastIndex:0
    },
    sort:{
      likes:false,
      watch:false
    },
    },
    user: {
      tk:null,
      id:null,
      un:null,
      rol:false
    },
    slides:[],
    platform:null,
    auth:false,
  })
