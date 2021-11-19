import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {MyCards} from './MyCards';

export type RootStackParamList = {
    MyCardsNavigation: undefined;
    MyCards: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const MyOrdersNavigation = () => {
    return (      
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="MyCards"
                    component={MyCards}
                />
            </Stack.Navigator>
    )
}