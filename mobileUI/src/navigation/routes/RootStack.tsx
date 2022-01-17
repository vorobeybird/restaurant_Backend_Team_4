import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuNavigator from './auxillaryNavigators/MenuNavigator';
import CartNavigator from './auxillaryNavigators/CartNavigator';
import ProfileNavigator from './auxillaryNavigators/ProfileNavigator';
import React from 'react';
import styles from './styles';
import Home from '../../modules/Home';

export type RootStackParamList = {
  ProfileNavigator: undefined;
  MenuNavigator: undefined;
  Home: undefined;
  CartNavigator: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: '10%',
          backgroundColor: 'black',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.SmWrapper}>
                <Image
                  style={styles.PictStyleHome}
                  source={
                    focused
                      ? require('../../../img/activeHome.png')
                      : require('../../../img/inActiveHome.png')
                  }
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="MenuNavigator"
        component={MenuNavigator}
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.SmWrapper}>
                <Image
                  style={styles.PictStyle}
                  source={
                    focused
                      ? require('../../../img/menuActive.png')
                      : require('../../../img/menuInActive.png')
                  }
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          unmountOnBlur: true,
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.SmWrapper}>
                <Image
                  style={styles.PictStyle}
                  source={
                    focused
                      ? require('../../../img/cartActive.png')
                      : require('../../../img/cartInActive.png')
                  }
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.SmWrapper}>
                <Image
                  style={styles.PictStyle}
                  source={
                    focused
                      ? require('../../../img/profActive.png')
                      : require('../../../img/profInActiv.png')
                  }
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;
