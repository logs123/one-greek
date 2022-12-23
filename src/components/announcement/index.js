import React from "react";
import { Text, View } from "react-native";
import timeSince from "../../services/timeSince";
import DeleteButton from "./delete";

import styles from "./styles";

export default function Announcement({title, body, creator, creatorID, date, id, uid, viewer}) {

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.authorContainer}>
                <Text style={styles.authorText}>{creator.firstName} {creator.lastName}</Text>
                <Text style={styles.dateText}>{timeSince(date.toDate())}</Text>
            </View>
            <Text style={styles.bodyText}>{body}</Text>
            <View style={styles.interactionContainer}>
                <View style={styles.creatorInteractionContainer}>
                    {creatorID == uid ?
                    <DeleteButton creator={creator} id={id} viewer={viewer}/>
                    :
                    null}
                </View>
                <View style={styles.defaultInteractionContainer}>
                    
                </View>
            </View>
        </View>
    );
}