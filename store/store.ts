import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
// import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts:postReducer
  },
});

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
