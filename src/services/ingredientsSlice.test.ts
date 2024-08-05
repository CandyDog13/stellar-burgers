import { expect, describe, test } from '@jest/globals';
import { fetchIngredients, ingredientsReducer } from './ingredientsSlice';

describe('Тестирование IngredientsSlice', () => {
  const initialTestState = {
    ingredients: [],
    isLoading: false,
    error: null
  };
  const mockState = {
    ...initialTestState,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ]
  };

  test('Проверка loading ingredientsReducer', () => {
    const action = {
      type: fetchIngredients.pending.type
    };
    const expectedState = {
      ...initialTestState,
      isLoading: true,
      error: null
    };
    const newState = ingredientsReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Проверка fulfilled ingredientsReducer', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockState.ingredients
    };
    const expectedState = {
      ingredients: mockState.ingredients,
      isLoading: false,
      error: null
    };
    const newState = ingredientsReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Проверка reject ingredientsReducer', () => {
    const action = {
      type: fetchIngredients.rejected.type
    };
    const expectedState = {
      ...initialTestState,
      isLoading: false,
      error: 'Нет данных об ингредиентах'
    };
    const newState = ingredientsReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
});
