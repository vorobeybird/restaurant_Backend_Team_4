import "./chooseDate.scss";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeDate } from "../../../store/order/order.actions";
import { getTablePool, getTableReservations } from "../../../store/table/table.actions";

export const ChooseDate = () => {
  const date = useAppSelector((state) => state.order.order.delivery_date);

  const dispatch = useAppDispatch();

  const onChangeData = (value: Date) => {
    value.setMinutes(date.getMinutes());
    value.setHours(date.getHours());
    dispatch(changeDate(value));
    dispatch(getTableReservations(value));

  };

  return (
      <>
      <div className="order-header">Дата</div>
      <div className="choose_date">
        <div>
          <Calendar minDate={new Date()} onChange={onChangeData} value={date} prev2Label={null} next2Label={null}/>
        </div>
      </div>
      </>
  );
};