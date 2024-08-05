import { expect, describe, test } from '@jest/globals';
import { feedInfoReducer, fetchFeedInfo } from './feedInfoSlice';

describe('Тестирование feedInfoSlice', () => {
  const initialTestState = {
    orders: [],
    total: null,
    totalToday: null,
    isLoading: false,
    error: null
  };

  const mockState = {
    success: true,
    orders: [
      {
        _id: '66b12de0119d45001b4fdcad',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-08-05T19:54:08.321Z',
        updatedAt: '2024-08-05T19:54:08.771Z',
        number: 48568
      },
      {
        _id: '66b12d8e119d45001b4fdcab',
        ingredients: [
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный антарианский метеоритный бургер',
        createdAt: '2024-08-05T19:52:46.004Z',
        updatedAt: '2024-08-05T19:52:46.500Z',
        number: 48567
      },
      {
        _id: '66b12d33119d45001b4fdca9',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-08-05T19:51:15.045Z',
        updatedAt: '2024-08-05T19:51:15.514Z',
        number: 48566
      }
    ],
    total: 48194,
    totalToday: 120
  };
  test('Тест pending feedInfoReducer', () => {
    const action = { type: fetchFeedInfo.pending.type };
    const expectedState = {
      ...initialTestState,
      isLoading: true,
      error: null
    };
    const newState = feedInfoReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled feedInfoReducer', () => {
    const action = {
      type: fetchFeedInfo.fulfilled.type,
      payload: mockState
    };
    const expectedState = {
      ...initialTestState,
      orders: mockState.orders,
      total: mockState.total,
      totalToday: mockState.totalToday
    };
    const newState = feedInfoReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected feedInfoReducer', () => {
    const action = { type: fetchFeedInfo.rejected.type };
    const expectedResult = {
      ...initialTestState,
      error: 'Ошибка данных ленты заказов'
    };
    const newState = feedInfoReducer(initialTestState, action);
    expect(newState).toEqual(expectedResult);
  });
});
