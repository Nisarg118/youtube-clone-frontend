import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllVideosOfChannel = createAsyncThunk(
  "getAllVideosOfChannel",
  async (channelId, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    try {
      const state = getState();
      const token =
        state.user?.data?.accessToken ||
        JSON.parse(localStorage.getItem("userData"))?.accessToken;
      const res = await fetch(
        `http://localhost:8000/api/v1/videos/u/${channelId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Logout failed");
      }
      return data.data.videos;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const videoSlice = createSlice({
  name: "Video",
  initialState: {
    isLoading: false,
    isError: false,
    videos: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVideosOfChannel.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllVideosOfChannel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.videos = action.payload;
    });
    builder.addCase(getAllVideosOfChannel.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {} = videoSlice.actions;

export default videoSlice.reducer;
