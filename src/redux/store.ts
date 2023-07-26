import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userIdSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
