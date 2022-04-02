// 可以拓展全局变量的类型和方法
// 这个文件的 ILog 无法被全局识别

interface ILog {
  (...rest: unknown[]): void;
}

declare global {
  interface Window {
    log: {
      r: ILog;
      o: ILog;
      d: ILog;
      g: ILog;
      b: ILog;
    };
  }
  // Console 上可以添加一个属性 aaa 必须是字符串类型
  interface Console {
    aaa: string;
  }
}

export {};
