import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {TableNoDish} from './TableNoDish';

export type RootStackParamList = {
    TableNoDishNavigation: undefined;
    TableNoDish: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const TableNoDishNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="TableNoDish"
                    component={TableNoDish}
                />
            </Stack.Navigator>
    )
}