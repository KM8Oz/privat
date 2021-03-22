<template>
    <div v-if="$q.platform.is.desktop"
    class="fit absolute"
    >
    <PrivatChat />
    </div>
    <div v-else>
    <PrivatChatmobile/>
    </div>
</template>
<script>
import PrivatChat from "./desktop/privatechat.vue";
import PrivatChatmobile from "./mobile/privatechat.vue";
export default {
    name:"videoChat",
    components:{
        PrivatChat,
        PrivatChatmobile
    }
}
</script>
<style lang="">
    
</style>