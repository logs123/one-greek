import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreviewScreen from "../../../../screens/loggedin/active/messages/previews";
import CreateMessageScreen from "../../../../screens/loggedin/active/messages/createmessage";
import MessageScreen from "../../../../screens/loggedin/active/messages/message";

const Stack = createNativeStackNavigator();

export default function MessagesStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Previews" component={PreviewScreen}/>
            <Stack.Screen name="CreateMessage" component={CreateMessageScreen}/>
            <Stack.Screen name="Message" component={MessageScreen}/>
        </Stack.Navigator>
    );
}