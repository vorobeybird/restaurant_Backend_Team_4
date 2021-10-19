import { action } from 'typesafe-actions';
import { MenuConstants, MenuItem } from './menu.types';

export function fetchMenuItems(items: MenuItem[]) {
  return action(MenuConstants.FETCH_ITEMS, {
    items
  })
}