import {createSlice} from '@reduxjs/toolkit';
// import {setAutoFreeze} from 'immer';
// setAutoFreeze(false);

interface IHistory {
  id: string;
  type: string;
  date: string;
  paymentType: number;
  orderStatus: string;
}

export interface IDishShortInfo {
  dish_id: number;
  dish_amount: number;
  excluded_ingredients: string;
}

export interface IOrder {
  address: string;
  customer_id: string;
  delivery_method: string;
  total_price: number;
  delivery_date: string;
  contact_name: string;
  payment_method: number;
  contact_phone: string;
  comment: string;
  reserve_time: string;
  status: string;
  reserve_date: string;
  num_of_persons: number;
  dish: IDishShortInfo[];
}

export interface IOrdersState {
  orderType: string;
  date: any;
  paymentType: string;
  num: string;
  orderHistory: IHistory[];
  order: IOrder[];
}

export const initialState: IOrdersState = {
  orderType: '',
  date: '',
  paymentType: '',
  num: '',
  orderHistory: [],
  order: [],
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
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
    getOrder(state, action) {
      state.order = action.payload;
    },
    getNumOfPersons(state, action) {
      state.num = action.payload;
    },
    addOrderHistoryItem(state, action) {
      state.orderHistory.push({...action.payload});
    },
  },
});

export const ordersReducer = ordersSlice.reducer;
export const ordersActions = ordersSlice.actions;
