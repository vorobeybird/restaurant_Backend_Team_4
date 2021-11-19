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
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "15:30",
  "16:00",
  "16:30",
  "18:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

interface ChooseTimeProps {
  time: string;
  setTime: (time: string) => void;
}

export const ChooseTime = ({ ...props }: ChooseTimeProps) => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.order.order.delivery_date);
  const tablesData = useAppSelector((state) => state.table.tablePool);
 const order = useAppSelector((state) => state.order.order);

  const handleChangeTime = (e: any, time: string) => {
    const [hours, minutes] = time.split(":");
    dispatch(changeTime(hours, minutes));
    props.setTime(time);
  };

  const checkAvailableTime = (tablesData: Table[], persons: number, time: string) => {
    
    const result = tablesData.some((table => (table.persons === persons) && table.reserve && table.reserve.forEach(reserve => { 
     /*  console.log("time + 4 h", dayjs(`${reserve.reserve_date} ${time}:00`, 'YYYY-MM-DD HH:mm:ss').add(4, 'h') >= dayjs(`${reserve.reserve_date} ${reserve.reserve_time}`, 'YYYY-MM-DD HH:mm:ss'))
      const endTime = dayjs(`${reserve.reserve_date} ${time}:00`, 'YYYY-MM-DD HH:mm:ss').add(4, 'h'); */
      const startTime = time.split(':');
      const endTime = Number(startTime[0]) + 4; 
      const reservedTime = reserve.reserve_time?.split(':');
      console.log('Reserved time', reservedTime && reservedTime[0])
      console.log('End time', endTime)
      if ((reservedTime) && endTime > Number(reservedTime[0])) {
        return true
      } else {
        return false
      }
      // if (endTime <= dayjs(`${reserve.reserve_date} ${reserve.reserve_time}`, 'YYYY-MM-DD HH:mm:ss')) {
      //   return false
      // } else {
      //   return true
      // }
      // return dayjs(`${reserve.reserve_date} ${time}:00`, 'YYYY-MM-DD HH:mm:ss').add(4, 'h') >= dayjs(`${reserve.reserve_date} ${reserve.reserve_time}`, 'YYYY-MM-DD HH:mm:ss')
    })))
    return result

  }

  return (
    <div className="choose_time_container">
      <div className="order-header" >Время</div>
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
                  disabled = {checkAvailableTime(tablesData, order.num_of_persons, timeItem)}
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