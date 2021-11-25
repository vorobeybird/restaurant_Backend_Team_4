import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {  changeTotalPrice, chooseNumOfPeople } from "../../../store/order/order.actions";
import { Table } from "../../../store/table/table.types";
import "./bookTableDetails.scss";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const BookTableDetails = () => {
  const order = useAppSelector((state) => state.order.order);
  const tablesData = useAppSelector((state) => state.table.tablePool);

  const stringifyPersons = (persons: number | undefined) => {
    switch(persons){
      case 2:
        return "Двоих";
      case 4:
        return "Четверых";
      case 6:
        return "Шестерых";
      case 8:
        return "Восьмерых";
      case 10:
        return "Десятерых";
      default:
          return persons;
    }
  }
  const checkAvailableTable = (table: Table) => {
    if (!table.reserve) {
      return true;
    }

    if (table.reserve && table.reserve.length < 3) {
      return true; 
    } else {
      return false;
    }
  }

  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [available, setAvaliable] = useState<any>([]);
  const [allTables, setAllTables] = useState<number[]>([]);

  const findAvailableTables = (tables: Table[]) => {
    let tempAvailable: number[] = [];
    let tempAllTables: number[] = [];

    tables.forEach(table => {
      if (table.persons) {
      if (checkAvailableTable(table) && !tempAvailable.includes(table.persons))  tempAvailable.push(table.persons); // push table to available tables pool if it is not added there yet
      if (!tempAllTables.includes(table.persons)) tempAllTables.push(table.persons);
      }
  })
  setAvaliable(tempAvailable);
  tempAllTables.sort((a: number, b: number) => a - b);
  setAllTables(tempAllTables);
  }
  
  useEffect(() => {
    setNumberOfPeople(order.num_of_persons);
    findAvailableTables(tablesData);
  }, []);

  const dispatch = useAppDispatch();

  const handleChangeTableForN = (e: any) => {
    setNumberOfPeople(Number(e.target.value));
    dispatch(chooseNumOfPeople(Number(e.target.value)));
  };

  return (
    <div className="table-selector">
      <div className="order-header" >Количество гостей</div>
      <div className='table-selector__header'>Стол на</div>
      <select onChange={(e) => handleChangeTableForN(e)}>
        {allTables.map((table: number) => {
          if (order.num_of_persons === table)
            return (
              <option selected disabled={!available.includes(table)} value={table}>
                {stringifyPersons(table)}
              </option>
            );
          else return <option disabled={!available.includes(table)} value={table}>{stringifyPersons(table)}</option>;
        })}
      </select>
    </div>
  );
};
