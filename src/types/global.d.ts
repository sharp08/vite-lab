// 可以拓展全局变量的类型和方法
// 这个文件的 ILog 无法被全局识别

interface ILogFn {
  (...rest: unknown[]): void;
}

declare global {
  // Console 上可以添加一个属性 aaa 必须是字符串类型
  interface Console {
    aaa: string;
    r: ILogFn;
    o: ILogFn;
    d: ILogFn;
    g: ILogFn;
    b: ILogFn;
  }
}

// 不能删除，删了 import { xxx } from 'vue' 会报错
export {};
