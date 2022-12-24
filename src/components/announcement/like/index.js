import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { like, unlike } from "../../../redux/actions";

import styles from "./styles";

export default function LikeButton({ likedBy, creator, announcementID, uid }) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [hasLiked, setHasLiked] = useState();
    const [likeCount, setLikedCount] = useState(likedBy.length);
    const [currentLikedBy, setCurrentLikedBy] = useState(likedBy);

    const dispatch = useDispatch();

    useEffect(() => {
        if (likedBy.indexOf(uid) > -1) {
            setHasLiked(true);
            setName("thumb-up");
            setColor("#72AEBC");
            setLikedCount(likedBy.length);
            setCurrentLikedBy(likedBy);
        } else {
            setHasLiked(false);
            setName("thumb-up-outline");
            setColor("#808080");
            setLikedCount(likedBy.length);
            setCurrentLikedBy(likedBy);
        }
    }, []);

    const handleLike = () => {
        if (hasLiked) {
            currentLikedBy.splice(currentLikedBy.indexOf(uid),1);
            dispatch(unlike(creator.org, creator.chapter, announcementID, currentLikedBy))
            setHasLiked(false);
            setName("thumb-up-outline");
            setColor("#808080");
            setCurrentLikedBy(currentLikedBy.splice(likedBy.indexOf(uid),1));
            setLikedCount(likeCount - 1);
        } else {
            dispatch(like(creator.org, creator.chapter, announcementID, [...currentLikedBy, uid]));
            setHasLiked(true);
            setName("thumb-up");
            setColor("#72AEBC");
            setCurrentLikedBy([...currentLikedBy, uid]);
            setLikedCount(likeCount + 1);
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