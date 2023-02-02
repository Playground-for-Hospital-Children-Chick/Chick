import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);
  console.log("setRefreshToken " + refreshToken);

  return cookies.set(refreshToken, {
    sameSite: "strict",
    path: "/",
    httpOnly: false,
    expires: new Date(expireDate),
    secure: false,
    signed: true,
  });
};
export const getCookieToken = () => {
  return cookies.get("refreshToken");
};

export const removeCookieToken = () => {
  return cookies.remove("refreshToken", { sameSite: "strict", path: "/" });
};
