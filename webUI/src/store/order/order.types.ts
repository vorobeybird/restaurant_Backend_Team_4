export interface DishShortInfo {
  dish_id: number;
  dish_amount: number;
  exclude_ingredients: string;
}

export interface Order {
  adress: string;
  customer_id: string;
  delivery_method: string;
  total_price: number;
  delivery_date: Date;
  contact_name: string;
  contact_phone: string;
  payment_method: number;
  comment: string;
  dish: DishShortInfo[];
}

export interface ReducerState {
  order: Order;
}

export enum OrderConstants {
  CHANGE_DATE = "CHANGE_DATE",
  CHANGE_TIME = "CHANGE_TIME",
  ENTER_NAME = "ENTER_NAME",
  ENTER_PHONE = "ENTER_PHONE",
  CHANGE_PAYMENT_METHOD = "CHANGE_PAYMENT_METHOD",
  RESET_STATE = "RESET_STATE",
  ENTER_ADDRESS = "ENTER_ADDRESS",
}

export interface OrderActions {
  type: OrderConstants;
  payload: Order;
}
