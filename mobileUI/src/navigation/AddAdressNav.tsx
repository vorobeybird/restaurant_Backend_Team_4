import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {AddAdress} from './AddAdress';

export type RootStackParamList = {
    AddAdressNavigation: undefined;
    AddAdress: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const ChosePaymentTypeNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="AddAdress"
                    component={AddAdress}
                />
            </Stack.Navigator>
    )
}