import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

interface IMenuList {
  name: string;
}

const useMenu = () => {
  let showMenu = ref<boolean>(false);
  let timer;
  const handleMouseEnter = () => {
    if (timer) clearTimeout(timer);
    showMenu.value = true;
  };
  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      showMenu.value = false;
    }, 500);
  };
  return {
    showMenu,
    handleMouseEnter,
    handleMouseLeave
  };
};

const useMenuItem = () => {
  const $router = useRouter();
  const menuList = reactive<IMenuList[]>([
    {
      name: "退出登录"
    },
    {
      name: "lalala"
    }
  ]);

  const handleMenuItem = (e: MouseEvent) => {
    const menuName = (e.target as HTMLElement).dataset.name;

    if (menuName === "退出登录") {
      $router.push({ name: "login", replace: true });
      sessionStorage.removeItem("loginInfo");
    }
  };

  return {
    menuList,
    handleMenuItem
  };
};

export { useMenu, useMenuItem };
