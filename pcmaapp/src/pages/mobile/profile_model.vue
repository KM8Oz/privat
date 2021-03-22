
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
    <p>{{alert}}</p>
    <q-dialog v-model="withdialog" class="row">
      <q-card class="bg-white full-width q-pl-sm q-pr-sm">
        <p>Укажите необходимую сумму и валюту для вывода</p>
        <q-select
          class="col-12 q-pt-sm"
          outlined
          v-model="currency"
          :options="options"
          label="Валюта вывода"
        />
        <q-input class="col-12 q-pt-sm" outlined v-model="amount" placeholder="сумма токенов" />
        <q-btn
          color="pink-13"
          class="no-shadow full-width q-mt-sm q-mb-sm"
          @click="requests(bal)"
          label="Вывести"
        ></q-btn>
      </q-card>
    </q-dialog>
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

        <div class="col-4 text-center">
          <p>
            <b class="text-black">{{podpis}}</b>
          </p>
          <p class="text-grey">Подписок</p>
        </div>
        <div class="col-4 text-center">
          <p>
            <b class="text-black">{{podpis}}</b>
          </p>
          <p class="text-grey">Подписчиков</p>
        </div>
        <div class="col-4 text-center">
          <p>
            <b class="text-black">{{podpis}}</b>
          </p>
          <p class="text-grey">Поцелуев</p>
        </div>
        <div class="col-12 text-center">
          <p>
            <b class="text-black">Ваш баланс {{bal}} T</b>
          </p>
          <q-btn
            color="pink-13"
            rounded
            class="no-shadow"
            @click="withdialog = true"
            label="Запросить вывод"
          />
        </div>
      </div>
      <div class="row">
        <div v-for="item in vidos" :key="item.id" class="col-4 q-pl-xs q-pr-xs">
          <div class="bg-black mt10 rounded-borders h100 flex">
            <video
              class="vidoss full-width full-height vertical-middle flex-center"
              :id="item.id[0]"
              :src="item.data[0].video"
              color="black"
              type="video/mp4"
            />
            <q-btn flat @click="playis(item.id[0])" icon="mdi-play" color="grey" class="mt20p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  name: "PageIndex",
  components: {},

  data() {
    return {
      bal: 0,
      podpis: 0,
      name: localStorage.getItem("username"),
      vidos: [],
      currency: null,
      amount: null,
      withdialog: false,
      options: ["RUB", "USD", "EUR", "CNY", "JPN"],
      alert: null
    };
  },
  methods: {
    logout() {
      http({
        method: "get",
        url: "/logout",
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then(response => {
        this.nologin = true;
        this.nnologin = false;
        location.reload();
      });
    },
    requests(i) {
      this.withdialog = false;
      http({
        method: "get",
        url: "/withdraw",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          amount: parseFloat(this.amount),
          currency: this.currency
        }
      }).then(response2 => {
        console.log(response2);
        this.alert = response2.data.status;
        if (response2.data.status == "done") {
          http({
            method: "get",
            url: "/balance",
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
          }).then(response2 => {
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
          "x-access-token": localStorage.getItem("token")
        }
      }).then(response => {
        console.log(response);
      });
    }
  },
  mounted() {
    http({
      method: "get",
      url: "/search_by_id",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        username: localStorage.getItem("username")
      }
    }).then(response => {
      console.log(response.data);
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
