import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeToken, saveToken } from "../../utils/token";
import { logIn, logout, signUp } from "../../services/api-service/user/user";
import Endpoint from "../../services/api-service/endpoints";

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signUp({ url: Endpoint.SIGNUP, formData });
      return res;
    } catch (error) {
      return rejectWithValue(
        error.message || "Something went wrong while signing up"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await logIn({ url: Endpoint.SIGNIN, formData });

      return res;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await logout(Endpoint.LOGOUT);
      return res;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {
    isLoading: false,
    accessToken: localStorage.getItem("token") || null,
    isError: false,
    registerSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload;

      saveToken(action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.isError = true;
    });
    builder.addCase(signUpUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registerSuccess = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.accessToken = null;
      state.registerSuccess = false;
      removeToken();
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
