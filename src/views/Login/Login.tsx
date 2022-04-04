// 外部的
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

// 工程级的
import { apis } from "@/utils/apis";

// 组件级的
import ms from "./Login.module.less";

export default defineComponent({
  name: "Login",
  setup() {
    const $router = useRouter();
    const text = ref<string>();

    const keyEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        $router.push({ name: "main" });
      }
    };

    // 获取毒鸡汤
    async function getSoup() {
      const { content } = await apis.getPoisonousChickenSoup();
      text.value = content || "纵有疾风起";
    }

    onMounted(() => {
      getSoup();
      document.documentElement.addEventListener("keyup", keyEvent, false);
    });
    onBeforeUnmount(() => {
      document.documentElement.removeEventListener("keyup", keyEvent);
    });
    return () => (
      <div class={ms["login"]} onDblclick={getSoup}>
        {/* 必须静音才能自动播放 */}
        <video
          class={ms["bg"]}
          src="/media/bg2.mp4"
          autoplay
          muted
          loop
        ></video>
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
