import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ReplyButton() {

    const handleReply = () => {
        
    }

    return (
        <TouchableOpacity onPress={handleReply}>
            <MaterialCommunityIcons name="chat-outline" size={24} color="#808080"/>
        </TouchableOpacity>
    );
}