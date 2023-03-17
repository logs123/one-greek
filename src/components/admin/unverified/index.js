import React, { useState } from "react";
import { Text, View } from "react-native";
import AcceptButton from "./accept";
import DenyButton from "./deny";

import styles from "./styles";

export default function Unverified({}) {

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Hello</Text>
            <View style={styles.interactionContainer}>
                <AcceptButton />
                <DenyButton />
            </View>
        </View>
    );
}