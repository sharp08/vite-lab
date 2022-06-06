// 外部的
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

// 工程级的
import { apis } from "@/utils/apis";
import createFlowLine from "@/assets/js/flowLine";

// 组件级的
import ms from "./Login.module.less";

export default defineComponent({
  name: "Login",
  setup() {
    const $router = useRouter();
    const text = ref<string>();

    sessionStorage.setItem("login", "");
    const keyEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        sessionStorage.setItem("login", "true");
        $router.push({ name: "main" });
      }
    };

    // 获取毒鸡汤
    async function getSoup() {
      // todo 拆解成通用方法
      const { content = "纵有疾风起" } = await apis.getPoisonousChickenSoup();

      let i = 0;
      let timer = setInterval(() => {
        i++;
        if (i <= content.length) {
          text.value = content.slice(0, i);
        } else {
          clearInterval(timer);
        }
      }, 100);
    }

    // 创建背景图
    createFlowLine();

    onMounted(() => {
      getSoup();

      document.documentElement.addEventListener("keyup", keyEvent, false);
    });
    onBeforeUnmount(() => {
      document.documentElement.removeEventListener("keyup", keyEvent);
    });
    return () => (
      <div class={ms["login"]} onDblclick={getSoup}>
        {/* 背景 */}
        <canvas id="webgl-canvas"></canvas>
        {/* 卡片 */}
        <Card backdrop class={ms["form-container"]} v-draggable>
          <span style="text-align:center;font-size:26px">
            <i style="font-size:40px" class="iconfont icon-baojiaquotation2" />
            {text.value}
            <i style="font-size:40px" class="iconfont icon-baojiaquotation" />
          </span>
        </Card>
      </div>
    );
  }
});
