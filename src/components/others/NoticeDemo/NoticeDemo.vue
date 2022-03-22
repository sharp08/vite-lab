<template>
  <div class="notice-demo-container">
    <button @click="showNotice('info')" class="btn info">info</button>
    <button @click="showNotice('success')" class="btn success">success</button>
    <button @click="showNotice('error')" class="btn error">error</button>
    <button @click="test">test</button>
    <button @click="test2">close</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import { Notice } from "@/components/global/Notice";
import { Ws } from "@/plugins/websocket";

export default defineComponent({
  name: "NoticeDemo",
  setup() {
    const showNotice = (type: string) => {
      Notice[type]({
        content: `${new Date()}`,
      });
    };

    const ws = new Ws({
      url: "ws://localhost:8888",
    });
    ws.onOpen = function (e) {
      // console.log((e.currentTarget as WebSocket).readyState);
    };
    ws.onClose = function (e) {
      // console.log("onClose");
    };
    ws.onMessage = function (e) {
      // console.log(e);
    };
    ws.onError = function (e) {
      // console.log("onError");
    };

    function test() {
      ws.send(new Date().getSeconds() + "");
    }
    function test2() {
      ws.close();
    }
    return {
      showNotice,
      test,
      test2,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./NoticeDemo.less);
</style>
