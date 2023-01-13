import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import setCookie, { clearCookie } from "src/utils/setCookie";

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
      return response.data;
    } catch (error) {
      const errorWrap = error as AxiosError;
      return thunkAPI.rejectWithValue(errorWrap.response?.status);
    }
  }
);

export const getRefreshToken = createAsyncThunk(
  "auth/refresh",
  async (refresh_token: string, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://jh-blog-api.yoonleeverse.com/user/refresh",
        { refresh_token }
      );
      if (!response.data.refresh_token) {
        setCookie("refreshToken", "", 0);
        thunkAPI.dispatch(logoff());
        return { isSuccess: true };
      } else {
        setCookie("refreshToken", response.data.refresh_token, 7);
        thunkAPI.dispatch(
          updateLoginStatus({
            email: response.data.email,
            auth_token: response.data.auth_token,
          })
        );
        return { isSuccess: true };
      }
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
      clearCookie("refreshToken");
      return initialState;
    },
    updateLoginStatus: (state, action) => {
      console.log(action);
      state.isLogin = true;
      state.email = action.payload.email;
      state.authToken = action.payload.auth_token;
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
    builder.addCase(login.rejected, (state) => {
      state = initialState;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRefreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("done", action);
    });
    builder.addCase(getRefreshToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRefreshToken.rejected, (state) => {
      state.isLoading = false;
      state = initialState;
    });
  },
});

export const { logoff, updateLoginStatus } = authSlice.actions;
export default authSlice.reducer;
