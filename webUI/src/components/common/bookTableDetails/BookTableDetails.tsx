import { useEffect, useState } from "react";
import { dispatch } from "react-hot-toast/dist/core/store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeTotalPrice, chooseNumOfPeople } from "../../../store/order/order.actions";
import "./bookTableDetails.scss";

const tableForSomePeople = [
  {
    str: "Двоих",
    num: 2,
  },
  {
    str: "Четверых",
    num: 4,
  },
  {
    str: "Шестерых",
    num: 6,
  },
  {
    str: "Восьмерых",
    num: 8,
  },
  {
    str: "Десятерых",
    num: 10,
  },
];

export const BookTableDetails = () => {
  const order = useAppSelector((state) => state.order.order);

  useEffect(() => setNumberOfPeople(order.num_of_persons), []);

  const dispatch = useAppDispatch();

  const [numberOfPeople, setNumberOfPeople] = useState(2);

  const handleChangeTableForN = (e: any) => {
    setNumberOfPeople(Number(e.target.value));
    dispatch(chooseNumOfPeople(Number(e.target.value)));
  };

  console.log(numberOfPeople);

  return (
    <div className="table-selector">
      <div className="order-header" >Количество гостей</div>
      <div className='table-selector__header'>Стол на</div>
      <select onChange={(e) => handleChangeTableForN(e)}>
        {tableForSomePeople.map((table) => {
          if (order.num_of_persons === table.num)
            return (
              <option selected value={table.num}>
                {table.str}
              </option>
            );
          else return <option value={table.num}>{table.str}</option>;
        })}
      </select>
    </div>
  );
};
