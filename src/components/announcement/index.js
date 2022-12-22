import React from "react";
import { Text, View } from "react-native";
import timeSince from "../../services/timeSince";
import DeleteButton from "./delete";
import _ from "lodash";

import styles from "./styles";

export default function Announcement({title, body, creator, date, id, viewer}) {

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
                    {_.isEqual(creator, viewer) ?
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