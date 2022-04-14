import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PersonalData from '../../../modules/Orders/PersonalData';
import ProfileOrders from '../../../modules/Profile/ProfileOrders';
import ProfileCards from '../../../modules/Profile/ProfileCards';
import ProfileAddress from '../../../modules/Profile/ProfileAddress';
import ProfileConfidentiality from '../../../modules/Profile/ProfileConfidentiality';
import ProfileAddAddress from '../../../modules/Profile/ProfileAddAddress';
import ProfileAddCard from '../../../modules/Profile/ProfileAddCard';
import ProfileMain from '../../../modules/Profile/ProfileMain';

export type RootStackParamList = {
  MenuNavigator: undefined;
  ProfileMain: undefined;
  PersonalData: undefined;
  ProfileOrders: undefined;
  ProfileCards: undefined;
  ProfileAddress: undefined;
  ProfileConfidentiality: undefined;
  ProfileAddAddress: undefined;
  ProfileAddCard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileMain" component={ProfileMain} />
      <Stack.Screen name="PersonalData" component={PersonalData} />
      <Stack.Screen name="ProfileOrders" component={ProfileOrders} />
      <Stack.Screen name="ProfileCards" component={ProfileCards} />
      <Stack.Screen name="ProfileAddress" component={ProfileAddress} />
      <Stack.Screen
        name="ProfileConfidentiality"
        component={ProfileConfidentiality}
      />
      <Stack.Screen name="ProfileAddAddress" component={ProfileAddAddress} />
      <Stack.Screen name="ProfileAddCard" component={ProfileAddCard} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
