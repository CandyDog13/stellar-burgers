import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: null,
  totalToday: null,
  isLoading: false,
  error: null
};

export const fetchFeedInfo = createAsyncThunk(
  'feedSlice/fetchFeedInfo',
  async () => getFeedsApi()
);

const feedInfoSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  selectors: {
    getFeedInfoState: (state) => state,
    getFeedInfoOrders: (state) => state.orders,
    getFeedInfoError: (state) => state.error,
    getFeedInfoTotal: (state) => state.total,
    getFeedInfoTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedInfo.pending, (state) => {
        state.isLoading = true;
        state.orders = [];
        state.total = null;
        state.totalToday = null;
        state.error = null;
      })
      .addCase(fetchFeedInfo.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка данных ленты заказов';
      })
      .addCase(fetchFeedInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedInfoReducer = feedInfoSlice.reducer;
export const feedInfoSelectors = feedInfoSlice.selectors;
export const feedInfoName = feedInfoSlice.name;
