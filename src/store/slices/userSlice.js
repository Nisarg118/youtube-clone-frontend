import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/users/register`, {
        method: "POST",
        body: formdata,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text); // 🔍 Debug log
        return rejectWithValue("Server didn't return JSON.");
      }

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

const savedUser = JSON.parse(localStorage.getItem("userData"));

const userSlice = createSlice({
  name: "User",
  initialState: {
    isLoading: false,
    data: savedUser ? savedUser : null,
    isError: false,
    registerSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;

      localStorage.setItem("userData", JSON.stringify(action.payload));
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
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
