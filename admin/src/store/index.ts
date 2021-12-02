import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./auth/auth.reducer";

export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = createStore<AppStateType, any, any, any>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
