import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import quoteReducer from "./features/quoteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quote: quoteReducer,
  },
});

export default store;
