import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {ConfirmOrderTable} from './ConfirmOrderTable';

export type RootStackParamList = {
    ConfirmOrderTableNavigation: undefined;
    ConfirmOrderTable: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const ConfirmOrderNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="ConfirmOrderTable"
                    component={ConfirmOrderTable}
                />
            </Stack.Navigator>
    )
}