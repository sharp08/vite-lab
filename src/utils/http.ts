import axios from "axios";

// 获取 token
const getToken = () => "123";

// 创建实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
});

const errMap = {
  400: "请求错误",
  401: "未认证",
  403: "登录过期或未授权",
  404: "地址未找到",
  405: "请求方式错误",
  500: "服务端异常",
  501: "服务器不支持请求的功能",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
  505: "HTTP版本不受支持"
};

// 请求拦截
instance.interceptors.request.use(
  config => {
    let token = getToken();
    if (!token) return config;
    config.headers.Authorization = "Bearer " + token;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  response => {
    const { data, status } = response;
    if (status !== 200) return Promise.reject(data);

    return Promise.resolve(data);
  },
  error => {
    if (error && error.response && error.response.status) {
      const errText = errMap[error.response.status];
      errText ? alert(errText) : alert("其他错误");

      return Promise.reject(error.response);
    }
  }
);

// get
export function get(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params: params ? params : "" })
      .then(resolve)
      .catch(reject);
  });
}

// post
export function post(url, data) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(resolve).catch(reject);
  });
}

export default instance;
