import { combineReducers, createStore, applyMiddleware } from 'redux';
import { menuReducer } from './menu/menu.reducer';
import { ReducerState } from './menu/menu.types';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface RootState {
  menu: ReducerState;
}


const store = createStore<RootState, any, any, any>(
  combineReducers({
    menu: menuReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
  );
  
  export default store;
  
  export type AppDispatch = typeof store.dispatch