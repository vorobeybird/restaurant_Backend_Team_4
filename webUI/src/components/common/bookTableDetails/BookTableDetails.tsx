import { useState } from "react";

const tableForSomePeople = [
  "Двоих",
  "Четверых",
  "Шестерых",
  "Восьмерых",
  "Десятерых",
];

export const BookTableDetails = () => {
  const [tableForN, setTableForN] = useState("Двоих");

  const handleChangeTableForN = (e: any) => {
    setTableForN(e.target.value);
  };

  console.log(tableForN);

  return (
    <div>
      <div>Стол на</div>
      <select onChange={(e) => handleChangeTableForN(e)}>
        {tableForSomePeople.map((table) => {
          return <option value={table}>{table}</option>;
        })}
      </select>
    </div>
  );
};
