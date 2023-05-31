import React from "react";
import { Linking, Text, View } from "react-native";
import Hyperlink from "react-native-hyperlink";
import { useSelector } from "react-redux";
import timeSince from "../../services/timeSince";
import DeleteButton from "./delete";
import EditButton from "./edit";
import LikeButton from "./like";
import ReplyButton from "./reply";

import styles from "./styles";

export default function Announcement({announcement}) {

    const currentUserObj = useSelector(state => state.auth);

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>{announcement.title}</Text>
            <View style={styles.authorContainer}>
                <Text style={styles.authorText}>{announcement.creator.firstName} {announcement.creator.lastName}</Text>
                <Text style={styles.dateText}>{timeSince(announcement.date)}</Text>
            </View>
                <Hyperlink linkStyle={styles.link} onPress={ (url, text) => {Linking.canOpenURL(url) ? Linking.openURL(url) : null}}>
                    <Text style={styles.bodyText}>{announcement.body}</Text>
                </Hyperlink>
            <View style={styles.interactionContainer}>
                <View style={styles.creatorInteractionContainer}>
                    {/*announcement.uid == currentUserObj.userID ?
                    <EditButton announcement={announcement}/>
                    :
                    null*/}
                    {announcement.uid == currentUserObj.userID ?
                    <DeleteButton creator={announcement.creator} id={announcement.id} viewer={currentUserObj.currentUser}/>
                    :
                    null}
                </View>
                <View style={styles.defaultInteractionContainer}>
                    <LikeButton likedBy={announcement.likedBy} creator={announcement.creator} announcementID={announcement.id} uid={currentUserObj.userID}/>
                    {/*<ReplyButton/>*/}
                </View>
            </View>
        </View>
    );
}