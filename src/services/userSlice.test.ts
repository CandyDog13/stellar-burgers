import { expect, describe, test } from '@jest/globals';
import { fetchLoginUser, fetchRegisterUser, fetchUpdateUser, userSliceReducer } from './userSlice';
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

  const initialTestState = {
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
});
