import { useEffect, useState } from "react";
import { dispatch } from "react-hot-toast/dist/core/store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chooseNumOfPeople } from "../../../store/order/order.actions";
import { Table } from "../../../store/table/table.types";
import "./bookTableDetails.scss";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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
  const tablesData = useAppSelector((state) => state.table.tablePool);
  console.log(tablesData)

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
      console.log('here_no table_reserve')
      return true;
    }
    if (table.reserve && table.reserve.length < 3) {
      console.log('reserve_less than 3')
      return true; 
    } else {
      console.log('default')
    return false;
    }
    
/*     const slotsReserved = table.reserve && table.reserve.map(resId => dayjs(`${resId.reserve_date} ${resId.reserve_time}`, 'YYYY-MM-DD HH-mm-ss'));
    if (slotsReserved && slotsReserved.length < 3) {
       slotsReserved.sort((a, b) => {
      if (a.isBefore(b)) return -1;
      return 1;
    });
    for (let i = 0; i < slotsReserved.length - 1; i++) {
      if (slotsReserved[i].subtract(4, 'h').isBefore(dayjs(`${table.reserve.reserve_date[0]} ${resId.reserve_time}`, 'YYYY-MM-DD HH-mm-ss')) )
      if (slotsReserved[i].add(4, 'h') >= slotsReserved[i+1]) return true;
      
    }
    } */

  }

  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [available, setAvaliable] = useState<any>([]);
  const [allTables, setAllTables] = useState<any>([]);
  const findAvailableTables = (tables: Table[]) => {
    let tempAvailable: any[]= [];
    let tempAllTables: any[]= [];
    tables.forEach(table => {
      if (checkAvailableTable(table) && !tempAvailable.includes(table.persons)) { tempAvailable.push(table.persons)};
      if (!tempAllTables.includes(table.persons)) {tempAllTables.push(table.persons)};
  })
  setAvaliable(tempAvailable);
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
