import { expect, describe, test } from '@jest/globals';
import {
  burgerConstructorActions,
  burgerConstructorReducer
} from './burgerConstructorSlice';

describe('Проверка reducer слайса constructor', () => {
  const testBun = {
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
  };
  const testMeat = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };
  const testSouse = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  };
  const initialTestState = {
    bun: null,
    ingredients: []
  };
  test('проверка добавления ингредиента булки', () => {
    const expectedState = { ...initialTestState, bun: testBun };
    const newState = burgerConstructorReducer(
      initialTestState,
      burgerConstructorActions.addIngredientToBurger(testBun)
    );
    expect(newState).toMatchObject(expectedState);
  });
  test('проверка добавления ингредиента мяса', () => {
    const expectedState = { ...initialTestState, ingredients: [testMeat] };
    const newState = burgerConstructorReducer(
      initialTestState,
      burgerConstructorActions.addIngredientToBurger(testMeat)
    );
    expect(newState).toMatchObject(expectedState);
  });
  test('проверка добавления ингредиента coуса', () => {
    const expectedState = { ...initialTestState, ingredients: [testSouse] };
    const newState = burgerConstructorReducer(
      initialTestState,
      burgerConstructorActions.addIngredientToBurger(testSouse)
    );
    expect(newState).toMatchObject(expectedState);
  });

  const testBurger = {
    bun: { ...testBun, id: 'bunId' },
    ingredients: [
      { ...testMeat, id: 'meatId' },
      { ...testSouse, id: 'souseId' }
    ]
  };

  test('Проверка удаления ингредиента', () => {
    const expectedState = {
      ...testBurger,
      ingredients: [{ ...testMeat, id: 'meatId' }]
    };
    const newState = burgerConstructorReducer(
      testBurger,
      burgerConstructorActions.removeFromBurger('souseId')
    );
    expect(newState).toEqual(expectedState);
  });

  test('Проверка измемения порядка ингредиентов', () => {
    const expectedState = {
      ...testBurger,
      ingredients: [
        { ...testSouse, id: 'souseId' },
        { ...testMeat, id: 'meatId' }
      ]
    };
    const newState = burgerConstructorReducer(
      testBurger,
      burgerConstructorActions.changeIngredientsInBurger({ from: 0, to: 1 })
    );
    expect(newState).toEqual(expectedState);
  });
});
