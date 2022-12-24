import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";

import ComposeModal from "../../../../components/announcement/composemodal";
import AnnouncementFeed from "../../../../components/announcement/feed";

import styles from "./styles";

export default function AnnouncementsScreen() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentUserObj = useSelector(state => state.auth);
    const currentUserAnnouncements = useSelector(state => state.announcement).currentUserAnnouncements;
    const bottomSheetModalRef = useRef(null);

    const handlePresentModal = () => {
        bottomSheetModalRef.current?.present();
        setIsModalOpen(true);
    }
    
    const handleModalClick = (isModalOpen) => {
        setIsModalOpen(isModalOpen)
    }

    return(
        <SafeAreaView edges={["top", "left","right"]} style={[styles.mainContainer]}>
            <StatusBar/>
            <AnnouncementFeed currentUserObj={currentUserObj} currentUserAnnouncements={currentUserAnnouncements}/>
            <TouchableOpacity style={styles.composeButton} onPress={handlePresentModal}>
                <MaterialIcons name="add" size={48} color="#FFFFFF"/>
            </TouchableOpacity>
            <ComposeModal modalRef={bottomSheetModalRef} isModalOpen={isModalOpen} setIsModalOpen={handleModalClick} currentUserObj={currentUserObj.currentUser} uid={currentUserObj.userID}/>
        </SafeAreaView>
    );
}