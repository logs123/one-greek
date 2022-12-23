import React, { useState } from "react";
import { Button, Keyboard, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import { createAnnouncement, getUserAnnouncements } from "../../../redux/actions";

import styles from "./styles";

export default function ComposeModal({ currentUserObj, uid, isVisible, setIsVisible }) {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handlePost = (title, body, creator) => {
        dispatch(createAnnouncement(title, body, creator, uid));
        Keyboard.dismiss;
        setIsVisible(!isVisible);
        dispatch(getUserAnnouncements(currentUserObj.org, currentUserObj.chapter));
    }

    return(
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={"position"} contentContainerStyle={styles.modalContainer} onPress={Keyboard.dismiss}>
                <View style={styles.topModalContainer}>
                    <Text style={styles.userModalInfo}>{currentUserObj.firstName} {currentUserObj.lastName}</Text>
                    <Button
                        title="Cancel"
                        onPress={() => {setIsVisible(!isVisible); setBody("")}}/>
                </View>
                <View style={styles.bottomModalContainer}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Title..."
                        placeholderTextColor={"#808080"}
                        onChangeText={(text) => setTitle(text)}/>
                    <TextInput
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
                        style={[styles.postButton,{backgroundColor: (title == "" || body == "") ? "#E5FAFF" : "#72AEBC"}]}
                        onPress={() => handlePost(title, body, currentUserObj)}>
                        <Text style={[styles.postButtonText,{color: (title == "" || body == "") ? "#E5FAFF" : "#FFFFFF"}]}>Post</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}