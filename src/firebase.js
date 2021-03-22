
// import firebase from 'firebase';
// import 'firebase/firebase-messaging';
// import 'firebase/firestore' ;// eslint-disable
import firebase from 'firebase/app';
import 'firebase/firebase-messaging';
import Http from './http-common';

const firebaseConfig = {
  apiKey: "AIzaSyBBZ_8l4KLsyPTqzIux26sgTwc1Gm8cyYY",
  authDomain: "privat-chat-00000.firebaseapp.com",
  databaseURL: "https://privat-chat-00000.firebaseio.com",
  projectId: "privat-chat-00000",
  storageBucket: "privat-chat-00000.appspot.com",
  messagingSenderId: "839709301841",
  appId: "1:839709301841:web:2e9b4c357266b6073c2c70",
  measurementId: "G-9F5CS2GVTQ"
};

export const initializerFirebase = async () => {
 await firebase.initializeApp(firebaseConfig);
}
export const askForPermissioToReceiveNotifications = async (u,d) => {
  if(u){
  try {
   
   await navigator.serviceWorker
    .register('/service-worker.js')
    .then(async (registration) => {
      firebase.messaging().useServiceWorker(registration);
      const messaging = firebase.messaging();
      await messaging.requestPermission();
       token = await messaging.getToken();
    });

    Http({
      method: "post",
      url: "/subscription",
      headers:{
        'Content-Type': 'application/json',
      },
      data:{
     token:token,id:u,device:d
      }
    }).then((res)=>{
    //  console.log("subsciption done!");
    })
  } catch (error) {
    console.error(error);
  }
}
}
// firebase.initializeApp({
//   messagingSenderId: "839709301841"
// });
// console.log(firebase.SDK_VERSION);
// const messaging = firebase.messaging();