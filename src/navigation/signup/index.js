import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrganizationScreen from "../../screens/auth/signup/organization";
import NameScreen from "../../screens/auth/signup/name";
import PhoneScreen from "../../screens/auth/signup/phone";
import EmailScreen from "../../screens/auth/signup/email";
import PasswordScreen from "../../screens/auth/signup/password";

const Stack = createNativeStackNavigator();

export default function Signup() {
    return(
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="Organization" component={OrganizationScreen} options={{ gestureEnabled: false, headerShown: false}}/>
                <Stack.Screen name="Name" component={NameScreen} options={{ gestureEnabled: false, headerShown: false}}/>
                <Stack.Screen name="Phone" component={PhoneScreen} options={{ gestureEnabled: false, headerShown: false}}/>
                <Stack.Screen name="Email" component={EmailScreen} options={{ gestureEnabled: false, headerShown: false}}/>
                <Stack.Screen name="Password" component={PasswordScreen} options={{ gestureEnabled: false, headerShown: false}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}