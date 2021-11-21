import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeTime } from "../../../store/order/order.actions";
import { Button } from "../button/Button";
import "./chooseTime.scss";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Table } from "../../../store/table/table.types";
dayjs.extend(customParseFormat);

const possibleTime = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

interface ChooseTimeProps {
  time: string;
  setTime: (time: string) => void;
}

export const ChooseTime = ({ ...props }: ChooseTimeProps) => {
  const dispatch = useAppDispatch();
  const persons = useAppSelector((state) => state.order.order.num_of_persons);
  const filteredTablesData = useAppSelector((state) => state.table.tablePool.filter(item => item.persons === persons));



  const handleChangeTime = (e: any, time: string) => {
    const [hours, minutes] = time.split(":");
    dispatch(changeTime(hours, minutes));
    props.setTime(time);
  };

  const checkAvailableTime = (tablesData: Table[], time: string) => {

    const result = tablesData.some((table) => {

      if (table.reserve) {
        const conflictingReservation = table.reserve.findIndex((item) => {          
      /*     if ((Math.abs(dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm').diff(dayjs(`${item.reserve_date} ${item.reserve_time}`, 'YYYY-MM-DD HH:mm:ss').add(3, 'hour'),'minute')) < 240)) 
         {
           console.log(Math.abs(dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm').diff(dayjs(`${item.reserve_date} ${item.reserve_time}`, 'YYYY-MM-DD HH:mm:ss'),'minute')))
           console.log('Time we choose: ', dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm'));

           console.log(`Table ${table.id} has no free reservations slot on this time: ${time}. `, (Math.abs(dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm').diff(dayjs(`${item.reserve_date} ${item.reserve_time}`, 'YYYY-MM-DD HH:mm:ss'),'minute')) < 240))
         } else {
           console.log(Math.abs(dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm').diff(dayjs(`${item.reserve_date} ${item.reserve_time}`, 'YYYY-MM-DD HH:mm:ss'),'minute')))
           console.log(`Table ${table.id} has free reservation slot on this time: ${time}`, (Math.abs(dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm').diff(dayjs(`${item.reserve_date} ${item.reserve_time}`, 'YYYY-MM-DD HH:mm:ss'),'minute')) < 240))
         } */

         /* console.log('Time we chose: ', dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm'));
         console.log('Time we found in reservations array: ', dayjs(`${item.reserve_date} ${item.reserve_time}`, 'YYYY-MM-DD HH:mm:ss')); */
          const toBeBooked = dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm');
          const alreadyBooked = dayjs(`${item.reserve_date} ${item.reserve_time}`, 'YYYY-MM-DD HH:mm:ss').add(3, 'hour');
          const timeDifference = toBeBooked.diff(alreadyBooked,'minute');
          return (Math.abs(timeDifference) < 240);
        }
     )
          console.log('Conflicting reservation:', conflictingReservation)
      return conflictingReservation === -1 ? true : false;
      }
      else {
          console.log(`Table reservations for table ${table.id} is ${table.reserve} and has a lot of slots for ${table.persons} persons on: ${time}`)
          return true;
      }
  }
    )
    return !result;

  }

  return (
    <div className="choose_time_container">
      <div className="order-header">Время</div>
      <div>
        <div className="time_container">
          {possibleTime.map((timeItem) => {
            return (
              <div  className={
                timeItem === props.time ? "timebox pushed_button" : "timebox"
              }>
                <button
                  className="timebox__button"
                  type="button"
                  name={timeItem}
                  disabled={checkAvailableTime(filteredTablesData, timeItem)}
                  onClick={(e) => handleChangeTime(e, timeItem)}
                >
                  <span>
                    {timeItem}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};