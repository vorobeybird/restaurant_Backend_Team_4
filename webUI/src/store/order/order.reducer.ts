import { AnyAction } from "redux";
import { OrderActions, OrderConstants, ReducerState } from "./order.types";

let currentDate = new Date();
currentDate.setSeconds(0);
currentDate.setMinutes(0);
currentDate.setHours(0);

const initialState: ReducerState = {
  order: {
    adress: "",
    customer_id: "",
    delivery_method: "",
    total_price: 0,
    delivery_date: currentDate,
    contact_name: "",
    contact_phone: "",
    payment_method: 0,
    comment: "",
    dish: [],
  },
};

export function orderReducer(
  state: ReducerState = initialState,
  action: AnyAction
): ReducerState {
  switch (action.type) {
    case OrderConstants.CHANGE_DATE:
      return { order: { ...state.order, delivery_date: action.payload } };
    case OrderConstants.CHANGE_TIME: {
      let tempOrder = { ...state.order };
      tempOrder.delivery_date.setHours(action.payload.hours);
      tempOrder.delivery_date.setMinutes(action.payload.minutes);
      tempOrder.delivery_date.setSeconds(0);
      let newDate = new Date(tempOrder.delivery_date);
      return {
        order: { ...state.order, delivery_date: newDate },
      };
    }
    case OrderConstants.ENTER_PHONE:
      return { order: { ...state.order, contact_phone: action.payload } };
    case OrderConstants.ENTER_NAME:
      return { order: { ...state.order, contact_name: action.payload } };
    case OrderConstants.CHANGE_PAYMENT_METHOD:
      return { order: { ...state.order, payment_method: action.payload } };
    default:
      return state;
  }
}
