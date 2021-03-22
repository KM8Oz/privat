<template>
  <q-page class="">
    <q-stepper
      v-model="step"
      ref="stepper"
      vertical
      color="pink-6"
      animated
    >
      <q-step
        :name="1"
        class="text-h2"
        title="Персональная информация"
        done-color="green"
        color="pink-6"
        icon="settings"
        :done="step > 1"
      >
       <div class="q-gutter-y-md column w-60 ml-vw-10 text-h3">
          <q-input
        clearable
        
        maxlength="30"
        color="pink-6"
        class="mt-vh-2 text-comment-17"
        v-model="stepone.name"
        label="имя"
        :rules="[
        val => !!val ||  'ПОЛЕ ОБЯЗАТЕЛЬНО',
        ]"
        @blur="startverf=true"
      />
       <q-input
        clearable
        
        color="pink-6"
        v-model="stepone.familyname"
        label="фамилия"
        :rules="[
        val => !!val ||  'ПОЛЕ ОБЯЗАТЕЛЬНО'
        ]"
      />
       <q-input
        clearable
        
        color="pink-6"
        v-model="stepone.thirdname"
        label="отчество"
      />
      <q-input  v-model="stepone.email" color="pink-6" no-error-icon type="email" :rules="[
        val => !!val ||  'ПОЛЕ ОБЯЗАТЕЛЬНО',
        val => val.indexOf('@') != -1 || 'invalid email (@)',
        val => val.indexOf('.') != -1 || 'invalid email (.)',
        val => ['inbox', 'gmail', 'yahoo', 'outlook', 'live', 'hotmail', 'yandex', 'mail'].indexOf(val.split('@')[1].split('.')[0]) != -1 || 'email is invalid (inbox,gmail,yahoo,outlook,live,hotmail,yandex,mail)'
         ]" input-class="text-right" label-slot clearable >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="pink" size="24px" name="mail" />
            Email
          </div>
        </template>
      </q-input>

       <q-input
        
        no-error-icon
        color="pink-6"
        v-model="stepone.phone"
        mask="+# (###) ### - ####"
        :rules="[
        val => !!val ||  'ПОЛЕ ОБЯЗАТЕЛЬНО'
        ]"
        label-slot
      >
      <template v-slot:label>
          <div class="col items-left all-pointer-events">
            <q-icon class="q-mr-xs" color="pink" size="24px" name="phone" />
            phone
          </div>
        </template>
      </q-input>
      <q-input  v-model="stepone.BthDay" mask="####/##/##" fill-mask :rules="[
      val => !!val || 'ПОЛЕ ОБЯЗАТЕЛЬНО',
      val => Number(val.split('/')[1]) <= 12 || '..../'+Number(val.split('/')[1])+'/..',
      val => val.split('/')[2] <= 31 || '..../../'+Number(val.split('/')[2]),
      val => val.split('/')[0] <= Number(resctDate.split('/')[0]) || 'ВОЗРАСТ ОГРАНИЧЕН (+18)'
      ]">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="stepone.BthDay" color="pink-6" default-view="Years"
            :locale="locals"
            default-year-month="1995/01"
            :navigation-max-year-month="resctDate"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="pink-6" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    </div>
      </q-step>

      <q-step
        :name="2"
        title="Проверка паспорта"
        icon="assignment"
        done-color="green"
        color="pink-6"
        :done="step > 2"
        class="text-h2"
      >
      <div class="row w-60 ml-vw-10" >
    <croppa v-model="steptwo.imgsrc"         
            placeholder="Документ удостоверяющий личность"
            placeholder-color="black"
            :placeholder-font-size="16"
            @new-image="fileexist = true"
            :remove-button-size="20"
            remove-button-color="pink"
            :show-loading="true"
           :width="400"
           @new-image-drawn="imageLoaded"
           @image-remove="handleImageRemove"
         >
     </croppa>
        <q-tooltip anchor="bottom middle" self="top middle" v-html="true">
   <img
          src="https://res.cloudinary.com/dupagadir/image/upload/c_fit,h_223,w_856,y_444/v1601896956/russian-passport_uid91u.jpg"
        />
</q-tooltip>
          </div>
      </q-step>

      <q-step
        :name="3"
        title="Политике Конфиденциальности"
        icon="policy"
         class="text-h2"
        done-color="green"
        color="pink-6"
        :done="step > 2"
      >
         <q-field   readonly>
        <template v-slot:control>
          <div class="self-center full-width no-outline"><span v-html="policy"></span>
          <q-toggle v-model="steptree.agree" label="согласен"  keep-color :color="steptree.agree ? 'green':'pink-6'" />
          </div>
        </template>
      </q-field>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
             <q-btn dense v-if="step === 1" rounded no-caps class="w-20 mt-vh-4" :disabled='errors' color="pink-6" @click="$refs.stepper.next()">
              <p class="absolute-center text-comment-14"  > дальше</p>
            </q-btn>
            <q-btn dense v-if="step === 2" rounded no-caps class="w-20 mt-vh-4" :disabled='steptwoerr' color="pink-6" @click="sendImg()">
              <p class="absolute-center text-comment-14"  > сканировать </p>
            </q-btn>
            <q-btn dense v-if="step === 3" rounded no-caps class="w-20 mt-vh-4" :disabled='!steptree.agree' color="pink-6" @click="finishup()">
              <p class="absolute-center text-comment-14"  > Заключать</p>
            </q-btn>
<q-btn dense rounded no-caps class="w-20 mt-vh-4 end    " v-if="step > 1"  color="pink-6" @click="$refs.stepper.previous()">
              <p class="absolute-center text-comment-14"  > Back </p>
            </q-btn>
        </q-stepper-navigation>
      </template>

      <template v-slot:message>
        <q-banner v-if="step === 1" class="bg-pink-8 text-white q-px-lg">
          Анкета модели
        </q-banner>
        <q-banner v-else-if="step === 2" class="bg-pink-8 text-white q-px-lg">
          Первая страница паспорта
        </q-banner>
        <q-banner v-else class="bg-pink-8 text-white q-px-lg">
          Соглашение О Политике Конфиденциальности
        </q-banner>
      </template>
    </q-stepper>
  </q-page>
</template>

<script>
import {
  QStepper,
  QStep,
  QStepperNavigation,
  date, LocalStorage,
  QSpinnerGears 
} from 'quasar'
import {policy} from '../pages/desktop/policy'
import http from "../http-common";
export default {
  name: 'QnewModel',
  components: {
    QStepper,
    QStep,
    QStepperNavigation
  },
  sockets:{
    newmodeldata(res){
     if(res.status) { 
       this.$q.notify({
          type: 'positive',
           message:'Проверьте свою почту.',
           color:'green-6',
           progress: true,
       })
       setTimeout(()=>{
         this.logout();
         this.$router.push({ path: '/' })
       },4000)
     } else {
       this.$q.notify({
         message:req.error,
         type:'worning'
       })
     }
    },
   checkPassport: function(res){
       if([!!res.data.firstName,!!res.data.lastName,!!res.data.nationality,!!res.data.documentNumber,
       !!res.data.documentCode,!!res.data.documentNumberCheckDigit,!!res.data.birthDate,!!res.data.birthDateCheckDigit].indexOf(false) === -1 ){
         this.$q.notify({
           type: 'positive',
           message:'Отсканировано с успехом',
           color:'green-6',
             progress: true,
        actions: [
          { label: 'принимать', color: 'white', handler: () => { 
            this.$refs.stepper.next()
          } }
        ]
         })
         this.steptwo.data = res.data;
       } else {
         //console.log([!!res.data.firstName,!!res.data.lastName,!!res.data.nationality,!!res.data.documentNumber,
      //  !!res.data.documentCode,!!res.data.documentNumberCheckDigit,!!res.data.birthDate,!!res.data.birthDateCheckDigit]);
      this.$q.notify({
           message:'сканирование ошибок , повторите еще раз',
           color:'pink-6'
         })
       }
    // [{status:res.reason.firstName.toLowerCase() === this.stepone.name.toLowerCase(),errorname:'first name not correct'},
    //  {status:res.reason.lastname.toLowerCase() === this.stepone.familyname.toLowerCase(),errorname:'last name not correct'},
    //  {status:res.reason.lastname.toLowerCase() === this.stepone.familyname.toLowerCase(),errorname:'last name not correct'}
    // ]
   }
  },
  data () {
    return {
      policy: policy,
      steptree: { agree: false },
      steptwo: {
        imgsrc: '',
        progress: 0.1,
        data:null,
      },
      stepone: {
        email: '',
        name: '',
        familyname: '',
        thirdname: '',
        phone: '',
        BthDay: '',
        valid: []
      },
      locals: {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        dateFormat: 'yyyy/mm/dd',
        timeFormat: 'hh:ii',
        firstDay: 1
      },
      resctDate: date.formatDate(date.subtractFromDate(new Date(), { year: 18 }), 'YYYY/MM'),
      step: 1,
      errors: true,
      startverf: false,
      steptwoerr:true,
      stepthreeerr:true
    }
  },
  mounted () {
    setInterval(this.onchange, 2000)
  },
  methods: {
    finishup(){
     this.$socket.emit('newmodeldata',{token:LocalStorage.getItem('token'),data:{passport:this.steptwo.data,form:this.stepone,agreement:this.steptree}})
    },
   sData (res){
     if(!this.errors){
     this.$socket.emit('newmodeldata',{token:LocalStorage.getItem('token'),data:{...this.stepone,...this.steptwo,...this.steptree}})
     } else {
       this.$q.notify({
         message:"please check data again: error",
         color:'pink-6'
       })
     }
   },
   handleImageRemove(){
      this.steptwoerr = true;
   },
   imageLoaded(){
     this.steptwoerr = false;
   },
    sendImg () {
      this.steptwo.imgsrc.generateBlob((blob) => {
        this.$socket.emit('checkPassport',{token:LocalStorage.getItem('token'),blobs:blob})
      })
      this.$q.notify({
        type: 'ongoing',
        message: 'Пожалуйста подождите.....',
        color:'pink-6'
      })
    },
    cropped (evt) {
     // console.log(evt.data)
    },
    onchange () {
      if (this.startverf) { 
        this.errors = [document.getElementsByClassName('q-field--error').length > 0 ,
        this.stepone.email === '' ,
        this.stepone.name === '' ,
        this.stepone.familyname === '' ,
        this.stepone.phone === '' ,
        this.stepone.BthDay === '', this.step === 2 ].indexOf(true) !== -1;
       // console.log(this.errors);
       }
    },
     logout() {
            http({
                method: "get",
                url: "/logout",
                headers: {
                    "x-access-token": LocalStorage.getItem("token")
                }
            }).then(response => {
                this.nologin = true;
                this.nnologin = false;
            });
        }
  }
}
</script>
