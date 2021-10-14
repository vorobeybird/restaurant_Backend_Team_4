import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Menu } from "../menu/Menu";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Breakfast } from '../menu/pageComponents/Breakfast';
import { Lunch } from '../menu/pageComponents/Lunch';
import { Snacks } from '../menu/pageComponents/Snacks';
import { Soup } from '../menu/pageComponents/Soup';
import { Salads } from '../menu/pageComponents/Salads';
import { Pasta } from '../menu/pageComponents/Pasta';
import { Pizza } from '../menu/pageComponents/Pizza';
import { Sushi } from '../menu/pageComponents/Sushi';
import { Desserts } from '../menu/pageComponents/Desserts';


export type RootStackParamList = {
    Breakfast: undefined;
    MenuTabNavigation: undefined;
    Lunch: undefined;
    Snacks: undefined;
    Soup: undefined;
    Salads: undefined;
    Pasta: undefined;
    Pizza: undefined;
    Sushi: undefined;
    Desserts: undefined;
    Menu: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

export const MenuTabNavigation = () => {
    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen
            name="Menu"
            component={Menu}
        />
        <Stack.Screen
            name="Breakfast"
            component={Breakfast}
        />
        <Stack.Screen
            name="Lunch"
            component={Lunch}
        />
        <Stack.Screen
            name="Snacks"
            component={Snacks}
        />
        <Stack.Screen
            name="Soup"
            component={Soup}
        />
        <Stack.Screen
            name="Salads"
            component={Salads}
        />
        <Stack.Screen
            name="Pasta"
            component={Pasta}
        />
        <Stack.Screen
            name="Pizza"
            component={Pizza}
        />
        <Stack.Screen
            name="Sushi"
            component={Sushi}
        />
        <Stack.Screen
            name="Desserts"
            component={Desserts}
        />
        
    </Stack.Navigator>

}