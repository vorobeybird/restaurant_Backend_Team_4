import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {MyAdress} from './MyAdress';

export type RootStackParamList = {
    MyAdressNavigation: undefined;
    MyAdress: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const ChoseTypeOrderNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="MyAdress"
                    component={MyAdress}
                />
            </Stack.Navigator>
    )
}