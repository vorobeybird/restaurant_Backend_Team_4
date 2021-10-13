import React from "react";
import { MarketMain } from "../marketComponents/MarketMain";
import { Menu } from "../menu/Menu";
import { ProfileComponent } from "../profileComponents/ProfileComponent"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { BotMenu } from "./Botmenu";
export type RootStackParamList = {
    ProfileComponent: undefined;
    MarketMain: undefined;
    Menu: undefined;
  };
const RootStack = createStackNavigator<RootStackParamList>();

export const Navigate = () => {
    return  <NavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="ProfileComponent"
                        component={ProfileComponent}
                    />
                    <RootStack.Screen
                        name="MarketMain"
                        component={MarketMain}
                        options={{title:'MarketMain'}}
                    />
                    <RootStack.Screen
                        name="Menu"
                        component={Menu}
                        options={{title:'Menu'}}
                    />
                </RootStack.Navigator>
                <BotMenu/>
            </NavigationContainer>
}