import { combineReducers, createStore, applyMiddleware } from "redux";
import { menuReducer } from "../store/menu/menu.reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./auth/auth.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { orderReducer } from "./order/order.reducer";
import { tableReducer } from "./table/table.reducer";
import dishPageReducer from "./dishPage/dishPage.reducer";

export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  menu: menuReducer,
  auth: authReducer,
  cartItems: cartReducer,
  order: orderReducer,
  dishPage: dishPageReducer,
  table: tableReducer,
})

const store = createStore<AppStateType, any, any, any>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
