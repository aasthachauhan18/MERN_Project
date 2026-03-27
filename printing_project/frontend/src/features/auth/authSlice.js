import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

let userFromStorage = null;

try {
  const storedUser = localStorage.getItem("user");
  userFromStorage =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
} catch (error) {
  userFromStorage = null;
}

const storedToken = localStorage.getItem("token");
const tokenFromStorage =
  storedToken && storedToken !== "undefined"
    ? storedToken
    : null;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/register`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, data);
      return res.data; // { user, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

const initialState = {
  user: userFromStorage,        // ✅ FIXED
  token: tokenFromStorage,      // ✅ FIXED
  menuAccess: [],
  loading: false,               // ✅ ADDED
  error: null,                  // ✅ ADDED
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // ✅ FIX: REMOVED DUPLICATE addCase (THIS WAS YOUR BUG)

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;