import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "./../";
// access Token 넣기
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

export default asyncLoginAxios;
