import { getFeedsApi, getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const getIngredientsList = createAsyncThunk<
  TIngredient[], // Тип возвращаемого значения
  void, // Тип аргумента
  ThunkConfig // Тип конфигурации thunk
>(
  'ingredients/getIngredients', // Имя thunk
  getIngredientsApi // Функция, которая будет вызвана
);

export type ThunkConfig = {
  state: RootState;
  dispatch: Dispatch;
  extra: any;
  rejectWithValue: (error: any, meta?: any) => { error: any; meta?: any };
};

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state,
    getIngredientsLoadingState: (state) => state.loading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  getIngredientsState,
  getIngredientsLoadingState,
  getIngredients
} = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
