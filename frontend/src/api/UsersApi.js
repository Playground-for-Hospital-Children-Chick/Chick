import axios from "axios";
import cookie from "react-cookies";
import { persistor } from "../../../frontend/src/main";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//   SET_USER,
//   SET_TOKEN,
//   DELETE_TOKEN,
// } from "./../../src/store/reducers/UserReducer";

const BASE_URL = import.meta.env.VITE_BASE_URL;
//액세스 토큰 계속 받아올거야? 초기값 false
// const [accessTokenRep, setAccessTokenRep] = useState(false);

// const cookies = new Cookies();

// 에러 처리를 위한 status 선언
// const statusError = {
//   status: false,
//   json: {
//     error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"],
//   },
// };

// 백으로 요청할 promis
// const requestPromise = (url, option) => {
//   return axios({
//     url,
//     data: option.body,
//     // method: option.method,
//     withCredentials: true,
//   });
// };

// promise 타임아웃 처리

// const timeoutPromise = () => {
//   return new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("timeout")), TIME_OUT)
//   );
// };

// promise 요청
// 요청과 타임아웃 중에 더 빨리 되는것을 Promise객체에 담아줌
// const getPromise = async (url, option) => {
//   return await Promise.race([requestPromise(url, option), timeoutPromise()]);
// };
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

//일정 시간마다 accessToken 재발행 하는 코드만들려고 하는 시도
// useQuery([queryKey.REFRESH], authAPI.silentRefresh, {
//   refetchOnWindowFocus: false,
//   refetchOnMount: false,
//   refetchOnReconnect: false,
//   retry: 2,
//   refetchInterval: accessTokenRep ? false : 60 * 60 * 1000, // 1시간 인 상황
//   refetchIntervalInBackground: true,
//   onError: () => {
//     setAccessTokenRep(true);
//     authToken.setToken("");
//   },
//   onSuccess: (data) => {
//     const token = data?.data?.access_token;
//     // access 토큰을 받아와서 새로 저장~~~
//     if (token) authToken.setToken(token);
//   },
// });

// 액세스토큰 재발행하는 코드
export const accessTokenReIssue = async () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //   //액세스 토큰 만료됐는지 확인

  //   //액세스 토큰이 만료됐을 때
  if (user["expireTime"] - Date() < 0) {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      credentials: "include",
    })
      .catch(() => {
        dispatch(DELETE_TOKEN());
        dispatch(DELETE_USER());
        console.log("다시 로그인해주세요 refreshToken만료");
        navigate("/login");
      })
      .then((res) => {
        dispatch(SET_TOKEN({ accessToken: res["accessToken"] }));
        dispatch(
          SET_USER({
            userEmail: response.data.userLoginInfo.userEmail,
            userChName: response.data.userLoginInfo.userChName,
          })
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res["accessToken"]}`;
      });
  }
  //   // 액세스 토큰 만료시 액세스 토큰 재발행
  //   // 액세스 토큰
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
    return "error";
  });

  return response;
};

//코드확인 로직
export const sendCheckCodeUser = async function codecheck(credentials) {
  console.log("코드발송", credentials);

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
  console.log("회원가입 가능한 이메일인지", credentials);

  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/users/distinctemail`,
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

// export const loginUser = async (credentials) => {
//   const option = {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     data: credentials,
//     //credentials={
//     //email,
//     //password
//     //}
//     // body: JSON.stringify(credentials),
//   };

//   //요청 성공해서 프로미스 생성되면
//   const data1 = await getPromise(BASE_URL + "/auth/login", option)
//     .then((res) => {
//       console.log(res, option);
//     })
//     .catch((err) => console.dir(err, option));
//   // dispatch(setToken(data.json.accessToken));
//   console.log("data ", data1);
//   // console.log(response.json.accessToken);
//   //요청이 성공적이면(2백번 대이면)
//   if (parseInt(Number(data.status) / 100) === 2) {
//     const status = data1.statusText == "" ? true : false;
//     const code = data1.status;
//     // const text = await data.text();
//     const json = data1.data.length ? data.data : "";
//     const headers = data1.headers;

//     return {
//       headers,
//       status,
//       code,
//       json,
//     };
//   } else {
//     return statusError;
//   }
// };
//백에서 accessToken삭제하는 api
// export const logoutUser = async (credentials, accessToken) => {
//   const option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: credentials,

//     // body: JSON.stringify(credentials),
//   };
//   const data = await getPromise(BASE_URL + "/auth/logout", option).catch(() => {
//     return statusError;
//   });
//   if (parseInt(Number(data.status) / 100) === 2) {
//     const status = data.ok;
//     const code = data.status;
//     const text = await data.text();
//     const json = text.length ? JSON.parse(text) : "";

//     return {
//       status,
//       code,
//       json,
//     };
//   } else {
//     return statusError;
//   }
// };

// //토큰 요청하는 api
// export const requestToken = async (refreshToken) => {
//   const option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: { refresh_token: refreshToken },

//     // body: JSON.stringify({ refresh_token: refreshToken }),
//   };

//   const data = await getPromise("/user/login", option).catch(() => {
//     return statusError;
//   });

//   if (parseInt(Number(data.status) / 100) === 2) {
//     const status = data.ok;
//     const code = data.status;
//     const text = await data.text();
//     const json = text.length ? JSON.parse(text) : "";

//     return {
//       status,
//       code,
//       json,
//     };
//   } else {
//     return statusError;
//   }
// };

// export const loginChecker = async () => {
//   const token = coo;
// };
