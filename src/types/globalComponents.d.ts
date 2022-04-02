// 当鼠标悬停在 .vue 文件 Card 组件上时，可以显示类型
declare module "vue" {
  export interface GlobalComponents {    
    Card: typeof import("@/components/global/Card")["default"];
    RouterView: typeof import("vue-router")["RouterView"];
  }
}

// 全局组件在 .tsx 文件下会报错，暂时用 @ts-ignore 压制
// declare let Card: any;

export {};
