import { ICartItem, ReducerState } from "../../store/cart/cart.types";
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
    case CartConstants.ADD_SAME_DISH: {
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
    case CartConstants.INCREMENT_NUMBER_OF_DISHES: {
      const newItems = [...state.items];
      const itemIndex = newItems.findIndex(
        (item) => item.id === action.payload
      );
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        amount: newItems[itemIndex].amount + 1,
      };
      return { items: newItems };
    }
    case CartConstants.DECREMENT_NUMBER_OF_DISHES: {
      const newItems = [...state.items];
      const itemIndex = newItems.findIndex(
        (item) => item.id === action.payload
      );
      newItems[itemIndex] =
        newItems[itemIndex].amount > 1
          ? {
              ...newItems[itemIndex],
              amount: newItems[itemIndex].amount - 1,
            }
          : {
              ...newItems[itemIndex],
              amount: newItems[itemIndex].amount,
            };
      return { items: newItems };
    }
    case CartConstants.CLEAR_CART: {
      return { ...state, items:  action.payload};
    }
    case CartConstants.OMIT_INGREDIENT: {
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item, 
            excluded_ingredients: [...item.excluded_ingredients, action.payload.ingredient]}
        }
        return item;
      })
      return { items: newItems };
    }
    case CartConstants.PICK_INGREDIENT: {
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item, 
            excluded_ingredients: item.excluded_ingredients.filter(ing => ing !== action.payload.ingredient)}
        }
        return item;
      })
      return { items: newItems };
    }
    default:
      return state;
  }
}
