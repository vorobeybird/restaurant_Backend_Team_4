import React from 'react';
import {Menu} from '../../../menu/Menu';

import {createStackNavigator} from '@react-navigation/stack';
import {Breakfast} from '../../../menu/pageComponents/Breakfast';
import {DishPage} from '../../DishPage';

export type RootStackParamList = {
  Menu: undefined;
  DishPage: undefined;
  Breakfast: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Breakfast" component={Breakfast} />
      <Stack.Screen name="DishPage" component={DishPage} />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
