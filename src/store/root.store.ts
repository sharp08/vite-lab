import { defineStore } from "pinia";

export const useRootStore = defineStore("root", {
  state: () => ({
    name: "刘英",
    age: 12
  }),
  getters: {
    double: state => state.age * 2,
    doublePlus() {
      return this.double + 1;
    }
  },
  actions: {
    addAge() {
      this.age++;
    }
  }
});
