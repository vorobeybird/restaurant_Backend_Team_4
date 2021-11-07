import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {ChoseTypeOrder} from './ChoseTypeOrder';

export type RootStackParamList = {
    ChoseTypeOrderNavigation: undefined;
    ChoseTypeOrder: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const ChoseTypeOrderNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="ChoseTypeOrder"
                    component={ChoseTypeOrder}
                />
            </Stack.Navigator>
    )
}