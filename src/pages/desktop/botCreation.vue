<template lang="vue">
    <div class="bot_wrapper">
        <!-- <div class="bot_tools_side">
            <div class="top">
                <span class="title"> tools</span>
            </div>
            <div class="bot_tools ">
                 <q-list bordered>
      <q-item class="bot_tool"  clickable v-ripple v-for="(tool, index) in bot_tools" :key="index">
        <q-item-section>{{tool.name}}</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" :name="tool.icon" />
        </q-item-section>
      </q-item>
      </q-list>
            </div>
        </div>
        <div class="bot_tools_display">
            <div class="top">
                 <span class="title"> bots</span>
            </div>
        </div>
        <div class="bot_results_display">
            <div class="top">
                 <span class="title"> bot test</span>
            </div>
        </div> -->

        <q-card> 
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab :name="tab.name" :label="tab.name" v-for="(tab, index) in bot_tabs" :key="index" />
        </q-tabs>

        <q-separator />    
        <q-tab-panels v-model="tab" animated ref="tabspanel">
          <q-tab-panel name="bots list" >
            <div class="text-h6 h-100 text-center">Bots list</div>
         <q-list bordered>
      <q-item class="bot_tool"   v-ripple v-for="(tool, index) in tabdata" :key="index">
        <q-item-section>{{tool.bot}}</q-item-section>
        <q-item-section avatar >
          <q-icon :color="activated.status ? activated.payload.id == tool.id ? 'green': 'red' :'red'" class="cursor-pointer" name="play_circle_filled" @click="startthis(tool)" />
          <q-icon color="green" class="cursor-pointer" :name="tool.icons.edit" @click="editThis(tool.id)" />
           <q-icon color="red" class="cursor-pointer" :name="tool.icons.delete" @click="destroy(tool.id)" />
        </q-item-section>
      </q-item>
      </q-list>
      
          </q-tab-panel>

          <q-tab-panel name="add">
            <div class="text-h6 h-100 text-center">Add chatbot <q-btn @click="refresh" round  icon="cached" size="7px" color="green" /> </div>
            <div class="add_chat_bot">
              <q-scroll-area
              scro
      :visible="false"
       :thumb-style="thumbStyle"
          :bar-style="thumbStyle"
      style=" height:80vh; max-width: 100%"
    >
                     <q-input
          
         ref="new_bot_name"
          borderless

          dance
          outlined
          color="grey"
          input-class="q-px-md q-pb-md q-mt-xs"
        v-model="new_bot.name"
          placeholder="bot name *"
           class="input_bot"
           lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-select
        
        dense
        v-model="new_bot.type"
          use-chips

          outlined
          borderless
           transition-show="flip-up"
        transition-hide="flip-down"
        :options="types"
        class="selector"
        style="width: 100%; height:70px"
      />
          <q-select 
          v-if="show.trbtn | show.trtxt"
        placeholder="Mode: 'add triggers'"
        dense

          outlined
          borderless
        class=" q-my-md selector"
        v-model="triggers"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        :max-values="5"
        :rules="[ val => val.length > 0 || 'Please use minimume 1 word',  val => val.length < 6 || 'Please use maximum 5 word' ]"
        new-value-mode="add"
        style="width: 250px"
      />
      <div v-if="show.tmbtn | show.tmtxt" class="slider">
         <q-badge color="secondary">
      Timing: {{ timing }} (5min to 60min)
    </q-badge>
    <q-slider
      v-model="timing"
      color="green"
      markers
      snap
      :min="5"
      :max="60"
    />
      </div>
      <div class="btn_designer " v-if="show.tmbtn | show.trbtn">    <!--  btn designer   -->
        <div class="btn_designer_tools">
           <q-select
            class="btn_designer_selectors"
            v-model="design"
             use-chips
             label="design"
             options-cover
               dense
        multiple
        :options="btn.design"
        :max-values="2"
      />
      <q-select
            class="btn_designer_selectors"
            v-model="sizing"
             use-chips
             label="sizing"
             options-cover
             dense
        :options="btn.sizing"
      />
          <q-select
            class="btn_designer_selectors"
            v-model="icon"
             use-chips
             label="icon"
             dense
             options-cover
        :options="btn.icon"
      />
      <div class="row justify-around align-center w-100">
         <v-swatches v-model="color" :trigger-style="{width: '22px', height: '22px' }"></v-swatches>
        <v-swatches v-model="text_color" :trigger-style="{width: '22px', height: '22px' }"></v-swatches>
      </div>
        </div>
        <div class="btn_result">
           <q-btn :icon="selectedbutton.icon" v-bind:[selectedbutton.design[0]]="true" v-bind:[selectedbutton.design[1]]="true" :class="selectedbutton.sizing"  :label="selectedbutton.text"  :style="`background-color:${selectedbutton.color};color:${selectedbutton.text_color}`" />
        </div>
            <q-input v-model="selectedbutton.text" label="button text" class="self-end w-100 text-center" input-class="text-center"/>
      </div>
      <q-editor v-if="show.tmtxt | show.trtxt" v-model="new_bot.result_txt" class="q-my-xs q-py-md"	/>
        <q-select 
        label="Action type"
        dense
        outlined
        borderless
        class="action q-my-xs q-py-xs selector action w-50 q-mx-auto"
        input-class="bg-black"
        v-model="action_type"
        :options="actions_list"
        hide-dropdown-icon
        input-debounce="0"
        :rules="[ val => val.length > 0 || 'Please use minimume 1 type']"
      />
        <div class="h-100 flex justify-center">
           <q-btn
      :loading="loading"
      :percentage="percentage"
      dark-percentage
      unelevated
      color="green"
      label="save"
      class="q-my-md"
      text-color="white"
      @click="startComputing()"
      icon="cloud_upload"
      style="width: 100px"
    />  
        </div>
       </q-scroll-area>
            </div>
          </q-tab-panel>

          <q-tab-panel name="test" :class="pcm.controls.dark ?'q-pa-none h-vh-75 bg-dark':'q-pa-none h-vh-75 '">
            <div class="text-h6 h-100 text-center">Smart Display</div>
                    <q-scroll-area ref="chatscroll" v-if="messages.length > 0" class="row q-px-md q-pt-md scoller-robottest" :thumb-style="{display:'none'}" :bar-style="{display:'none'}">
                        <!-- <div style="width: 95%;" class="text-white" v-for="(item, index) in datachat" :key="index">
                        <div class="q-ma-none row flexchat" v-if="item.ismodel == true">
                            <b class="text-pink-6 text-comment-18">{{ item.name }}:</b>
                            <p class="text-comment-14 text-pink-6 q-ma-none">
                                {{ item.text }}
                            </p>
                        </div>
                        <div class="q-ma-none row flexchat" v-else>
                            <b class="text-grey text-comment-18">{{ item.name }}:</b>
                            <p class="text-black text-comment-14 q-ma-none">
                                {{ item.text }}
                            </p>
                        </div>
                    </div> -->
                        <q-chat-message :class="`row  ${item.id !== pcm.user.id ? 'justify-start':''}`" :sent="item.id !== pcm.user.id"
                         :label-sanitize="true" v-for="(item, index) in messages" :key="index" :bg-color="item.ismodel ? 'pink-6' : 'amber-7'"
                          :name="item.name" :avatar="item.avatar" :text="[item.text]" :stamp="
                  getdatediff(item.date).month !== 0
                    ? `${getdatediff(item.date).month} months ago`
                    : getdatediff(item.date).day !== 0
                    ? `${getdatediff(item.date).day} days ago`
                    : getdatediff(item.date).hr !== 0
                    ? `${getdatediff(item.date).hr} hrs ago`
                    : `${getdatediff(item.date).min} min ago`
                " />
                    </q-scroll-area>
                    <!-- <div class="vw-25 h-100">
                    <q-input v-on:keyup.enter="send_comment()" v-model="chat_send" placeholder="Ваше сообщение" class="sendfix text-white h-v bg-white col-10" />
                    <q-btn class="col-2" flat @click="send_comment()">
                        <q-icon color="grey" name="mdi-send" class="mb0" />
                    </q-btn>
                </div> -->
                    <div :class="!$route.query.box ? 'row  w-vw-chat2': 'row  w-vw-chat3' ">
                        <q-input v-on:keyup.enter="send_comment()" v-model="message"
                         :placeholder="$t('streaming.your_message')" borderless :color="pcm.controls.dark ? 'dark' : 'white'" :input-class="`text-body1 backy-cmt ${
                  pcm.controls.dark ? 'text-white' : 'text-dark'
                }  q-my-md q-pl-md q-ml-none`" class="col-10 backy-cmt2 q-my-xs q-ml-xs">
                            <!-- <template v-slot:prepend>
                  <q-fab
                    v-model="fabLeft"
                    vertical-actions-align="left"
                    :class="`${
                      pcm.controls.dark ? 'text-white' : 'text-dark'
                    } q-my-auto text-center q-pa-none`"
                    icon="keyboard_arrow_up"
                    direction="up"
                  >
                    <q-fab-action
                      label-position="right"
                      color="pink-6"
                      icon="vpn_lock"
                      label="Приват"
                    />
                    <q-fab-action
                      label-position="right"
                      color="pink-3"
                      icon="redeem"
                      label="Подарить токены"
                    />
                  </q-fab>
</template>-->
          </q-input>

          <q-btn
            color="green"
            class="btnsend q-my-auto q-mx-auto text-center"
            align="center"
            icon="mdi-send"
            outline
            round
            text-color="green"
            @click="send_comment()"
          >
          </q-btn>
        </div>
        </q-tab-panel>
        </q-tab-panels>
        </q-card>
    </div>
</template>
<script>
// import Multiselect from 'vue-multiselect'
import { VueEditor } from "vue2-editor";
import VSwatches from 'vue-swatches';
import {  mapState } from "vuex";
import { date } from "quasar";
  // Import the styles too, globally
  import "vue-swatches/dist/vue-swatches.css"
export default {
    components:{
    "q-editor":VueEditor,
     VSwatches
    },
     data:function(){
         return {
             tab: "add",
             messages:[],
             filter:null,
             message:"",
             loop:null,
             activated:{
             status:false,
             payload:null
             },
             color:null,
             action_type:"",
             triggers:null,
             timing:5,
             interval:null,
               loading: false,
             percentage: 0,
             actions_list:[
                 "donate",
                 "share",
                 "go private",
                 "subscribe to live",
                 "send heart",
                 "send kiss",
                 "send vibration",
                 "share photo"
             ],
              thumbStyle: {
        display: "none",
      },
             design:["dense","stack"],
             tabdata:null,
             timelooper:null,
             text_color:"#000",
             icon:"smart_toy",
             sizing:["q-pa-xs"],
             selectedbutton:{
                  design:["dense","stack"],
                  sizing:"q-pa-xs",
                  icon:"smart_toy",
                  text:"change text",
                  color:"pink",
                  text_color:"#000"
             },
             btn:{
                 design:[
                   "flat",
                   "rounded",
                   "round",
                   "push",
                   "unelevated",
                   "no-caps",
                   "stack",
                   "glossy",
                    "dense"
                 ],
                 sizing:[
                   "q-mt-xs",
                   "q-mb-xs",
                   "q-my-xs",
                   "q-ml-xs",
                   "q-mr-xs",
                   "q-ma-xs",
                   "q-mx-xs",
                   "q-mt-md",
                   "q-mb-md",
                   "q-my-md",
                   "q-ml-md",
                   "q-mr-md",
                   "q-ma-md",
                   "q-mx-md",
                   "q-mt-lg",
                   "q-mb-lg",
                   "q-my-lg",
                   "q-ml-lg",
                   "q-mr-lg",
                   "q-ma-lg",
                   "q-mx-lg",
                   "q-pt-xs",
                   "q-pb-xs",
                   "q-py-xs",
                   "q-pl-xs",
                   "q-pr-xs",
                   "q-pa-xs",
                   "q-px-xs",
                   "q-pt-md",
                   "q-pb-md",
                   "q-py-md",
                   "q-pl-md",
                   "q-pr-md",
                   "q-pa-md",
                   "q-px-md",
                   "q-pt-lg",
                   "q-pb-lg",
                   "q-py-lg",
                   "q-pl-lg",
                   "q-pr-lg",
                   "q-pa-lg",
                   "q-px-lg",
                 ],
                 align:[
                   "left",
                   "right",
                   "around",
                   "between"
                 ],
                 icon:[
                   "phone",
                   "mail",
                   "directions",
                   "navigation",
                   "settings",
                   "smart_toy",
                   "precision_manufacturing",
                   "liquor",
                   "local_cafe",
                   "hourglass_bottom"
                 ]
             },
             types:[
              "triggered with text",
              "timing with text",
              "triggered with button",
              "timing with button",
             ],
             new_bot:{
                 name:null,
                 type:"triggered with text",
                 trigger:null,
                 result_txt:null,
                 timing:5
             },
             show:{
               trbtn:false,
               trtxt:false,
               tmbtn:true,
               tmtxt:true
             },
             bot_tabs:[
                 {
                   name: "bots list", icon: "list",  data:[]
                 },
                    {
                  name: "add", icon: "add",  data:[
                      { bot:"hello",icons: { edit: "edit", delete:"remove_circle_outline" }, data:{} }
                     ]
                 },
                    {
                   name: "test", icon: "smart_display",  data:[
                      { bot:"hello",icons: { edit: "edit", delete:"remove_circle_outline" }, data:{} }
                     ]
                 }
             ],
             bot_types:{
                 timing_with_btn: {time:"10", time_type:"min",btn:{ripple:[true,false],label:null,colors:["#f3a683", "#f7d794","#778beb","#e77f67","#f8a5c2","#f19066", "#f19066", "#e66767"] }},
                  trigger_with_btn: {triggers:null,btn:{ripple:[true,false],text_colors:null ,label:null,bg_color:null,colors:["#f3a683", "#f7d794","#778beb","#e77f67","#f8a5c2","#f19066", "#f19066", "#e66767"] }},
                  trigger_with_text: {triggers:null,btn:{ripple:[true,false],text_colors:null ,bg_color:null,colors:["#f3a683", "#f7d794","#778beb","#e77f67","#f8a5c2","#f19066", "#f19066", "#e66767"] }}
             }
         }
     },
     computed:{
      //  design0:function(){return this.design.length >= 0 ? design[0]: "dense"},
      // design1:function(){return this.design.length > 0 ? design[1]: "stack"},
      ...mapState(["pcm"])
     },
     watch:{
       message:function(val){
         if(this.filter){
             this.triggerFilter(val)
       }
       },
       design:function(val){
         this.selectedbutton.design = [
            val.length >= 0 ? val[0]: "dense",
            val.length > 0 ? val[1]: "stack"
         ]
       },
       text_color:function(val){
         this.selectedbutton.text_color = val;
       },
       
       sizing:function(val){
         this.selectedbutton.sizing = val;
       },
       icon:function(val){
         this.selectedbutton.icon = val;
       },
       color:function(val){
         this.selectedbutton.color = val;
        //  console.log(val);
       },
         tab:function(val){
         this.tabdata = this.bot_tabs.filter(e=>e.name == val)[0].data;
         //console.log(this.tabdata);
         },
         btn:{
           handler:function(val){
            console.log(val);
            
           }
           ,
           deep:true
         },
         timelooper:function(val){
           console.log("looper:"+val);
            if (val){
              this.lopper()
            } else {
              clearInterval(this.loop)
            }
         },
          activated:{

           handler:function(val){
             console.log(val);
               this.timelooper = false;
           if(val.status){ switch (val.payload.data.bot_type) {
             case "triggered with text":
                this.filter = true;
                this.timelooper = false;
               break;
             case "timing with text":
                  this.filter = false;
                  this.timelooper = true;
               break;
                 case "triggered with button":
                 this.filter = true;
                 this.timelooper = false;
               break;
                 case "timing with button":
                 this.filter = false;
                 this.timelooper = true;
               break;
             default:
                console.log("error switch");
               break;
             }
           }
           }
           ,
           deep:true
         },
         new_bot:{
           handler:function(val){
           switch (val.type) {
             case "triggered with text":
               this.show = {
               trbtn:this.show.trbtn,
               trtxt:false,
               tmbtn:false,
               tmtxt:false
             }
               this.show.trtxt = true
               break;
             case "timing with text":
                 this.show = {
               trbtn:false,
               trtxt:false,
               tmbtn:this.show.tmbtn,
               tmtxt:false
             }
               this.show.tmtxt = true
               break;
                 case "triggered with button":
                this.show = {
               trbtn:false,
               trtxt:this.show.trtxt,
               tmbtn:false,
               tmtxt:false
             }
               this.show.trbtn = true
               break;
                 case "timing with button":
                 this.show = {
               trbtn:false,
               trtxt:this.show.tmtxt,
               tmbtn:false,
               tmtxt:false
             }
               this.show.tmbtn = true
               break;
             default:
                console.log("error switch");
               break;
           }
           },
           deep:true
         }
     },
     created:function(){
       this.findAllBots()
     },
     beforeDestroy(){
          clearInterval(this.interval)
     },
     methods:{
            triggerFilter:function(val){
              if(this.activated.status){
            if(this.activated.payload.data.data.trigger.indexOf(val) !== -1){
                  this.launchAction()
               }
              }
            },
            launchAction:function(){
                    if(this.activated.status){
                      let msg = {
                        text : this.activated.payload.data.data.result_txt,
                      date: new Date().toJSON(),
                      name: "bot:"+this.activated.payload.bot,
                      models: this.pcm.user.id,
                      ismodel:this.pcm.user.rol,
                      avatar:"https://rec.cg.house/statics/Mini-Robot.png",
                      id:this.pcm.user.id
                      };
                    setTimeout(()=>{
                       this.messages.push(msg)
                    },2000)
                    }
            },
            getdatediff(dte) {
            let date2 = new Date(dte);
            let date1 = new Date();
            let diff = (unit) => date.getDateDiff(date1, date2, unit);
            return {
                month: diff("months"),
                day: diff("days"),
                hr: diff("hours"),
                min: diff("minutes"),
            };
        },
        startthis:function(val){
          if(this.activated.status){
             if(this.activated.payload.id == val.id){
              this.activated.status = false;
              this.activated.payload = null; 
             } else {
                 this.activated.status = false;
                  clearInterval(this.loop)
              this.activated.payload = null; 
              this.$nextTick(()=>{
                      this.activated.status = true;
              this.activated.payload = val; 
              })
             }
          } else {
           this.activated.status = true;
          this.activated.payload = val; 
          }
          this.$nextTick(()=>{
            this.tab = "test"
          })
        },
        lopper:function(){
          console.log("ok",this.activated.payload.data.data.timing * 60 * 1000);
            if(this.activated.status){
              this.loop = setInterval(()=>{
                 let msg = {
                        text : this.activated.payload.data.data.result_txt,
                      date: new Date().toJSON(),
                      name: "bot:"+this.activated.payload.bot,
                      models: this.pcm.user.id,
                      ismodel:this.pcm.user.rol,
                      avatar:"https://rec.cg.house/statics/Mini-Robot.png",
                      id:this.pcm.user.id
                      };
                  this.messages.push(msg)
      
              }, Number(this.activated.payload.data.data.timing * 60 * 1000))
            }
        },
       send_comment(){
          if (
                this.message == null ||
                this.message == "" ||
                this.message == " " ||
                !this.message.trim()
            ) {
                this.$q.notify({
                    // ограничение на 3 или 2 буквы тут будут бесполезны из за особенности русского языка
                    color: "pink-6",
                    message: "Сообщение пустое",
                });
                return;
            }
             let msg = {
                      text: this.message,
                      date: new Date().toJSON(),
                      name: this.pcm.user.un,
                      models: this.pcm.user.id,
                      ismodel:this.pcm.user.rol,
                      avatar:"https://rec.cg.house/avatars/default/avatar%20128-07.png",
                      id:this.pcm.user.id
                    };
        this.messages.push(msg)
        this.message = ""
       },
       refresh:function(){
          this.new_bot.name = null;
        this.new_bot.type = [];
        this.new_bot.result_txt = "";
        this.timing = 5;
        this.selectedbutton = {
           design:["dense","stack"],
                  sizing:"q-pa-xs",
                  icon:"smart_toy",
                  text:"change text",
                  color:"pink",
                  text_color:"#000"
        }
        this.action_type = ""
       },
       findAllBots(){
          let vm = this;
      this.$socket.emit("bots_controller", {
        tk:this.pcm.user.tk,
        payload:{},
        action:"none"
      }, function(res){
          if(res.status){
     vm.bot_tabs[0] =  {
                   name: "bots list", icon: "list", 
                   data:res.payload.map(e=>e={ id:e.id,lastedit:e.updatedAt, bot:e.name,icons: { edit: "edit", delete:"remove_circle_outline" }, data:e },)
                 }
          } else {
            vm.$q.notify({
              type:"worning",
              message:"error listing bots"
            })
          }
      })
       },
       editThis(id){
        //  this.$refs.tabspanel.
        const data = this.bot_tabs[0].data.filter(e=>e.id == id)[0];
        // this.new_bot = {
        //   name:data.bot,
        //   type:data.data.bot_type,
        // }
        this.new_bot.name = data.bot;
        this.new_bot.type = [data.data.bot_type];
        this.new_bot.result_txt = data.data.data.result_txt;
        this.timing = data.data.data.timing;
        this.selectedbutton = {
          color:data.data.button.color,
          design:data.data.button.design,
          design:data.data.button.design,
          icon:data.data.button.design.icon,
          sizing:typeof data.data.button.sizing != Object ? data.data.button.sizing : [data.data.button.sizing],
          text:data.data.button.text,
          text_color:data.data.button.text_color
        }
        this.action_type = data.data.action
        // console.log(data);
        // this.selectedbutton = data.button
        this.tab = "add";
       },
       startComputing () {
         this.sendData();
      this[`loading`] = true;
      this[`percentage`] = 0;
      this[`interval`] = setInterval(() => {
        this[`percentage`] += Math.floor(Math.random() * 8 + 10)
        if (this[`percentage`] >= 100) {
          clearInterval(this[`interval`])
          this[`loading`] = false
        }
      }, 700)
    },
    destroy(id){
        let vm = this;
     this.$socket.emit("bots_controller", {
       tk:vm.pcm.user.tk,
       action:"delete",
       payload:{
         id:id
       }
     }, function(res){
      // console.log(res);
          vm.findAllBots()
           if(res.status){
             vm.tab = "add";
           }
     })
    },
    sendData:function(){
      let vm = this;
     this.$socket.emit("bots_controller", {
       tk:vm.pcm.user.tk,
       action:"add",
       payload:{
         name:vm.new_bot.name,
         type:vm.new_bot.type,
         triggers:vm.triggers,
         timing:vm.timing,
         text:vm.new_bot.result_txt,
         action:vm.action_type,
         btn:vm.selectedbutton,
         donation:1,
         currency:'tkn',

       }
     }, function(res){
       console.log(res);
          vm.findAllBots()
     })
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
        }
        else {
          const needle = val.toLowerCase()
          this.filterOptions = stringOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
        })
     }
     }
     
}
</script>
<style lang="scss">
    .bot_wrapper{
        height: 100%;
        width: 100%;
        min-height: 80vh;
        max-width: 1200px;
        display: flex;
        flex-flow: row wrap;
        margin: 0px auto;
        .q-tab-panel{
             .q-list{
                  border:unset;
                  width: 100%;
                  max-width: 400px;
                    .q-item{
            //    border-radius:20px;
               border:2px solid black;
               padding: 0px 15px;
               margin: 5px 5px;
               color: black;
               font-family: "Oswald-regular";
               font-size: 1.1em;
           }
              }
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .add_chat_bot{
            width:100%;
            max-width: 900px;
            padding-top: 1em;
            .btn_designer {
   width: 100%;
    min-height: 100px;
       border: 1px solid #ccc;
    height: max-content;
    display: flex;
    margin: 5px 0px;
    flex-direction: column;
    align-content: space-between;
    .btn_result {
    min-height: 200px;
    max-height: max-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  
}
    .btn_designer_tools{
      width: 100%;
      min-height: 50px;
      height: max-content;
          display: flex;
    flex-direction: row;
    flex-wrap: wrap;
        justify-content: space-evenly;
    align-items: center;
    .vue-swatches{
      width: fit-content;
    }
      .btn_designer_selectors{
           min-width: 95px;
    max-height: 70px;
    height: 100%;
    min-height: 70px;
    max-width: 100px;
    border: unset;
        .q-field__label{
          text-align:"center"
        }
        .q-field__control{
          padding: unset;
        }
        .q-field__control{
          border-radius: unset;
        }
      }
    }
}
            .slider{
                  background: #80808021;
                 border-radius: unset;
                 margin:3px 3px ;
                 padding: 3px 15px ;
            }
            .q-select--multiple{
                width:100% !important;
                       height: max-content;
                       min-height: 90px;
            }
        }
        }
        .q-card{
            width:100%;
            box-shadow: unset;
            color: black;
        }
        
    .bot_tools{
              height: 100%;
          
          
         
          }
    }
    .bot_inputs{
       
    }
    .selector{
      .q-field__control{
        display: flex;
        .q-field__native{
          padding: 0px 5px;
        }
        .q-field__append{
          height: 100%;
          color: black;
          padding: 0px 5px;
        }
      }
    }
     .action{
      .q-field__control{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        .q-field__native{
            display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: start;
        font-family: "Oswald-semibold";
        font-size: 1.2em;
        text-transform: uppercase;
          // position: absolute;
        }

      }
    }
        .q-item__section--main ~ .q-item__section--side{
       width: 100px !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
               }
               .ql-editor {
    min-height: 90px;
    font-size: 16px;
}
.quill-container{
  max-height: 100px;
}
.scoller-robottest{
  height:55vh !important;
  width: 100%;
  max-width: 400px;
}
</style>