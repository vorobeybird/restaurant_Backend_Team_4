import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './routes/RootStack';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
