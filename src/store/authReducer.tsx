import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import setCookie from "src/utils/setCookie";

export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://jh-blog-api.yoonleeverse.com/user/login",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      const errorWrap = error as AxiosError;
      return thunkAPI.rejectWithValue(errorWrap.response?.status);
    }
  }
);

const initialState = {
  isLoading: false,
  isLogin: false,
  email: "",
  authToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoff: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      setCookie("refreshToken", action.payload.refresh_token, 7);
      state.isLoading = false;
      state.isLogin = true;
      state.email = action.payload.user.email;
      state.authToken = action.payload.auth_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state = initialState;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const { logoff } = authSlice.actions;
export default authSlice.reducer;
