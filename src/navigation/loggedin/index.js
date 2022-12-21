import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";

import Active from "./active";

const Stack = createNativeStackNavigator();

export default function LoggedIn() {

    const currentUserObj = useSelector(state => state.auth);

    return(
        <Stack.Navigator>
            {currentUserObj.currentUser.type == "active" ?
            <Stack.Screen name="Active" component={Active} options={{ gestureEnabled: false, headerShown: false}}/>
            :
            null
            }
        </Stack.Navigator>
    );
}