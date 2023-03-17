import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import styles from "./styles";

export default function DenyButton({  }) {

    const dispatch = useDispatch();

    const handleDeny = () => {
        dispatch()
    }

    return(
        <TouchableOpacity onPress={handleDeny} style={styles.mainContainer}>
            <MaterialCommunityIcons name={"close"} size={24} color={"#FF2400"}/>
        </TouchableOpacity>
    );
}