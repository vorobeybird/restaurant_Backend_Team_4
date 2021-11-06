import { AnyAction } from "redux";
import { OrderActions, OrderConstants, ReducerState } from "./order.types";
// import {}

const initialState: ReducerState = {
  order: {
    adress: "",
    customer_id: "",
    delivery_method: "",
    total_price: 0,
    delivery_date: new Date(),
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
      let newDate = new Date(tempOrder.delivery_date);
      return {
        order: { ...state.order, delivery_date: newDate },
      };
    }
    default:
      return state;
  }
}
