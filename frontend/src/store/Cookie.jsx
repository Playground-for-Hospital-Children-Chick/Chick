import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookie.set("refresh_token", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getRefreshToken = () => {
  return cookie.get("refresh_token");
};

export const removeCookie = () => {
  return cookie.remove("refresh_token", { sameSite: "strict", path: "/" });
};
