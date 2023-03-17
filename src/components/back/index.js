import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";

export default function BackButton() {

    const navigation = useNavigation();

    return(
        <View style={{position: "absolute", top: 60, left: 10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.mainContainer}>
                <MaterialCommunityIcons name={"chevron-left"} size={36} color={"#007AFF"}/>
            </TouchableOpacity>
        </View>
    )
}