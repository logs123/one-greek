import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";

import Active from "./active";
import Undeclared from "./undeclared";

const Stack = createNativeStackNavigator();

export default function LoggedIn() {

    const currentUserObj = useSelector(state => state.auth);

    return(
        <Stack.Navigator>
            {currentUserObj.currentUser.type != null ?
                currentUserObj.currentUser.type == "active" ?
                <Stack.Screen name="Active" component={Active} options={{ gestureEnabled: false, headerShown: false}}/>
                :
                <Stack.Screen name="PNM" component={PNM} options={{ gestureEnabled: false, headerShown: false}}/>
            :
            <Stack.Screen name="Undeclared" component={Undeclared} options={{ gestureEnabled: false, headerShown: false}}/>
            }
        </Stack.Navigator>
    );
}