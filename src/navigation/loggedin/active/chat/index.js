import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreviewScreen from "../../../../screens/loggedin/active/chat/previews";
import CreateChatScreen from "../../../../screens/loggedin/active/chat/createchat";
import MessageScreen from "../../../../screens/loggedin/active/chat/message";

const Stack = createNativeStackNavigator();

export default function ChatStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Previews" component={PreviewScreen}/>
            <Stack.Screen name="CreateChat" component={CreateChatScreen}/>
            <Stack.Screen name="Message" component={MessageScreen}/>
        </Stack.Navigator>
    );
}