import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";

import Active from "./active";
import PNMScreen from "../../screens/loggedin/pnm";

const Stack = createNativeStackNavigator();

export default function LoggedIn() {

    const currentUserObj = useSelector(state => state.auth);

    return(
        <Stack.Navigator>
            {currentUserObj.currentUser.type == "active" ?
                <Stack.Screen name="Active" component={Active} options={{ gestureEnabled: false, headerShown: false}}/>
                :
                <Stack.Screen name="PNM" component={PNMScreen} options={{ gestureEnabled: false, headerShown: false}}/>
            }
        </Stack.Navigator>
    );
}