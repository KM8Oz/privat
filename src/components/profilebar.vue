<template>
   <div class="q-pa-md ui_bar" v-if="data.subs !== null">
   <div class="subs_ui right-border" @click="opensubs" >
       <p class="ui_numbers">
    {{data.subs ? numeral(data.subs.length).format('0,0 a') :0}}
       </p>
       <p class="ui_number-title ">
             Подписки
       </p>
    
         <!-- <q-badge :color="color ? color : 'pink-6'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-uppercase cursor-pointer" outline  @click="opensubs" >
      
    </q-badge>   -->
    </div>
     <div class="subs_ui right-border">
       <p class="ui_numbers">
         {{numeral(data.likes).format('0,0 a')}} 
       </p>
       <p class="ui_number-title">
              Лайки
       </p>
    
         <!-- <q-badge :color="color ? color : 'pink-6'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-uppercase cursor-pointer" outline  @click="opensubs" >
      
    </q-badge>   -->
    </div>
     <div class="subs_ui">
       <p class="ui_numbers">
          {{data.subings ? numeral(data.subings.length).format('0,0 a') : 0}}
       </p>
       <p class="ui_number-title">
              Подпичики
       </p>
    
         <!-- <q-badge :color="color ? color : 'pink-6'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-uppercase cursor-pointer" outline  @click="opensubs" >
      
    </q-badge>   -->
    </div>
    <!-- <q-badge :color="color ? color : 'pink-4'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-uppercase" outline>
    
    </q-badge>
    <q-badge :color="color ? color : 'pink-4'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-uppercase" outline v-if="usermodel & notpravite"  >
      {{data.subings ? data.subings.length : 0}} Подпичики
    </q-badge> -->
    <q-dialog v-model="dlistsubs" position="bottom" >
    <q-list bordered class="q-w-90" >
         <q-item v-for="(contact, index) in data.subs" :key="index" class="q-mb-sm" clickable v-ripple :to="'/user/'+contact.modelid">
        <q-item-section avatar>
          <q-avatar>
            <img :src="contact.avatar.replace('.camsguns.com','.cg.house')">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.username }}</q-item-label>
        </q-item-section>

      <!--  <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>-->
      </q-item>
    </q-list>
   </q-dialog>
   </div>
</template>

<script>
// import { LocalStorage } from 'quasar';
import { mapState } from "vuex";
export default {
    name:'Profilebar',
    props: ["id","notpravite","color"],
     data(){
       return {
         usermodel:false,
           data:{
             subs:null,
             likes:null,
             subings:null
           },
           dlistsubs:false,
       }
     },
    
     computed:{
  ...mapState([
         'pcm',
       ])
     },
      mounted(){
      //  console.log(this.id,this.notpravite)
          this.$socket.emit('profilebar',{
         token: this.pcm.user.tk,
         id: this.id,
     })
      this.$root.$on("opensubs", ()=>{
this.dlistsubs = true
      })
      },
      sockets: {
      cl_profilebar: function (res){
        //  console.log(res)
          this.usermodel = res.ismodel
          this.data = res
          // this.$root.$emit("subs", data.subs)
      }
      },
      methods:{
        opensubs:function(){
          if(this.notpravite){
this.dlistsubs = !this.dlistsubs
          }
        }
      }
}
</script>

<style lang="scss">
.ui_bar{
  // position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  max-width: 360px;
  margin: 10px auto;
  height: 100%;
.subs_ui{
  width:100%;
  // max-width:80px;
   color: $ThemeColor;
  .ui_numbers{
   font-family: 'Oswald-bold';
    font-size: 1.2em;
  }
  .ui_numbers-title{
   font-family: 'Sarpanch-semibold';
  
  }
}  
}
.right-border{
   border-right: 2px solid $ThemeColor;
}
</style>