import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {OrderTable} from './OrderTable';

export type RootStackParamList = {
    OrderTableNavigation: undefined;
    OrderTable: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const OrderTableNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="OrderTable"
                    component={OrderTable}
                />
            </Stack.Navigator>
    )
}