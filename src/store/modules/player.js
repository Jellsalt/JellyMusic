import { createSlice } from "@reduxjs/toolkit";

const playerStore = createSlice({
  name: "song",
  initialState: {
    isPlaying: false,
  },
  // 同步修改方法
  reducers: {
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
  },
});

const { setIsPlaying } = playerStore.actions;
const playerReducer = playerStore.reducer;

export { setIsPlaying };
export default playerReducer;
