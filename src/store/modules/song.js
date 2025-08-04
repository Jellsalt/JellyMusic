import { createSlice } from "@reduxjs/toolkit";
import { getSongUrl, getSongDetail } from "@/apis";
const songStore = createSlice({
  name: "song",
  initialState: {
    id: 0,
    url: "http://m701.music.126.net/20250802173652/835c2da530e829b06083bcbe4fa81bb8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/61266707431/b872/cdaf/25cb/c07134c64ef10356c57f99f49c82578f.mp3?vuutv=iqQK/zS1m36CAnFLV2+8aj1BlAv2lUzf2g6CABsTYu4dKPvxuWBKx9/Mj2n3BtUTzK3Ok1GKjdcAy3fzq3IN7GrIshcfWH7oencDKrrAGvUHd4ZLxX3g+7/Wb3QL7cG0CPEbYRRhKu1tcEQn+AgjFZwo21mGxSYc1ENXYXUgFxo=",
    cover:
      "https://y.qq.com/music/photo_new/T002R300x300M000001R6tiK4PNAEo_1.jpg?max_age=2592000",
    artist: "喻言",
    title: "Oh Tell Me Why",
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
      console.log(res);
      dispatch(setInfo(res.data.songs[0]));
    } catch (error) {
      console.error("获取歌曲信息失败:", error);
      return error;
    }
  };
};

export { setId, fetchUrl, fetchSongInfo };
export default songReducer;
