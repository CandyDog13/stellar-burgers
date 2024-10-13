import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

export type userState = {
  userData: TUser | null;
  isAuthChecked: boolean;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registrationError: string | null;
  logOutError: string | null;
  updateError: string | null;
  orders: TOrder[];
  ordersError: string | null;
};

export const initialState: userState = {
  userData: null,
  isAuthChecked: false,
  loginUserError: null,
  loginUserRequest: false,
  registrationError: null,
  logOutError: null,
  updateError: null,
  orders: [],
  ordersError: null
};

export const fetchUserOrders = createAsyncThunk('user/fetchOrders', async () =>
  getOrdersApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchGetUser()).finally(() => {
        dispatch(userSliceActions.authChecked());
      });
    } else {
      dispatch(userSliceActions.authChecked());
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

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', () =>
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
    getErrorLogin: (state) => state.loginUserError,
    getUserOrders: (state) => state.orders,
    getUserOrdersError: (state) => state.ordersError
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
        state.isAuthChecked = false;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserError = 'Ошибка доступа к личному кабинету';
        state.loginUserRequest = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.loginUserError = null;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loginUserRequest = true;
        state.registrationError = null;
        state.isAuthChecked = false;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.registrationError = 'Ошибка регистрации';
        state.isAuthChecked = false;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.registrationError = null;
        state.isAuthChecked = true;
        state.userData = action.payload.user;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.updateError = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.updateError = 'Ошибка обновления';
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.updateError = null;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.logOutError = null;
        state.loginUserRequest = true;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.logOutError = 'Ошибка выхода из аккаунта';
        state.loginUserRequest = false;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.logOutError = null;
        state.loginUserRequest = false;
        state.userData = null;
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isAuthChecked = true;
        state.loginUserRequest = true;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserRequest = false;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.userData = action.payload.user;
        state.isAuthChecked = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.orders = [];
        state.ordersError = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.ordersError = 'Ошибка загрузки заказов пользователя';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const userSliceReducer = userSlice.reducer;
export const userSliceName = userSlice.name;
export const userSliceSelectors = userSlice.selectors;
export const userSliceActions = userSlice.actions;
