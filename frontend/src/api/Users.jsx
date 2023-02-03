import axios from "axios";
// promise 요청 타임아웃 시간 선언
const TIME_OUT = 300 * 1000;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// 에러 처리를 위한 status 선언
const statusError = {
  status: false,
  json: {
    error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"],
  },
};

// 백으로 요청할 promis
const requestPromise = (url, option) => {
  return axios({
    url,
    data: option.body,
    method: option.method,
    withCredentials: true,
  });
};

// promise 타임아웃 처리

const timeoutPromise = () => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), TIME_OUT)
  );
};

// promise 요청
// 요청과 타임아웃 중에 더 빨리 되는것을 Promise객체에 담아줌
const getPromise = async (url, option) => {
  return await Promise.race([requestPromise(url, option), timeoutPromise()]);
};

// 백으로 로그인 요청
export const loginUser = async (credentials) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: credentials,
    // body: JSON.stringify(credentials),
  };

  //요청 성공해서 프로미스 생성되면
  const data = await getPromise(BASE_URL + "/auth/login", option)
    .catch(() => statusError)
    .then((res) => console.log(res));
  console.log("data " + data);
  // console.log(response.json.accessToken);
  //요청이 성공적이면(2백번 대이면)
  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.statusText == "" ? true : false;
    const code = data.status;
    // const text = await data.text();
    const json = data.data.length ? data.data : "";
    const headers = data.headers;

    return {
      headers,
      data,
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};
//백에서 accessToken삭제하는 api
export const logoutUser = async (credentials, accessToken) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: credentials,

    // body: JSON.stringify(credentials),
  };
  const data = await getPromise(BASE_URL + "/auth/logout", option).catch(() => {
    return statusError;
  });
  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};

//토큰 요청하는 api
export const requestToken = async (refreshToken) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: { refresh_token: refreshToken },

    // body: JSON.stringify({ refresh_token: refreshToken }),
  };

  const data = await getPromise("/user/login", option).catch(() => {
    return statusError;
  });

  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};

export const loginChecker = async () => {
  const token = coo;
};
