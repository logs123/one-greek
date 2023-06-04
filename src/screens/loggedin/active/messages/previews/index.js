import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { RefreshControl, Text, TextInput, View } from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import { getMessagePreviews } from "../../../../../redux/actions/messages";

import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./styles";

export default function PreviewScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const previews = useSelector(state => state.messages).previews;
    const [refreshing, setRefreshing] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        dispatch(getMessagePreviews());
    })

    const handleSearch = () => {
        
    };

    const handleCreateMessage = () => {
        navigation.navigate("CreateMessage");
    }

    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(getMessagePreviews());
        setRefreshing(false);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerRight: () => (
                <TouchableOpacity style={styles.headerButtonContainer} onPress={handleCreateMessage}>
                    <Ionicons name={"create-outline"} size={30} color={"#000000"} />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const handleMessageSelect = (chatID) => {
        navigation.navigate("Message", { chatID });
    }

    const renderPreview = ({ item }) => (
        <TouchableOpacity onPress={() => handleMessageSelect(item.id)}>
          <View style={styles.messagePreview}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
    );

    const renderHiddenChatPreview = ({ item }) => (
        <View style={styles.hiddenContainer}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteChat(item.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return(
        <View style={styles.mainContainer}>
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
            <SwipeListView
                data={previews}
                renderItem={renderPreview}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
                }
                //renderHiddenItem={renderHiddenChatPreview}
                disableRightSwipe
                rightOpenValue={-75}
                swipeToOpenPercent={25}
                swipeToClosePercent={25}
            />
        </View>
    );
}