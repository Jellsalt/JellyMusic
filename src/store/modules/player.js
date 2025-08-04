import { createSlice } from "@reduxjs/toolkit";

const playerStore = createSlice({
  name: "player",
  initialState: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isMuted: false
  },
  // 同步修改方法
  reducers: {
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    setIsMuted(state, action) {
      state.isMuted = action.payload;
    }
  },
});

const { setIsPlaying, setCurrentTime, setDuration, setVolume, setIsMuted } = playerStore.actions;
const playerReducer = playerStore.reducer;

export { setIsPlaying, setCurrentTime, setDuration, setVolume, setIsMuted };
export default playerReducer;
