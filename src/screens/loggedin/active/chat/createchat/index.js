import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../../../../../redux/actions/chat";
import { getUsersByChapter } from "../../../../../redux/actions/users";

import styles from "./styles";

export default function CreateChatScreen({ navigation, route }) {

    const { chatType } = route.params;
    const dispatch = useDispatch();
    const currentUserObj = useSelector(state => state.auth);
    const chapterUsers = useSelector(state => state.users).chapterUsers;
    const [title, setTitle] = useState("");
    const [members, setMembers] = useState([currentUserObj.userID]);
    const [isGroupChat, setIsGroupChat] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            title: chatType === "group" ? "New Group Chat" : "New Direct Message",
            headerRight: () => (
                <Button title="Create" onPress={handleCreateChat} disabled={members.length < 2} />
            ),
        });
        dispatch(getUsersByChapter(currentUserObj.currentUser.chapter))
    }, [members]);

    const handleUserPress = (userID) => {
        const isSelected = members.includes(userID);
        if (isSelected) {
            setMembers(members.filter((id) => id !== userID));
        } else {
            setMembers([...members, userID]);
        }
    };

    const handleCreateChat = () => {
        if (members.length < 2) {
            return;
        } else if (chatType === "individual") {
            setIsGroupChat(false);
        }
        dispatch(createChat(title, members, isGroupChat));
        navigation.goBack();
    };

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={chapterUsers}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleUserPress(item.id)}>
                        <View style={[styles.userItem, members.includes(item.id) && styles.membersItem]}>
                            <Text>{item.firstName} {item.lastName}</Text>
                            {members.includes(item.id) && <Text>Selected</Text>}
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
    
}

CreateChatScreen.navigationOptions = ({ navigation }) => ({
    title: "New Message",
    headerRight: () => (
        <Button
            title="Create"
            onPress={() => navigation.getParam("handleCreateChat")()}
            disabled={!navigation.getParam("canCreateChat")}
            color="#000"
        />
    ),
});