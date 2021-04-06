<template>
   <div class="q-pa-md q-gutter-xs" v-if="data.subs !== null">
    <q-badge :color="color ? color : 'pink-6'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-lowercase cursor-pointer" outline  @click="opensubs" >
      {{data.subs ? data.subs.length :0}} Подписки
    </q-badge>
    <q-badge :color="color ? color : 'pink-4'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-lowercase" outline>
      {{data.likes}} Лайки
    </q-badge>
    <q-badge :color="color ? color : 'pink-4'" class="q-py-xs text-body2 q-b-rouded text-weight-regular text-lowercase" outline v-if="usermodel & notpravite"  >
      {{data.subings ? data.subings.length : 0}} Подпичики
    </q-badge>
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
import { LocalStorage } from 'quasar';
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
      mounted(){
      //  console.log(this.id,this.notpravite)
          this.$socket.emit('profilebar',{
         token: LocalStorage.getItem('token'),
         id: this.id,
     })
      },
      sockets: {
      cl_profilebar: function (res){
        //  console.log(res)
          this.usermodel = res.ismodel
          this.data = res
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

<style>

</style>