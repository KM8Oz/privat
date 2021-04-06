 <template >
  <div class="q-pt-md">
    <q-card :class="` ${pcm.controls.dark ? 'bg-dark text-white': 'bg-white text-black'} q-pa-none q-card-fix`">
      <q-card-section class="q-pb-none">
        <div class="row items-center">
          <p class="col text-fxl text-center font-weight-light line-height-1 oswald-semibold">{{$t("sides.recommanded_girls")}}</p>
          
        </div>
      </q-card-section>
      <q-card-section :class="`q-py-none q-px-md ${pcm.controls.dark? 'border-inset_black':'border-inset_white'} q-mt-auto q-pl-xs`">
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="h-vh-30">
          <div v-for="(modell, index) in this.recModels" :key="index">
            <div class="row items-center q-mb-none mr-vw-1" v-if="!modell.issubscribe">
              <q-avatar size="6vh" @click="goto(modell.userId)">
                <img class="bordavatar" :src="modell.avatars.replace('.camsguns.com','.cg.house')" />
              </q-avatar>
              <div class="q-mt-md q-ml-sm w-33">
                <p class="text-xl col-10 text-weight-regular q-mb-none oswald-regular">{{ modell.name }}</p>
                <p class="text-md">@{{ modell.username }}</p>
              </div>
              <div
                class="row justify-end col q-px-none q-py-none q-mx-none w-40"
                v-if="modell.username != username"
              >
                <q-btn
                  v-if="auth"
                  class="w-35 q-px-none q-py-none q-mx-none"
                  @click="
                    subscribe(modell.userId, modell, index, modell.avatars)
                  "
                  dense
                  rounded
                  :disable="diablesubs"
                  :outline="modell.issubscribe"
                  color="pink-6"
                  no-caps
                >
                  <p
                    class="q-ma-none text-md text-weight-regular q-pa-none q-ma-none"
                    v-if="!modell.issubscribe"
                  >{{$t("sides.subscribe")}}</p>
                  <p
                    class="q-ma-none text-md text-weight-regular q-py-none q-px-custom q-ma-none"
                    v-if="modell.issubscribe"
                  >{{$t("sides.unsubscribe")}}</p>
                </q-btn>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
    <!--Категории-->
    <q-card :class="`${pcm.controls.dark ? 'bg-dark text-white': 'bg-white text-black'} q-pa-none q-mt-md q-card-fix`">
      <q-card-section>
        <div class="row items-baseline"></div>
        <div class="row items-baseline">
          <p class="col text-fxl text-center  font-weight-light line-height-1 oswald-semibold">{{$t('menu.catergories')}}</p>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none q-px-none">
        <q-scroll-area class="h-vh-30">
          <q-item
            clickable
            v-ripple
            class="q-pa-none h-vh-6-st row items-center q-mb-none q-px-md "
            v-for="(tag,index) in tags"
            :key="index"
            @click="forceRerender(tag)"
          >
            <q-avatar size="6vh">
              <img
                style="border: 1px solid #ffffff"
                src="https://rec.cg.house/avatars/hashtag.png"
              />
            </q-avatar>
            <div class="q-ml-sm">
              <p
                style="font-size: 14px"
                class="col-10 text-weight-medium q-mb-none text-weight-medium oswald-bold"
              >#{{tag}}</p>
            </div>

            <div class="row justify-end col">
              <q-btn dense flat icon="keyboard_arrow_right" no-caps class="q-ml-sm"></q-btn>
            </div>
          </q-item>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </div>
</template>
    <script>
import http from "../http-common";
import { LocalStorage } from "quasar";
import { Platform } from "quasar";
import index from "../pages/desktop/index";
import { askForPermissioToReceiveNotifications } from "../firebase";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      tags: null,
      username: null,
      recModels: null,
      auth: false,
      thumbStyle: {
        display: "none",
      },
      barStyle: {
        display: "none",
      },
      diablesubs: false,
    };
  },
  computed:{
    ...mapState(['pcm'])
  },
  methods: {
    goto(id){
    this.$router.push('/user/'+id)
    setTimeout(()=>{
    if(location.pathname.length > 1){
     location.reload()
    }
    },300)
    },
    forceRerender(tag) {
      if (this.pcm.auth) {
        if(location.pathname === '/'){
       this.$store.dispatch('pcm/categoSlides',tag)
       this.$nextTick(()=>{
         this.$root.$emit('tagsRefreshEvent', true)
       })
        } else {
        this.$router.push('/')
        this.$nextTick(()=>{
           this.$store.dispatch('pcm/categoSlides',tag)
               this.$nextTick(()=>{
         this.$root.$emit('tagsRefreshEvent', true)
       })
        })
        }

      } else {
        this.$q.notify({
          color: "red",
          title: "нет входа",
          message: `попробуйте сначала зарегистрироваться`,
        });
      }
    },
    subscribe(modelid, modell, index, avatars) {
      //console.log(modelid);
      if (this.pcm.auth) {
        this.$socket.emit("subscribeControle", {
          sender: this.pcm.user.id,
          receiver: modelid,
          token: this.pcm.user.tk,
          index: index,
          avatar: avatars,
        });
      } else {
        this.$q.notify({
          color: "red",
          title: "нет входа",
          message: `попробуйте сначала зарегистрироваться`,
        });
        this.diablesubs = true;
      }
    },
  },
  mounted() {
  
    this.$socket.emit("getvideostags", {
      token: this.pcm.user.tk,
    });
  
  },
  beforeMount(){
    this.username = this.pcm.user.un
    this.$socket.emit("get_models", {token:this.pcm.user.tk}, (res)=>{
     if(res.status){
      this.auth = true;
   this.recModels = res.payload;
     } else {
         console.log(res);
     }
    })
  // http({
  //     method: "get",
  //     url: "/models",
  //     headers: {
  //       "x-access-token": this.pcm.user.tk,
  //     },
  //   }).then((response) => {
  //     //  console.log("models data:", response.data);
  //     if (response) {
  //       this.auth = true;
  //       this.recModels = response.data;
  //     } else {
  //       this.$q.notify({
  //         color: "pink-6",
  //         message: "try to sign in please",
  //         classes: "glossy",
  //         timeout: 500,
  //       });
  //     }
  //   });
  },
  sockets: {
    videotags: function (res) {
      this.tags = res.map((e) => (e = e.replace(" ", "")));
      // console.log(this.tags);
    },
    cl_authcontroll: function (response) {
      if (response.massage == "auth") {
        this.auth = true;
      } else if (response.massage == "deauth") {
        this.auth = false;
      }
    },
    cl_subscribeControle: function (response) {
      //#//===--- this is for nnotification don't touch it please ----===//#//

      if (response.status == "added") {
       
        this.recModels[response.index].issubscribe = true;
        this.$q.notify({
          color: "pink-6",
          message: "Подписка на " + response.name + " оформлена",
          classes: "glossy",
          timeout: 500,
        });
      }
      if (response.status == "removed") {
        this.recModels[response.index].issubscribe = false;
        this.$q.notify({
          color: "pink-6",
          message: "Вы отказались от подписки на " + response.name,
          classes: "glossy",
          timeout: 500,
        });
      }
      if (response.status == "error") {
        if (response.log == "you can not follow your self") {
          this.$q.notify({
            color: "pink-6",
            message: "Вы не можете подписаться сами на себя ",
          });
        }
      }
      if (response.opennotifs) {
        askForPermissioToReceiveNotifications(response.id, Platform.is);
      }
    },
  },
};
</script>