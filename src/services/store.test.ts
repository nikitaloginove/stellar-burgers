import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { feedsSlice } from './slices/feedsSlice';
import { newOrderSlice } from './slices/newOrderSlice';
import { constructorSlice } from './slices/constructorIngredientSlice';
import { userSlice } from './slices/userSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';
import store from './store';

describe('тесты rootReducer', () => {
  test('проверить корректную инициализацию структуру rootReducer', () => {
    const init = { type: '@@redux/INIT' };
    const state = store.getState();
    expect(state).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      user: userSlice.getInitialState(),
      feeds: feedsSlice.getInitialState(),
      constructorIngredient: constructorSlice.getInitialState(),
      newOrder: newOrderSlice.getInitialState(),
      orders: userOrdersSlice.getInitialState()
    });
  });

  test('проверить корректную инициализацию структуру rootReducer необрабатываемым экшном', () => {
    const init = { type: 'UNKNOWN_ACTION' };
    const state = store.getState();
    expect(state).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      user: userSlice.getInitialState(),
      feeds: feedsSlice.getInitialState(),
      constructorIngredient: constructorSlice.getInitialState(),
      newOrder: newOrderSlice.getInitialState(),
      orders: userOrdersSlice.getInitialState()
    });
  });

  test('проверить корректную инициализацию rootReducer начальными состояниями', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsSlice.getInitialState()
    );
    expect(store.getState().user).toEqual(userSlice.getInitialState());
    expect(store.getState().constructorIngredient).toEqual(
      constructorSlice.getInitialState()
    );
    expect(store.getState().feeds).toEqual(feedsSlice.getInitialState());
    expect(store.getState().newOrder).toEqual(newOrderSlice.getInitialState());
    expect(store.getState().orders).toEqual(userOrdersSlice.getInitialState());
  });
});
