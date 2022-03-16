import { State } from "./State";

interface IImageManagerOptions {
  el: HTMLElement;
  src: string;
  loading: string;
  error: string;
  cache: Set<string>;
}

export class ImageManager {
  el: HTMLElement;
  src: string;
  state: number;
  loading: string;
  error: string;
  cache: Set<string>;

  constructor(options: IImageManagerOptions) {
    this.el = options.el;
    this.src = options.src;
    this.state = State.loading;
    this.loading = options.loading;
    this.error = options.error;
    this.cache = options.cache;

    // 实例化时，默认加载 loading 图片
    this.render(this.loading);
  }
  render(src: string): void {
    this.el.setAttribute("src", src);
  }
  // 加载图片
  load(): void {
    if (this.state !== State.loading) return;
    // 如果当前 src 是否已经缓存
    if (this.cache.has(this.src)) {
      this.state = State.loaded; //  修改实例加载状态
      this.render(this.src); //  加载 src
      return;
    }
    // 如果没缓存
    this.renderSrc();
  }
  renderSrc(): void {
    loadImage(this.src)
      .then(() => {
        this.state = State.loaded;
        this.render(this.src);
      })
      .catch(e => {
        this.state = State.error;
        this.cache.add(this.src); //  加载失败缓存地址
        this.render(this.error); //  使用加载失败专用图片
        console.warn(
          `load failed with src image(${this.src}) and the error msg is ${e.message}`
        );
      });
  }
  update(src: string): void {
    const currentSrc = this.src;
    if (src !== currentSrc) {
      this.src = src;
      this.state = State.loading;
    }
  }
}

function loadImage(src: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function () {
      resolve(undefined);
      dispose();
    };

    image.onerror = function (e) {
      reject(e);
      dispose();
    };

    image.src = src;

    function dispose(): void {
      image.onload = image.onerror = null;
    }
  });
}
