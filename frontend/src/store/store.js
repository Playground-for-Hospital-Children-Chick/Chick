import { configureStore } from "@reduxjs/toolkit";
// import { AuthReducer } from "./reducers/AuthReducer";
import { persistReducer, PAUSE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./../store/reducers/UserReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  User: userSlice.reducer,
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
      // }).concat(logger),
    }),
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
