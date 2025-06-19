import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
});
