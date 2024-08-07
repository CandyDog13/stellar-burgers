import { rootReducer } from './store';
import store from './store';
import { expect, describe, test } from '@jest/globals';

describe('Проверка правильной инициализацию rootReducer', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(testState);
  });
});
