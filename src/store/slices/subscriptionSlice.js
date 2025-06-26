import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changeSubscription } from "../../services/api-service/subscription/subscription";
import Endpoint from "../../services/api-service/endpoints";

export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async (ownerId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await changeSubscription(
        Endpoint.CHANGESUBSCRIPTION(ownerId)
      );
      const isSubscribed = res?.isSubscribed;
      return isSubscribed;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const subscriptionSlice = createSlice({
  name: "Subscription",
  initialState: {
    isLoading: false,
    isError: false,
    isSubscribed: false,
  },
  reducers: {
    setInitialSubscription: (state, action) => {
      state.isSubscribed = action.payload; // true or false from fetchVideo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleSubscription.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(toggleSubscription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSubscribed = action.payload;
    });
    builder.addCase(toggleSubscription.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setInitialSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
