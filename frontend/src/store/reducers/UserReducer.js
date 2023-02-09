//로그인이 되면 해당 유저의 개인정보를 포함하는 리덕스 상태관리

//refreshToken이 만료 되기 전에

//로그아웃이 되면 해당 유저의 개인정보를 포함하는 리덕스를 전부 초기화
import { createSlice } from "@reduxjs/toolkit";

const today = new Date();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    userChName: null,
    accessToken: null,
    expireTime: null,
  },
  reducers: {
    SET_USER: (state, action) => {
      console.log("SET_USER");
      state.userEmail = action.payload.userEmail;
      state.userChName = action.payload.userChName;
    },
    DELETE_USER: (state) => {
      console.log("DELETE_USER");
      state.userEmail = null;
      state.userChName = null;
    },
    SET_TOKEN: (state, action) => {
      console.log("SET_TOKEN");
      state.accessToken = action.payload.accessToken;
      state.expireTime = today.getTime() + 3600000;
    },
    DELETE_TOKEN: (state) => {
      console.log("DELETE_TOKEN");
      state.accessToken = null;
      state.expireTime = null;
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, () => initialState);
    },
  },
});

export const { SET_USER, DELETE_USER, SET_TOKEN, DELETE_TOKEN } =
  userSlice.actions;

export default { userSlice };
