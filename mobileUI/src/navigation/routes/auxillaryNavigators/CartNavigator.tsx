import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartMain from '../../../modules/Cart/CartMain/CartMain';
import OrderType from '../../../modules/Orders/OrderType/OrderType';
import OrderConfirmation from '../../../modules/Orders/OrderConfirmation/OrderConfirmation';
import OrderPayment from '../../../modules/Orders/OrderPayment/OrderPayment';
import OrderAddress from '../../../modules/Orders/OrderAddress/OrderAddress';
import PersonalData from '../../../modules/Orders/PersonalData/PersonalData';
import OrderDetails from '../../../modules/Orders/OrderDetails/OrderDetails';
import OrderIngredients from '../../../modules/Orders/OrderIngredients/OrderIngredients';
import OrderTable from '../../../modules/Orders/OrderTable/OrderTable';
import OrderTableConfirm from '../../../modules/Orders/OrderTableConfirm/OrderTableConfirm';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  CartMain: undefined;
  OrderType: undefined;
  OrderConfirmation: undefined;
  OrderPayment: undefined;
  OrderAddress: undefined;
  PersonalData: undefined;
  OrderDetails: undefined;
  OrderIngredients: undefined;
  OrderTableConfirm: undefined;
  OrderTable: undefined;
};

export type CartMainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CartMain'
>;
export type OrderTypeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderType'
>;
export type OrderConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderConfirmation'
>;
export type OrderPaymentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderPayment'
>;

export type OrderAddressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderAddress'
>;
export type PersonalDataNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PersonalData'
>;
export type OrderDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderDetails'
>;
export type OrderTableConfirmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderTableConfirm'
>;
export type OrderTableScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderTable'
>;

// export type MenuDishToCartScreenNavigationProp = NativeStackNavigationProp<
//     RootStackParamList,
//     'MenuDishToCart'
//     >;
// export type MenuBreakfastScreenNavigationProp = NativeStackNavigationProp<
//     RootStackParamList,
//     'MenuBreakfast'
//     >;
// export type MenuMainScreenRouteProp = RouteProp<RootStackParamList, 'MenuMain'>;
// export type MenuDishToCartScreenRouteProp = RouteProp<
//     RootStackParamList,
//     'MenuDishToCart'
//     >;
// export type MenuBreakfastScreenRouteProp = RouteProp<
//     RootStackParamList,
//     'MenuBreakfast'
//     >;

const Stack = createStackNavigator<RootStackParamList>();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CartMain" component={CartMain} />
      <Stack.Screen name="OrderType" component={OrderType} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
      <Stack.Screen name="OrderPayment" component={OrderPayment} />
      <Stack.Screen name="OrderAddress" component={OrderAddress} />
      <Stack.Screen name="PersonalData" component={PersonalData} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderIngredients" component={OrderIngredients} />
      <Stack.Screen name="OrderTableConfirm" component={OrderTableConfirm} />
      <Stack.Screen name="OrderTable" component={OrderTable} />
    </Stack.Navigator>
  );
};

export default CartNavigator;
