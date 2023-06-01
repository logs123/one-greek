import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../../../../redux/actions/messages";
import { getUsersByChapter } from "../../../../../redux/actions/users";

import styles from "./styles";

export default function CreateMessageScreen({ navigation }) {

    const dispatch = useDispatch();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const currentUserObj = useSelector(state => state.auth);
    const chapterUsers = useSelector(state => state.users).chapterUsers;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Create" onPress={handleCreateMessage} disabled={selectedUsers.length === 0} />
            ),
        });
        dispatch(getUsersByChapter(currentUserObj.currentUser.chapter))
    }, [selectedUsers]);

    const handleUserPress = (userID) => {
        const isSelected = selectedUsers.includes(userID);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userID));
        } else {
            setSelectedUsers([...selectedUsers, userID]);
        }
    };

    const handleCreateMessage = () => {
        if (selectedUsers.length === 0) {
            return;
        }
        const isGroupChat = selectedUsers.length > 1;
        dispatch(createMessage(selectedUsers, isGroupChat));
        navigation.goBack();
    };

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={chapterUsers}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleUserPress(item.id)}>
                        <View style={[styles.userItem, selectedUsers.includes(item.id) && styles.selectedUserItem]}>
                            <Text>{item.firstName} {item.lastName}</Text>
                            {selectedUsers.includes(item.id) && <Text>Selected</Text>}
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
    
}

CreateMessageScreen.navigationOptions = ({ navigation }) => ({
    title: "New Message",
    headerRight: () => (
        <Button
            title="Create"
            onPress={() => navigation.getParam("handleCreateMessage")()}
            disabled={!navigation.getParam("canCreateMessage")}
            color="#000"
        />
    ),
});