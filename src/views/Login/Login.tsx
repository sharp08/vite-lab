import { defineComponent, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

import { Notice } from "@/components/global/Notice";

import ms from "./Login.module.less";

export default defineComponent({
  name: "Login",
  setup() {
    let form = reactive({
      password: ""
    });
    const $router = useRouter();

    // 登录
    const handleLogin = () => {
      const pwd = dayjs().format("HHmm");
      if (form.password !== pwd) {
        Notice.error("密码错误");
        form.password = "";
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
    return () => (
      <div class={ms["login"]}>
        <Card class={ms["form-container"]}>
          <input
            class={ms["form-item"]}
            v-model={form.password}
            autofocus
          />
        </Card>
      </div>
    );
  }
});
