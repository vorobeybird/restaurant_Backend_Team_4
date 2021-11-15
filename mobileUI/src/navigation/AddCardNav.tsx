import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {AddCard} from './AddCard';

export type RootStackParamList = {
    AddCardNavigation: undefined;
    AddCard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const AddCardNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="AddCard"
                    component={AddCard}
                />
            </Stack.Navigator>
    )
}