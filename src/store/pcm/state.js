
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
      fullscreen:false,
      language:'ru'
    },
    vidControls:{
    number:{
      max:20,
      rate:10,
      lastIndex:0
    },
    bots:[

    ],
    sort:{
      likes:false,
      watch:false
    },
    },
    user: {
      tk:null,
      id:null,
      un:null,
      rol:false,
      avatar:null
    },
    languages:{
      en:{
       version:"ALPHA VERSION"
    },
    ru:{
      version:"АЛЬФА ВЕРСИЯ!"
    },
    activated:null
  },
    slides:[],
    platform:null,
    auth:false,
  })
