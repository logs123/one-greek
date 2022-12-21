import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, Keyboard, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { createAnnouncement, getUserAnnouncements } from "../../../../redux/actions/announcement";

import styles from "./styles";

export default function AnnouncementsScreen() {

    const [showCompose, setShowCompose] = useState(false);
    const [announcement, setAnnouncement] = useState("");
    const currentUserObj = useSelector(state => state.auth).currentUser;
    const dispatch = useDispatch();

    //dispatch(getUserAnnouncements(currentUserObj));

    const handlePost = (msg, creator) => {
        dispatch(createAnnouncement(msg, creator));
        Keyboard.dismiss;
        setShowCompose(false);
    }

    return(
        <View style={styles.mainContainer}>
            <StatusBar/>
            <Text>Announcements!</Text>
            <TouchableOpacity style={styles.composeButton} onPress={() => setShowCompose(true)}>
                <MaterialIcons name="add" size={48} color="#FFFFFF"/>
            </TouchableOpacity>
            <Modal animationType="slide" transparent={true} visible={showCompose}>
                <KeyboardAvoidingView behavior={"position"} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.topModalContainer}>
                        <Text style={styles.userModalInfo}>{currentUserObj.firstName} {currentUserObj.lastName}</Text>
                        <Button
                            title="Cancel"
                            onPress={() => {setShowCompose(false); setAnnouncement("")}}/>
                    </View>
                    <View style={styles.bottomModalContainer}>
                        <TextInput
                            style={styles.postInput}
                            placeholder="Begin your announcement here..."
                            placeholderTextColor={"#808080"}
                            multiline
                            onChangeText={(text) => setAnnouncement(text)}/>
                    </View>
                    <View style={{position: "absolute", bottom: 0, marginBottom: 10, right: 30}}>
                        <TouchableOpacity
                            disabled={announcement == ""}
                            style={[styles.postButton,{backgroundColor: (announcement == "") ? "#E5FAFF" : "#72AEBC"}]}
                            onPress={() => handlePost(announcement, currentUserObj)}>
                            <Text style={[styles.postButtonText,{color: (announcement == "") ? "#E5FAFF" : "#FFFFFF"}]}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}