import type { Module } from "vuex";

import { IRootState } from "@/store";

export interface ISubSubModuleState {
  count: number;
}

const store: Module<ISubSubModuleState, IRootState> = {
  namespaced: true,
  state: {
    count: 999999999
  }
};

export default store;
