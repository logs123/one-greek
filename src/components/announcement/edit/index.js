import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function EditButton({ announcement }) {

    return (
        <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="pencil-outline" size={24} color="#808080"/>
        </TouchableOpacity>
    );
}