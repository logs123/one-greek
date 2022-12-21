import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Keyboard, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import Announcement from "../../../../components/announcement";
import { createAnnouncement, getUserAnnouncements } from "../../../../redux/actions/announcement";

import styles from "./styles";

export default function AnnouncementsScreen() {

    const renderItem = ({item}) => (
        <Announcement title={item.title} body={item.body} creator={item.creator} date={item.date}/>
    );

    const [showCompose, setShowCompose] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const currentUserObj = useSelector(state => state.auth).currentUser;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAnnouncements(currentUserObj))
        .then((announcement) => {
            setAnnouncements(announcement)
        })
    }, [])

    const handlePost = (title, body, creator) => {
        dispatch(createAnnouncement(title, body, creator));
        Keyboard.dismiss;
        setShowCompose(false);
        dispatch(getUserAnnouncements(currentUserObj))
        .then((announcement) => {
            setAnnouncements(announcement)
        })
    }

    const handleRefresh = () => {
        setRefreshing(true)
        dispatch(getUserAnnouncements(currentUserObj))
        .then((announcement) => {
            setAnnouncements(announcement)
        })
        setRefreshing(false)
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar/>
            <FlatList
                data={announcements}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshing={refreshing}
                onRefresh={() => handleRefresh()}
            />
            <TouchableOpacity style={styles.composeButton} onPress={() => setShowCompose(true)}>
                <MaterialIcons name="add" size={48} color="#FFFFFF"/>
            </TouchableOpacity>
            <Modal animationType="slide" transparent={true} visible={showCompose}>
                <KeyboardAvoidingView behavior={"position"} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.topModalContainer}>
                        <Text style={styles.userModalInfo}>{currentUserObj.firstName} {currentUserObj.lastName}</Text>
                        <Button
                            title="Cancel"
                            onPress={() => {setShowCompose(false); setBody("")}}/>
                    </View>
                    <View style={styles.bottomModalContainer}>
                        <TextInput
                            style={styles.postInput}
                            placeholder="Title..."
                            placeholderTextColor={"#808080"}
                            onChangeText={(text) => setTitle(text)}/>
                        <TextInput
                            style={styles.postInput}
                            placeholder="Begin your announcement here..."
                            placeholderTextColor={"#808080"}
                            multiline
                            onChangeText={(text) => setBody(text)}/>
                    </View>
                    <View style={{position: "absolute", bottom: 0, marginBottom: 10, right: 30}}>
                        <TouchableOpacity
                            disabled={body == ""}
                            style={[styles.postButton,{backgroundColor: (body == "") ? "#E5FAFF" : "#72AEBC"}]}
                            onPress={() => handlePost(title, body, currentUserObj)}>
                            <Text style={[styles.postButtonText,{color: (body == "") ? "#E5FAFF" : "#FFFFFF"}]}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    )
}