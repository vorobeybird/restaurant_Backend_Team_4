import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {MyOrders} from './MyOrders';

export type RootStackParamList = {
    MyOrdersNavigation: undefined;
    MyOrders: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const MyOrdersNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="MyOrders"
                    component={MyOrders}
                />
            </Stack.Navigator>
    )
}