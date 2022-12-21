import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default function Announcement({title, body, creator, date}) {
    return(
        <View style={styles.mainContainer}>
            <Text>{title}</Text>
            <View style={styles.authorContainer}>
                <Text style={styles.authorText}>{creator.firstName} {creator.lastName}</Text>
                <Text style={styles.dateText}>{date.toDate().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric"})}</Text>
            </View>
            <Text style={styles.bodyText}>{body}</Text>
        </View>
    )
}