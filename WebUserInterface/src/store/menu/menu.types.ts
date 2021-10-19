import { ActionType } from 'typesafe-actions';
import * as actions from './menu.actions';

export interface MenuItem {
  title: string;
  default_ingredients: string;
  ingredients: number[];
  price: number;
  weight: number;
  categories: number[];
  calories: number;
  photo: string;
}

export enum MenuConstants {
  FETCH_ITEMS = 'FETCH_ITEMS',
}

export interface ReducerState {
  items: MenuItem[];
}

export type MenuActions = ActionType<typeof actions>;