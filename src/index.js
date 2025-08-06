import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { AudioProvider } from "./contexts/AudioContext";
import { SearchProvider } from "./contexts/SearchContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AudioProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </AudioProvider>
  </Provider>
);
