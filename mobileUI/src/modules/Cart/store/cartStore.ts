import {createSlice} from '@reduxjs/toolkit';

interface IDish {
  id: string;
  title: string;
  photo: any[];
  price: number;
  cardQuantity: number;
  ingredient: [];
  excluded_ingredients: string[];
}

interface ICartState {
  dishes: IDish[];
  cardTotalQuantity: number;
  cardTotalAmount: number;
}

const initialCartState: ICartState = {
  dishes: [],
  cardTotalQuantity: 0,
  cardTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.dishes.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.dishes[itemIndex].cardQuantity += 1;
      } else {
        const tempProd = {...action.payload, cardQuantity: 1};
        state.dishes.push(tempProd);
      }
    },
    decreaseCartQuant(state, action) {
      const itemIndex = state.dishes.findIndex(
        dishes => dishes.id === action.payload.id,
      );
      if (state.dishes[itemIndex].cardQuantity > 1) {
        state.dishes[itemIndex].cardQuantity -= 1;
      } else if (state.dishes[itemIndex].cardQuantity === 1) {
        const nextItems = state.dishes.filter(
          dishes => dishes.id !== action.payload.id,
        );
        state.dishes = nextItems;
      }
    },
    getTotals(state) {
      let {total, quantity} = state.dishes.reduce(
        (cartTotal, cartItem) => {
          const {price, cardQuantity} = cartItem;
          const itemTotal = price * cardQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cardQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      state.cardTotalQuantity = quantity;
      state.cardTotalAmount = total;
    },
    addExcludedIngredients(state, action) {
      state.dishes = state.dishes.map(dish =>
        dish.title !== action.payload.title
          ? dish
          : {...dish, excluded_ingredients: action.payload.excludedIngredients},
      );
    },
    clearCart(state) {
      state.dishes = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
