import { AnyAction } from "redux";
import { TableConstants, ReducerState, Table } from "./table.types";


const initialState: ReducerState = {
  tablePool: [{
  id: undefined,
  table_number: undefined,
  persons: undefined,
  reserve: [],
  },]
};

export function tableReducer(
  state: ReducerState = initialState,
  action: AnyAction
): ReducerState {
  switch (action.type) {
    case TableConstants.GET_TABLE_POOL:
      return { ...state, tablePool: action.payload as Table[]} ;
    case TableConstants.GET_TABLE_RESERVATIONS:
      const poolWithoutReservations = state.tablePool.map(table => {
        const tableIndex = action.payload.findIndex((el: any)=> table.id === el.id);
        if(tableIndex === -1) {
          return {id: table.id, table_number: table.table_number, persons: table.persons};
        } else {
          return action.payload[tableIndex];
        }        
      });
     // const poolWithoutReservations = state.tablePool.filter(table => action.payload.findIndex((el: any)=> table.id === el.id) === -1 );
     // return { ...state, tablePool: [ ...poolWithoutReservations, ...action.payload as Table[]]};
     return { ...state, tablePool: [ ...poolWithoutReservations ]};
    default:
      return state;
  }
}
