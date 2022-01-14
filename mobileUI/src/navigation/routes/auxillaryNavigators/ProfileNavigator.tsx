import React from 'react';
import {Menu} from '../../../menu/Menu';

import {createStackNavigator} from '@react-navigation/stack';
import {ProfileComponent} from '../../../profileComponents/ProfileComponent';
import {PersonalData} from '../../PersonalData';
import {MyOrders} from '../../MyOrders';
import {MyCards} from '../../MyCards';
import {MyAdress} from '../../MyAdress';
import {MyConfPol} from '../../MyConfPol';
import {AddAdress} from '../../AddAdress';
import {AddCard} from '../../AddCard';

export type RootStackParamList = {
  MenuTabNavigation: undefined;
  ProfileComponent: undefined;
  PersonalData: undefined;
  MyOrders: undefined;
  MyCards: undefined;
  MyAdress: undefined;
  MyConfPol: undefined;
  AddAdress: undefined;
  AddCard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileComponent" component={ProfileComponent} />
      <Stack.Screen name="PersonalData" component={PersonalData} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="MyCards" component={MyCards} />
      <Stack.Screen name="MyAdress" component={MyAdress} />
      <Stack.Screen name="MyConfPol" component={MyConfPol} />
      <Stack.Screen name="AddAdress" component={AddAdress} />
      <Stack.Screen name="AddCard" component={AddCard} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
