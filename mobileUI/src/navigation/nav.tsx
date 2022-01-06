import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {MarketTabNavigation} from '../navigation/MarketMainNav';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MenuTabNavigation} from './menuNav';
import {MarketMain} from '../marketComponents/MarketMain';
import {ProfileNavigation} from './profileNav';
import {testIconNav} from './testIconNav';
export type RootStackParamList = {
  ProfileNavigation: undefined;
  MarketMain: undefined;
  Menu: undefined;
  MenuTabNavigation: undefined;
  testIconNav: undefined;
  MarketTabNavigation: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const BottomTabNavigation = () => {
  return (
    <NavigationContainer>
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
          name="testIconNav"
          component={testIconNav}
          options={{
            title: 'Menu',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              if (focused) {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyleHome}
                      source={require('../../img/activeHome.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              } else {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyleHome}
                      source={require('../../img/inActiveHome.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="MenuTabNavigation"
          component={MenuTabNavigation}
          options={{
            title: 'Menu',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              if (focused) {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyle}
                      source={require('../../img/menuActive.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              } else {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyle}
                      source={require('../../img/menuInActive.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="MarketTabNavigation"
          component={MarketTabNavigation}
          options={{
            unmountOnBlur: true,
            title: 'MarketTabNavigation',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              if (focused) {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyle}
                      source={require('../../img/cartActive.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              } else {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyle}
                      source={require('../../img/cartInActive.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="ProfileNavigation"
          component={ProfileNavigation}
          options={{
            title: 'Menu',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              if (focused) {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyle}
                      source={require('../../img/profActive.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              } else {
                return (
                  <View style={styles.SmWrapper}>
                    <Image
                      style={styles.PictStyle}
                      source={require('../../img/profInActiv.png')}
                      resizeMode="contain"
                    />
                  </View>
                );
              }
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  SmWrapper: {
    top: '4%',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#000000',
  },
  PictStyle: {
    width: 120,
    height: '100%',
  },
  PictStyleHome: {
    width: 80,
    height: '100%',
  },
  SimpText: {
    bottom: 5,
    color: '#000000',
  },
  PictStyleCent: {
    width: 120,
    height: '80%',
    top: '10%',
  },
});
