import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMenuApi } from "./menuApi";

export const fetchMenu = createAsyncThunk(
  "menu/fetch",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await getMenuApi();
    return res.data;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menu = action.payload;
    });
  },
});

export default menuSlice.reducer;