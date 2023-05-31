import React from "react";
import { Text, View } from "react-native";
import AcceptButton from "./accept";
import DenyButton from "./deny";

import styles from "./styles";

export default function Unverified({unverified}) {

    return(
        <View style={styles.mainContainer}>
            {unverified.map((item) => (
                <View style={styles.interactionContainer} key={item.id}>
                    <Text>{item.data.firstName} {item.data.lastName}</Text>
                    <AcceptButton id={item.id}/>
                    <DenyButton id={item.id}/>
                </View>
            ))}
        </View>
    );
}