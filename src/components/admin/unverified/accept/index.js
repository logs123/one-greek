import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../../../redux/actions/admin";

import styles from "./styles";

export default function AcceptButton({ id }) {

    const dispatch = useDispatch();
    const unverified = useSelector(state => state.admin).unverified;

    const handleAccept = () => {
        const updatedUnverified = unverified.filter((item) => item.id !== id)
        dispatch(verify(id, updatedUnverified))
    }

    return(
        <TouchableOpacity onPress={handleAccept} style={styles.mainContainer}>
            <MaterialCommunityIcons name={"check"} size={24} color={"#228B22"}/>
        </TouchableOpacity>
    );
}