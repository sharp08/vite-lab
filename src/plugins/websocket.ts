type WebSocketSendType = WebSocket["send"]; // 拿到 WebSocket 中 send 成员的类型
type GetSendArgType<T> = T extends (arg: infer P) => void ? P : never; //  获取函数的第一个参数类型
type SendArgType = GetSendArgType<WebSocketSendType>; //  拿到参数类型

export class Ws {
  inst: WebSocket;
  onOpen: (event: Event) => void;
  onMessage: (event: MessageEvent) => void;
  onClose: (event: CloseEvent) => void;
  onError: (event: Event) => void;

  constructor(url: string) {
    this.connect(url);
  }
  // 建立连接
  connect(url: string) {
    this.inst = new WebSocket(url);
    this.inst.onopen = this.#onopen;
    this.inst.onmessage = this.#onmessage;
    this.inst.onclose = this.#onclose;
    this.inst.onerror = this.#onerror;
  }
  send(msg: SendArgType) {
    console.log("send:", msg);
    this.inst.send(msg);
  }
  close() {
    console.log("close!!!!");
    this.inst.close();
  }
  // 私有属性，实例无法调用 连接已打开
  #onopen = (e: Event) => {
    this.onOpen && this.onOpen(e);
  };
  // 收到消息
  #onmessage = (e: MessageEvent) => {
    this.onMessage && this.onMessage(e);
  };
  // 关闭
  #onclose = (e: CloseEvent) => {
    this.onClose && this.onClose(e);
  };
  // 错误
  #onerror = (e: Event) => {
    this.onError && this.onError(e);
  };
}
