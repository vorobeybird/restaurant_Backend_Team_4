import { combineReducers, createStore, applyMiddleware } from 'redux';
import { menuReducer } from '../store/menu/menu.reducer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from "./auth/auth.reducer";
import { cartReducer } from './cart/cart.reducer';

export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  menu: menuReducer,
  auth: authReducer,
  cartItems: cartReducer
})

const store = createStore<AppStateType, any, any, any>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;