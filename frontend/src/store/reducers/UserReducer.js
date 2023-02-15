{
  /* 
최초 작성자: 김민준
수정 작성자: 최정온
최초 작성일: 23.02.08
수정 작성일: 23.02.09

Ver 1.0.0

- 사용 예시:
<CommonBtn
text="버튼 이름"
color="버튼 색깔"
onClick={() => console.log("Clicked")}
/> 

- 버튼 색깔
default="blue"
종류: "white, pink, blue, yellow emerald"
*/
}
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
    profilePath: "/assets/characters/chick_01.svg",
  },
  reducers: {
    SET_USER: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userChName = action.payload.userChName;
      state.userType = action.payload.userType;
      state.userAge = action.payload.userAge;
      state.userBirth = action.payload.userBirth;
      state.userSex = action.payload.userSex;
      state.attendanceDay = action.payload.attendanceDay;
      state.login = true;
      state.profilePath = action.payload.profilePath;
    },
    DELETE_USER: (state) => {
      state.userEmail = null;
      state.userChName = null;
      state.userType = null;
      state.userAge = null;
      state.userBirth = null;
      state.userSex = null;
      state.attendanceDay = null;
      state.login = false;
      state.profilePath = "/assets/characters/chick_01.svg";
    },
    SET_TOKEN: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.expireTime = today.getTime() + 3600000;
    },
    DELETE_TOKEN: (state) => {
      state.accessToken = null;
      state.expireTime = null;
    },
    SET_PROFILE_PATH: (state, action) => {
      state.profilePath = action.payload.profilePath;
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, () => initialState);
    },
  },
});

export const {
  SET_USER,
  DELETE_USER,
  SET_TOKEN,
  DELETE_TOKEN,
  SET_PROFILE_PATH,
} = userSlice.actions;

export default { userSlice };
