import { ReducerState,  MenuActions, MenuConstants} from './dishPage.types';

let initialState: any = {selectedDish: []};

const dishPageReducer = (state: ReducerState = initialState, action: MenuActions): ReducerState => {
  switch (action.type) {
    case MenuConstants.SET_SELECTED_DISH:
      return { ...state, selectedDish: action.payload };
    default:
      return state;
  }
}

export default dishPageReducer;