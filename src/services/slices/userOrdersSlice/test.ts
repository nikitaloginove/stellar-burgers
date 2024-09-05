import { expect, test, describe } from '@jest/globals';
import { testMyOrders } from './mock';
import ordersSliceReducer, {
  getUserOrders,
  initialState
} from '../userOrdersSlice';

describe('Загрузка ленты своих заказов', () => {
  test('Вызов редьюсера ordersSlice - отображение процесса загрузки', () => {
    const currentState = ordersSliceReducer(
      initialState,
      getUserOrders.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Вызов редьюсера - завершение загрузки и сохранение данных', () => {
    const currentState = ordersSliceReducer(
      initialState,
      getUserOrders.fulfilled(testMyOrders, '')
    );
    expect(currentState).toEqual({
      orders: testMyOrders,
      isLoading: false
    });
  });

  test('Вызов редьюсера - обработка ошибки', async () => {
    const errorText = 'Ошибка';
    const currentState = ordersSliceReducer(
      initialState,
      getUserOrders.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      orders: initialState.orders,
      isLoading: false
    });
  });
});
