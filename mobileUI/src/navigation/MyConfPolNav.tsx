import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {MyConfPol} from './MyConfPol';

export type RootStackParamList = {
    MyConfPolNavigation: undefined;
    MyConfPol: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const MyConfPolNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="MyConfPol"
                    component={MyConfPol}
                />
            </Stack.Navigator>
    )
}