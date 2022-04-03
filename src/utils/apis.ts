import { Notice } from "@/components/global/Notice";

import http from "./http";

const classLog: ClassDecorator = target => {
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
      console.b("调用延迟执行");
      setTimeout(() => {
        console.r("执行");
        method();
      }, duration);
    };
  };
}

// 指定 alapi 返回的数据格式
interface IAlapi {
  "/soul": {
    req: { format: string; token: string };
    res: { content: string };
  };
}
const alApiToken = "DBvTCreZo8Jedv3Q";

@classLog
class Apis {
  @delayDctr(3000)
  getName() {
    return fetch(`http://localhost:3333/get`);
  }
  getAge() {
    return fetch(`http://localhost:3333/get`);
  }
  // 心灵毒鸡汤
  async getPoisonousChickenSoup(
    params: IAlapi["/soul"]["req"] = {
      format: "json",
      token: alApiToken
    }
  ) {
    const { code, data, msg } = await http.get<IAlapi["/soul"]["res"]>(
      `https://v2.alapi.cn/api/soul`,
      { params }
    );
    if (code === 200) return data;
    else Notice.error(msg);
  }
}

const apis = new Apis();

export { apis };
