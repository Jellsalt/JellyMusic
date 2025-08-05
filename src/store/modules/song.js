import { createSlice } from "@reduxjs/toolkit";
import { getSongUrl, getSongDetail } from "@/apis";
const songStore = createSlice({
  name: "song",
  initialState: {
    id: 2732266405,
    url: "http://m801.music.126.net/20250806021821/b767832a46723a9bd3d4f8f7637cc646/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/61264712521/a21a/bedb/3f3d/a52416cf5212ab42e4b14bb5ca6901cb.mp3?vuutv=NvJVRrjt8T8HfJCu9kDyhAkkbHMO20d5BqzX12PggyhRoi4U89lZ80JyNcXK/Kytpc8CfdvzJQ7mB/HsutOhbAWF3Em2IZDSDXCpDI1zxIJtUFZF4qAgVz6htC0aufO7YPsWvtZ9w4HcwpiZGZMhMY7++y5tlIDYqxB6GIW336g=",
    cover:
      "https://p2.music.126.net/fJ3D_ImycNLVBNd7etJwag==/109951171590452076.jpg",
    artist: "喻言",
    title: "Crush",
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
      console.log("正在获取歌曲URL, ID:", id);
      const res = await getSongUrl(id);
      console.log("获取歌曲URL响应:", res);
      // 验证响应数据格式
      if (
        res.data &&
        res.data.data &&
        res.data.data.length > 0 &&
        res.data.data[0].url
      ) {
        const url = res.data.data[0].url;
        console.log("成功获取歌曲URL:", url);
        dispatch(setSongUrl(url));
      } else {
        console.error("获取歌曲URL失败: 响应数据格式不正确");
        // 设置默认网络URL
        dispatch(
          setSongUrl(
            "http://m701.music.126.net/20250802173652/835c2da530e829b06083bcbe4fa81bb8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/61266707431/b872/cdaf/25cb/c07134c64ef10356c57f99f49c82578f.mp3?vuutv=iqQK/zS1m36CAnFLV2+8aj1BlAv2lUzf2g6CABsTYu4dKPvxuWBKx9/Mj2n3BtUTzK3Ok1GKjdcAy3fzq3IN7GrIshcfWH7oencDKrrAGvUHd4ZLxX3g+7/Wb3QL7cG0CPEbYRRhKu1tcEQn+AgjFZwo21mGxSYc1ENXYXUgFxo="
          )
        );
      }
    } catch (error) {
      console.error("获取歌曲URL异常:", error);
      // 设置默认网络URL
      dispatch(
        setSongUrl(
          "http://m701.music.126.net/20250802173652/835c2da530e829b06083bcbe4fa81bb8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/61266707431/b872/cdaf/25cb/c07134c64ef10356c57f99f49c82578f.mp3?vuutv=iqQK/zS1m36CAnFLV2+8aj1BlAv2lUzf2g6CABsTYu4dKPvxuWBKx9/Mj2n3BtUTzK3Ok1GKjdcAy3fzq3IN7GrIshcfWH7oencDKrrAGvUHd4ZLxX3g+7/Wb3QL7cG0CPEbYRRhKu1tcEQn+AgjFZwo21mGxSYc1ENXYXUgFxo="
        )
      );
      return error;
    }
  };
};

const fetchSongInfo = (id) => {
  return async (dispatch) => {
    try {
      console.log("正在获取歌曲信息, ID:", id);
      const res = await getSongDetail(id);
      console.log("获取歌曲信息响应:", res);
      // 验证响应数据格式
      if (res.data && res.data.songs && res.data.songs.length > 0) {
        dispatch(setInfo(res.data.songs[0]));
      } else {
        console.error("获取歌曲信息失败: 响应数据格式不正确");
        dispatch(setInfo({}));
      }
    } catch (error) {
      console.error("获取歌曲信息异常:", error);
      dispatch(setInfo({}));
      return error;
    }
  };
};

export { setId, fetchUrl, fetchSongInfo };
export default songReducer;
