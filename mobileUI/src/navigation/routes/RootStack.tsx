import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from './auxillaryNavigators/HomeNavigator';
import MenuNavigator from './auxillaryNavigators/MenuNavigator';
import CartNavigator from './auxillaryNavigators/CartNavigator';
import ProfileNavigator from './auxillaryNavigators/ProfileNavigator';
import React from 'react';
import styles from './styles';

export type RootStackParamList = {
  ProfileNavigator: undefined;
  MarketMain: undefined;
  Menu: undefined;
  MenuNavigator: undefined;
  HomeNavigator: undefined;
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
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Menu',
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
          title: 'MarketTabNavigation',
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
          title: 'Menu',
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
