import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";

import ComposeModal from "../../../../components/announcement/composemodal";
import AnnouncementFeed from "../../../../components/announcement/feed";
import { getUserAnnouncements } from "../../../../redux/actions";

import styles from "./styles";

export default function AnnouncementsScreen() {
    
    const currentUser = useSelector(state => state.auth).currentUser;
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bottomSheetModalRef = useRef(null);

    useEffect(() => {
        dispatch(getUserAnnouncements(currentUser.org, currentUser.chapter));
    }, [dispatch])

    const handlePresentModal = () => {
        bottomSheetModalRef.current?.present();
        setIsModalOpen(true);
    }
    
    const handleModalClick = (isModalOpen) => {
        setIsModalOpen(isModalOpen)
    }

    return(
        <SafeAreaView edges={["top"]} style={[styles.mainContainer]}>
            <StatusBar/>
            <AnnouncementFeed/>
            <TouchableOpacity style={styles.composeButton} onPress={handlePresentModal}>
                <MaterialIcons name="add" size={48} color="#FFFFFF"/>
            </TouchableOpacity>
            <ComposeModal modalRef={bottomSheetModalRef} isModalOpen={isModalOpen} setIsModalOpen={handleModalClick}/>
        </SafeAreaView>
    );
}