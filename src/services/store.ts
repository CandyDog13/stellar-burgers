import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer, ingredientsSliceName } from './ingredientsSlice';
import {
  burgerConstructorName,
  burgerConstructorReducer
} from './burgerConstructorSlice';
import { feedInfoName, feedInfoReducer } from './feedInfoSlice';
import { orderSliceName, orderSliceReducer } from './orderSlice';
import { userSliceName, userSliceReducer } from './userSlice';

const rootReducer = combineReducers({
  [ingredientsSliceName]: ingredientsReducer,
  [burgerConstructorName]: burgerConstructorReducer,
  [feedInfoName]: feedInfoReducer,
  [orderSliceName]: orderSliceReducer,
  [userSliceName]: userSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
