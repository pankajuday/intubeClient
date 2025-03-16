import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "@/axios";

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (data, thunkApi) => {
    try {
      const response = await loginUser(data);
      console.log(data);
      console.log(response);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
      const response = await logoutUser();
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
