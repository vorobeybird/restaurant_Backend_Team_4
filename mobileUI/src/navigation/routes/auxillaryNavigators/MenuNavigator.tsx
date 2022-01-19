import React from 'react';

import MenuMain from '../../../modules/Menu/MenuMain';
import MenuBreakfast from '../../../modules/Menu/MenuBreakfast';
import MenuDishToCart from '../../../modules/Menu/MenuDishToCart';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {RouteProp} from '@react-navigation/native';

export interface INewDish {
  id: number;
  title: string;
  photos: string[];
  descr: string;
  price: number;
  cal: number;
  weight: number;
}

export interface IMenuItem {
  title: string;
  default_ingredients: string;
  ingredients: number[];
  price: number;
  weight: number;
  categories: number[];
  calories: number;
  photos: string[];
  data: any;
}

export interface ICategory {
  id: number;
  title: string;
  dish: [];
  show_in_menu?: boolean;
}

type RootStackParamList = {
  MenuMain: undefined;
  MenuDishToCart: INewDish;
  MenuBreakfast: ICategory;
};

export type MenuMainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MenuMain'
>;
export type MenuDishToCartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MenuDishToCart'
>;
export type MenuBreakfastScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MenuBreakfast'
>;
export type MenuMainScreenRouteProp = RouteProp<RootStackParamList, 'MenuMain'>;

export type MenuDishToCartScreenRouteProp = RouteProp<
  RootStackParamList,
  'MenuDishToCart'
>;
export type MenuBreakfastScreenRouteProp = RouteProp<
  RootStackParamList,
  'MenuBreakfast'
>;

const Stack = createStackNavigator<RootStackParamList>();

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MenuMain" component={MenuMain} />
      <Stack.Screen name="MenuBreakfast" component={MenuBreakfast} />
      <Stack.Screen name="MenuDishToCart" component={MenuDishToCart} />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
