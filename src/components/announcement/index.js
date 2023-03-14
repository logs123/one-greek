import React, { useState } from "react";
import { Linking, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Hyperlink from "react-native-hyperlink";
import timeSince from "../../services/timeSince";
import DeleteButton from "./delete";
import EditButton from "./edit";
import LikeButton from "./like";
import ReplyButton from "./reply";

import styles from "./styles";

export default function Announcement({announcement, uid, viewer}) {

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>{announcement.title}</Text>
            <View style={styles.authorContainer}>
                <Text style={styles.authorText}>{announcement.creator.firstName} {announcement.creator.lastName}</Text>
                <Text style={styles.dateText}>{timeSince(announcement.date.toDate())}</Text>
            </View>
                <Hyperlink linkStyle={{ color: '#2980b9', textDecorationLine: "underline" }} onPress={ (url, text) => {Linking.canOpenURL(url) ? Linking.openURL(url) : null}}>
                    <Text style={styles.bodyText}>{announcement.body}</Text>
                </Hyperlink>
            <View style={styles.interactionContainer}>
                <View style={styles.creatorInteractionContainer}>
                    {announcement.uid == uid ?
                    <EditButton announcement={announcement}/>
                    :
                    null}
                    {announcement.uid == uid ?
                    <DeleteButton creator={announcement.creator} id={announcement.id} viewer={viewer}/>
                    :
                    null}
                </View>
                <View style={styles.defaultInteractionContainer}>
                    <LikeButton likedBy={announcement.likedBy} creator={announcement.creator} announcementID={announcement.id} uid={uid}/>
                    {/*<ReplyButton/>*/}
                </View>
            </View>
        </View>
    );
}