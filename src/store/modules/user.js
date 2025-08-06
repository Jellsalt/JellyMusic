import { createSlice } from "@reduxjs/toolkit";
import { removeToken, setToken as _setToken, getToken } from "@/utils";
import { getProfileAPI, loginPassAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;
const userReducer = userStore.reducer;

// 异步方法 完成登录获取 token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送异步请求
    try {
      const res = await loginPassAPI(loginForm);
      // 提交同步 action 进行 token 的存入
      dispatch(setToken(res.data.data.token));
    } catch (error) {
      return error;
    }
  };
};

const fetchUserInfo = () => {
  return async (dispatch) => {
    // 发送异步请求
    try {
      const res = await getProfileAPI();
      // 提交同步 action 进行 token 的存入
      dispatch(setUserInfo(res.data.data));
    } catch (error) {
      return error;
    }
  };
};

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo };
export default userReducer;
