import { combineReducers, createStore, applyMiddleware } from 'redux';
import { menuReducer } from '../features/menu/menu.reducer';
import { ReducerState } from '../features/menu/menu.types';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from "./auth/auth.reducer";

export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  menu: menuReducer,
  auth: authReducer,
})

const store = createStore<AppStateType, any, any, any>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;