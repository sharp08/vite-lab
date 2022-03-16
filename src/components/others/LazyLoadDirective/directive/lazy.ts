import { DirectiveBinding, App } from "vue";
import { State } from "./State";
import { ImageManager } from "./ImageManager";

const DEFAULT_URL =
  "data:image/ico;base64,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";

interface ILazyOptions {
  loading?: string;
  error?: string;
  [propName: string]: unknown;
}

class Lazy {
  managerQueue: ImageManager[];
  loading: string;
  error: string;
  cache: Set<string>;
  observer: IntersectionObserver;

  // 实例化
  constructor(options: ILazyOptions) {
    this.managerQueue = [];
    this.initIntersectionObserver();

    this.loading = options.loading || DEFAULT_URL;
    this.error = options.error || DEFAULT_URL;

    this.cache = new Set();
  }
  // 每个用到指令的 dom 挂载时调用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const src = binding.value;

    // 创建图片管理器，每个用到指令的地方都有自己的实例
    const manager = new ImageManager({
      el,
      src,
      loading: this.loading,
      error: this.error,
      cache: this.cache
    });

    // 存入全局管理器队列
    this.managerQueue.push(manager);
    // 观察挂载的 dom 节点
    this.observer.observe(el);
  }
  // 实例化 Lazy 时调用，创建全局监听器
  // 创建过程仅执行一次，回调会多次执行
  initIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // 如果某个元素处于可视区，去图片管理器队列中寻找
          if (entry.isIntersecting) {
            const manager = this.managerQueue.find(manager => {
              return manager.el === entry.target;
            });
            // 如果找到
            if (manager) {
              // 如果已经加载过了，则从管理器队列中移除
              if (manager.state === State.loaded) {
                this.removeManager(manager);
                return;
              }
              // 如果还没加载过，则进行加载
              manager.load();
            }
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0
      }
    );
  }
  removeManager(manager: ImageManager): void {
    const index = this.managerQueue.indexOf(manager);
    if (index > -1) {
      this.managerQueue.splice(index, 1);
    }
    if (this.observer) {
      this.observer.unobserve(manager.el);
    }
  }
  remove(el: HTMLElement): void {
    const manager = this.managerQueue.find(manager => {
      return manager.el === el;
    });
    if (manager) {
      this.removeManager(manager);
    }
  }
  update(el: HTMLElement, binding: DirectiveBinding) {
    const src = binding.value;
    const manager = this.managerQueue.find(manager => {
      return manager.el === el;
    });
    if (manager) {
      manager.update(src);
    }
  }
}

export const lazyPlugin = {
  install(app: App, options: ILazyOptions) {
    const lazy = new Lazy(options);

    app.directive("lazy", {
      mounted: lazy.mounted.bind(lazy),
      beforeUnmount: lazy.remove.bind(lazy),
      updated: lazy.update.bind(lazy)
    });
  }
};
