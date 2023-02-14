import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    pageIndex: 0,
  },
  reducers: {
    SET_PAGE: (state, action) => {
      state.pageIndex = action.payload.pageIndex;
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, () => initialState);
    },
  },
});

export const { SET_PAGE } = pageSlice.actions;

export default { pageSlice };
