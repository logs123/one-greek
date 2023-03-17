import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "./default";
import AdminScreen from "./admin";
import EditScreen from "./edit";

const Stack = createNativeStackNavigator();

export default function Profile() {

    return(
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ gestureEnabled: false, headerShown: false}}/>
            <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ gestureEnabled: false, headerShown: false}}/>
            <Stack.Screen name="EditScreen" component={EditScreen} options={{ gestureEnabled: false, headerShown: false}}/>
        </Stack.Navigator>
    );
}