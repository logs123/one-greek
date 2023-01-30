import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { deleteAnnouncement, getUserAnnouncements } from "../../../redux/actions";

export default function DeleteButton({ creator, id, viewer }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        Alert.alert(
            "Delete Announcement",
            "Are you sure you want to delete this announcement?",
            [{text: "Cancel", style: "cancel"}, {text: "Yes", onPress: () => 
            {
                dispatch(deleteAnnouncement(creator.org, creator.chapter, id));
                dispatch(getUserAnnouncements(viewer.org, viewer.chapter));
            }
        }]);
    }

    return(
        <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="#808080"/>
        </TouchableOpacity>
    );
}