
<template>
  <div>
    <q-toolbar class="text-black q-gutter-xs">
      <q-toolbar-title class="text-center">{{name}}</q-toolbar-title>

      <q-btn flat icon="more_vert">
        <q-menu style="min-width: 200px">
          <q-btn flat icon="mdi-account-settings" label="Настройки" />
          <q-separator inset spaced />

          <q-btn flat icon="mdi-logout" @click="logout()" label="Выйти" />
        </q-menu>
      </q-btn>
    </q-toolbar>
    <q-separator />
    <div class="q-pa-lg" style="max-width: 400px">
      <div class="row">
        <div class="col-12 flex text-center row">
          <div class="col-12">
            <q-avatar size="100px">
              <img
                style="border: 1px solid #ffffff;"
                src="https://banner2.cleanpng.com/20181207/xbt/kisspng-react-secrets-of-the-javascript-ninja-node-js-yout-deprecated-api-driven-development-with-sails-js-f-5c0b0e4552d211.6338904715442284213392.jpg"
              />
            </q-avatar>
          </div>
          <p class="text-black col-12">@{{name}}</p>
        </div>

        <div class="col-12 text-center">
          <p>
            <b class="text-black">{{podpis}}</b>
          </p>
          <p class="text-grey">Подписок</p>
        </div>

        <div class="col-12 text-center">
          <p>
            <b class="text-black">Ваш баланс {{bal}} T</b>
          </p>
          <q-btn
            color="pink-13"
            rounded
            class="no-shadow"
            label="Купить токены"
            @click="deposit()"
          />
          <q-dialog v-model="deposit_dialog">
            <q-card color="white" class="absolute-full q-px-md flex flex-center text-center">
              <div v-if="!yad">
                <p class="text-center">1 токен равен 1 рубль укажите сумму в рублях ниже</p>
                <q-input v-model="amount_deposit" outlined placeholder="Сумма" />
                <q-btn
                  color="pink-13"
                  rounded
                  class="no-shadow q-mx-lg q-mt-lg"
                  label="Перейти в кассу"
                  @click="depositstart()"
                />
              </div>
              <div v-else>
                <!-- start -->
                <p class="text-center"></p>
                <q-table
                  dense
                  :title="'Счет на токены №'+order_id"
                  :data="dataschet"
                  :columns="columns"
                  hide-pagination
                />

                <p
                  class="text-center"
                >Платежи принимаются любыми картами выпущенными Российскими банками в рублях РФ, срок зачисления платежа зависит от вашего банка и обычно составляет от 1 минуты до 3 рабочих дней</p>
                <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
                  <input type="hidden" name="receiver" value="4100115505163705" />
                  <input type="hidden" name="formcomment" value="Токены" />
                  <input type="hidden" name="short-dest" value="Покупка токенов" />
                  <input type="hidden" name="label" :value="order_id" />
                  <input type="hidden" name="quickpay-form" value="donate" />
                  <input type="hidden" name="targets" :value="order_id" />
                  <input type="hidden" name="sum" :value="amount_deposit" data-type="number" />
                  <input type="hidden" name="comment" value="Токены" />
                  <input type="hidden" name="need-fio" value="false" />
                  <input type="hidden" name="need-email" value="false" />
                  <input type="hidden" name="need-phone" value="false" />
                  <input type="hidden" name="need-address" value="false" />
                  <input type="hidden" name="paymentType" value="AC" />

                  <q-btn
                    color="pink-13"
                    rounded
                    class="no-shadow q-mx-lg q-mt-lg"
                    type="submit"
                    label="Согласен перейти в кассу"
                  />
                </form>
              </div>
              <!-- end -->
            </q-card>
          </q-dialog>
        </div>
      </div>
      <div class="row">
        <div v-for="item in vidos" :key="item.id" class="col-4 q-pl-xs q-pr-xs">
          <div class="bg-black mt10 rounded-borders h100 flex">
            <video
              class="vidoss full-width full-height vertical-middle flex-center"
              :id="item._source.body.data[0]._id[0]"
              :src="item._source.body.data[0]._source.body.video"
              color="black"
              type="video/mp4"
            />
            <q-btn
              flat
              @click="playis(item._source.body.data[0]._id[0])"
              icon="mdi-play"
              color="grey"
              class="mt20p"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://static.yamoney.ru/checkout-js/v1/checkout.js"></script>
<script>
import http from "../../http-common";

export default {
  name: "PageIndex",
  components: {},

  data() {
    return {
      yad: false,
      order_id: 0,
      deposit_dialog: false,
      amount_deposit: null,
      bal: 0,
      podpis: 0,
      name: localStorage.getItem("username"),
      vidos: [],
      columns: [
        { name: "amount", align: "center", label: "Кол-во", field: "amount" },
        { name: "price", align: "center", label: "Цена", field: "price" },
        { name: "curr", align: "center", label: "Валюта", field: "curr" },
        { name: "summ", align: "center", label: "Сумма", field: "summ" }
      ],
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
          "x-access-token": localStorage.getItem("token")
        }
      }).then(response => {
        console.log(response);
      });
    }
  },
  */
  mounted() {
    http({
      method: "get",
      url: "/search_by_id_user",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        username: localStorage.getItem("username")
      }
    }).then(response => {
      console.log(response.data[0]._source.body.data[0]);
      this.vidos = response.data;
    });
    http({
      method: "get",
      url: "/balance",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then(response2 => {
      this.bal = response2.data.balance;
    });
  },
  methods: {
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
        this.dataschet = [
          {
            amount: this.amount_deposit,
            price: 1,
            curr: "RUB",
            summ: this.amount_deposit
          }
        ];

        console.log(response2.data);
      });
    },
    deposit() {
      this.deposit_dialog = true;
    },
    logout() {
      http({
        method: "get",
        url: "/logout",
        headers: {
          "x-access-token": localStorage.getItem("token")
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
<style >
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
</style>>
