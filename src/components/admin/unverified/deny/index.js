import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { deny } from "../../../../redux/actions/admin";

import styles from "./styles";

export default function DenyButton({ id }) {

    const dispatch = useDispatch();
    const unverified = useSelector(state => state.admin).unverified;

    const handleDeny = () => {
        const updatedUnverified = unverified.filter((item) => item.id !== id)
        dispatch(deny(updatedUnverified))
    }

    return(
        <TouchableOpacity onPress={handleDeny} style={styles.mainContainer}>
            <MaterialCommunityIcons name={"close"} size={24} color={"#FF2400"}/>
        </TouchableOpacity>
    );
}