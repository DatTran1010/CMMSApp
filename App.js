import { StatusBar } from "expo-status-bar";
import { TouchableNativeFeedback, Keyboard, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Login from "./src/UI/Login";
import Visual from "./src/UI/Visual";
import Home from "./src/UI/Home";
import DrawerContent from "./src/UI/Home/DrawerContent.js";
import ConTextProvider from "./src/ConText/MainContext";
import ModalUser from "./src/Common/ModalUser";

export default function App() {
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    //Draw chung cho tất cả
    const DrawerNavigator = () => {
        return (
            <Drawer.Navigator drawerContent={(props) => DrawerContent(props)}>
                <Stack.Screen
                    name="Home"
                    component={StackNavigator}
                    options={{
                        title: "Home",
                        headerShown: false,
                        drawerIcon: true,
                    }}
                />
            </Drawer.Navigator>
        );
    };

    function StackNavigator() {
        return (
            <Stack.Navigator defaultScreenOptions={Home}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: true, title: "My Ecomaint" }}
                />
                <Stack.Screen
                    name="Visual"
                    component={Visual}
                    options={{ headerShown: true }}
                />
            </Stack.Navigator>
        );
    }
    return (
        <ConTextProvider>
            <TouchableNativeFeedback
                accessible={false}
                style={{
                    flex: 1,
                }}
            >
                <>
                    <NavigationContainer>
                        <Stack.Navigator defaultScreenOptions={Home}>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{
                                    headerShown: false,
                                    title: "Login",
                                }}
                            />
                            <Stack.Screen
                                name="Home"
                                component={DrawerNavigator}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <ModalUser />
                </>
            </TouchableNativeFeedback>
        </ConTextProvider>
    );
}
