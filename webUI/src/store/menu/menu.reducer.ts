import { ReducerState, MenuActions, MenuConstants, Category, MenuItem } from './menu.types';

const initialState = {
  items: [],
  categories: [],
  selectedCategory: 1
}

export function menuReducer(
  state: ReducerState = initialState,
  action: MenuActions
): ReducerState {
  switch (action.type) {
    case MenuConstants.GET_CATEGORIES:
      return { ...state, categories: action.payload as Category[] };
    case MenuConstants.GET_DISHES:
      return { ...state, items: action.payload as MenuItem[] };
    case MenuConstants.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload as number };
    default:
      return state;
  }
}