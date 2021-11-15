import React from "react";
import { Menu } from "../menu/Menu";

import { createStackNavigator } from "@react-navigation/stack";
import { Breakfast } from '../menu/pageComponents/Breakfast';
import { DishPage } from "./DishPage";
import { ChoseTypeOrder} from "./ChoseTypeOrder";
import { ConfirmOrder} from "./ConfirmOrder";
import { ChosePaymentType } from './ChosePaymentType';
import { writeAdress } from './writeAdress'
import { PersonalData } from './PersonalData'
import { OrderDetails } from './OrderDetails'
import {ChangeDishIngr} from './ChangeDishIngr';
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
    writeAdress:undefined;
    PersonalData:undefined;
    OrderDetails:undefined;
    ChangeDishIngr: undefined;
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
        <Stack.Screen
                    name="writeAdress"
                    component={writeAdress}
                />
        <Stack.Screen
                    name="PersonalData"
                    component={PersonalData}
                />
        <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetails}
                />
        <Stack.Screen 
                     name="ChangeDishIngr"
                     component={ChangeDishIngr} 
                />
        
    </Stack.Navigator>
  );
};
