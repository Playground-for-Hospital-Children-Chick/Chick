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
    userType: null,
    userAge: null,
    userBirth: null,
    userSex: null,
    accessToken: null,
    expireTime: null,
    attendanceDay: null,
    login: false,
  },
  reducers: {
    SET_USER: (state, action) => {
      console.log("SET_USER");
      state.userEmail = action.payload.userEmail;
      state.userChName = action.payload.userChName;
      state.userType = action.payload.userType;
      state.userAge = action.payload.userAge;
      state.userBirth = action.payload.userBirth;
      state.userSex = action.payload.userSex;
      state.attendanceDay = action.payload.attendanceDay;
      state.login = true;
    },
    DELETE_USER: (state) => {
      console.log("DELETE_USER");
      state.userEmail = null;
      state.userChName = null;
      state.userType = null;
      state.userAge = null;
      state.userBirth = null;
      state.userSex = null;
      state.attendanceDay = null;
      state.login = false;
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
