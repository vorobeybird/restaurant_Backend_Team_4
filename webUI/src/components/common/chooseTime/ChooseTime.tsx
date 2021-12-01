import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeTime } from "../../../store/order/order.actions";
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
  const deliveryMethod = useAppSelector((state) => state.order.order.delivery_method);
  const filteredTablesData = useAppSelector((state) => state.table.tablePool.filter(item => item.persons === persons));



  const handleChangeTime = (e: any, time: string) => {
    const [hours, minutes] = time.split(":");
    dispatch(changeTime(hours, minutes));
    props.setTime(time);
  };


  const checkAvailableTime = (tablesData: Table[], time: string) => {

    if (deliveryMethod === 'bookTable') {
    const result = tablesData.some((table) => {
      if (table.reserve) {
        const conflictingReservation = table.reserve.findIndex((item) => {          
          const toBeBooked = dayjs(`${item.reserve_date} ${time}`, 'YYYY-MM-DD HH:mm');
          const alreadyBooked = dayjs(`${item.reserve_date} ${item.reserve_start_time}`, 'YYYY-MM-DD HH:mm:ss').add(3, 'hour');
          const timeDifference = toBeBooked.diff(alreadyBooked,'minute');
          // console.log(timeDifference)
          return (Math.abs(timeDifference) < 240);
        }
     )
          // console.log('Conflicting reservation:', conflictingReservation)
      return conflictingReservation === -1 ? true : false;
      }
      else {
          // console.log(`Table reservations for table ${table.id} is ${table.reserve} and has a lot of slots for ${table.persons} persons on: ${time}`)
          return true;
      }
  }
    )
    return !result;
} else {
    //  console.log(dayjs());
    // console.log(dayjs().hour(Number(time.split(':')[0]) + 1))

    if (dayjs() > dayjs().hour(Number(time.split(':')[0]) - 2)) {
      return true
    }
    return false
}
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