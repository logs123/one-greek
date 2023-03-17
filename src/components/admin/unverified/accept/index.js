import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import styles from "./styles";

export default function AcceptButton({  }) {

    const dispatch = useDispatch();

    const handleAccept = () => {
        dispatch()
    }

    return(
        <TouchableOpacity onPress={handleAccept} style={styles.mainContainer}>
            <MaterialCommunityIcons name={"check"} size={24} color={"#228B22"}/>
        </TouchableOpacity>
    );
}