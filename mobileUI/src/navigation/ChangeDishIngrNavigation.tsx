import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {ChangeDishIngr} from './ChangeDishIngr';

export type RootStackParamList = {
  ChangeDishIngrNavigation: undefined;
  ChangeDishIngr: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const ChosePaymentTypeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChangeDishIngr" component={ChangeDishIngr} />
    </Stack.Navigator>
  );
};
