import {
  errorOldText,
  errorText,
  loginData,
  registerData,
  testGet,
  testLogin,
  testUpdate,
  updateData
} from './mock';
import {
  apiGetUser,
  initialState,
  login,
  register,
  updateUser,
  userSliceReducer
} from '../userSlice';

describe('[login] ', () => {
  test('Вызов редьюсера login - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, error: errorOldText },
      login.pending('', loginData)
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isAuthChecked: false
    });
  });

  test('Вызов login - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: true },
      login.fulfilled(testLogin, '', loginData)
    );
    expect(currentState).toEqual({
      user: testLogin.user,
      isAuthChecked: true,
      error: ''
    });
  });

  test('Вызов login - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: true },
      login.rejected(new Error(errorText), '', loginData)
    );
    expect(currentState).toEqual({
      error: errorText,
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      }
    });
  });
});

describe('[register] ', () => {
  test('Вызов редьюсера register - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, error: errorOldText },
      register.pending('', registerData)
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isAuthChecked: false
    });
  });

  test('Вызов register - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: false },
      register.fulfilled(testLogin, '', registerData)
    );
    expect(currentState).toEqual({
      user: testLogin.user,
      isAuthChecked: true,
      error: ''
    });
  });

  test('Вызов register - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: false },
      register.rejected(new Error(errorText), '', registerData)
    );
    expect(currentState).toEqual({
      error: errorText,
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      }
    });
  });
});

describe('[updateUser] ', () => {
  test('Вызов updateUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, error: errorOldText },
      updateUser.pending('', updateData)
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isAuthChecked: false
    });
  });

  test('Вызов updateUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: false },
      updateUser.fulfilled(testUpdate, '', updateData)
    );
    expect(currentState).toEqual({
      user: testUpdate.user,
      isAuthChecked: true,
      error: ''
    });
  });

  test('Вызов updateUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: true },
      updateUser.rejected(new Error(errorText), '', updateData)
    );
    expect(currentState).toEqual({
      error: errorText,
      isAuthChecked: false,
      user: initialState.user
    });
  });
});

describe('[apiGetUser] ', () => {
  test('Вызов apiGetUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, error: errorOldText },
      apiGetUser.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      error: 'Какая-то ошибка',
      isAuthChecked: false
    });
  });

  test('Вызов apiGetUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: false },
      apiGetUser.fulfilled(testGet, '')
    );
    expect(currentState).toEqual({
      user: testGet.user,
      isAuthChecked: true,
      error: ''
    });
  });

  test('Вызов apiGetUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isAuthChecked: false },
      apiGetUser.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      error: errorText,
      isAuthChecked: false,
      user: initialState.user
    });
  });
});
