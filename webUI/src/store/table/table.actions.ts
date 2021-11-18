import { AppDispatch } from "..";
import { TableConstants } from "./table.types";
import axios, { AxiosResponse } from "axios";
import dayjs from 'dayjs';

const getTablesReservations = async (date?: Date) => {

  const strToDate = dayjs(date).format('YYYY-MM-DD');
  const GET_TABLES_URL: string = date 
  ? `${process.env.REACT_APP_GET_DISHES}/api/tables/${strToDate}` 
  : `${process.env.REACT_APP_GET_DISHES}/api/table`;

   return await axios.get<AxiosResponse>(GET_TABLES_URL)
  .then(response => response.data)
  .catch(err=> console.error(err))
  };


  export const getTablePool = () => async (dispatch: AppDispatch) => {
    const tables = await getTablesReservations();
    dispatch({ type: TableConstants.GET_TABLE_POOL, payload: tables });
  };
  

export const getTableReservations = (date: Date | undefined) => async (dispatch: AppDispatch) => {
  const tablesReserved = await getTablesReservations(date);
  dispatch({ type: TableConstants.GET_TABLE_RESERVATIONS, payload: tablesReserved });
};
