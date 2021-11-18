import { AppDispatch } from "..";
import { TableConstants } from "./table.types";
import axios, { AxiosResponse } from "axios";
import dayjs from 'dayjs';

const getTables = async (date: Date | undefined) => {

  const strToDate = dayjs(date).format('YYYY-MM-DD');
  const GET_TABLES_URL: string = strToDate 
  ? `${process.env.REACT_APP_GET_DISHES}/api/tables/${strToDate}` 
  : `${process.env.REACT_APP_GET_DISHES}/api/tables`;

   return await axios.get<AxiosResponse>(GET_TABLES_URL)
  .then(response => response.data)
  .catch(err=> console.error(err))
  };

export const getTablePool = (date: Date | undefined) => async (dispatch: AppDispatch) => {
  const tables = await getTables(date);
  dispatch({ type: TableConstants.GET_TABLE_POOL, payload: tables });
};
