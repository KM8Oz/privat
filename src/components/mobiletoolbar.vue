<template>
    <div class="col-2 q-mb-md q-mr-xs   itemsmobile justify-content-center q-gutter-y-md">
            <q-btn round v-show="id !== videodata.data[0].modelid" @click="
                    subscribe(videodata.data[0].modelid, index, videodata.data[0].avatar)
                  " :ref="'modelsub' + videodata.id[0]">
                <q-avatar size="40px"   class="b-borderwhite2">
                    <q-img contain :src="videodata.data[0].avatar" ratio=".9" />
                </q-avatar>
                <q-badge class="absolute-top toolbarbdg3" floating rounded v-if="!(videodata.data[0].subed)"  >
                    <q-icon name="add_circle" color="red" class="q-pa-xs" />
                </q-badge>
            </q-btn>
        
             <q-btn class=" numbers text-weight-light"  unelevated rounded :ripple="false" align="left"  icon-right="favorite"  :text-color="videodata.liked[0] ? 'red' : 'white'"  size="20px" dense  @click="
                   cl_like(videodata.id[0], index)
                    "
            >
            <q-badge floating class="absolute-top toolbarbdg"  transparent v-text="videodata.data[0].like"/>
            </q-btn>
            <q-btn  class=" numbers text-weight-light" unelevated rounded :ripple="false" align="left" icon-right="add_comment" color="transparant" size="20px" dense @click="
                      opencomt(
                        videodata.id[0],
                        videodata.data[0].comm,
                        index
                      )
                    "
             >
            <q-badge floating class="absolute-top toolbarbdg2"  transparent v-text="videodata.data[0].comm"/>
            </q-btn>
     <q-btn unelevated round  align="around" icon="videocam" color="transparant" size="20px" dense  @click="
                     getmodel(videodata.data[0].modelid)
                    "
            />
              <q-btn unelevated round  align="around" :icon="!muteall ? 'volume_up' : 'volume_off'" color="transparant" size="20px" dense  @click="
                    mutelocal = !mutelocal
                    "
            />
        <q-dialog @hide="cl_closePostComment()" :ref="videodata.id[0]" :id="videodata.id[0]" class="q-pa-none" seamless position="bottom">
            <q-card class="text-black h-vh-50 q-px-xs bg-grey-3 ">
                <q-card-section class="q-py-xs">
                    <p class="text-center">
                        {{ commamount }} комментариев
                        <q-btn flat @click="cl_closePostComment()" icon="close" class="clbtn" />
                    </p>
                </q-card-section>
                <q-scroll-area :ref="'commentsscroll'+videodata.id[0]" :thumb-style="thumbStyle" :bar-style="barStyle" class="comdial ml-vw-1 q-pa-none h-vh-32">
                    <div v-for="(textcom, index) in textcoms" :key="index" class="row">
                        <q-avatar size="5.16vh">
                            <img class="bordavatar" :src="textcom.avatar" />
                        </q-avatar>
                        <div class="ml-1 col">
                            <p :class="
                      textcom.ismodel
                        ? 'text-pink-6 text-body1 col-10 text-weight-bold q-mb-none'
                        : 'text-black text-body1 col-10 text-weight-bold q-mb-none'
                    ">
                                {{ textcom.username }}
                            </p>
                            <p class="text-body2 text-weight-medium q-mb-none text-black">
                                {{ textcom.comments }}
                            </p>
                            <div class="row justify-between mr-vw-1">
                                <div class="row">
    
                                </div>
                                <p class="text-comment-14 text-grey-8 q-mb-none">
                                    {{ returnComent(textcom.date) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </q-scroll-area>
    
                <div class="row wi h-vh-5">
                    <q-input v-on:keyup.enter="cl_createcomment(index)" v-model="commm_send" placeholder="Ваше сообщение" borderless input-class="text-body1 backy-cmt text-black q-pl-md" class="sendfix  col-10 h-i q-ml-xs q-mt-xs" />
    
                    <q-btn color="green" class="btnsend q-my-auto  q-ml-xs text-center" align="center" icon="mdi-send" outline round text-color="green" @click="cl_createcomment(index)">
                    </q-btn>
                </div>
            </q-card>
    
        </q-dialog>
        <q-dialog v-model="checklive" content-style="dialog">
          <q-page class="absolute-full" style="height: 100%; display: block">
            <q-card
              class="text-white fit flex flex-center"
              style="background: rgba(254, 44, 85, 0.7)"
            >
              <div class="justify-center row">
                <q-avatar
                  style="border: 1px solid #ffffff; border-radius: 30px"
                  icon="notifications_none"
                ></q-avatar>
                <p class="q-px-xl q-mt-md q-mx-lg text-center" style="font-size: 4vw">
                  Модель не онлайн. Уведомить вас о начале стрима?
                  <!--  i need to activate notifaction here  -->
                </p>
                <q-btn
                  class="text-red bg-white text-weight-bold col-7"
                  @click="alert('hello')"
                  style="border-radius: 30px"
                  >Да</q-btn
                >
                <q-btn
                  class="text-weight-bold col-7 q-mt-lg"
                  style="background: rgba(255, 255, 255, 0.3); border-radius: 30px"
                  >Нет</q-btn
                >
              </div>
            </q-card>
          </q-page>
        </q-dialog>
         
    </div>
</template>

<script>


export default {
    props: {
        http:Function,
        index:Number,
        tab:String,
        liked:Boolean,
        pcm:Object,
        videodata:Object,
        id:Number,
        muteall: Boolean,
        auth:Boolean,
        opencomt:Function
    },
    data: () => ({
        commentsDialog: false,
              commm_send: '', 
        textcoms: [],
        checklive:false,
             commamount: 0,
        thumbStyle: {
            display: "none",
        },
        barStyle: {
            display: "none",
        },
    }),
    model: {
        prop: "muteall",
        event: "muteevent"
    },
    components: {
    },
     computed:{
         mutelocal: {
            get: function() {
                return this.muteall
            },
            set: function(value) {
                this.$emit('muteevent', value)
            }
        },
        comments:function(){
            return this.$refs[this.videodata.id[0]]
            }
    },
    mounted(){
        let vm = this
this.$root.$on('videocomments',(req)=>{
  //  console.log(req.id , this.videodata.id[0]);
if(req.id === this.videodata.id[0]){
      this.textcoms = req.res.map((ep) => ep = {
                username: ep.data.username,
                comments: ep.data.comments,
                date: ep.data.date,
                ismodel: ep.data.ismodel,
                avatar: ep.data.avatar,
                replays: ep.tags,
            });
            if(vm.comments !== undefined){
                vm.comments.show()
            }
           
}
})
    },
   
    methods: {
          cl_like(id, index) {
      //console.log(id, index);
      if (!this.auth) {
        this.$root.$emit('changepage',2)
      } else {
  let socketobj = {
        token: this.pcm.user.tk,
        userid: this.pcm.user.id,
        videoid: id,
        index:index
      };
      this.$socket.emit("s_videoLike", {
        obj: socketobj,
      });
      }
    },
        cl_closePostComment(id) {
            (this.indexpostopen = null), (this.commamount = null);
            this.comments.hide()
            this.$socket.emit("s_closecomments", {
                token: this.pcm.user.tk,
                videoid: id,
            });
        },

        cl_createcomment(i) {
            this.$socket.emit("s_create_comment", {
                token: this.pcm.user.tk,
                comment: this.commm_send,
                username: this.pcm.user.un,
                videoid: this.videodata.id[0],
                index: i
            });
        },
        returnComent(text) {
            var ThisDate = new Date();
            var ComentDate = new Date(text);
            var Resurlt = ComentDate.tryHours() + ":" + ComentDate.tryMinuts();
            if (ThisDate.tryDate() > ComentDate.tryDate()) {
                Resurlt += " " + ComentDate.tryDate() + "." + ComentDate.tryMonth();
                if (ThisDate.getFullYear() > ComentDate.getFullYear()) {
                    Resurlt += "." + ComentDate.getFullYear();
                }
            }
            return Resurlt;
        },
       
        getmodel(modelid) {
            if (!this.auth) {
                this.$root.$emit('changepage',2)
            }
            this.http({
                method: "get",
                url: "/check_model",
                headers: {
                    "x-access-token": this.pcm.user.tk,
                    modelid: modelid,
                },
            }).then((response) => {
                if (response.data.status == "Y") {
                    this.$router.push("/model_chat/" + modelid);
                } else {
                    this.checklive = true;
                }
            });
        },
       
        subscribe(id, index, avatar) {
            if (!this.auth) {
                this.$root.$emit('changepage', 2)
            } else {
                this.$socket.emit("subscribeControle", {
                    token: this.pcm.user.tk,
                    sender: this.pcm.user.id,
                    index: index,
                    receiver: id,
                    avatar: avatar,
                });
            }
        },
    },
    sockets: {
          cl_subscribeControle: function (response) {
      //#//===--- this is for nnotification don't touch it please ----===//#//
    this.$store.dispatch('pcm/subscribing', response)
   
    // this.$nextTick(()=>{
    //    this.reRender()
    // })
    },
    cl_newMassage: function (response) {
      let jsonobj = {
        comments: response.comment,
        date: response.date,
        username: response.username,
        avatar: response.avatar,
        ismodel: response.ismodel,
        islive: response.islive,
      };
      this.textcoms.push(jsonobj);
    },
   
       cl_massageSended: function (resopnse) {
      if (resopnse == "ok") {
        this.commm_send = null;
        var vid = this.videoid;
        if(this.comments){
this.$store.dispatch('pcm/commenting_mobile', {index: this.index, tab:this.tab, auth:this.pcm.auth})
        }
       this.$nextTick(()=>{
        // console.log(this.$refs.commentsscroll);
          this.$refs['commentsscroll'+this.videodata.id[0]]?.setScrollPercentage(1,300);
       })
      } else {
        this.$q.notify({
          type:'warning',
          message:'conection warning !',
        })
      }
    },
     
    }
}
</script>

<style lang="">

</style>