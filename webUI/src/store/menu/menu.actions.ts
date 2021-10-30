import { MenuConstants} from './menu.types';
import { AppDispatch } from '../../store';
import axios, { AxiosResponse } from "axios"
import { Response } from './menu.types';
import { useSelector } from 'react-redux';

const getItems = async () => {
  const response = await axios.get('http://18.192.61.153:5000/api/dish') as AxiosResponse<Response>
  return response.data
}


export const fetchMenuItems =  () => async (dispatch: AppDispatch) => {
  const items = await getItems()
  dispatch({type: MenuConstants.FETCH_ITEMS, payload: items.data})
}