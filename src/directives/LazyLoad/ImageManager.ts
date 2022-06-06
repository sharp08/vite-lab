import { State } from "../LazyLoad/State";

interface IImageManagerOptions {
  el: HTMLElement;
  src: string;
  loadingSrc: string;
  errorSrc: string;
  cache: Set<string>;
}

export class ImageManager {
  el: HTMLElement;
  src: string;
  state: number;
  loadingSrc: string;
  errorSrc: string;
  cache: Set<string>;
  isIntersecting: boolean;

  constructor(options: IImageManagerOptions) {
    this.el = options.el;
    this.src = options.src;
    this.loadingSrc = options.loadingSrc;
    this.errorSrc = options.errorSrc;
    this.cache = options.cache;

    this.state = State.loading;
    this.isIntersecting = false;

    // 实例化时，默认加载 loadingSrc 图片
    this.render(this.loadingSrc);
  }
  render(src: string): void {
    this.el.setAttribute("src", src);
  }
  renderSrc(): void {
    imgSrcPreCheck(this.src)
      .then(() => {
        this.state = State.loaded;
        this.render(this.src);
        this.cache.add(this.src); //  加载成功，缓存地址
      })
      .catch(e => {
        this.state = State.error;
        this.render(this.errorSrc); //  使用加载失败专用图片
        console.warn(`image.src = ${this.src}`);
      });
  }
  // 加载图片
  load(): void {
    if (this.state !== State.loading) return;
    // 如果当前 src 已经缓存，证明这是合法图片地址
    if (this.cache.has(this.src)) {
      this.render(this.src); //  加载 src
      this.state = State.loaded; //  修改实例加载状态
      return;
    }
    // 如果没缓存，经过需要判断一下是否为合法的 src 地址
    this.renderSrc();
  }
  // 更新图片地址
  update(src: string): void {
    if (src === this.src) return;
    this.src = src;
    this.state = State.loading;
    // 初始图片地址为异步时，会进入本函数
    // 此时需要判断图片是否在可视区，只有在可视区的图片需要加载
    if (this.isIntersecting) this.load();
  }
}

// 判断一下是否为合法的图片地址
function imgSrcPreCheck(src: string): Promise<unknown> {
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
