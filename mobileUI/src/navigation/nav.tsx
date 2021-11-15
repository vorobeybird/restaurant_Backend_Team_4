import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { MarketMain } from "../marketComponents/MarketMain";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MenuTabNavigation } from './menuNav';
import { ProfileNavigation } from './profileNav'
export type RootStackParamList = {
    ProfileNavigation: undefined;
    MarketMain: undefined;
    Menu: undefined;
    MenuTabNavigation: undefined;
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
                    }
                }}>
                <Tab.Screen
                    name="MenuTabNavigation"
                    component={MenuTabNavigation}
                    options={{
                        title: 'Menu',
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return <View style={styles.SmWrapper}>
                                <Image style={styles.PictStyle} source={require('../../img/leftBotTab.png')} resizeMode='contain' />
                                
                            </View>;
                        }
                    }}
                />
                <Tab.Screen
                    name="MarketMain"
                    component={MarketMain}
                    options={{
                        title: 'MarketMain',
                        tabBarIcon: ({ focused }) => {
                            return <View style={styles.SmWrapper}>
                                <Image style={styles.PictStyleCent} source={require('../../img/centTab.png')} />
                                
                            </View>
                        }
                    }}
                />
                <Tab.Screen
                    name="ProfileNavigation"
                    component={ProfileNavigation}
                    options={{
                        title: 'MarketMain',
                        tabBarIcon: ({ focused }) => {
                            return <View>
                                <Image style={styles.PictStyle} source={require('../../img/rightTab.png')} resizeMode='contain' />
                                
                            </View>
                        }
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

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
    SimpText: {
        bottom: 5,
        color: '#000000',
    },
    PictStyleCent: {
        width: 120,
        height: '80%',
        top:'10%',
    },
})