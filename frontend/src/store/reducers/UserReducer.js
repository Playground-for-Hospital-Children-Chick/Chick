//로그인이 되면 해당 유저의 개인정보를 포함하는 리덕스 상태관리

//refreshToken이 만료 되기 전에

//로그아웃이 되면 해당 유저의 개인정보를 포함하는 리덕스를 전부 초기화
import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const asyncLoginAxios = createAsyncThunk(
  "/auth/login",
  async (email, password) => {
    const resp = await axios.post(
      BASE_URL + "/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log(resp);
    console.log(resp.data);
    return resp.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    userChName: null,
    accessToken: null,
    expireTime: null,
  },
  // reducers: {
  // SET_USER: (state, action) => {
  //   state.userEmail = action.payload.userEmail;
  //   state.userChName = action.payload.userChName;
  // },
  // DELETE_USER: (state) => {
  //   state.userEmail = null;
  //   state.userChName = null;
  // },
  // SET_TOKEN: (state, action) => {
  //   state.accessToken = action.payload.accessToken;
  //   state.expireTime = action.payload.expireTime;
  // },
  // DELETE_TOKEN: (state) => {
  //   state.accessToken = null;
  //   state.expireTime = null;
  // },
  // },
  extraReducers: (builder) => {
    builder.addCase(asyncLoginAxios.fulfilled, (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userChName = action.payload.userChName;
      state.accessToken = action.payload.accessToken;
      state.expireTime = action.payload.expireTime;
    });
  },
});

export const { SET_USER, DELETE_USER, SET_TOKEN, DELETE_TOKEN } =
  userSlice.actions;

// export const selectEmail = (state) => state.user.email;
// export const selectUsername = (state) => state.user.username;

export { asyncLoginAxios };
export default { userSlice };
