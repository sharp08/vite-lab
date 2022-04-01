
<template>
  <div class="login-bg">
    <Card class="login-form-container">
      <input class="ipt form-item" type="placeholder" v-model="form.password" autofocus />
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

import { Notice } from "@/components/global/Notice";

export default defineComponent({
  name: "Login",
  setup() {
    let form = reactive({
      password: "",
    });
    const $router = useRouter();

    // 登录
    const handleLogin = () => {
      const pwd = dayjs().format("HHmm")
      console.log(form.password)
      if (form.password !== pwd) {
        Notice.error("密码错误");
        form.password = ""
        return;
      }

      sessionStorage.setItem("loginInfo", JSON.stringify(form));
      Notice.success("登录成功");
      $router.push({ name: "main" });
    };

    const keyEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };
    onMounted(() => {
      document.documentElement.addEventListener("keyup", keyEvent, false);
    });
    onBeforeUnmount(() => {
      document.documentElement.removeEventListener("keyup", keyEvent);
    });
    return {
      handleLogin,
      form,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Login.less);
</style>
