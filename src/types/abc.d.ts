// 目前的结论是：tsconfig.json 中 include 字段所包含的 xxx.d.ts 文件的声明可以在任意位置直接使用
// 还不清楚 declare 的作用
interface INotice {
  content: string;
  createTime?: number;
  duration?: number;
  type?: string;
}