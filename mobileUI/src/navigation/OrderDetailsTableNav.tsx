import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {OrderDetailsTable} from './OrderDetailsTable';

export type RootStackParamList = {
    OrderDetailsTableNavigation: undefined;
    OrderDetailsTable: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const OrderDetailsTableNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="OrderDetailsTable"
                    component={OrderDetailsTable}
                />
            </Stack.Navigator>
    )
}