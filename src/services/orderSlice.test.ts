import { expect, describe, test } from '@jest/globals';
import {
  fetchCreateNewOrder,
  fetchOrderByNumber,
  orderSliceReducer,
  initialState as initialTestState
} from './orderSlice';

describe('Тестирование OrderReducer', () => {
  const mockOrderByNumber = {
    success: true,
    orders: [
      {
        _id: '66b12de0119d45001b4fdcad',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
        owner: '66af5261119d45001b4fd798',
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-08-05T19:54:08.321Z',
        updatedAt: '2024-08-05T19:54:08.771Z',
        number: 48568,
        __v: 0
      }
    ]
  };

  const mockCreateOrder = {
    success: true,
    name: 'Space фалленианский краторный экзо-плантаго spicy метеоритный бургер',
    order: {
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0947',
          name: 'Плоды Фалленианского дерева',
          type: 'main',
          proteins: 20,
          fat: 5,
          carbohydrates: 55,
          calories: 77,
          price: 874,
          image: 'https://code.s3.yandex.net/react/code/sp_1.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0949',
          name: 'Мини-салат Экзо-Плантаго',
          type: 'main',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 6,
          price: 4400,
          image: 'https://code.s3.yandex.net/react/code/salad.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/salad-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-04-large.png',
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
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        },
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ],
      _id: '66b244de119d45001b4fdf57',
      owner: {
        name: 'Doggert1',
        email: 'kga13@yandex.ru',
        createdAt: '2024-07-26T16:50:18.821Z',
        updatedAt: '2024-07-26T20:11:56.263Z'
      },
      status: 'done',
      name: 'Space фалленианский краторный экзо-плантаго spicy метеоритный бургер',
      createdAt: '2024-08-06T15:44:30.362Z',
      updatedAt: '2024-08-06T15:44:30.869Z',
      number: 48659,
      price: 10954
    }
  };
  test('Тест pending fetchOrderByNumber in orderReducer', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const expectedState = {
      ...initialTestState,
      isLoading: true,
      error: null
    };
    const newState = orderSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchOrderByNumber in orderReducer', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrderByNumber
    };
    const expectedState = {
      ...initialTestState,
      order: mockOrderByNumber.orders[0]
    };
    const newState = orderSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchOrderByNumber in orderReducer', () => {
    const action = { type: fetchOrderByNumber.rejected.type };
    const expectedState = {
      ...initialTestState,
      error: 'Ошибка получения данных заказа'
    };
    const newState = orderSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест pending fetchCreateNewOrder in orderReducer', () => {
    const action = { type: fetchCreateNewOrder.pending.type };
    const expectedState = {
      ...initialTestState,
      isLoading: true,
      error: null
    };
    const newState = orderSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchCreateNewOrder in orderReducer', () => {
    const action = {
      type: fetchCreateNewOrder.fulfilled.type,
      payload: mockCreateOrder
    };
    const expectedState = {
      ...initialTestState,
      order: mockCreateOrder.order
    };
    const newState = orderSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchCreateNewOrder in orderReducer', () => {
    const action = { type: fetchCreateNewOrder.rejected.type };
    const expectedState = {
      ...initialTestState,
      error: 'Ошибка в создании заказа'
    };
    const newState = orderSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
});
