import "./chooseDate.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeDate } from "../../../store/order/order.actions";

export const ChooseDate = () => {
  const date = useAppSelector((state) => state.order.order.delivery_date);

  const dispatch = useAppDispatch();

  // console.log(date);

  const onChangeData = (value: Date) => {
    dispatch(changeDate(value));
  };

  return (
    <div className="choose_date_container">
      <div>
        <p>Выберите дату</p>
      </div>
      <div className="calendar">
        <div>Дата</div>
        <div>
          <Calendar onChange={onChangeData} value={date} />
        </div>
      </div>
    </div>
  );
};
