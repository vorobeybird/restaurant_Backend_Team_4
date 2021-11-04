import { MenuConstants } from "./dishPage.types";
import { AppDispatch } from "../../store";
import { MenuItem } from "../menu/menu.types";
import { ICartItem} from "../cart/cart.types";


export const setSelectedDish = (item: ICartItem | MenuItem) => (dispatch: AppDispatch) => {
  const dish: ICartItem | MenuItem = item;
  dispatch({ type: MenuConstants.SET_SELECTED_DISH, payload: item});
}