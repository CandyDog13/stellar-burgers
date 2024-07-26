import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

export type userState = {
  userData: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registrationError: string | null;
  logOutError: string | null;
  updateError: string | null;
};

const initialState: userState = {
  userData: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false,
  registrationError: null,
  logOutError: null,
  updateError: null
};

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchGetUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const fetchResetPassword = createAsyncThunk(
  'user/fetchResetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  async () => logoutApi()
);

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', async () =>
  getUserApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserData: (state) => state.userData,
    getAuthChecked: (state) => state.isAuthChecked,
    getLoginUserRequest: (state) => state.loginUserRequest,
    getErrorRegistration: (state) => state.registrationError,
    getErrorLogin: (state) => state.loginUserError
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = action.error.message as string;
        state.loginUserRequest = false;
        state.isAuthenticated = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.loginUserError = null;
        state.isAuthenticated = true;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loginUserRequest = true;
        state.registrationError = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.registrationError = action.error.message as string;
        state.isAuthChecked = false;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.registrationError = null;
        state.userData = action.payload.user;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.updateError = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.updateError = action.error.message as string;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.updateError = null;
        state.userData = action.payload.user;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.logOutError = null;
        state.loginUserRequest = true;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = false;
        state.logOutError = action.error.message as string;
        state.loginUserRequest = false;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.logOutError = null;
        state.loginUserRequest = false;
        state.userData = null;
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserRequest = true;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.loginUserRequest = false;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loginUserRequest = false;
        state.userData = action.payload.user;
        state.isAuthChecked = false;
      });
  }
});

export const userSliceReducer = userSlice.reducer;
export const userSliceName = userSlice.name;
export const userSliceSelectors = userSlice.selectors;
export const userSliceActions = userSlice.actions;
function getUser(): any {
  throw new Error('Function not implemented.');
}

function authChecked(): any {
  throw new Error('Function not implemented.');
}
