import React from "react";
import { Menu } from "../menu/Menu";

import { createStackNavigator } from "@react-navigation/stack";
import { Breakfast } from '../menu/pageComponents/Breakfast';
import { MainMenu } from '../menu/pageComponents/MainMenu';
import { BarMenu } from '../menu/pageComponents/BarMenu';
import { WeekCatch } from '../menu/pageComponents/WeekCatch';
import { DishPage } from "./DishPage";
import { ChoseTypeOrder} from "./ChoseTypeOrder";
import { ConfirmOrder} from "./ConfirmOrder";
import { ChosePaymentType } from './ChosePaymentType';

export type RootStackParamList = {
    MenuTabNavigation: undefined;
    MainMenu: undefined;
    BarMenu: undefined;
    WeekCatch: undefined;
    Menu: undefined;
    Breakfast: undefined;
    DishPage: undefined;
    ChoseTypeOrder:undefined;
    ConfirmOrder:undefined;
    ChosePaymentType:undefined;
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
            name="MainMenu"
            component={MainMenu}
        />
        <Stack.Screen
            name="BarMenu"
            component={BarMenu}
        />
        <Stack.Screen
            name="WeekCatch"
            component={WeekCatch}
        />
        <Stack.Screen
                    name="DishPage"
                    component={DishPage}
                />
        <Stack.Screen
                    name="ChoseTypeOrder"
                    component={ChoseTypeOrder}
                />
        <Stack.Screen
                    name="ConfirmOrder"
                    component={ConfirmOrder}
                />
        <Stack.Screen
                    name="ChosePaymentType"
                    component={ChosePaymentType}
                />
        
    </Stack.Navigator>
}