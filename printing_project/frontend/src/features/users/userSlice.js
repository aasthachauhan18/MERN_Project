import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/users";

export const getUsers = createAsyncThunk("users/get", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (u) => u._id !== action.payload
      );
    });
  },
});

export default userSlice.reducer;