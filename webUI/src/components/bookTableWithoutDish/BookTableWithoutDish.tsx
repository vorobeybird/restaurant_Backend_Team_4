import "./bookTableWithoutDish.scss";
import { BookTable } from "../bookTable/BookTable";
import { useAppDispatch } from "../../store/hooks";
import { changeDeliveryMethod } from "../../store/order/order.actions";

export const BookTableWithoutDish = () => {
  const dispatch = useAppDispatch();
  dispatch(changeDeliveryMethod("bookTable"))

  return (
    <div className="booking-wrapper">
      <div className="booking-title">Забронировать стол</div>
      <BookTable />
      <div className="booking__button-wrapper">
        <button>Отмена</button>
        <button>Забронировать</button>
      </div>
    </div>
  )
};
