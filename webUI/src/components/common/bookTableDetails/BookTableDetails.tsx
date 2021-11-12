import { useState } from "react";
import { dispatch } from "react-hot-toast/dist/core/store";
import { useAppDispatch } from "../../../store/hooks";
import { chooseNumOfPeople } from "../../../store/order/order.actions";

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
  const dispatch = useAppDispatch();

  const [numberOfPeople, setNumberOfPeople] = useState(2);

  const handleChangeTableForN = (e: any) => {
    setNumberOfPeople(Number(e.target.value));
    dispatch(chooseNumOfPeople(Number(e.target.value)));
  };

  console.log(numberOfPeople);

  return (
    <div>
      <div>Стол на</div>
      <select onChange={(e) => handleChangeTableForN(e)}>
        {tableForSomePeople.map((table) => {
          return <option value={table.num}>{table.str}</option>;
        })}
      </select>
    </div>
  );
};
