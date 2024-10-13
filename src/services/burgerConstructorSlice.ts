import { BurgerConstructor } from '@components';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState,
  reducers: {
    addIngredientToBurger: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeFromBurger: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== payload
      );
    },
    changeIngredientsInBurger: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      const changedIngredient = ingredients[from];
      ingredients[from] = ingredients[to];
      ingredients[to] = changedIngredient;
      state.ingredients = [...ingredients];
    },
    resetConstructor: () => initialState
  },
  selectors: {
    getIngredientsFromConstructor: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorSelectors = burgerConstructorSlice.selectors;
export const burgerConstructorName = burgerConstructorSlice.name;
