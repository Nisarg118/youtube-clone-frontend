import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, saveToken } from "../../utils/token";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/users/register`, {
        method: "POST",
        body: formdata,
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }
      return data.success;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        // Server returned HTML or something weird
        const text = await res.text();
        return rejectWithValue("Invalid response from server:\n" + text);
      }

      const data = await res.json();

      if (!res.ok) {
        console.warn("Login failed:", data);
        return rejectWithValue(data.message || "Login failed");
      }

      return data.data.accessToken;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:8000/api/v1/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Logout failed");
      }
      return data.success;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {
    isLoading: false,
    accessToken: getToken() || null,
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
