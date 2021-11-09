import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {ConfirmOrder} from './ConfirmOrder';

export type RootStackParamList = {
    ConfirmOrderNavigation: undefined;
    ConfirmOrder: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const ConfirmOrderNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="ConfirmOrder"
                    component={ConfirmOrder}
                />
            </Stack.Navigator>
    )
}