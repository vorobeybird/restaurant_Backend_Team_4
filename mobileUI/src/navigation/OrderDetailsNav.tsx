import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {OrderDetails} from './OrderDetails';

export type RootStackParamList = {
    OrderDetailsNavigation: undefined;
    OrderDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const OrderDetailsNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetails}
                />
            </Stack.Navigator>
    )
}