import React from "react";
import { Menu } from "../menu/Menu";
<<<<<<< HEAD

import { createStackNavigator } from "@react-navigation/stack";
import { Breakfast } from '../menu/pageComponents/Breakfast';
import { MainMenu } from '../menu/pageComponents/MainMenu';
import { BarMenu } from '../menu/pageComponents/BarMenu';
import { WeekCatch } from '../menu/pageComponents/WeekCatch';
=======
import { createStackNavigator } from "@react-navigation/stack";
import { Breakfast } from '../menu/pageComponents/Breakfast';
import { WeekCatch } from '../menu/pageComponents/WeekCatch';
import { MainMenu } from '../menu/pageComponents/MainMenu';
import { BarMenu } from '../menu/pageComponents/BarMenu';
>>>>>>> dev

export type RootStackParamList = {
    MenuTabNavigation: undefined;
<<<<<<< HEAD
    MainMenu: undefined;
    BarMenu: undefined;
    WeekCatch: undefined;
    Menu: undefined;
=======
    Menu: undefined
    Breakfast: undefined;
    MainMenu: undefined;
    BarMenu: undefined;
    WeekCatch: undefined;
>>>>>>> dev
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
<<<<<<< HEAD
=======
            name="WeekCatch"
            component={WeekCatch}
        />
        <Stack.Screen
>>>>>>> dev
            name="MainMenu"
            component={MainMenu}
        />
        <Stack.Screen
            name="BarMenu"
            component={BarMenu}
        />
<<<<<<< HEAD
        <Stack.Screen
            name="WeekCatch"
            component={WeekCatch}
        />
        
=======
>>>>>>> dev
    </Stack.Navigator>
}