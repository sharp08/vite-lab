import type { App, Plugin } from "vue";
import { qs } from "./qs";

const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) app.config.globalProperties[alias] = component;
  };
  return comp as T & Plugin;
};

const isEmpty = (val: any): boolean => {
  return val === null || val === undefined || val?.length === 0;
};

const setSession = (key, value) => {
  sessionStorage.setItem(key, value);
};

/**
 * @description: 生成区间随机数
 * @param {Number} min  最小值（包含）
 * @param {Number} max  最大值（包含）
 * @param {Number} keep 保留小数位数
 * @return: 随机数
 */
const RANDOM = (
  min: number = 0,
  max: number = 10,
  keep: number = 0
): number => {
  const pow = 10 ** keep; //  ES7 代替 Math.pow() 方法，性能更好
  const rdm = Math.random() * (max - min) + min;
  const r = Math.round(rdm * pow) / pow;
  return r;
};

export { withInstall, isEmpty, RANDOM, qs };
