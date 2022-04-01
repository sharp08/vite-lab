type WebSocketSendType = WebSocket["send"]; // 拿到 WebSocket 中 send 成员的类型
// 拿到函数参数类型
// 方式1：
type GetSendArgType<T> = T extends (arg: infer P) => void ? P : never; //  获取函数的第一个参数类型
type SendArgType = GetSendArgType<WebSocketSendType>;
// 方式2
// type SendArgType = Parameters<WebSocketSendType>[0];

interface IOptions {
  url: string;
  pingInterval?: number; //  心跳检测间隔 ms
  pongInterval?: number; //  上一次发送心跳信息后，等待响应的时间
}

export class Ws {
  inst: WebSocket; //  原生 WebSocket 实例
  onOpen: (event: Event) => void;
  onMessage: (event: MessageEvent) => void;
  onClose: (event: CloseEvent) => void;
  onError: (event: Event) => void;
  pingTimer: number; //  心跳检测发送消息 timer
  pongTimer: number; //  心跳检测等待消息 timer
  options: IOptions; //  配置项

  constructor(options: IOptions) {
    let { url, pingInterval = 4000, pongInterval = 2000 } = options;

    this.options = {
      url,
      pingInterval,
      pongInterval
    };

    this.#connect(url);
  }
  // 发送消息
  send(msg: SendArgType) {
    console.log("send:", msg);
    this.inst.send(msg);
    // 主动发送消息后，一段时间内不需要发送检测消息，但响应时间不重置
    // 如果重置响应时间，假如 不断触发 send 导致响应时间无法重置，也就无法知道服务端是否已经收到消息
    window.clearTimeout(this.pingTimer);
    pingFn(this);
  }
  // 关闭连接,如果进入该方法,说明是由外部调用
  close() {
    console.log("手动断开连接");
    this.#isActiveClose = true; //  标识主动关闭
    this.inst.close();
  }
  #isActiveClose: boolean = false; // 标识是否为主动关闭
  // 建立连接
  #connect(url: string) {
    console.log("connect");
    this.inst = new WebSocket(url);
    // 将私有方法放到实例上
    this.inst.onopen = this.#onopen;
    this.inst.onmessage = this.#onmessage;
    this.inst.onclose = this.#onclose;
    this.inst.onerror = this.#onerror;
  }
  // 私有方法，实例无法调用 连接已打开
  #onopen = async (e: Event) => {
    this.onOpen && this.onOpen(e);
    // 连接打开后，等待 pingInterval 后发送检测消息
    await pingFn(this);
    // 发送检测消息后，等待响应
    pongFn(this);
  };
  // 收到消息
  #onmessage = async (e: MessageEvent) => {
    console.log("onMessage", e.data, new Date().getSeconds());
    this.onMessage && this.onMessage(e);
    // 收到消息，重置心跳检测
    window.clearTimeout(this.pingTimer);
    window.clearTimeout(this.pongTimer);
    await pingFn(this);
    pongFn(this);
  };
  // 关闭
  #onclose = async (e: CloseEvent) => {
    // 停止心跳检测
    window.clearTimeout(this.pingTimer);
    window.clearTimeout(this.pongTimer);

    this.onClose && this.onClose(e);
    if (this.#isActiveClose) return;
    // 如果开启了断线重连，则在此处进行重连
    this.#connect(this.options.url);
  };
  // 错误
  #onerror = async (e: Event) => {
    this.onError && this.onError(e);
  };
}

function pingFn(WsInst: Ws) {
  return new Promise((resolve, reject) => {
    WsInst.pingTimer = window.setTimeout(() => {
      console.log("发送心跳请求，ping", new Date().getSeconds());
      WsInst.inst.send("ping");
      resolve(undefined);
    }, WsInst.options.pingInterval);
  });
}

function pongFn(WsInst: Ws) {
  return new Promise((resolve, reject) => {
    WsInst.pongTimer = window.setTimeout(() => {
      console.log("未收到任何响应，断开连接", new Date().getSeconds());
      WsInst.inst.close(); //  如果一定时间内没有收到响应,则关闭连接
      resolve(undefined);
    }, WsInst.options.pongInterval);
  });
}
