const log: ClassDecorator = target => {
  //   console.log("log");
};
/**
 * @desc 方法装饰器：延迟执行
 * @param duration 延迟时间
 * @returns
 */
function delayDctr(duration: number) {
  return (
    target: Object, // 被装饰的方法所属的类
    propertyKey: string | symbol, //  被装饰的方法名
    descriptor: PropertyDescriptor //  属性描述
  ) => {
    const method = descriptor.value;
    descriptor.value = function () {
      window.log.b("调用延迟执行");
      setTimeout(() => {
        window.log.r("执行");
        method();
      }, duration);
    };
  };
}

@log
class Apis {
  @delayDctr(3000)
  getName() {
    return fetch(`http://localhost:3333/get`);
  }
  getAge() {
    return fetch(`http://localhost:3333/get`);
  }
}

const apis = new Apis();

export { apis };
