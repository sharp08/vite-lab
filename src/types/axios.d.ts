// 灰色也不能删掉
import axios from "axios";

// AxiosResponse 定义是没有 code 的，这就导致取 code 值会报错，在这里通过扩展添加 code
declare module "axios" {
  interface IAxios {
    code: number;
    [propName: string]: any;
  }
  export interface AxiosResponse extends IAxios {}
}
