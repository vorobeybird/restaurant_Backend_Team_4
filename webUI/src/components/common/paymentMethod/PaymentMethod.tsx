import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changePaymentMethod } from "../../../store/order/order.actions";
import "./paymentMethod.scss";

export const PaymentMethod = () => {
  const dispatch = useAppDispatch();

  const currentPaymentMethod = useAppSelector(
    (state) => state.order.order.payment_method
  );

  const onValueChange = (event: any) => {
    dispatch(changePaymentMethod(Number(event.target.value)));
  };

  return (
    <div className="payment_method_container">
      <div>Оплата</div>
      <div>
        <form>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="0"
                checked={currentPaymentMethod === 0}
                onChange={onValueChange}
              />
              Наличными
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="1"
                checked={currentPaymentMethod === 1}
                onChange={onValueChange}
              />
              Картой онлайн
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="2"
                checked={currentPaymentMethod === 2}
                onChange={onValueChange}
              />
              Картой на месте
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
