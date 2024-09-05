import {
  constructorBurgerReducer,
  initialState,
  addItem,
  deleteItem,
  clearAll,
  updateAll,
  constructorSelector
} from '../constructorIngredientSlice';
import { TConstructorIngredient } from '../../../utils/types';
import { v4 as uuidv4 } from 'uuid';
import { testIngredients } from '../ingredientsSlice/mock';

describe('[constructor] - редактирование', () => {
  test('Добавление булки', () => {
    const beginState = Object.assign({}, initialState);
    const newState = constructorBurgerReducer(
      beginState,
      addItem(testIngredients[0])
    );
    const { bun } = newState;
    expect(bun).toEqual({
      ...testIngredients[0],
      id: expect.any(String)
    });
  });

  test('Добавление ингредиента', () => {
    const beginState = Object.assign({}, initialState);
    const newState = constructorBurgerReducer(
      beginState,
      addItem(testIngredients[1])
    );
    const { ingredients } = newState;
    expect(ingredients.length).toBe(1);
    expect(ingredients[0]).toEqual({
      ...testIngredients[1],
      id: expect.any(String)
    });
  });

  test('Удаление ингредиента', () => {
    const beginState = Object.assign({}, initialState);
    let newState = constructorBurgerReducer(
      beginState,
      addItem(testIngredients[1])
    );
    const ingredientId = newState.ingredients[0].id;
    newState = constructorBurgerReducer(
      newState,
      deleteItem({ ...testIngredients[1], id: ingredientId })
    );
    const { ingredients } = newState;
    expect(ingredients.length).toBe(0);
  });

  test('Очистка конструктора', () => {
    const beginState = Object.assign({}, initialState);
    let newState = constructorBurgerReducer(
      beginState,
      addItem(testIngredients[1])
    );
    newState = constructorBurgerReducer(newState, clearAll());
    expect(newState).toEqual(initialState);
  });

  test('Обновление списка ингредиентов', () => {
    const beginState = Object.assign({}, initialState);
    const newIngredients = testIngredients.map((item) => ({
      ...item,
      id: uuidv4()
    }));
    const newState = constructorBurgerReducer(
      beginState,
      updateAll(newIngredients)
    );
    expect(newState.ingredients).toEqual(newIngredients);
  });
});
