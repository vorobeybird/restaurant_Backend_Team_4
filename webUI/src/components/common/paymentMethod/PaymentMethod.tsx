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

  let cardNumber = useAppSelector(
    (state) => state.auth?.user?.attributes[`custom:card_number`]
  );

  if (!cardNumber) cardNumber = "{}";

  return (
    <div className="payment_method_container">
      <div className="order-header">Оплата</div>
      <div>
        <form className="payment_method__form">
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
                disabled={
                  Object.keys(JSON.parse(cardNumber)).length === 0
                    ? true
                    : false
                }
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
