// ws 文档 https://github.com/websockets/ws
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({
  port: 8888
});
wss.on("connection", (ws, req) => {
  console.log("客户端已连接：", req.socket.remoteAddress);
  ws.on("message", data => {
    console.log(Object.prototype.toString.call(data))
    console.log("收到客户端发送的消息：", data.toString());
  });
  ws.send("我是服务端"); // 向当前客户端发送消息
});
