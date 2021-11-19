import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {PersonalData} from './PersonalData';

export type RootStackParamList = {
    PersonalDataNavigation: undefined;
    PersonalData: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const PersonalDataNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="PersonalData"
                    component={PersonalData}
                />
            </Stack.Navigator>
    )
}