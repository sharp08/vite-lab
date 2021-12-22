
<template>
  <Card class="login-form-container">
    <input
      class="ipt form-item"
      v-model="form.account"
      type="text"
      placeholder="账号"
    />
    <input
      class="ipt form-item"
      type="placeholder"
      v-model="form.password"
      placeholder="密码"
    />
    <button class="btn form-item" @click="handleLogin">登录</button>
  </Card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

import { isEmpty } from "@/utils";
import { Notice } from "@/components/global/Notice";

interface IForm {
  account: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  setup() {
    let form = reactive<IForm>({
      account: "",
      password: "",
    });
    const $router = useRouter();
    const handleLogin = () => {
      if (isEmpty(form.account) && isEmpty(form.password)) {
        Notice.error("请输入账号密码");
        return;
      }
      sessionStorage.setItem("loginInfo", JSON.stringify(form));
      Notice.success("登录成功");
      $router.push({ name: "main" });
    };
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
