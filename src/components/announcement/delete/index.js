import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnnouncement } from "../../../redux/actions";

export default function DeleteButton({ creator, id }) {

    const currentUserAnnouncements = useSelector(state => state.announcement).currentUserAnnouncements;
    const dispatch = useDispatch();

    const handleDelete = () => {
        Alert.alert(
            "Delete Announcement",
            "Are you sure you want to delete this announcement?",
            [{text: "Cancel", style: "cancel"}, {text: "Yes", onPress: () => 
            {
                const updatedAnnouncements = currentUserAnnouncements.filter((item) => item.id !== id)
                dispatch(deleteAnnouncement(creator.org, creator.chapter, id, updatedAnnouncements));
            }
        }]);
    }

    return(
        <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="#808080"/>
        </TouchableOpacity>
    );
}