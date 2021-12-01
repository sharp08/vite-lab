import type { Module } from "vuex";

import { IRootState } from "@/store";

export interface ISubModuleState {
  count: number;
}

const store: Module<ISubModuleState, IRootState> = {
  namespaced: true,
  state: {
    count: 999
  }
};

export default store;
