import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, View } from "react-native";

import styles from "./styles";

export default function Undeclared() {
    return(
        <View style={styles.mainContainer}>
            <StatusBar/>
            <Button title="PNM?"/>
            <Button title="Active?"/>
        </View>
    )
}