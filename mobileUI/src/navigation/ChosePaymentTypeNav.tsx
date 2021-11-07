import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {ChosePaymentType} from './ChosePaymentType';

export type RootStackParamList = {
    ChosePaymentTypeNavigation: undefined;
    ChosePaymentType: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const ChosePaymentTypeNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="ChosePaymentType"
                    component={ChosePaymentType}
                />
            </Stack.Navigator>
    )
}