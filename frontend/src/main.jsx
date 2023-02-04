import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

import "./index.css";

import { ClickToComponent } from "click-to-react-component";
import { CookiesProvider } from "react-cookie";

import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import store from "./store/index";

axios.defaults.withCredentials = true;
export let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <ClickToComponent />
    </CookiesProvider>
  </React.StrictMode>
);
