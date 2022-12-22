import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import ComposeModal from "../../../../components/announcement/composemodal";
import AnnouncementFeed from "../../../../components/announcement/feed";

import styles from "./styles";

export default function AnnouncementsScreen() {

    const [showCompose, setShowCompose] = useState(false);
    const currentUserObj = useSelector(state => state.auth).currentUser;
    const currentUserAnnouncements = useSelector(state => state.announcement).currentUserAnnouncements;
    
    const handleModalClick = (showCompose) => {
        setShowCompose(showCompose)
    }

    return(
        <SafeAreaView edges={["top", "left","right"]} style={styles.mainContainer}>
            <StatusBar/>
            <AnnouncementFeed currentUserObj={currentUserObj} currentUserAnnouncements={currentUserAnnouncements}/>
            <TouchableOpacity style={styles.composeButton} onPress={() => setShowCompose(true)}>
                <MaterialIcons name="add" size={48} color="#FFFFFF"/>
            </TouchableOpacity>
            <ComposeModal currentUserObj={currentUserObj} isVisible={showCompose} setIsVisible={handleModalClick}/>
        </SafeAreaView>
    );
}