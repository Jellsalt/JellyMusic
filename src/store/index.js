import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./modules/song";
import playerReducer from "./modules/player";
const store = configureStore({
  reducer: {
    song: songReducer,
    player: playerReducer,
  },
});

export default store;
