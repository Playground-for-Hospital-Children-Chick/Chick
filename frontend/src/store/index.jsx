import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, PAUSE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenReducer from "./Auth";
import userSlice from "./user";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: userSlice.reducer,
  // authToken: tokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
