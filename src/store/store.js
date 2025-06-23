import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    subscription: subscriptionReducer,
  },
});
