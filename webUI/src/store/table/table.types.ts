export interface ReducerState {
  tablePool: Table[];
}

export interface Table {
  id: number | undefined,
  table_number: number | undefined;
  persons: number | undefined;
  reserve: Reservation[];
}

export interface Reservation {
  id: number | undefined;
  table_id: number | undefined;
  reserve_date: string | undefined;
  reserve_start_time: string | undefined;
}

export enum TableConstants {
  GET_TABLE_POOL = "GET_TABLE_POOL",
  GET_TABLE_RESERVATIONS = "GET_TABLE_RESERVATIONS",
}

export interface TableActions {
  type: TableConstants;
  payload: Table[];
}

