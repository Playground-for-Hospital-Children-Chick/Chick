//로그인이 되면 해당 유저의 개인정보를 포함하는 리덕스 상태관리

//refreshToken이 만료 되기 전에

//로그아웃이 되면 해당 유저의 개인정보를 포함하는 리덕스를 전부 초기화

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectEmail = (state) => state.user.email;
export const selectUsername = (state) => state.user.username;

export default userSlice;
