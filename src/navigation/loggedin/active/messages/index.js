import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "../../../../screens/loggedin/active/messages";
import CreateMessageScreen from "../../../../screens/loggedin/active/messages/createmessage";

const Stack = createNativeStackNavigator();

export default function MessagesStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Messages" component={MessagesScreen}/>
            <Stack.Screen name="CreateMessage" component={CreateMessageScreen}/>
        </Stack.Navigator>
    );
}