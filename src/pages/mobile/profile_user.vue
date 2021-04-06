
<template>
    <div class="w-vw-100 h-vh-100">
        <!-- <q-toolbar class="text-black row justify-between absolute">
           <q-btn  class="maxc-w align-start" flat size="2vh" @click="routeback()" />
           <q-fab class="maxc-w self-end" icon="more_horiz" direction="down" vertical-actions-align="right" >
            <q-fab-action color="pink-3" class="w-fav" outline text-color="black"  to="/profile/settings" label="Настройки" icon="mail" />
            <q-fab-action color="pink-3" class="w-fav" outline text-color="black" @click="logout()" label="Выйти" icon="power_settings_new" />
          </q-fab>
        </q-toolbar>
        <q-separator /> -->
        <div class="w-100 h-100  q-px-xs q-mt-md">
            <div class="row ">
                  <div class="col-12 flex text-center row justify-center">
                    <div class="col-12">
                        <q-img class="mobile-ui-profile-img w-100" :src="thisModel ? thisModel.avatars.replace('.camsguns.com','.cg.house') : ''">
    
                            <div class="absolute-top-right bg-none2">
                                <q-fab text-color="white" class="maxc-w self-end " icon="more_horiz" direction="left" :ripple="false" active-icon="circle">
                                    <q-fab-action color="dark" text-color="white" class="flex" to="/profile/settings" icon="settings" />
                                    <q-fab-action color="red" class="flex" text-color="white" @click="logout()" icon="power_settings_new" />
                                </q-fab>
                            </div>
                            <div class="absolute-bottom row w-100 flex-center-div q-py-none">
                                <q-profilebar :id="thisModel.id" v-if="showbar" color="white" :notpravite="pravite" />
                            </div>
                        </q-img>
                    </div>
                </div>
    
    
                <div class="col-12 text-center">
                    <p>
                        <b class="text-black text-overline text-subtitle1">Ваш баланс <kbd>{{bal ? bal : '0.00'}} ₮ </kbd></b>
                    </p>
                    <q-btn color="pink-13" rounded class="w-vw-40" label="Купить токены" @click="deposit()" />
                    <q-dialog v-model="deposit_dialog">
                        <q-card color="white" square class="q-px-md flex flex-center text-center">
                            <div v-if="!yad">
                                <p class="text-center text-h6 q-mx-md">укажите сумму в рублях ниже</p>
                                <q-input filled v-model.number="amount_deposit" placeholder="#.##" :hint="`${1.00 * amount_deposit} ₮ = ${rates ? 5*rates.rates.RUB * amount_deposit : 'error api'} RUB`" mask="?.##T" class="b-border q-mx-md " color="black" input-class="text-subtitle1 text-center q-py-none q-my-none q-placeholder2 "
                                    type="number" />
                                <q-btn color="black" rounded outline class="no-shadow q-mx-auto q-px-md q-my-md text-overline text-weight-regular" label="Перейти в кассу" @click="depositstart()" />
                            </div>
                            <div v-else>
                                <!-- start -->
                                <p class="text-center"></p>
                                <q-table dense :title="'Счет на токены №'+order_id" :data="dataschet" :columns="columns" hide-pagination />
    
                                <p class="text-center">Платежи принимаются любыми картами выпущенными Российскими банками в рублях РФ, срок зачисления платежа зависит от вашего банка и обычно составляет от 1 минуты до 3 рабочих дней</p>
                                <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
                                    <input type="hidden" name="receiver" value="4100115505163705" />
                                    <input type="hidden" name="formcomment" value="Токены" />
                                    <input type="hidden" name="short-dest" value="Покупка токенов" />
                                    <input type="hidden" name="label" :value="amount_deposit" />
                                    <input type="hidden" name="quickpay-form" value="donate" />
                                    <input type="hidden" name="targets" :value="order_id" />
                                    <input type="hidden" name="sum" :value="amount_deposit" data-type="number" />
                                    <input type="hidden" name="comment" value="Токены" />
                                    <input type="hidden" name="need-fio" value="false" />
                                    <input type="hidden" name="need-email" value="false" />
                                    <input type="hidden" name="need-phone" value="false" />
                                    <input type="hidden" name="need-address" value="false" />
                                    <input type="hidden" name="paymentType" value="AC" />
    
                                    <q-btn color="pink-13" rounded class="no-shadow q-mx-lg q-mt-lg" type="submit" label="Согласен перейти в кассу" />
                                </form>
                            </div>
                            <!-- end -->
                        </q-card>
                    </q-dialog>
                </div>
            </div>
            <div class="row w-100 h-100 q-mt-xs ">
                <q-scroll-area v-if="vidos.length > 0" :thumb-style="thumbStyle" :bar-style="barStyle" class="w-100 h-vh-54">
                    <div class="row w-100">
                        <div v-for="(item, index) in vidos" :key="item._id" v-bind:class="[
                      { 'ml-09': index % 3 != 0 },
                      'w-32',
                      'q-pa-none',
                      'q-mt-xs'
                    
                    ]">
                            <div class="bg-black rounded-borders videoprofile" v-if="item._source.body">
                                <vue-plyr class="mute-right">
                                    <video controls="false" data-plyr-config='{ "controls": ["play-large","play","mute"]}' class="col-12 videoprofile-inter" :id="item._id" :src="item._source.body.video.replace('.mp4','_mobile.mp4').replace('.camsguns.com','.cg.house')" color="black" type="video/mp4" />
                                </vue-plyr>
                                <q-icon name='zoom_out_map' color="white" size="20px" @click="openfullvideo(item)" class="z-index-video" />
                            </div>
                        </div>
                    </div>
                </q-scroll-area>
                <div class="row w-100 h-vh-54 justify-center content-center" v-else>
                 <span class="oswald-bold text-novideos"> никаких одолжений видео</span>
                </div>
                <q-dialog v-model="fullvideo.open" position="bottom" transition-show="bounceIn">
                    <q-card class="profilefullvideo" v-if="fullvideo.video">
                        <vue-plyr class="mute-right">
                            <video @play="setProgressBar" controls="false" data-plyr-config='{ "controls": ["mute"]}' ref="dialogVideo" :src="fullvideo.video.video.replace('.camsguns.com','.cg.house')" color="black" type="video/mp4" />
                        </vue-plyr>
                        <q-linear-progress :value="fullvideo.progress" color="pink" />
    
                        <q-card-section class="row items-center no-wrap">
                            <div class="text-left">
                                <div class="text-weight-bold text-uppercase">@{{ fullvideo.video.modelname ? fullvideo.video.modelname : 'none'}}</div>
                                <div class="text-grey">{{fullvideo.video.example ? fullvideo.video.example : '#none'}}</div>
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
    </div>
</template>

<script>
import http from "../../http-common";
import { LocalStorage } from 'quasar';

export default {
    name: "PageIndex",
    components: {},
    props: ["pravite"],
    data() {
        return {
            yad: false,
            pcm: null,
            order_id: 0,
            deposit_dialog: false,
            amount_deposit: 1,
            bal: 0,
            podpis: 0, //
            fullvideo: {
                id: false,
                video: null,
                open: null,
                progress: 0.0
            },
            name: LocalStorage.getItem("username"),
            vidos: [],
            columns: [
                { name: "amount", align: "center", label: "Кол-во", field: "amount" },
                { name: "price", align: "center", label: "Цена", field: "price" },
                { name: "curr", align: "center", label: "Валюта", field: "curr" },
                { name: "summ", align: "center", label: "Сумма", field: "summ" }
            ],
            podpleight: 0,
            followers: 0,
            likes: 0,
            showbar: false,
            thisModel: {
                id: null,
                avatars: null,
                createdAt: null,
                is_vip: null,
                name: null,
                pub_streamid: null,
                sec_streamid: null,
                updatedAt: null,
                videos: {}
            },
            thumbStyle: {
                display: "none"
            },
            barStyle: {
                display: "none"
            },
            dataschet: []
        };
    },
    /*
    methods: {
     
      create_model() {
        http({
          method: "post",
          url: "/create_model_chat",
          headers: {
            "x-access-token": LocalStorage.getItem("token")
          }
        }).then(response => {
          console.log(response);
        });
      }
    },
    */
    sockets: {
        cl_getuserinfos: function(response) {
            //  console.log(response)
            this.showbar = true
            this.thisModel = response;
            this.vidos = response.videos;
            this.followers = response.subscribers;
            this.podpleight = response.subscribing;
        }
    },
    beforeMount() {
        this.pcm = this.$store.state.pcm
        this.getdata(this.$route.params.modelid)
        // this.$socket.emit("getuserinfo", {
        //   token: LocalStorage.getItem("token"),
        //   username: LocalStorage.getItem("username")
        // });

    },
    mounted() {
        http({
            method: "get",
            url: "/balance",
            headers: {
                "x-access-token": this.pcm.user.tk
            }
        }).then(response2 => {
            this.bal = response2.data.balance;
        });
    },
    methods: {
        setProgressBar(evt) {
            const progresser = setInterval(() => {
                this.fullvideo.progress = evt.target.currentTime / evt.target.duration;
                if (evt.target.currentTime === evt.target.duration || evt.target.paused) clearInterval(progresser)
            }, 100)
        },
        openfullvideo(video) {
            this.fullvideo.video = video._source.body;
            this.fullvideo.open = true;
            this.fullvideo.id = video._id
        },
        getdata: function(id) {
            this.$socket.emit("getuserinfoprofile", {
                id: id ? id : this.pcm.user.id,
            });
        },
        routeback() {
            this.$router.push("/");
        },
        depositstart() {
            http({
                method: "get",
                url: "/depositstarVideoPlayert",
                headers: {
                    "x-access-token": this.pcm.user.tk,
                    amount: this.amount_deposit
                }
            }).then(response2 => {
                this.order_id = response2.data.link.id;
                this.yad = true;
                this.dataschet = [{
                    amount: this.amount_deposit,
                    price: 1,
                    curr: "RUB",
                    summ: this.amount_deposit
                }];

            });
        },
        deposit() {
            this.deposit_dialog = true;
        },
        logout() {
            let token = this.pcm.user.tk;
            this.$q.sessionStorage.remove('sspcm')
            this.$q.cookies.remove('sspcm')
            http({
                method: "get",
                url: "/logout",
                headers: {
                    "x-access-token": this.pcm.user.tk
                }
            }).then(response => {

                this.$router.push("/");
                this.nologin = true;
                this.nnologin = false;
                location.reload();
            });
        }
    }
};
</script>

