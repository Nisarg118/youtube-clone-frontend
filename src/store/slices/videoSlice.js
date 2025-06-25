import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVideosOfChannel } from "../../services/api-service/video/video";

export const getAllVideosOfChannelThunk = createAsyncThunk(
  "video/getAllVideosOfChannelThunk",
  async (channelId, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    try {
      const state = getState();
      const token =
        state.user?.data?.accessToken ||
        JSON.parse(localStorage.getItem("userData"))?.accessToken;

      return await getAllVideosOfChannel({
        url: `http://localhost:8000/api/v1/videos/u/${channelId}`,
        token,
      });
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
    builder.addCase(getAllVideosOfChannelThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllVideosOfChannelThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.videos = action.payload;
    });
    builder.addCase(getAllVideosOfChannelThunk.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {} = videoSlice.actions;

export default videoSlice.reducer;
