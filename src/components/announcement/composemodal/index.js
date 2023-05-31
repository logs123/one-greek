import React, { useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createAnnouncement } from "../../../redux/actions";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";

import styles from "./styles";

export default function ComposeModal({ modalRef, isModalOpen, setIsModalOpen }) {

    const dispatch = useDispatch();
    const currentUserObj = useSelector(state => state.auth);
    const currentUserAnnouncements = useSelector(state => state.announcement).currentUserAnnouncements;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const snapPoints = ["40%"];

    const handlePost = (title, body, creator) => {
        modalRef.current?.dismiss();
        const date = new Date();
        dispatch(createAnnouncement(title, body, creator, currentUserObj.userID, date.getTime(), [], currentUserAnnouncements));
        // ID CAN'T BE NULL. NEED TO GET ANNOUNCEMENT DOCUMENT ID
        if (currentUserAnnouncements.length > 0) {
            currentUserAnnouncements.unshift({ body, creator, date, id: null, likedBy: [], title, uid: currentUserObj.userID })
        } else {
            currentUserAnnouncements.push({ body, creator, date, id: null, likedBy: [], title, uid: currentUserObj.userID })
        }
        setIsModalOpen(!isModalOpen);
    }

    const handleClosePress = () => {
        modalRef.current?.dismiss();
    }

    return(
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            onDismiss={() => {setIsModalOpen(false); setTitle(""); setBody("")}}
            style={styles.bottomSheetModal}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore">
            <View style={styles.topModalContainer}>
                <View style={styles.topModalInfoContainer}> 
                    <Image source={{ uri: currentUserObj.photoURL }} style={{ width: 30, height: 30, borderRadius: 30, marginRight: 10 }}/>
                    <Text style={styles.userModalInfo}>{currentUserObj.currentUser.firstName} {currentUserObj.currentUser.lastName}</Text>
                </View>
                <Button
                    title="Cancel"
                    onPress={handleClosePress}/>
            </View>
            <View style={styles.bottomModalContainer}>
                <BottomSheetTextInput
                    style={styles.titleInput}
                    placeholder="Title..."
                    placeholderTextColor={"#808080"}
                    onChangeText={(text) => setTitle(text)}/>
                <BottomSheetTextInput
                    style={styles.messageInput}
                    placeholder="Begin your announcement here..."
                    placeholderTextColor={"#808080"}
                    multiline
                    numberOfLines={10}
                    onChangeText={(text) => setBody(text)}
                    onContentSizeChange={(event) => {event.nativeEvent.contentSize}}/>
            </View>
            <View style={{position: "absolute", bottom: 0, marginBottom: 10, right: 30}}>
                <TouchableOpacity
                    disabled={title == "" || body == ""}
                    style={[styles.postButton,{backgroundColor: (title == "" || body == "") ? "#FFFFFF" : "#72AEBC"}]}
                    onPress={() => {handlePost(title, body, currentUserObj.currentUser)}}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    );
}