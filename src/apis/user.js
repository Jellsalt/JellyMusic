import { request, request2 } from "@/utils";

// 获取验证码
// phone: {phone: "手机号"}
export function getCodeAPI(phone) {
  return request({
    url: "/captcha/sent",
    method: "GET",
    params: phone,
  });
}

// 登录
// params: {phone: "手机号", captcha: "验证码"}
export function loginAPI(params) {
  console.log(params);
  return request({
    url: "/captcha/verify",
    method: "GET",
    params: params,
  });
}

// 登录状态
export function loginStatusAPI() {
  return request({
    url: "/login/status",
    method: "GET",
  });
}

// 退出登录
export function logoutAPI() {
  return request({
    url: "/logout",
    method: "GET",
  });
}

// 获取账号信息
export function getAccountAPI() {
  return request({
    url: "/user/account",
    method: "GET",
  });
}

// 1. 登录请求
export function loginPassAPI(FormData) {
  return request2({
    url: "/authorizations",
    method: "POST",
    data: FormData,
  });
}
// 2. 获取用户信息
export function getProfileAPI() {
  return request2({
    url: "/user/profile",
    method: "GET",
  });
}
