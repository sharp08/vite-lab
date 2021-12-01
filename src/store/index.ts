import { InjectionKey } from "vue";
import { createStore, useStore as originUseStore } from "vuex";
import type { Store } from "vuex";

// 子模块集成：https://blog.csdn.net/fanweilin0123/article/details/109903447
import subModuleStore, { ISubModuleState } from "./subModule";

export interface IRootState {
  count: number;
}

interface IAllState extends IRootState {
  subModuleStore: ISubModuleState;
}

// 为了让组件中可以在鼠标悬停时显示数据类型
// 根 store 的 key 要给到入口文件 main.ts 中使用
export const key: InjectionKey<Store<IAllState>> = Symbol();

// 创建一个新的 store 实例
export const store = createStore<IRootState>({
  state() {
    return {
      count: 0
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  modules: {
    subModuleStore
  }
});

// 为了组件中使用 useStore 不用再传入 key，但这一样需要引入某个 store 文件的 useStore 感觉本质上没有简化
export function useStore() {
  return originUseStore(key);
}
