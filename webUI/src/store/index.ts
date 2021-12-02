import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";

import { menuReducer } from "../store/menu/menu.reducer";
import { authReducer } from "./auth/auth.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { orderReducer } from "./order/order.reducer";
import { tableReducer } from "./table/table.reducer";
import dishPageReducer from "./dishPage/dishPage.reducer";

const rootReducer = combineReducers({
  menu: menuReducer,
  auth: authReducer,
  cartItems: cartReducer,
  order: orderReducer,
  dishPage: dishPageReducer,
  table: tableReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dishPage'],
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer)

const store = createStore<typeof persistedReducer, any, any, any>(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store)

export {
  store,
  persistor,
}

export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof rootReducer>;

export default store;