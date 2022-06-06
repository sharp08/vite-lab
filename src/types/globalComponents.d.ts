// 当鼠标悬停在 .vue 文件 Card 组件上时，可以显示类型
declare module "vue" {
  export interface GlobalComponents {    
    Card: typeof import("@/components/global/Card")["default"];
    // 不使用 jsx 时需要如下开启确保 template 不报错
    // RouterView: typeof import("vue-router")["RouterView"];
  }
}

export {};
