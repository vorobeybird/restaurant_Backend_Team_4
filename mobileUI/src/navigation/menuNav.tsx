import React from "react";
import { Menu } from "../menu/Menu";

import { createStackNavigator } from "@react-navigation/stack";
import { Breakfast } from '../menu/pageComponents/Breakfast';
import { DishPage } from "./DishPage";
import { TableNoDish } from "./TableNoDish"
import { OrderDetailsTable } from "./OrderDetailsTable";

export type RootStackParamList = {
    Menu: undefined;
    DishPage: undefined;
    Breakfast: undefined;
    TableNoDish:undefined;
    OrderDetailsTable:undefined;
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
            name="TableNoDish"
            component={TableNoDish}
        />
        
        <Stack.Screen
            name="OrderDetailsTable"
            component={OrderDetailsTable}
        />
    </Stack.Navigator>

};
