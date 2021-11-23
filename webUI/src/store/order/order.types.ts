export interface DishShortInfo {
  dish_id: number;
  dish_amount: number;
  excluded_ingredients: string;
}

export interface Order {
  delivery_method: DELIVERY_METHOD;
  payment_method: number;
  customer_id: string;
  total_price: number;
  delivery_date: Date;
  comment: string;
  dish: DishShortInfo[];
  adress: string;
  contact_name: string;
  contact_phone: string;
  num_of_persons: number;
}

export interface ReducerState {
  order: Order;
}

export enum DELIVERY_METHOD {
  takeaway = "takeaway",
  delivery = "delivery",
  bookTable = "bookTable",
};

export enum OrderConstants {
  CHANGE_DATE = "CHANGE_DATE",
  CHANGE_TIME = "CHANGE_TIME",
  ENTER_NAME = "ENTER_NAME",
  ENTER_PHONE = "ENTER_PHONE",
  CHANGE_PAYMENT_METHOD = "CHANGE_PAYMENT_METHOD",
  RESET_STATE = "RESET_STATE",
  ENTER_ADDRESS = "ENTER_ADDRESS",
  CHANGE_NUMBER_OF_PEOPLE = "CHANGE_NUMBER_OF_PEOPLE",
  CHANGE_DELIVERY_METHOD = "CHANGE_DELIVERY_METHOD",
  CHANGE_TOTAL_PRICE = "CHANGE_TOTAL_PRICE",
}

export interface OrderActions {
  type: OrderConstants;
  payload: Order;
}
