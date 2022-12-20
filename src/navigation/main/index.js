import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../../screens/auth";
import LoginScreen from "../../screens/auth/login";
import ForgotPasswordScreen from "../../screens/auth/login/forgotPassword";
import Signup from "../signup";
import LoggedIn from "../loggedin";

const Stack = createNativeStackNavigator();

export default function Route() {
    const currentUserObj = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [])

    if (!currentUserObj.loaded) {
        return(
            <View></View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {currentUserObj.currentUser == null ?
                    <Stack.Group>
                        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false}}/>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false, headerShown: false }}/>
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ gestureEnabled: false, headerShown: false }}/>
                        <Stack.Screen name="Signup" component={Signup} options={{ gestureEnabled: false, headerShown: false }}/>
                    </Stack.Group>
                    : 
                    <Stack.Screen name="Loggedin" component={LoggedIn} options={{ gestureEnabled: false, headerShown: false }}/>}
            </Stack.Navigator>
        </NavigationContainer>
    );
}