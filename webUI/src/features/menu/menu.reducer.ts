import { ReducerState, MenuActions, MenuConstants } from './menu.types';

const initialState = {items: []}

export function menuReducer(
  state: ReducerState = initialState,
  action: MenuActions
): ReducerState {
  switch (action.type) {
    case MenuConstants.FETCH_ITEMS:
      return { items: action.payload};
    default:
      return state;
  }
}