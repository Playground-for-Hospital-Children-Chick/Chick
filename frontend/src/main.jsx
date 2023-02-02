import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

import "./index.css";
import { createStore } from "redux";

import { ClickToComponent } from "click-to-react-component";
import { CookiesProvider } from "react-cookie";

import { Provider } from "react-redux";
import store from "./store";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
      <ClickToComponent />
    </CookiesProvider>
  </React.StrictMode>
);
