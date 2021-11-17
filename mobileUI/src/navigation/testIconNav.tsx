import React from "react";


import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home";

export type RootStackParamList = {

    Home:undefined;
    
};

const Stack = createStackNavigator<RootStackParamList>();

export const testIconNav = () => {
    return  <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                            name="Home"
                            component={Home}

                        />
            </Stack.Navigator>
}