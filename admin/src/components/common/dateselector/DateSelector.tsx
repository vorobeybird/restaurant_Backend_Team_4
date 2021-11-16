import {useState} from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import dayjs from 'dayjs';
import "dayjs/locale/ru"
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';

interface IDateProps {
  date: Date | null;
  setDate: Function;
}
const DateSelector = ({date, setDate}: IDateProps)=> {

    dayjs.locale("ru");
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Выбрать дату"
          value={date}
          onChange={(newValue: Date | null) => {
            setDate(newValue);
          }}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
}

export default DateSelector;