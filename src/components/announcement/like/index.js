import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../../../redux/actions";

import styles from "./styles";

export default function LikeButton({ likedBy, creator, announcementID, uid }) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const currentUserAnnouncements = useSelector(state => state.announcement).currentUserAnnouncements;
    const hasLiked = useSelector(state => state.announcement).currentUserAnnouncements.some((item) => item.id === announcementID && item.likedBy.some((item) => item === uid));
    const likeCount = useSelector(state => state.announcement).currentUserAnnouncements.find((item) => item.id === announcementID).likedBy.length;
    const currentLikedBy = useSelector(state => state.announcement).currentUserAnnouncements.find((item) => item.id === announcementID).likedBy;

    const dispatch = useDispatch();

    useEffect(() => {
        if (likedBy.indexOf(uid) > -1) {
            setName("thumb-up");
            setColor("#72AEBC");
        } else {
            setName("thumb-up-outline");
            setColor("#808080");
        }
    }, []);

    const handleLike = () => {
        if (hasLiked) {
            const updatedAnnouncements = currentUserAnnouncements.map((item) => {
                if (item.id === announcementID) {
                    return {
                        ...item,
                        likedBy: currentLikedBy.filter((item) => item !== uid)
                    }
                } else {
                    return {
                        ...item
                    }
                }
            })
            dispatch(unlike(creator.org, creator.chapter, announcementID, currentLikedBy.filter((item) => item !== uid), updatedAnnouncements));
            setName("thumb-up-outline");
            setColor("#808080");
        } else {
            const updatedAnnouncements = currentUserAnnouncements.map((item) => {
                if (item.id === announcementID) {
                    return {
                        ...item,
                        likedBy: [...currentLikedBy, uid]
                    }
                } else {
                    return {
                        ...item
                    }
                }
            })
            dispatch(like(creator.org, creator.chapter, announcementID, [...currentLikedBy, uid], updatedAnnouncements));
            setName("thumb-up");
            setColor("#72AEBC");
        }
    }

    return(
        <TouchableOpacity onPress={handleLike} style={styles.mainContainer}>
            <MaterialCommunityIcons name={name} size={24} color={color}/>
            <View style={styles.textContainer}>
                <Text style={[styles.text, {color: color}]}>{likeCount > 0 ? likeCount : null}</Text>
            </View>
        </TouchableOpacity>
    );
}