import { AppDispatch } from "..";
import { OrderConstants } from "./order.types";

export const changeDate = (date: Date) => (dispatch: AppDispatch) => {
  dispatch({ type: OrderConstants.CHANGE_DATE, payload: date });
};

export const changeTime =
  (hours: string, minutes: string) => (dispatch: AppDispatch) => {
    dispatch({ type: OrderConstants.CHANGE_TIME, payload: { hours, minutes } });
  };
