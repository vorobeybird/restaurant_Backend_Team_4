import React from 'react';

import MenuMain from '../../../modules/Menu/MenuMain';
import MenuBreakfast from '../../../modules/Menu/MenuBreakfast';
import MenuDishToCart from '../../../modules/Menu/MenuDishToCart';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  MenuMain: undefined;
  MenuDishToCart: undefined;
  MenuBreakfast: undefined;
};

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
