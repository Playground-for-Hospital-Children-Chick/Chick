import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "./../";
// access Token 넣기
const BASE_URL = import.meta.env.VITE_BASE_URL;

const asyncLoginAxios = createAsyncThunk(
  "/auth/login",
  async (email, password) => {
    const response = await axios({
      method: "POST",
      url: "https://api/auth/login",
      body: {
        email,
        password,
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      withCredentials: true,
    });

    console.log(response);
    // const user = {
    //   email,
    //   password,
    // };
    // const Cred = {
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    //   withCredentials: true,
    // };
    // const option = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    //   body: { email, password },
    //credentials={
    //email,
    //password
    //}
    // body: JSON.stringify(credentials),
    // };

    // const resp = await axios.post(BASE_URL + "/auth/login", user, Cred);
    // const resp = await getPromise(BASE_URL + "/auth/login", option);
    // console.log(resp);
    // console.log(resp.data);
    return response.data;
  }
);

export default asyncLoginAxios;
