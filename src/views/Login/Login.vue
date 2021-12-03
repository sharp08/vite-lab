
<template>
  <Card class="login-form-container">
    <input class="ipt form-item" type="text" placeholder="账号" />
    <input class="ipt form-item" type="placeholder" placeholder="密码" />
    <button class="btn form-item" @click="handleLogin">登录</button>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const $router = useRouter();
    const handleLogin = () => {
      $router.push({ name: "main" });
    };
    return {
      handleLogin,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Login.less);
</style>
