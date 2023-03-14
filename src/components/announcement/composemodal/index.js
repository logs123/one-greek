import React, { useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { createAnnouncement, getUserAnnouncements } from "../../../redux/actions";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";

import styles from "./styles";

export default function ComposeModal({ modalRef, isModalOpen, setIsModalOpen, currentUserObj, uid }) {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const snapPoints = ["40%"];

    const handlePost = (title, body, creator) => {
        modalRef.current?.dismiss();
        dispatch(createAnnouncement(title, body, creator, uid));
        setIsModalOpen(!isModalOpen);
        dispatch(getUserAnnouncements(currentUserObj.currentUser.org, currentUserObj.currentUser.chapter));
        
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
            style={{borderWidth: .5, borderRadius: 15, backgroundColor: "#E5FAFF"}}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore">
            <View style={styles.topModalContainer}>
                <View style={{ flexDirection: "row", alignItems: "center"}}> 
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