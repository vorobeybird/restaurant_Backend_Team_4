import { ReducerState } from "../../store/cart/cart.types";
import { CartConstants } from "./cart.types";
import { AnyAction } from "redux";

const initialState = { items: [] };

export function cartReducer(
  state: ReducerState = initialState,
  action: AnyAction
): ReducerState {
  switch (action.type) {
    case CartConstants.ADD_TO_CART:
      return { items: [...state.items, action.payload] };
    case CartConstants.INCREMENT_NUMBER_OF_DISHES: {
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    case CartConstants.REMOVE_FROM_CART: {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return { items: [...filteredItems] };
    }
    default:
      return state;
  }
}
