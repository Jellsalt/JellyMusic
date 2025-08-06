import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./modules/song";
import playerReducer from "./modules/player";
import userReducer from "./modules/user";
const store = configureStore({
  reducer: {
    song: songReducer,
    player: playerReducer,
    user: userReducer,
  },
});

export default store;
