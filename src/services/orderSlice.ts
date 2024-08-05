import { getOrderByNumberApi, orderBurgerApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (numberOrder: number, { dispatch }) => {
    dispatch(orderSliceActions.clearOrderState());
    return getOrderByNumberApi(numberOrder);
  }
);

export const fetchCreateNewOrder = createAsyncThunk(
  'order/fetchCreateNewOrder',
  async (data: string[], { dispatch }) => {
    dispatch(orderSliceActions.clearOrderState());
    return await orderBurgerApi(data);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrderState: (state) => state.order,
    getOrderLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.error = 'Ошибка получения данных заказа';
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(fetchCreateNewOrder.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchCreateNewOrder.rejected, (state) => {
        state.error = 'Ошибка в создании заказа';
        state.isLoading = false;
      })
      .addCase(fetchCreateNewOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      });
  }
});

export const orderSliceReducer = orderSlice.reducer;
export const orderSliceName = orderSlice.name;
export const orderSliceSelectors = orderSlice.selectors;
export const orderSliceActions = orderSlice.actions;
