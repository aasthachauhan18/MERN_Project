import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import userReducer from "../features/users/userSlice";
import menuReducer from "../features/menu/menuSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  users: userReducer,
  menu: menuReducer,
});

export default rootReducer;