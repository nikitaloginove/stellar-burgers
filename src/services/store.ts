import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { feedsSlice } from './slices/feedsSlice';
import { newOrderSlice } from './slices/newOrderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from './slices/constructorIngredientSlice';
import { userSlice } from './slices/userSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';

export const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [constructorSlice.name]: constructorSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [feedsSlice.name]: feedsSlice.reducer,
    [newOrderSlice.name]: newOrderSlice.reducer,
    [userOrdersSlice.name]: userOrdersSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorIngredient: constructorSlice.reducer,
  user: userSlice.reducer,
  feeds: feedsSlice.reducer,
  newOrder: newOrderSlice.reducer,
  orders: userOrdersSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
