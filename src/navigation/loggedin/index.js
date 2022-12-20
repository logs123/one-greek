import React from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function LoggedIn() {
    return(
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="name" component={() => {<View><Text>Hello World!</Text></View>}} options={{ gestureEnabled: false, headerShown: false}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}