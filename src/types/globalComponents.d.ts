import Card from "@/components/global/Card";

// 当鼠标悬停在 .vue 文件 Card 组件上时，可以显示类型
declare module "vue" {
  export interface GlobalComponents {
    Card: typeof Card;
  }
}

// 全局组件在 .tsx 文件下会报错，暂时用 @ts-ignore 压制
// declare let Card: any;

// export {};
