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
const savedUser = JSON.parse(localStorage.getItem("userData"));

const userSlice = createSlice({
  name: "User",
  initialState: {
    isLoading: false,
    data: savedUser ? savedUser : null,
    isError: false,
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
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
