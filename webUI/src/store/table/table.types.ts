export interface ReducerState {
  tablePool: Table[];
}

export interface Table {
  id: number | null,
  table_number: number | null;
  persons: number | null;
  reserve: Reservation[];
}

export interface Reservation {
  id: number | null;
  table_id: number | null;
  reserve_date: string | null;
  reserve_time: string | null;
}

export enum TableConstants {
  GET_TABLE_POOL = "GET_TABLE_POOL",
  GET_TABLE_RESERVATIONS = "GET_TABLE_RESERVATIONS",
}

export interface TableActions {
  type: TableConstants;
  payload: Table[];
}

