import {
  ingredientsSlice,
  getIngredientsList,
  ingredientsReducer,
  ThunkConfig
} from '../IngredientsSlice';
import { TIngredient } from '../../../utils/types';
import { AsyncThunk, PayloadAction, UnknownAction } from '@reduxjs/toolkit';
import { testIngredients } from './mock';

describe('Загрузка ингридиентов', () => {
  test('Вызов редьюсера fetchIngredients - отображение процесса загрузки', () => {
    const currentState = ingredientsReducer(
      ingredientsSlice.getInitialState(),
      getIngredientsList.pending as unknown as UnknownAction
    );
    expect(currentState).toEqual({
      ...ingredientsSlice.getInitialState(),
      error: null,
      loading: true
    });
  });

  test('Вызов редьюсера - завершение загрузки и сохранение данных', () => {
    const currentState = ingredientsReducer(
      ingredientsSlice.getInitialState(),
      getIngredientsList.fulfilled(testIngredients, '') as PayloadAction<
        TIngredient[]
      >
    );
    expect(currentState).toEqual({
      ...ingredientsSlice.getInitialState(),
      ingredients: testIngredients,
      loading: false,
      error: null
    });
  });

  test('Вызов редьюсера - обработка ошибки', () => {
    const errorText = 'Ошибка';
    const currentState = ingredientsReducer(
      ingredientsSlice.getInitialState(),
      getIngredientsList.rejected(
        new Error(errorText),
        ''
      ) as PayloadAction<unknown>
    );
    expect(currentState).toEqual({
      ...ingredientsSlice.getInitialState(),
      error: errorText,
      loading: false
    });
  });
});
