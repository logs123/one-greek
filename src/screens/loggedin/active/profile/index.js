import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions";

import styles from "./styles";

export default function ProfileScreen() {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return(
        <View style={styles.mainContainer}>
            <Text>Profile</Text>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}