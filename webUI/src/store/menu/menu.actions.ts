import { MenuConstants} from './menu.types';
import { AppDispatch } from '../../store';
import axios, { AxiosResponse } from "axios"
import { Response } from './menu.types';
import { useSelector } from 'react-redux';

const GET_DISHES_URL : any = `${process.env.REACT_APP_GET_DISHES}/api/dish`; 

const getItems = async () => {
  const response = await axios.get(GET_DISHES_URL) as AxiosResponse<Response>
  return response.data
}

export const fetchMenuItems =  () => async (dispatch: AppDispatch) => {
  const items = await getItems()
  dispatch({type: MenuConstants.FETCH_ITEMS, payload: items.data})
}
