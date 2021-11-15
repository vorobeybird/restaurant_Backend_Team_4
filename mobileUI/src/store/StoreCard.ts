import {createSlice} from '@reduxjs/toolkit';
interface CounterState {
  dishes: Dish[];
  cardTotalQuantity: number;
  cardTotalAmount: number;
  orderType: string;
  date: any;
  paymentType: string;
  email: string;
  password: string;
  isSignedIn: boolean;
}
interface Dish {
  id: string;
  title: string;
  photos: any[];
  price: number;
  cardQuantity: number;
  descr: any[];
  excluded_ingredients: string[];
}

export const initialState: CounterState = {
  dishes: [],
  cardTotalQuantity: 0,
  cardTotalAmount: 0,
  orderType: '',
  date: '',
  paymentType: '',
  email: '',
  password: '',
  isSignedIn: false,
};
export const dishSlice = createSlice({
  name: 'dishSlice',
  initialState,
  reducers: {
    reset: state => initialState,
    addToCard(state, action) {
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
    delFromCard(state, action) {
      const nextItems = state.dishes.filter(
        dishes => dishes.id !== action.payload.id,
      );

      state.dishes = nextItems;
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
    getTotals(state, action) {
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
    clearCart(state) {
      state.dishes = [];
    },
    addOrderType(state, action) {
      state.orderType = action.payload;
      console.log(state.orderType);
    },
    addDate(state, action) {
      state.date = action.payload;
      console.log(state.date);
    },
    addPaymentType(state, action) {
      state.paymentType = action.payload;
      console.log(state.paymentType);
    },
    addEmail(state, action) {
      state.email = action.payload;
      console.log(state.email);
    },
    addPassword(state, action) {
      state.password = action.payload;
      console.log(state.password);
    },
    addSignInStat(state, action) {
      state.isSignedIn = action.payload;
      console.log(state.isSignedIn);
    },
    addExcludedIngredients(state, action) {
      state.dishes = state.dishes.map(dish =>
        dish.title !== action.payload.title
          ? dish
          : {...dish, excluded_ingredients: action.payload.excludedIngredients},
      );
    },
  },
});
export default dishSlice.reducer;
export const {
  reset,
  addToCard,
  delFromCard,
  decreaseCartQuant,
  getTotals,
  clearCart,
  addOrderType,
  addDate,
  addPaymentType,
  addEmail,
  addSignInStat,
  addPassword,
  addExcludedIngredients,
} = dishSlice.actions;
