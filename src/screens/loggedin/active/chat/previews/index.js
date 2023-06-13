import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Modal, RefreshControl, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getChatPreviews } from "../../../../../redux/actions/chat";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";

export default function PreviewScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const previews = useSelector(state => state.chat).previews;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const buttonRef = useRef(null);
    const [modalPosition, setModalPosition] = useState({ top: useHeaderHeight(), right: 393});
    const modalWidth = 180;

    console.log(Dimensions.get("window").width)

    useEffect(() => {
        dispatch(getChatPreviews());
    }, [dispatch])

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const handleCreateChat = (type) => {
        closeModal();
        navigation.navigate("CreateChat", { chatType: type });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerRight: () => (
                <TouchableOpacity ref={buttonRef} style={styles.headerButtonContainer} onPress={() => setIsModalVisible(true)}>
                    <Ionicons name={"create-outline"} size={30} color={"#000000"} />
                </TouchableOpacity>
            )
        });
    }, [navigation])

    const handleSearch = () => {
        
    }

    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(getChatPreviews());
        setRefreshing(false);
    }

    const handleMessageSelect = (chatID) => {
        navigation.navigate("Message", { chatID });
    }

    const renderPreview = ({ item }) => {
        return (
            <TouchableOpacity key={item.id} onPress={() => handleMessageSelect(item.id)}>
                <View style={styles.messagePreview}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.mainContainer}>
            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContainer}>
                        <View style={[styles.modal, {width: modalWidth}]}>
                            <TouchableOpacity onPress={() => handleCreateChat("group")} style={styles.modalSelectionContainer}>
                                <Text style={styles.createText}>Group</Text>
                                <MaterialCommunityIcons name="account-group-outline" size={24} color="black"/>
                            </TouchableOpacity>
                            <View style={styles.line}/>
                            <TouchableOpacity onPress={() => handleCreateChat("individual")} style={styles.modalSelectionContainer}>
                                <Text style={styles.createText}>Direct Message</Text>
                                <MaterialCommunityIcons name="chat-plus-outline" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name={"search-outline"} size={16} color={"#000000"} />
                    <TextInput
                        placeholder="Search messages..."
                        value={searchKeyword}
                        onChangeText={(text) => setSearchKeyword(text)}
                        onSubmitEditing={handleSearch}
                        style={styles.searchBarInput}
                    />
                </View>
            </View>
            <FlatList
                data={previews}
                renderItem={renderPreview}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
                }
            />
        </View>
    );
}