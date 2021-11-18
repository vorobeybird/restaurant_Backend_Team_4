import { AnyAction } from "redux";
import { TableConstants, ReducerState, Table } from "./table.types";


const initialState: ReducerState = {
  tablePool: [{
  id: null,
  table_number: null,
  persons: null,
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
    
    default:
      return state;
  }
}
