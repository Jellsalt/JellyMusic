// axios 的封装处理
import axios from "axios";
import { getToken, removeToken } from "./index";

// 1. 根域名配置
// 2. 超时时间
const request2 = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});
// 3. 请求拦截器 / 响应拦截器
// 添加请求拦截器
request2.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = getToken();
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request2.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 监控 401 token 失效
    if (error?.response?.status === 401) {
      // 清除失效 Token，跳转登录
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export { request2 };
