import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { MarketMain } from "../marketComponents/MarketMain";
import { ProfileComponent } from "../profileComponents/ProfileComponent"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MenuTabNavigation } from './menuNav';

export type RootStackParamList = {
    ProfileComponent: undefined;
    MarketMain: undefined;
    Menu: undefined;
    MenuTabNavigation: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator();

export const BottomTabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        height: 90,
                        backgroundColor: 'white',
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
                                <Image style={styles.PictStyle} source={require('../../img/dish.png')} resizeMode='contain' />
                                <Text style={styles.SimpText}>Блюда</Text>
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
                                <Image style={styles.PictStyle} source={require('../../img/marketPhoto.png')} />
                                <Text style={styles.SimpText}>Корзина</Text>
                            </View>
                        }
                    }}
                />
                <Tab.Screen
                    name="ProfileComponent"
                    component={ProfileComponent}
                    options={{
                        title: 'MarketMain',
                        tabBarIcon: ({ focused }) => {
                            return <View>
                                <Image style={styles.PictStyle} source={require('../../img/profPhoto.png')} resizeMode='contain' />
                                <Text style={styles.SimpText}>Профиль</Text>
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
        top: '2%',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#000000',
    },
    PictStyle: {
        width: 76,
        height: 76,
    },
    SimpText: {
        bottom: 5,
        color: '#000000',
    }
})