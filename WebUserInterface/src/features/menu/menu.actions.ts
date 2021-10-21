import { MenuConstants} from './menu.types';
import { getItems } from '../../api/menu';
import { AppDispatch } from '../../store';

export const fetchMenuItems =  () => async (dispatch: AppDispatch) => {
  const items = await getItems()
  dispatch({type: MenuConstants.FETCH_ITEMS, payload: items.data})
}