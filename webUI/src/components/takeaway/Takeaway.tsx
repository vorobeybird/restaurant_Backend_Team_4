import { ChooseDate } from "../common/chooseDate/ChooseDate";
import { ChooseTime } from "../common/chooseTime/ChooseTime";
import { EnterContacts } from "../common/enterContacts/EnterContacts";
import { PaymentMethod } from "../common/paymentMethod/PaymentMethod";

export const Takeaway = () => {
  return (
    <div className="takeaway_container">
      <ChooseDate />
      <ChooseTime />
      <EnterContacts />
      <PaymentMethod />
    </div>
  );
};
