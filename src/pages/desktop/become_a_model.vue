<template>
  <div class="bg-white row fullpageMT">
    <div class="col-2 col-md-2 mt-vh-4 ">
    <q-followings />
    </div>
    <div class="col mt-vh-4 flex-center-div ">
      <div class="mx-vw-1 h-100 w-100">
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-100">
        <q-newmodel />
        </q-scroll-area>
      </div>
    </div>
<q-listrec />
  </div>
</template>

<script>
//cl - client
//s - server
// cts - client to server
// stc - server to client
import { mapState } from "vuex";
import http from "../../http-common";
import { LocalStorage } from 'quasar';
export default {
  data() {
    return {
      passport:{
        file:null,
        uploadStatus:"done"
      },
      itsok:false,
      nextBTN:true,
      recModels: 5,
      modelall_video: 0,
      subscribList: null,
      subscribListL: false,
      fileexist: false,
      date: null,
      name: null,
      ismodel:null,
      surName: null,
      lastName: null,
      perd: false,
      therightwidth:400,
     token: null,
      username: null,
      userid: null,
      name: LocalStorage.getItem("name"),
      auth: null,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
    };
  },
  sockets: {
    cl_authcontroll: function(response) {
      if (response.massage == "auth") {
        this.auth = true;
      } else if (response.massage == "deauth") {
        this.auth = false;
      }
    },
        cl_subscribeControle: function (response) {
            //#//===--- this is for nnotification don't touch it please ----===//#//

            if (response.status == "ok") {
                this.recModels[response.index].issubscribe = false;
                this.$q.notify({
                    color: "pink-6",
                    message: "Подписка на " + response.name + " оформлена",
                    classes: 'glossy',
                    timeout: 500,
                });
            }
            if (response.status == "removed") {
                this.recModels[response.index].issubscribe = true;
                this.$q.notify({
                    color: "pink-6",
                    message: "Вы отказались от подписки на " + response.name,
                    classes: 'glossy',
                    timeout: 500,
                });
            }
            if (response.status == "error") {
                if (response.log == "you can not follow your self") {
                    this.$q.notify({
                        color: "pink-6",
                        message: "Вы не можете подписаться сами на себя "
                    });
                }
            }
            if (response.opennotifs) {
                askForPermissioToReceiveNotifications(response.id, Platform.is);
            }
        },
    passfilesstatus:(data)=>{
      if(data.mrzStatus){
        this.passport.uploadStatus = "done_all"
      } else if(data.verified) {
          this.nextBTN = false;
      } 
    },
    progressverification: function (response) {
           this.$q.notify({
          message: response.text,
          color: "pink-6",
        });
      // if (response.status == "ok") {
      //   this.$q.notify({
      //     message: "Заявка отправлена на рассмотрение",
      //     color: "pink-6",
      //   });
      // } else {
      //   this.$q.notify({
      //     message:
      //       "Ошибка сервера:" +
      //       response.status +
      //       " просим попробовать позже или обратиться в техподдержку",
      //     color: "pink-6",
      //   });
      // }
    },
    connect: function () {
      console.log("socket connected");
    },
  },
    computed:{
   ...mapState(['pcm'])
  },
  beforeMount(){
     this.token = this.pcm.user.tk;
     this.username = this.pcm.user.un;
     this.userid = this.pcm.user.id;
      this.auth = this.pcm.auth;
      this.ismodel = this.pcm.user.rol
       if (!this.auth | this.ismodel) {
         if(this.ismodel){
             this.$q.notify({
          color: "pink-6",
          message: "Вы уже модель"
        });
         }
      this.$router.push("/");
    } else {
       this.$socket.emit("s_chagePage", {
      page: "become_a_model",
    });
    }
  },
  mounted() {
  },
  updated() {},
  created() {
  },
  beforeCreate() {
  },
  beforeDestroy() {},
  methods: {
    sendPassport(){
    if(this.passport.file){
      
      console.log(this.passport.file)
      this.$socket.emit('checkpassport',this.passport.file,()=>{
         this.$q.notify({
           message:"this process will take a minute",
           color:"pink-6"
         })
      })
    }
    }, uploadCroppedImage() {
       this.passport.file.generateBlob((blob) => {
       this.$socket.emit('newmodelpassport',{data:blob,id:this.pcm.user.id})
         // write code to upload the cropped image file (a file is a blob)
       }, 'image/jpeg', 0.8) // 80% compressed jpeg file
     },
    subscribe(modelid, modell, index) {
      this.$socket.emit("subscribeControle", {
        sender: this.pcm.user.id,
        receiver: modelid,
        token: this.pcm.user.tk,
        index: index
      });
    },
    sendData() {
        // this.$socket.emit("s_model", {
        //   token: this.pcm.user.tk,
        //   // obj: myobj,
        // });
        

          let myobj = {
          Name: this.name,
          SurName: this.surName,
          LastName: this.lastName,
          DateO: this.date,
          Files: this.files,
          OK: this.perd,
        };
        console.log(myobj);
      if (
        this.files != null &&
        this.tryDate(this.date) &&
        this.name.length > 2 &&
        this.surName.length > 2 &&
        this.lastName.length > 2 &&
        this.perd
      ) {
        let myobj = {
          Name: this.name,
          SurName: this.surName,
          LastName: this.lastName,
          DateO: this.date,
          Files: this.files,
          OK: this.perd,
        };
        this.$socket.emit("s_modelRequest", {
          token: this.pcm.user.tk,
          obj: myobj,
        },()=>{
          console.log("data sended");
        });
      } else {
        this.$q.notify({
          message: "Ошибка в заполнении формы",
          color: "pink-6",
        });
      }
    },
    tryDate(String) {
      if (String == null) {
        return false;
      }
      var paramD = new Date(
        Date.parse(
          String.split(".")[1] +
            "/" +
            String.split(".")[0] +
            "/" +
            String.split(".")[2]
        )
      );
      var thisD = new Date();
      if (paramD == "Invalid Date") {
        return false;
      }
      if (thisD - paramD > 3122064000000) {
        // > 99 yo
        return false;
      }
      if (thisD - paramD > 567648000000) {
        // > 18 yo
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>