const express = require("express");
const cors = require("cors"); // 处理跨域

const app = express();
const PORT = 3333;

// 处理前端请求体
app.use(express.json()); //  json 方式
app.use(express.urlencoded()); //  表单方式
app.use(express.raw()); //  content-type: application/octet-stream
app.use(express.text()); //  content-type: text/plain

// 跨域白名单
const whitelist = ["*"];
// const whitelist = ["http://localhost:8080"];

// 跨域配置项
const corsConfig = {
  origin: function(origin, callback) {
    if (whitelist.includes("*")) {
      callback(null, true);
    } else if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsConfig));

app.get("/get", (req, res) => {
  console.log(`get 请求参数：`, req.query);
  res.json({
    code: 200,
    data: new Date()
  });
});

app.post("/post", (req, res) => {
  console.log(`post 请求参数：${JSON.stringify(req.body)}`);
  res.json({
    code: 200,
    data: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`api 服务已启动 http://localhost:${PORT}`);
});
