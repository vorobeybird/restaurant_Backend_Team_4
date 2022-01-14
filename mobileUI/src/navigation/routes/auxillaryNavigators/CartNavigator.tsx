import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MarketMain} from '../../../marketComponents/MarketMain';
import {ChoseTypeOrder} from '../../ChoseTypeOrder';
import {ConfirmOrder} from '../../ConfirmOrder';
import {ChosePaymentType} from '../../ChosePaymentType';
import {writeAdress} from '../../writeAdress';
import {PersonalData} from '../../PersonalData';
import {OrderDetails} from '../../OrderDetails';
import {ChangeDishIngr} from '../../ChangeDishIngr';
import {ConfirmOrderTable} from '../../ConfirmOrderTable';
import {OrderTable} from '../../OrderTable';
export type RootStackParamList = {
  ChoseTypeOrder: undefined;
  ConfirmOrder: undefined;
  ChosePaymentType: undefined;
  writeAdress: undefined;
  PersonalData: undefined;
  OrderDetails: undefined;
  ChangeDishIngr: undefined;
  ConfirmOrderTable: undefined;
  OrderTable: undefined;
  MarketMain: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MarketMain" component={MarketMain} />
      <Stack.Screen name="ChoseTypeOrder" component={ChoseTypeOrder} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="ChosePaymentType" component={ChosePaymentType} />
      <Stack.Screen name="writeAdress" component={writeAdress} />
      <Stack.Screen name="PersonalData" component={PersonalData} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="ChangeDishIngr" component={ChangeDishIngr} />
      <Stack.Screen name="ConfirmOrderTable" component={ConfirmOrderTable} />
      <Stack.Screen name="OrderTable" component={OrderTable} />
    </Stack.Navigator>
  );
};

export default CartNavigator;
