import { AppDispatch } from "..";
import { OrderConstants } from "./order.types";

export const changeDate = (date: Date) => (dispatch: AppDispatch) => {
  dispatch({ type: OrderConstants.CHANGE_DATE, payload: date });
};

export const changeTime =
  (hours: string, minutes: string) => (dispatch: AppDispatch) => {
    dispatch({ type: OrderConstants.CHANGE_TIME, payload: { hours, minutes } });
  };

export const enterName = (name: string) => (dispatch: AppDispatch) => {
  dispatch({ type: OrderConstants.ENTER_NAME, payload: name });
};

export const enterPhone = (phone: string) => (dispatch: AppDispatch) => {
  dispatch({ type: OrderConstants.ENTER_PHONE, payload: phone });
};

export const changePaymentMethod =
  (payment_method: number) => (dispatch: AppDispatch) => {
    dispatch({
      type: OrderConstants.CHANGE_PAYMENT_METHOD,
      payload: payment_method,
    });
  };
