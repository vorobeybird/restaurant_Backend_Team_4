import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {DishPage} from './DishPage';
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
    DishPageNavigation: undefined;
    DishPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const DishPageNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="DishPage"
                    component={DishPage}
                />
            </Stack.Navigator>
    )
}