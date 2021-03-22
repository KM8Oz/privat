<template>
  <q-layout class="bg-white profileminfix">
    <div class="row">
         <div class="col-lg-2 col-md-3 mt-vh-4">
      <q-list class="menu-list text-black q-pa-none ">
        <q-item clickable v-ripple class=" q-pa-none h-vh-5-st">
          <q-item-section avatar class=" ml-vw-1  col-1 q-pr-none">
            <q-icon size="3.1vh" name="home" class="text-pink-6" />
          </q-item-section>

          <q-item-section class="text-pink-6 text-fxl ml-vw-1">Рекомендуемые</q-item-section>
        </q-item>
        <q-item clickable v-ripple class=" q-pa-none h-vh-5-st">
          <q-item-section avatar class="ml-vw-1  col-1 q-pa-none">
            <q-icon size="3.1vh" name="people_outline" />
          </q-item-section>
          <q-item-section class="ml-vw-1 text-fxl">Подписки</q-item-section>
        </q-item>
        <q-separator class="bg-grey-4" />

        <q-item v-if="!subscribListL">
          <q-item-label caption class="text-xl text-weight-thin text-black">Здесь появятся аккаунты, на которые вы подписаны</q-item-label>
        </q-item>

        <div v-else>
          <div class="text-xl mt-vh-2 ml-vw-1 text-grey-8">Ваши аккаунты из топа</div>
          <div clickable v-for="sub in subscribList" :key="sub.id">
            <div class="row items-center q-mb-none ml-vw-1">
              <q-avatar size="5vh">
                <img class="bordavatar" :src="sub.avatar" />
              </q-avatar>
              <div class="q-mt-md q-ml-sm">
                <p class="text-xl col-10 text-weight-medium q-mb-none">{{sub.modelname}}</p>
                <p class="text-grey-8 text-md">@{{sub.modelusername}}</p>
              </div>

              <div class="row justify-end col q-pt-none">
              </div>
            </div>
          </div>
        </div>
      </q-list>
    </div>

      <div v-if="!auth" class="flex justify-center q-mt-xl text-black col">
        <h5></h5>
      </div>
      <div v-else class="col-lg-7 col-md-5 mt-vh-4 d-flex justify-content-center fullpageMT">
        <!--настройки-->
        <div class="w-60 h-100 m-mx-auto">

          <div class="row">
            
            <q-avatar size="15vh" class="disabledivinavatar" v-if="isModel">
              <q-img v-if="ava==null"
              class="q-pa-none"
                :src=thisModel.avatars
              > <q-file
                @input="getImgBase64()"
                v-model="ava"
                accept=".jpg, image/*"
                outlined
                class="w-100 h-100 q-pa-none h-auto-fix"
              >
              </q-file>
              </q-img>
               <q-img v-else
              class="q-pa-none"
                :src="base64ava"
              > <q-file
                @input="getImgBase64()"
                v-model="ava"
                accept=".jpg, image/*"
                outlined
                class="w-100 h-100 q-pa-none h-auto-fix"
               >   
              </q-file>
              </q-img>              
            </q-avatar>
            <q-btn v-else rounded class="roundetnorm" @click="getAvatarsStandart()">
            <q-avatar size="15vh" class="disabledivinavatar" >
              <q-img v-if="newava==null"
              class="q-pa-none"
                :src=thisModel.avatars
              > 
              </q-img>
               <q-img v-else
              class="q-pa-none"
                :src="newava"
              > 
              </q-img>              
            </q-avatar>
            </q-btn>
            <div class="row h-mc mt-vh-2 flex-1">
              <div class="col q-mb-none ml-vw-1">
                <div class="col-12 row">
                <p
                  class="text-black h-mc text-weight-bold text-30 q-ma-none" 
                >{{thisModel.name}}</p>
                </div>
                <p
                  class="text-black h-mc text-comment-18 q-ma-none"
                >@{{username}}</p>
                
              </div>
              <!-- <q-btn rounded no-caps class="q-mt-sm" dense color="pink-13">
                <p class="text-white q-mx-sm q-mb-none">Подписаться</p>
              </q-btn> -->
            </div>
              <!-- @click="" -->
            
          </div>
          <div class="mt-vh-4">
            <p class="text-fxl  text-weight-bold text-black">Имя</p>
            <p class="text-comment-14  text-graydg q-mb-none">{{thisModel.name}}</p>
            <q-btn class="fixbtn" unelevated flat color="black" :glossy="false" :ripple="false" @click="dialogmain=true;resetName=true;">
              <p class="text-pink-dg text-comment-14 q-ma-none text-initial">Изменить имя</p>
            </q-btn>
          </div>
          <div class="mt-vh-4">
            <p class="text-fxl  text-weight-bold text-black">Имя Пользователя</p>
            <p class="text-comment-14  text-graydg q-mb-none">@{{username}}</p>
            <q-btn class="fixbtn" unelevated flat color="black" :glossy="false" :ripple="false" @click="dialogmain=true;resetUserName=true;">
              <p class="text-pink-dg text-comment-14 q-ma-none text-initial">Изменить имя пользователя</p>
            </q-btn>
          </div>
          <div class="mt-vh-4">
            <p class="text-fxl  text-weight-bold text-black q-ma-none">Пароль</p>
            <q-btn class="fixbtn" unelevated flat color="black" :glossy="false" :ripple="false" @click="dialogmain=true;resetPassword=true;">
              <p class="text-pink-dg text-comment-14 q-ma-none text-initial">Изменить пароль</p>
            </q-btn>
          </div>
          <div class="mt-vh-4">
            <p class="text-fxl  text-weight-bold text-black q-ma-none">Почта</p>
            <p class="text-comment-14  text-graydg q-mb-none">{{thisModel.email}}</p>
            <q-btn class="fixbtn" unelevated flat color="black" :glossy="false" :ripple="false" @click="dialogmain=true;resetEmail=true;">
              <p class="text-pink-dg text-comment-14 q-ma-none text-initial">Изменить почту</p>
            </q-btn>
          </div>
          <q-btn v-if="!isModel" class=" mt-vh-4 fixbtn" unelevated rounded  color="pink-6" to="/become_a_model">
              <p class="mr-vw-1 ml-vw-1 text-white text-comment-14 q-ma-none text-initial">Стать моделью</p>
            </q-btn>
      </div>
      </div>

      <!--Рекомендации-->
            <div class="col-lg-3 col-md-4 mt-vh-4">
        <q-card class="text-black q-pa-none q-card-fix ">
          <q-card-section class="q-pb-none">
            <div class="row items-baseline">
              <p class="col text-fxl font-weight-bolder line-height-1">Рекомендуемые девушки</p>
              <p class="col text-pink text-xl" align="right">Все</p>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-pr-none">
            <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-vh-30">

              <div v-for="modell in this.recModels" :key="modell.userId" class="row items-center q-mb-none mr-vw-1">
                <q-avatar size="5vh">
                  <img class="bordavatar" :src="modell.avatars" />
                </q-avatar>
                <div class="q-mt-md q-ml-sm" v-if="modell.UuserId != undefined">
                  <p class="text-xl col-10 text-weight-medium q-mb-none">{{modell.UuserId.username}}</p>
                  <p class="text-md">@{{modell.UuserId.username}}</p>
                </div>

                <div class="row justify-end col q-pt-none">
                  <q-btn @click="subscribe(model.userId)" dense rounded outline color="pink-6" no-caps>
                    <p class="q-ma-none text-md q-pa-none q-ma-none">Подписаться</p>
                  </q-btn>
                </div>
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>

        <!--Категории-->

        <!--<q-card class="text-black q-mt-md q-mr-xl">
          <q-card-section>
            <div class="row items-baseline"></div>
            <div class="row items-baseline">
              <p class="col" style="font-size: 20px">Категории</p>
              <p align="right" class="col text-pink">Все</p>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none" style="overflow: auto;height: 30vh">
            <div class="row items-center q-mb-none">
              <q-avatar size="40px">
                <img
                  style="border: 1px solid #ffffff;"
                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                />
              </q-avatar>
              <div class="q-ml-sm">
                <p
                  style="font-size: 14px"
                  class="col-10 text-weight-medium q-mb-none text-weight-medium"
                >#Название категории</p>
              </div>

              <div class="row justify-end col">
                <q-btn dense flat icon="keyboard_arrow_right" no-caps class="q-ml-sm"></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>-->
      </div>
    </div>

<q-dialog
      v-model="dialogmain"
      @hide="clearAll()"
      content-style="dialog"
      content-class="card-bg "
    >
      <q-card flat class=" mw-i vw-25 rounded-14">
          <div v-if="true">
            <p v-if="resetName" class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Изменить имя</p>
            <p v-else-if="resetUserName" class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Изменить имя пользователя</p>
            <p v-else-if="resetPassword" class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Изменить пароль</p>
            <p v-else-if="resetEmail" class="q-mt-none mb-vh-2 mt-vh-2 text-fxl text-center">Изменить Email</p>
            <q-separator />
            <q-form>
              <q-input v-if="resetName"
                v-model="resetNameLabel"
                ref="user"
                label="Ваше новое имя"
                outlined
                lazy-rules
                class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="text"
                
                :rules="[
                  (val) => (val && val.length > 3) || 'Поле пустое или меньше 3 символов',
                ]"
              >
              </q-input>
              <q-input v-else-if="resetUserName"
                v-model="resetUserNameLabel"
                ref="user"
                label="Ваш новое имя пользователя"
                outlined
                lazy-rules
                prefix="@"
                class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="text"
                
                :rules="[
                  (val) => (val && val.length > 3) || 'Поле пустое или меньше 3 символов',
                ]"
              >
              </q-input>
              <div v-else-if="resetPassword">
              <q-input 
                v-model="resetPasswordLabel"
                label="Новый пароль"
                outlined
                lazy-rules
                class="mt-vh-5 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="password"
                
                :rules="[
                  (val) => (val && val.length > 3) || 'Пароль должен быть более 3 символов',
                ]"
              >
              </q-input>
              <q-input
                v-model="resetTryPasswordLabel"
                label="Повторите пароль"
                outlined
                type="password"
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none "
                lazy-rules
                
                :rules="[
                (val) => (val && val.length > 3&&val == resetPasswordLabel) || 'Пароли не совпадают',
                ]"
              >
              </q-input>
              </div>
              <q-input v-else-if="resetEmail"
                v-model="resetEmailLabel"    
                label="Email"
                outlined
                lazy-rules
                class="mt-vh-2 text-comment-14 mx-vw-1 h-vh-4-st q-pa-none"
                type="email"
                
                :rules="[
                  (val) =>
                    (validateEmail(val) && val.length > 0) || 'Укажите email',
                ]"
              >
              </q-input>
              <q-separator class="mt-vh-5 "/>
              <q-card-actions class="d-flex q-pa-none flex-nowrap" align="around">
                <q-btn
                  label="Отменить"
                  @click="clearAll();"
                  text-color="black"
                  flat 
                  class="w-50 text-comment-14 h-vh-1080-50px" 
                />
                <q-separator vertical/>
                <q-btn
                  label="Сохранить"
                  @click="controllerSend()"
                  text-color="black"
                  flat 
                  :disable="!validatedisable()"
                  class="w-50 text-comment-14 h-vh-1080-50px"
                />
              </q-card-actions>
            </q-form>
          </div>
      </q-card>
    </q-dialog>



  </q-layout>
</template>

<script src="https://static.yamoney.ru/checkout-js/v1/checkout.js"></script>
<script>
import { WebCam } from "vue-web-cam";
import http from "../../http-common";
export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam
  },
  data() {
    return {
      dialogmain:false,
      resetName:false,
      resetUserName:false,
      resetPassword:false,
      resetEmail:false,
      resetNameLabel:null,
      resetUserNameLabel:null,
      resetPasswordLabel:null,
      resetTryPasswordLabel:null,
      resetEmailLabel:null,
      isModel: false,
      balance: null,
      username: localStorage.getItem("username"),
      auth: null,
      withdrawDialog: false,
      currency: null,
      amount: null,
      depositDialog: false,
      yad: false,
      amount_deposit: null,
      order_id: 0,
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      playedid: null, 
      ava:null,
      base64ava:null,
      newava:null,
      readerFile:new FileReader(),
      thisModel:{
        avatars:null,
        createdAt:null,
        is_vip:null,
        name:null,
        pub_streamid:null,
        sec_streamid:null,
        updatedAt:null,
        email:null,
        videos:{
        },
      },
      thumbStyle: {
        display: "none"
      },
      barStyle: {
        display: "none"
      },
      controls: [
        'play-large', // The large play button in the center
        'restart', // Restart playback
        'rewind', // Rewind by the seek time (default 10 seconds)
        'play', // Play/pause playback
        'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        'captions', // Toggle captions
        'settings', // Settings menu
        'pip', // Picture-in-picture (currently Safari only)
        'airplay', // Airplay (currently Safari only)
        'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
        'fullscreen', // Toggle fullscreen
    ],
    };
  },
  sockets:{
    cl_getuserinfos: function(response) {
      console.log(response)
          this.thisModel = response;
          if(this.username != response.username){
            if(response.username!=null ||response.username != ""){
              this.username = response.username;
              this.resetUserNameLabel = response.username;
              localStorage.setItem("username", this.username);
            }
          }
          if(this.thisModel.name !=response.name){
            if(response.name!=null ||response.name != ""){
              this.thisModel.name  = response.name;
              this.resetNameLabel = response.name;
              localStorage.setItem("name", name);
            }
          }
          if(this.thisModel.name !=  response.email){
            if(response.email!=null ||response.email != ""){
              this.resetEmailLabel = response.email;
              this.thisModel.email  = response.email;
            }
          }
        },  
         cl_changet: function(response) {
          if(response.status!="ok"){this.$q.notify("Возникла непредвиденная ошибка"); return;}
           this.$socket.emit('getuserinfo', {
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username"),
          });
          http({
            method: "get",
            url: "/models",
            headers: {
              "x-access-token": localStorage.getItem("token")
          }
          }).then(response => {
            this.recModels = response.data;
          });
        }, 
  },
  mounted() {
    // const checkout = YandexCheckout(
    //   "7CD398BA5F300CE05CE19E46EA4ACA4EB5AA9728AF031DA21ED6D331B685BB02"
    // );
  },
  created(){
    this.$socket.emit('s_chagePage', {
            page: "index"
          });
    this.$socket.emit('getuserinfo', {
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username"),
    });
  },
  beforeCreate() {
    http({
       method: "get",
       url: "/podplist",
       headers: {
         "x-access-token": localStorage.getItem("token")
       }
     }).then(response => {
       this.subscribListL = true;
       this.subscribList = response.data;
       console.log("podplist \n")
       console.log(response.data)
     });
    http({
      method: "get",
      url: "/verify_sess",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response2 => {
      if (response2.data.session == "YES") {
        if (response2.data.ismodel == "Y") {
          this.isModel = true;
        }
        this.auth = true;
        http({
          method: "get",
          url: "/models",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response => {
          this.recModels = response.data;
        });

        http({
          method: "get",
          url: "/balance",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response => {
          this.balance = response.data.balance;
        });

        http({
          method: "get",
          url: "/verify_sess",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then(response2 => {
          if (response2.data.session == "YES") {
            if (response2.data.isModel == "Y") {
              this.isModel = true;
            }
            this.auth = true;
          } else {
            this.auth = false;
          }
        });
      } else {
        this.$router.push("/");
      }
    });
  },

  methods: {
    getAvatarsStandart(){
      http({
        method: "post",
        url: "/getavatars",
        data: {
          size: 10
        }
      }).then(respavatar => {
        console.log(respavatar)
      });
    },

    validatedisable(){
//  resetName
// -resetUserName
// -resetPassword
// -resetEmail

// resetNameLabel:null,
// resetUserNameLabel:null,
// resetPasswordLabel:null,
// resetTryPasswordLabel:null,
// resetEmailLabel:null,
      if(this.resetName){
      if(this.resetNameLabel==null){return false;}
        return this.resetNameLabel.length>3;
      } else if (this.resetUserName){
      if(this.resetUserNameLabel == null){return false;}
         return this.resetUserNameLabel.length>3;
      }else if(this.resetPassword){
      if(this.resetPasswordLabel===null || this.resetTryPasswordLabel==null){return false;}
         return this.resetPasswordLabel.length>3&&this.resetPasswordLabel==this.resetTryPasswordLabel;
      }else if(this.resetEmail){
        return this.validateEmail(this.resetEmailLabel)
      }else{
        return false;
      }
    },
    setchange(type){
      if(type == "ImgSend"){
        if(this.base64ava == null){this.$q.notify("Возникла непредвиденная ошибка"); return;}
        this.$socket.emit('settings', {
            token: localStorage.getItem("token"),
            type:"setAvatar",
            new:this.base64ava,
        });
      }else if(type == "newName"){
        if(this.resetNameLabel == null||this.resetNameLabel.lenght<3){this.$q.notify("Возникла непредвиденная ошибка"); return;}
          this.$socket.emit('settings', {
              token: localStorage.getItem("token"),
              type: "setName",
              new:this.resetNameLabel,
          });
          this.resetName = false;
          this.dialogmain = false;
      }else if(type == "newUserName"){
        if(this.resetUserNameLabel == null||this.resetUserNameLabel.lenght<3){this.$q.notify("Возникла непредвиденная ошибка"); return;}
          this.$socket.emit('settings', {
              token: localStorage.getItem("token"),
              type: "setUsername",
              new:this.resetUserNameLabel,
          });
          this.resetUserName = false;
          this.dialogmain = false;
      }else if(type == "newPassword"){
        if(this.resetPasswordLabel == null||this.resetPasswordLabel.lenght<3||this.resetPasswordLabel!=this.resetTryPasswordLabel){this.$q.notify("Возникла непредвиденная ошибка"); return;}
          this.$socket.emit('settings', {
              token: localStorage.getItem("token"),
              type: "setPassword",
              new:this.resetPasswordLabel,
          });
          this.resetPassword = false;
          this.dialogmain = false;
      }else if(type == "newEmail"){
        if(!this.validateEmail(this.resetEmailLabel)){this.$q.notify("Возникла непредвиденная ошибка"); return;}
          this.$socket.emit('settings', {
              token: localStorage.getItem("token"),
              type: "setEmail",
              new:this.resetEmailLabel,
          });
          this.resetEmail = false;
          this.dialogmain = false;
      }
    },
    controllerSend(){
      if(this.resetName){
        this.setchange("newName")
      } else if (this.resetUserName){
        this.setchange("newUserName")
      }else if(this.resetPassword){
        this.setchange("newPassword")
      }else if(this.resetEmail){
        this.setchange("newEmail")
      }else{
        this.$q.notify("Возникла непредвиденная ошибка"); return;
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    clearAll(){
      this.dialogmain = false;
      this.resetName = false;
      this.resetUserName = false;
      this.resetPassword = false;
      this.resetEmail = false;
      this.resetNameLabel =  this.thisModel.name;
      this.resetUserNameLabel =  this.thisModel.username;
      this.resetEmailLabel =  this.thisModel.email;
    },
    getImgBase64(){
      this.readerFile.readAsDataURL(this.ava);
      this.readerFile.onload = (event) => {
        this.base64ava  =  this.readerFile.result;
        this.setchange("ImgSend")
    }
    },
    debug(){
    },
    depositstart() {
      http({
        method: "get",
        url: "/depositstart",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          amount: this.amount_deposit
        }
      }).then(response2 => {
        this.order_id = response2.data.link.id;
        this.yad = true;
        console.log(response2.data);
      });
    },
    withdraw() {
      this.withdialog = false;
      http({
        method: "get",
        url: "/withdraw",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          amount: parseFloat(this.amount),
          currency: this.currency
        }
      }).then(response2 => {
        console.log(response2);
        this.alert = response2.data.status;
        if (response2.data.status == "done") {
          location.reload();
        } else {
          this.$q.notify({
            color: "negative",
            message: "Что-то пошло не так!"
          });
        }
      });
    }
  }
};
</script>

<style>
.infomain {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
}
.vidoss {
  height: 15vh;
}
.h100 {
  height: 90%;
}
</style>
