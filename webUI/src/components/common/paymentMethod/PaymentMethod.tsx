import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changePaymentMethod } from "../../../store/order/order.actions";
import "./paymentMethod.scss";

export const PaymentMethod = (props: any) => {
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
            <label className={props.isBookTable ? "label-disabled" : undefined}>
              <input
                type="radio"
                value="0"
                disabled={props.isBookTable ? true : false}
                checked={currentPaymentMethod === 0}
                onChange={onValueChange}
              />
              Наличными
            </label>
          </div>
          <div className="radio">
            <label
              className={
                Object.keys(JSON.parse(cardNumber)).length === 0
                  ? "label-disabled"
                  : undefined
              }
            >
              <input
                type="radio"
                value="1"
                title="Для разблокировки данной функции нужно привязать карту в личном кабинете"
                disabled={
                  Object.keys(JSON.parse(cardNumber)).length === 0
                    ? true
                    : false
                }
                checked={
                  currentPaymentMethod === 1 || props.isBookTable === true
                }
                onChange={onValueChange}
              />
              Картой онлайн
            </label>
          </div>
          <div className="radio">
            <label className={props.isBookTable ? "label-disabled" : undefined}>
              <input
                type="radio"
                value="2"
                disabled={props.isBookTable ? true : false}
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
