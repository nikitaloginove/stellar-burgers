import { expect, test, describe } from '@jest/globals';
import { testFeeds } from './mock';
import feedsSliceReducer, { getAllFeeds, initialState } from '../feedsSlice';

describe('[getAllFeeds] загрузка ленты заказов ', () => {
  test('Вызов редьюсера getAllFeeds - отображение процесса загрузки', () => {
    const currentState = feedsSliceReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      getAllFeeds.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      error: undefined,
      isLoading: true
    });
  });

  test('Вызов редьюсера getAllFeeds - завершение загрузки и сохранение данных', () => {
    const currentState = feedsSliceReducer(
      { ...initialState, isLoading: true },
      getAllFeeds.fulfilled(testFeeds, '')
    );
    expect(currentState).toEqual({
      orders: testFeeds.orders,
      total: testFeeds.total,
      totalToday: testFeeds.totalToday,
      error: undefined,
      isLoading: false
    });
  });

  test('Вызов редьюсера getAllFeeds - обработка ошибки', async () => {
    const errorText = 'Ошибка';
    const currentState = feedsSliceReducer(
      { ...initialState, isLoading: true },
      getAllFeeds.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: errorText,
      isLoading: false
    });
  });
});
