 <template >
  
</template>
<script>
import { LocalStorage } from "quasar";
import { Platform } from "quasar";
import { mapState } from 'vuex';
export default {
    props:['model'],
  data() {
    return {
    }
  },
  computed:{
    ...mapState(["pcm"])
  },
  methods: {
    forceRerender(tag) {
      if (pcm.user.tk) {
        this.$router.push("/categories?tag=" + tag);
        setTimeout(() => location.reload(), 300);
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
      if (pcm.user.tk) {
        this.$socket.emit("subscribeControle", {
          sender: pcm.user.id,
          receiver: modelid,
          token: pcm.user.tk,
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
    console.log(this.model)
  },
  sockets: {
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