// import Card from "@/components/global/Card";
// 目前的结论是：tsconfig.json 中 include 字段所包含的 xxx.d.ts 文件的声明可以在任意位置直接使用
// 可以被全局识别
interface INotice {
  content: string;
  createTime?: number;
  duration?: number;
  type?: string;
}

// 声明一个全局变量 AAA，此时可以在其他文件中直接打印 AAA，要赋值必须为 string 类型的值
declare let AAA: string;

// 全局组件在 .tsx 文件下会报错，暂时用 @ts-ignore 压制
declare let Card: any;