import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async (ownerId, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;

    const state = getState();
    const token = state.user?.data?.accessToken;
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/subscriptions/c/${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const isSubscribed = data?.data?.isSubscribed;

      if (typeof isSubscribed === "boolean") {
        return isSubscribed;
      } else {
        return rejectWithValue("Invalid response structure");
      }
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
