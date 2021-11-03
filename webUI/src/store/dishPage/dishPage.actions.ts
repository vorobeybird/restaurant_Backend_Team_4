import { MenuConstants } from "./dishPage.types";
import { AppDispatch } from "../../store";
import { MenuItem } from "../menu/menu.types";

export const setSelectedDish = (item: MenuItem) => (dispatch: AppDispatch) => {
  const dish: MenuItem = item;
  dispatch({ type: MenuConstants.SET_SELECTED_DISH, payload: item});
}