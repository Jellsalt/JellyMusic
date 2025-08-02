import { createSlice } from "@reduxjs/toolkit";
import { getSongUrl, getSongDetail } from "@/apis";
const songStore = createSlice({
  name: "song",
  initialState: {
    id: "",
    url: "https://ws6.stream.qqmusic.qq.com/O400001RtoVO13I1ej.ogg?guid=2333318974&vkey=D03D3B2A0C4997337B19E5DE41114EB0C78B16A112E4EBF5E8101BF80F384CACBF1C008072D60FEC5AE646EF5909E522D13EDE1339120510__v2b94c10f&uin=211135200&fromtag=120532",
    info: {},
  },
  // 同步修改方法
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setSongUrl(state, action) {
      state.url = action.payload;
    },
    setInfo(state, action) {
      console.log("设置歌曲信息:", action.payload);
      state.info = action.payload;
    },
  },
});

const { setId, setSongUrl, setInfo } = songStore.actions;
const songReducer = songStore.reducer;

// 异步方法 获取歌曲 URL
const fetchUrl = (id) => {
  return async (dispatch) => {
    // 发送异步请求
    try {
      const res = await getSongUrl(id);
      // 提交同步 action 进行 token 的存入
      dispatch(setSongUrl(res.data.data[0].url));
    } catch (error) {
      return error;
    }
  };
};

const fetchSongInfo = (id) => {
  return async (dispatch) => {
    try {
      const res = await getSongDetail(id);
      // 提交同步 action 进行歌曲信息的存入
      dispatch(setInfo(res.data.songs[0]));
    } catch (error) {
      console.error("获取歌曲信息失败:", error);
      return error;
    }
  };
};

export { setId, fetchUrl, fetchSongInfo };
export default songReducer;
