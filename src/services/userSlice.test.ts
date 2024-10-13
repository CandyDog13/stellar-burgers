import { expect, describe, test } from '@jest/globals';
import {
  fetchLoginUser,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchLogoutUser,
  userSliceReducer,
  fetchGetUser,
  fetchUserOrders,
  initialState as initialTestState
} from './userSlice';
// import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
describe('Тестирование userSliceReducer', () => {
  beforeAll(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      length: 0,
      clear: jest.fn(),
      key: jest.fn(),
      removeItem: jest.fn()
    };

    jest.mock('../utils/cookie', () => {
      const originalModule = jest.requireActual('../utils/cookie');
      return {
        deleteCookie: jest.fn(),
        getCookie: jest.fn(),
        setCookie: jest.fn()
      };
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockLoginState = {
    email: 'test@yandex.ru',
    password: 'testtest'
  };

  const mockRegisterState = {
    email: 'test@yandex.ru',
    name: 'Tester Testov',
    password: 'testtest'
  };

  const mockUpgradeState = {
    success: true,
    user: mockLoginState
  };

  const mockUserOrder = {
    success: true,
    orders: [
      {
        _id: '66a3d643119d45001b4fbcd9',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-07-26T17:00:51.665Z',
        updatedAt: '2024-07-26T17:00:52.231Z',
        number: 47480
      },
      {
        _id: '66a40685119d45001b4fbd9b',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-07-26T20:26:45.491Z',
        updatedAt: '2024-07-26T20:26:45.905Z',
        number: 47545
      },
      {
        _id: '66b2432c119d45001b4fdf4e',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный био-марсианский традиционный-галактический spicy люминесцентный бургер',
        createdAt: '2024-08-06T15:37:16.743Z',
        updatedAt: '2024-08-06T15:37:17.184Z',
        number: 48656
      },
      {
        _id: '66b244a7119d45001b4fdf53',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Space краторный люминесцентный spicy био-марсианский метеоритный бургер',
        createdAt: '2024-08-06T15:43:35.216Z',
        updatedAt: '2024-08-06T15:43:35.625Z',
        number: 48658
      },
      {
        _id: '66b244de119d45001b4fdf57',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Space фалленианский краторный экзо-плантаго spicy метеоритный бургер',
        createdAt: '2024-08-06T15:44:30.362Z',
        updatedAt: '2024-08-06T15:44:30.869Z',
        number: 48659
      }
    ],
    total: 48323,
    totalToday: 129
  };

  test('Тест pending fetchLoginUser in userReducer', () => {
    const action = { type: fetchLoginUser.pending.type };
    const expectedState = {
      ...initialTestState,
      loginUserRequest: true,
      loginUserError: null,
      isAuthChecked: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchLoginUser in userReducer', () => {
    const action = {
      type: fetchLoginUser.fulfilled.type,
      payload: { user: mockLoginState }
    };
    const expectedState = {
      ...initialTestState,
      userData: mockLoginState,
      isAuthChecked: true,
      loginUserRequest: false,
      loginUserError: null
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchCreateNewOrder in userReducer', () => {
    const action = { type: fetchLoginUser.rejected.type };
    const expectedState = {
      ...initialTestState,
      isAuthChecked: false,
      loginUserError: 'Ошибка доступа к личному кабинету',
      loginUserRequest: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест pending fetchRegisterUser in userReducer', () => {
    const action = { type: fetchRegisterUser.pending.type };
    const expectedState = {
      ...initialTestState,
      loginUserRequest: true,
      registrationError: null,
      isAuthChecked: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchRegisterUser in userReducer', () => {
    const action = {
      type: fetchRegisterUser.fulfilled.type,
      payload: { user: mockRegisterState }
    };
    const expectedState = {
      ...initialTestState,
      userData: mockRegisterState,
      isAuthChecked: true,
      loginUserRequest: false,
      registrationError: null
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchRegisterUser in userReducer', () => {
    const action = { type: fetchRegisterUser.rejected.type };
    const expectedState = {
      ...initialTestState,
      isAuthChecked: false,
      registrationError: 'Ошибка регистрации',
      loginUserRequest: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест pending fetchUpdateUser in userReducer', () => {
    const action = { type: fetchUpdateUser.pending.type };
    const expectedState = {
      ...initialTestState,
      loginUserRequest: true,
      updateError: null
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchUpdateUser in userReducer', () => {
    const action = {
      type: fetchUpdateUser.fulfilled.type,
      payload: { user: mockUpgradeState }
    };
    const expectedState = {
      ...initialTestState,
      userData: mockUpgradeState,
      isAuthChecked: true,
      loginUserRequest: false,
      updateError: null
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchUpdateUser in userReducer', () => {
    const action = { type: fetchUpdateUser.rejected.type };
    const expectedState = {
      ...initialTestState,
      updateError: 'Ошибка обновления',
      loginUserRequest: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест pending fetchLogoutUser in userReducer', () => {
    const action = { type: fetchLogoutUser.pending.type };
    const expectedState = {
      ...initialTestState,
      loginUserRequest: true,
      logOutError: null
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchLogoutUser in userReducer', () => {
    const action = {
      type: fetchLogoutUser.fulfilled.type
    };
    const expectedState = {
      ...initialTestState,
      userData: null,
      loginUserRequest: false,
      logOutError: null
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchLogoutUser in userReducer', () => {
    const action = { type: fetchLogoutUser.rejected.type };
    const expectedState = {
      ...initialTestState,
      logOutError: 'Ошибка выхода из аккаунта',
      loginUserRequest: false,
      isAuthChecked: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест pending fetchGetUser in userReducer', () => {
    const action = { type: fetchGetUser.pending.type };
    const expectedState = {
      ...initialTestState,
      isAuthChecked: true,
      loginUserRequest: true
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchGetUser in userReducer', () => {
    const action = {
      type: fetchGetUser.fulfilled.type,
      payload: { user: mockUpgradeState }
    };
    const expectedState = {
      ...initialTestState,
      userData: mockUpgradeState,
      loginUserRequest: false,
      isAuthChecked: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchGetUser in userReducer', () => {
    const action = { type: fetchGetUser.rejected.type };
    const expectedState = {
      ...initialTestState,
      loginUserRequest: false,
      isAuthChecked: false
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест pending fetchUserOrders in userReducer', () => {
    const action = { type: fetchUserOrders.pending.type };
    const expectedState = {
      ...initialTestState,
      orders: [],
      ordersError: null
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест fulfilled fetchUserOrders in userReducer', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockUserOrder
    };
    const expectedState = {
      ...initialTestState,
      orders: mockUserOrder
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
  test('Тест rejected fetchUserOrders in userReducer', () => {
    const action = { type: fetchUserOrders.rejected.type };
    const expectedState = {
      ...initialTestState,
      ordersError: 'Ошибка загрузки заказов пользователя'
    };
    const newState = userSliceReducer(initialTestState, action);
    expect(newState).toEqual(expectedState);
  });
});
