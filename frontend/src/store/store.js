import { configureStore } from "@reduxjs/toolkit";
// import { AuthReducer } from "./reducers/AuthReducer";
import { persistReducer, PERSIST, PURGE } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { userSlice } from "./../store/reducers/UserReducer";
import { pageSlice } from "./../store/reducers/PageReducer";
import { combineReducers } from "redux";
import logger from "redux-logger";

const reducers = combineReducers({
  user: userSlice.reducer,
  page: pageSlice.reducer,
  // authToken: tokenReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }).concat(logger),
});
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
export default store;
