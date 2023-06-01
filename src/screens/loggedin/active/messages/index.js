import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getMessagePreviews } from "../../../../redux/actions/messages";

import styles from "./styles";

export default function MessagesScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const previews = useSelector(state => state.messages).previews;
    const [refreshing, setRefreshing] = useState(false);

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
            title: "Messages",
            headerRight: () => (
                <TouchableOpacity style={styles.headerButtonContainer} onPress={handleCreateMessage}>
                    <Text style={styles.headerButton}>+</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const handleMessageSelect = (chatID) => {
        navigation.navigate("ChatScreen", { chatID });
    }

    const renderPreview = ({ item }) => (
        <TouchableOpacity onPress={() => handleMessageSelect(item.id)}>
          <View style={styles.messagePreview}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );

    return(
        <View style={styles.mainContainer}>
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