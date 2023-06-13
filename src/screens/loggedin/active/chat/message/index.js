import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "../../../../../redux/actions/chat";

import styles from "./styles";

export default function MessageScreen({ route }) {

    const { chatID } = route.params;
    const dispatch = useDispatch();
    const messages = useSelector(state => state.messages).messages;

    useEffect(() => {
        dispatch(getUserMessages(chatID));
    }, [chatID]);

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.message}</Text>
        </View>
    );

    return(
        <View style={styles.mainContainer}>
            <Text>Message</Text>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}