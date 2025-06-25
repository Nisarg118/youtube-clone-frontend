import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVideosOfChannel } from "../../services/api-service/video/video";
import Endpoint from "../../services/api-service/endpoints";

export const getAllVideosOfChannelThunk = createAsyncThunk(
  "video/getAllVideosOfChannelThunk",
  async (channelId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await getAllVideosOfChannel(Endpoint.VIDEOS_OF_CHANNEL(channelId));
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
