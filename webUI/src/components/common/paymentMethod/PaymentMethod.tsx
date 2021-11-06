import { useState } from "react";

export const PaymentMethod = () => {
  const [paymentMethod, setpaymentMethod] = useState("2");

  const onValueChange = (event: any) => {
    setpaymentMethod(event.target.value);
  };

  console.log(paymentMethod);

  return (
    <div>
      <div>Оплата</div>
      <div>
        <form>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="0"
                checked={paymentMethod === "0"}
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
                checked={paymentMethod === "1"}
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
                checked={paymentMethod === "2"}
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
