import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeTime } from "../../../store/order/order.actions";
import { Button } from "../button/Button";
import "./chooseTime.scss";

const possibleTime = [
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "15:30",
  "16:00",
  "16:30",
  "18:00",
  "20:30",
];

// interface ChooseTimeProps {
//   onChange: (date: Date) => void;
// }

export const ChooseTime = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.order.order.delivery_date);

  const handleChangeTime = (e: any, time: string) => {
    const [hours, minutes] = time.split(":");
    dispatch(changeTime(hours, minutes));
    // onChange?.(date);
  };

  return (
    <div className="choose_time_container">
      <div>Выберите время</div>
      <div>
        <div>Время</div>
        <div className="time_container">
          {possibleTime.map((time) => {
            return (
              <div className="timebox">
                <Button
                  type="button"
                  name={time}
                  onClick={(e) => handleChangeTime(e, time)}
                >
                  <span
                    className={
                      time === "" + date.getHours() + ":" + date.getMinutes()
                        ? "pushed_button"
                        : undefined
                    }
                  >
                    {time}
                  </span>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
