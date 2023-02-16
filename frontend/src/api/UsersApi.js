{
  /* 
최초 작성자: 김민준
수정 작성자: 김민준
최초 작성일: 23.01.29
수정 작성일: 23.02.14

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
import axios from "axios";
import cookie from "react-cookies";
import { persistor } from "../../../frontend/src/main";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 게스트 로그인 요청
export const loginGuest = async function guestLogin() {
  const response = await axios({
    method: "post",
    url: BASE_URL + "/auth/loginGuest",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    withCredentials: true,
  });
  return response;
};

// 백으로 로그인 요청
export const loginUser = async function login(credentials) {
  const response = await axios({
    method: "post",
    url: BASE_URL + "/auth/login",
    data: credentials,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    withCredentials: true,
  }).catch((e) => {
    return "errors";
  });
  return response;
};

//백으로 로그아웃 요청
export const logoutUser = async function logout() {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/auth/logout`,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  });

  return response;
};

//임시 비밀번호 요청
export const sendPasswordUser = async function temppassword(credentials) {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/users/find/password`,
    params: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },

    withCredentials: true,
  }).catch((error) => error);

  return response;
};

//이메일 찾기
export const findEmailUser = async function findemail(credentials) {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/users/find/email`,
    params: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },

    withCredentials: true,
  }).catch((error) => error);

  return response;
};

//비밀번호 변경
export const changePWUser = async function changepw(credentials) {
  const response = await axios({
    method: "PUT",
    url: `${BASE_URL}/users/pwd/change`,
    data: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },

    withCredentials: true,
  }).catch((error) => {
    return error;
  });

  return response;
};

//내 정보 변경
export const updateMyInfo = async function updateinfo(credentials) {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/users/updateUserInfo`,
    data: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },

    withCredentials: true,
  }).catch((error) => {
    return error;
  });

  return response;
};

//회원가입
export const signupUser = async function signup(credentials) {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/users/register`,
    data: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  });

  return response;
};

//회원 탈퇴
export const signoutUser = async function signout(credentials) {
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/users`,
    data: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  });

  return response;
};
//이메일 코드 발송
export const sendCodeUser = async function sendcode(credentials) {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/users/emailConfirm`,
    params: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  }).catch((error) => {
    console.dir("이메일확인", error);

    return error.response;
  });

  return response;
};

//코드확인 로직
export const sendCheckCodeUser = async function codecheck(credentials) {
  // console.log("코드발송", credentials);

  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/users/emailToken`,
    params: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  }).catch((error) => {
    return "error";
  });

  return response;
};

//가입된 이메일 확인 로직
export const checkVaildEmail = async function validemail(credentials) {
  // console.log("회원가입 가능한 이메일인지", credentials);

  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/users/distinctemail`,
    params: credentials,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  }).catch((error) => {
    console.dir(error.response);
    return error.response;
  });

  return response;
};
