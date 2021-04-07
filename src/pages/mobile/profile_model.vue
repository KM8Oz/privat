<template>
    <div class="w-100">
        <q-dialog v-model="withdialog" class="row">
            <q-card class="bg-white full-width q-pl-sm q-pr-sm">
                <p>Укажите необходимую сумму и валюту для вывода</p>
                <q-select class="col-12 q-pt-sm" outlined v-model="currency" :options="options" label="Валюта вывода" />
                <q-input class="col-12 q-pt-sm" outlined v-model="amount" placeholder="сумма токенов" />
                <q-btn color="pink-13" class="no-shadow full-width q-mt-sm q-mb-sm" @click="requests(bal)" label="Вывести"></q-btn>
            </q-card>
        </q-dialog>
        <swiper :options="swiperOptionswitch" >
            <swiper-slide class="profile-wrapper-ui">
   <div class="model_profile_wrapper">
            <div class="row profilecard">
                <div class="col-12 flex text-center row justify-center">
                    <div class="col-12">
                        <div class="mobile-ui-profile-img w-100">
                              <div class="absolute-top-right bg-none2">
                                <q-fab text-color="white" class="maxc-w self-end " icon="more_horiz" direction="left" :ripple="false" active-icon="circle">
                                    <q-fab-action color="dark" text-color="white" class="flex" to="/profile/settings" icon="settings" />
                                    <q-fab-action color="red" class="flex" text-color="white" @click="logout()" icon="power_settings_new" />
                                </q-fab>
                            </div>
                             <div class="profile_brodcam">
                                  <q-avatar class="col-3 fine_border" color="red" text-color="white" size="90px">
                                <img :src="thisModel ? thisModel.avatars.replace('.camsguns.com','.cg.house') : ''" alt="altimg">
                            </q-avatar>
                            <div class="profile_names_ui">
                             
                                <p class="name">{{thisModel.name}}</p>
                                   <p class="username"> @{{ pcm.user.un }} </p>
                            </div>
                            <div class="row w-100 flex-center-div q-py-none">
                                <q-profilebar :id="thisModel.id"  v-if="showbar" color="pink" :notpravite="pravite" />
                            </div>
                             </div>
                        </div>
                        
                                  <q-card class="mobile-ui-profile-infos q-my-xs w-100 ">
                    <q-card-section class="col" horizontal>
                        <div class="leftcontent">
                            <div class="text-h6 q-mb-xs q-ml-md text-left ">{{thisModel?thisModel.name:''}}</div>
                            <div class="row no-wrap items-center">
                                <q-rating size="28px" :value="thisModel? thisModel.rank : rank" :max="5" :disable="this.$route.params.modelid === pcm.user.id" color="yellow" />
                                <span class="text-caption text-grey q-ml-sm">{{thisModel? thisModel.rank : 0}} ({{thisModel? thisModel.subscribers: 0}})</span>
                            </div>
                        </div>
    
                        <q-card-actions vertical class="justify-around q-px-md">
                            <q-btn flat round color="red" :ripple="false" icon="add" @click="withdialog = true" />
                            <q-btn flat round color="red" :label="`Ваш баланс: ${ bal ? bal : 0.00 } ₮`" />
                        </q-card-actions>
                    </q-card-section>
    
                </q-card>
                    </div>
                </div>
    
    
                
            </div>
            <div class="q-mx-xs h-vh-50">
                <!-- <swiper ref="profile_swiperbig" :options="swiperOptionswitch">
                    <swiper-slide> -->
                     <div class="profile_ui_separator2 row q-ml-md">
                         <p>  {{$t('sides.subscribers')}}</p> <p class="more" @click="opensubs">{{$t('more')}}</p>
                        </div>
                        <div class="list_followers_ui">
                          <swiper class="swiper h-vh-10  profile-swiper" :options="swiperOption1" ref="profile_swiper" :auto-update="true" :auto-destroy="true" :delete-instance-on-destroy="true" :cleanup-styles-on-destroy="true">
                          <swiper-slide  class="h-100 slide_follower" v-for="(sub, index) in subs" :key="index">
                        <q-avatar color="red" text-color="white" size="70px">
                            <img :src="sub.avatar.replace('.camsguns.com','.cg.house')" alt="none">
                         
                        </q-avatar>
                        <div class="profile_names_ui">
                                <p class="name">{{sub.username}}</p>
                                   <!-- <p class="username"> @{{ pcm.user.un }} </p> -->
                            </div>
                          </swiper-slide>
                          </swiper>
                        </div>
                        <div class="profile_ui_separator">
                           {{$t('mobile.list_videos')}}
                        </div>
                        <swiper class="swiper h-vh-50  profile-swiper" :options="swiperOption" ref="profile_swiper" :auto-update="true" :auto-destroy="true" :delete-instance-on-destroy="true" :cleanup-styles-on-destroy="true">
                            <swiper-slide v-for="(item, index) in vidos" :key="item._id+index" class="h-100">
                                <vue-plyr class="mute-right h-100 rounded-borders">
                                    <video :data-plyr-config='`{ "controls": ["play-large","play","mute"]}`' class="profilevideo player" :id="item._id" :poster="item._source.body.video.replace('.mp4','_mobile.png').replace('.camsguns.com','.cg.house')" :src="item._source.body.video.replace('.mp4','_mobile.mp4').replace('.camsguns.com','.cg.house')" color="black"
                                        type="video/mp4" />
                                </vue-plyr>
                                <q-icon name="zoom_out_map" color="white" size="30px" @click="openfullvideo(item)" class="z-index-video " />
                                <!-- <q-badge text-color="red" class="badge-galary" floating><span>видео</span></q-badge> -->
                            </swiper-slide>
                        </swiper>
                    

                               <!-- <Motion
        :hover="[
            'scale-100',
            'scale-125 rotate-45',
            'scale-100 rotate-0',
        ]"
        :options="motion"
        class="w-16 h-16"
    > </Motion> -->

                        <div class="profile_ui_separator">
                           {{$t('mobile.list_photos')}}
                        </div>
                        <swiper class="swiper h-vh-50   profile-swiper" :options="swiperOption" ref="profile_swiper_img" v-if="imagesslider">
                            <swiper-slide v-for="(item, index) in imagesdata" :key="index" class="h-100 w-100 ">
                                <q-img :src="item.src.replace('.camsguns.com','.cg.house')" class="profilegalary"></q-img>
                             
                            </swiper-slide>
                            <swiper-slide :key="'sdsdsd'" v-show="this.$route.params.modelid ? false : pcm.user.rol" class="h-100 ">
                                <q-file class="filepicker" v-model="imagefile" filled input-class="filepickerinner" @input="uploadFIle" :filter="checkFile" @rejected="onRejected">
                                    <q-icon name="add" size="50px" color="dark" />
    
                                </q-file>
                            </swiper-slide>
                        </swiper>

    
                <q-dialog v-model="fullvideo.open" position="bottom" transition-show="bounceIn">
                    <q-card class="profilefullvideo" v-if="fullvideo.video">
                        <vue-plyr class="bigbtnplyr profilevideo mute-right" :emit="['loadeddata']">
                            <video @play="setProgressBar" controls="false" data-plyr-config='{ "controls": ["mute"]}' ref="dialogVideo" :src="fullvideo.video.video.replace('.mp4','_desktop.mp4').replace('.camsguns.com','.cg.house')" color="black" type="video/mp4" />
                        </vue-plyr>
                        <q-linear-progress :value="fullvideo.progress" color="pink" />
    
                        <q-card-section class="row items-center no-wrap">
                            <div class="text-left">
                                <div class="text-weight-bold text-uppercase">
                                    @{{ fullvideo.video.tags ? fullvideo.video.modelname : "none" }}
                                </div>
                                <div class="text-grey">
                                    {{ fullvideo.video.tags ? fullvideo.video.tags[0] : "#none" }}
                                </div>
                            </div>
    
                            <q-space />
    
                            <q-btn flat round icon="play_arrow" @click="$refs.dialogVideo.play()" />
                            <q-btn flat round icon="pause" @click="$refs.dialogVideo.pause()" />
                            <q-btn flat round icon="close" v-close-popup />
                        </q-card-section>
                    </q-card>
                </q-dialog>
            </div>
        </div>
            </swiper-slide>
        </swiper>
        
       
    </div>
</template>

<script>
import http from "../../http-common";
import { LocalStorage } from "quasar";
import { mapState } from "vuex";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
//import { log } from 'video.js';
import Motion from 'tinymotion';
export default {
    name: "PageIndex",
    components: {},
    opensubs:false,
    props: ["pravite"],
    components: {
        Swiper,
        SwiperSlide,
        Motion
    },
    data() {
        return {
            subs:[],
             motion: {
                repeat: true,           // infinite animation until stopped
                rollback: true,         // reverse animation until return to the first keyframe
                instantRollback: true,  // instantly return to the first keyframe
                delay: 0,               // delay before the start
                stepDelay: 0,           // delay between keyframes
                factor: 1,              // delay factor (number of steps to skip) before every step
                skip: 0,                // number of steps to skip before the first flip
                duration: 600,          // default duration. might be overridden by duration-{value} Tailwind class
                ease: 'ease-in-out',    // transition timing function
            },
            bal: 0,
            imagefile: null,
            podpis: 0,
            imagesslider: true,
            name: null,
            vidos: [],
            currency: null,
            amount: null,
            withdialog: false,
            swiperOption: {
                spaceBetween: 30,
                centeredSlides: true,
                slidesPerView: 1,
                //simulateTouch : true,
                // loopFillGroupWithBlank: false,
                // grabCursor: true,
                zoom: {
                    enabled: true,
                    maxRatio: 4,
                    minRatio: 1,
                    toggle: true,
                },
                allowSlideNext: true,
                allowSlidePrev: true,

                on: {
                    slideChange: () => {
                        // this.menuOpened = this.swiper.activeIndex === 0
                    }
                }
            },
            swiperOption1: {
                spaceBetween: 30,
               
                slidesPerView: 5,
                //simulateTouch : true,
                // loopFillGroupWithBlank: false,
                // grabCursor: true,
                zoom: {
                    enabled: false,
                    maxRatio: 4,
                    minRatio: 1,
                    toggle: true,
                },
                allowSlideNext: true,
                allowSlidePrev: true,

                on: {
                    slideChange: () => {
                        // this.menuOpened = this.swiper.activeIndex === 0
                    }
                }
            },
            swiperOptionswitch: {
                   direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
            //     effect: 'fade',
            //     resistanceRatio: 0,
            //      slidesPerView: 4,
            //     spaceBetween: 30,
            //    centeredSlides: true,
            //     lazy: false,
            //     zoom: {
            //         enabled: false,
            //         maxRatio: 1,
            //         minRatio: 1,
            //         toggle: false,
            //     },
            //     direction: "vertical",
            //     allowSlideNext: true,
            //     allowSlidePrev: true,

            //     slidesPerGroupSkip: 0,
            //     slidesPerView: 1,
            //     on: {
            //         slideChange: () => {
            //             // this.menuOpened = this.swiper.activeIndex === 0
            //         }
            //     }
            },
            options: ["RUB", "USD", "EUR", "CNY", "JPN"],
            alert: null,
            podpleight: 0,
            followers: 0,
            likes: 0,
            vidos: null,
            imagesdata: null,
            showbar: false,
            rank: 0,
            fullvideo: {
                id: false,
                video: null,
                open: null,
                progress: 0.0,
            },
            thisModel: null,
            thumbStyle: {
                display: "none",
            },
            barStyle: {
                display: "none",
            },
        };
    },
    computed: {
        ...mapState(["pcm"]),
        imgSwiper: function() { return this.$refs.profile_swiper_img.$swiper }
    },
    sockets: {
        pastes_images: function(res) {

            if (res.status) {
                this.$q.notify({
                    type: 'positive',
                    message: `done`
                })
                this.imgSwiper.removeSlide(0)
                this.imagesdata.push(res.res)
                this.$nextTick(() => {
                    this.imgSwiper.update()
                })
            } else {
                this.imagesslider = false;
                this.imagesdata = JSON.parse(res)
                this.$nextTick(() => {
                    this.imagesslider = true;
                })
            }



        },
        pastes: function(res) {
            console.log(res);
            //  this.images = res
        },
        cl_getuserinfos: function(response) {

            this.showbar = true;
            this.thisModel = response;
            this.vidos = response.videos;
            this.followers = response.subscribers;
            this.podpleight = response.subscribing;
            //console.log('modeldata',this.thisModel );
        },
    },
    methods: {
        opensubs:function(){
        this.$root.$emit("opensubs", true)
        },
        uploadFIle(file) {
            // var v = this.images ? this.image :[];
            // v.push(URL.createObjectURL(file))
            //  this.images = V;
            this.imgSwiper.addSlide(0, `<div class="h-100 bg-black swiper-slide swiper-slide-active"><img src="${URL.createObjectURL(file)}"  class="profilegalary" >
     <q-badge text-color="red" floating ><span  @click="upload()" id="uploadbtn" class="savebtn">save</span></q-badge></div>`)
            this.imgSwiper.slideTo(0, 500, false)
            let vm = this
            console.log(document.getElementById('uploadbtn'));
            document.getElementById('uploadbtn').addEventListener('click', function() {
                vm.upload(file)
            })
        },
        upload(file) {
            this.$socket.emit('postes', { type: 'upload', tk: this.pcm.user.tk, payload: { img: file } })
        },
        checkFile(files) {
            return files.filter(file => file.type === 'image/png' | file.type === 'image/jpg' | file.type === 'image/jpeg' |
                file.size > 2048)
        },
        onRejected(rejectedEntries) {
            this.$q.notify({
                type: 'negative',
                message: `file ${rejectedEntries[0]} did not pass validation constraints`
            })
        },
        setProgressBar(evt) {
            const progresser = setInterval(() => {
                this.fullvideo.progress = evt.target.currentTime / evt.target.duration;
                if (evt.target.currentTime === evt.target.duration || evt.target.paused)
                    clearInterval(progresser);
            }, 100);
        },
        openfullvideo(video) {
            this.fullvideo.video = video._source.body;
            this.fullvideo.open = true;
            this.fullvideo.id = video._id;
        },
        getdata: function(id) {
            this.$socket.emit("getuserinfoprofile", {
                id: id ? id : this.pcm.user.id,
            });
        },
        routeback() {
            this.$router.push("/");
        },
        logout() {
            let token = this.pcm.user.tk;
            LocalStorage.clear();
            this.$q.sessionStorage.remove("sspcm");
            this.$q.cookies.remove("sspcm");
            http({
                method: "get",
                url: "/logout",
                headers: {
                    "x-access-token": token,
                },
            }).then((response) => {
                this.nologin = true;
                this.nnologin = false;
                location.replace("/");
            });
        },
        requests(i) {
            this.withdialog = false;
            http({
                method: "get",
                url: "/withdraw",
                headers: {
                    "x-access-token": this.pcm.user.tk,
                    amount: parseFloat(this.amount),
                    currency: this.currency,
                },
            }).then((response2) => {
                this.alert = response2.data.status;
                if (response2.data.status == "done") {
                    http({
                        method: "get",
                        url: "/balance",
                        headers: {
                            "x-access-token": this.pcm.user.tk,
                        },
                    }).then((response2) => {
                        //console.log('balance',response2);
                        this.bal = response2.data.balance;
                    });
                }
            });
        },
        create_model() {
            http({
                method: "post",
                url: "/create_model_chat",
                headers: {
                    "x-access-token": this.pcm.user.tk,
                },
            }).then((response) => {});
        },
    },
    beforeMount() {
        this.getdata(this.$route.params.modelid);
        this.name = this.pcm.user.un;
    },
    created() {

    },
    mounted() {
        // this.$socket.emit("getuserinfo", {
        //   token: this.pcm.user.tk,
        //   username: LocalStorage.getItem("username")
        // });
         this.$socket.emit("profilebarui",{token:this.pcm.user.tk, id:this.pcm.user.id}, (data)=>{
             this.subs = data.subs;
         })
        this.$socket.emit('postes', { type: 'get', tk: this.pcm.user.tk, payload: { userid: this.$route.params.modelid ? this.$route.params.modelid : this.pcm.user.id } })
        http({
            method: "get",
            url: "/balance",
            headers: {
                "x-access-token": this.pcm.user.tk,
                'userid': this.pcm.user.id
            },
        }).then((response2) => {
            //console.log(response2);
            this.bal = response2.data.balance;
        });
    },
};
</script>

<style lang="scss">
.profile-wrapper-ui{
    height: 1700px;
    max-height: 1700px;
}
.profile_brodcam{
    width: 100%;
    max-width: 330px;
    height: 100%;
    max-height: 200px;
    background-color:white ;
    position: absolute;
    margin: 0px auto -140px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // position: relative;
    overflow: visible;
    //  box-shadow: 0px 2px 3px 0px #444;
border-radius: 23px;
.q-avatar{
    margin-top: -60px;
}
.profile_names_ui{
    position: relative;
    height: 100%;
    max-height: 40px;
    display: flex;
    flex-direction:column;
    justify-content:center ;
    justify-items: center;
    .name{
        max-height: 10px;
        // font-family: 'Oswald-regular';
        font-optical-sizing: inherit;
        font-size: 1.2em;
        text-transform: uppercase;
        margin: 3px;
    }
     .username{
        max-height: 10px;
        // font-family: 'Oswald-regular';
        font-optical-sizing: inherit;
        font-size: 1em;
        // text-transform: uppercase;
        margin: 3px;
    }
}
}
.mt10 {
    margin-top: 1vh;
}

.vidoss {
    height: 15vh;
}

.h100 {
    height: 90%;
}

.mt20p {
    position: absolute;
    margin-top: 10%;
}

.plyr__control--overlaid {
    background: rgb(0 0 0 / 50%) !important;
}
.model_profile_wrapper{
width: 100vw;
height: 100% !important;
max-height: max-content;
scroll-behavior: smooth;
display: block;
}
.swiper-slider{
    box-sizing: border-box;
}
 .swiper-container {
      height: 100%;
    }
    .profile_ui_separator{
        height: 100%;
        width: 100%;
        max-height: 40px;
        font-size: 1.4em;
        font-family: 'Oswald-bold';
        display: block;
        .name{
            float: left;
        }
        .more{

            float: right;
        }
    }
     .profile_ui_separator2{
        height: 100%;
        width: 100%;
        max-width: 95vw;
        max-height: 40px;
        font-size: 1.4em;
        font-family: 'Oswald-bold';
        display: flex;
        flex-direction: row;
            justify-content: space-between;
            align-items: center;
        .name{
            justify-self: flex-start;
        }
        .more{
        color:$ThemeColor;
        font-family: Oswald-regular;
        position: relative;
         user-select: none;
         cursor: pointer;
        margin: 0px 19px 0px 0px;
        }
         .more::selection{
      display: none;
        }
    }
    .slide_follower{
        width:100%;
        
        display: flex;
        flex-direction: column;
      
        background: unset !important;
        justify-content: center;
        align-items: center;
        .profile_names_ui{
    position: relative;
    height: 100%;
    max-height: 40px;
    display: flex;
    flex-direction:column;
    justify-content:center ;
    justify-items: center;
    text-align:center;
    width: 100%;
    min-width: 70px;
        margin-right: 25px !important;
    .name{
        max-height: 10px;
        // font-family: 'Oswald-regular';
        font-optical-sizing: inherit;
  font-size: 0.6em;
        // text-transform: uppercase;
        margin: 3px 0px;
    }
     .username{
        max-height: 10px;
        // font-family: 'Oswald-regular';
        text-align:center;
        width: 100%;
        font-optical-sizing: inherit;
         font-size: 0.6em;
        // text-transform: uppercase;
        // margin: 3px;
    }
    }
}
</style>

