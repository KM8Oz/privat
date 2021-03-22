<template>
  <q-page class="bg-black text-white"></q-page>
</template>

<script>
import http from "../http-common";
import { LocalStorage } from 'quasar';
export default {
  name: "PageIndex",
  data() {
    return {
      item_1: true,
      all: null,
      tags: null,
      comm_text: null,
      comments_text: null
    };
  },
  mounted() {
    http({
      method: "get",
      url: "/videos_rec",
      headers: {
        "x-access-token": LocalStorage.getItem("token")
      }
    }).then(response => {
      this.all = response.data;
    });
  },
  methods: {
    tagss(tag) {
      console.log(tag);
      return String(tag);
    },
    comments(id) {
      console.log(id);
      http({
        method: "get",
        url: "/create_comments",
        headers: {
          "x-access-token": LocalStorage.getItem("token"),
          videoid: id,
          comments: JSON.stringify(this.comm_text),
          username: LocalStorage.getItem("username")
        }
      }).then(response => {
        this.comm_text = null;
      });
    },
    comments_search(id) {
      console.log("ид для поиска:", id);
      http({
        method: "get",
        url: "/comments_search",
        headers: {
          "x-access-token": LocalStorage.getItem("token"),
          videoid: id
        }
      }).then(response => {
        console.log(response.data);
        return response.data;
      });
    }
  }
};
</script>
