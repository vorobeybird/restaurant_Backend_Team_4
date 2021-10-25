import { combineReducers, createStore, applyMiddleware } from 'redux';
import { menuReducer } from './menu/menu.reducer';
import { ReducerState } from './menu/menu.types';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {authReducer} from "./auth/auth.reducer";


const rootReducer = combineReducers({
    menu: menuReducer,
    auth: authReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore<AppStateType, any, any, any>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
