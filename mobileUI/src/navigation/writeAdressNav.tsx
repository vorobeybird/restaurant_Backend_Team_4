import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {writeAdress} from './writeAdress';

export type RootStackParamList = {
    writeAdressNavigation: undefined;
    writeAdress: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const writeAdressNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="writeAdress"
                    component={writeAdress}
                />
            </Stack.Navigator>
    )
}