import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";


// name
// Selected => "thumb-up"
// Not Selected => "thumb-up-outline"

// size
// 24 or 36?

// color
// Selected => "#72AEBC"
// Not Selected => "#808080"


// Props
// current like
//  if 0 => no number
//  > 0 => Text shown with number
// if user has liked or not
//  if yes => onClick is unlike
//  if no => onClick is like

export default function LikeButton({ likeNumber, hasLiked }) {

    const [name, setName] = useState();
    const [color, setColor] = useState();
    const [currentLikeNumber, setCurrentLikeNumber] = useState(likeNumber);

    const handleLike = () => {
        if (hasLiked) {
            // dislike action
        } else {
            // like action
        }
    }

    return(
        <TouchableOpacity onPress={handleLike} style={styles.mainContainer}>
            <MaterialCommunityIcons name={name} size={24} color={color}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}></Text>
            </View>
        </TouchableOpacity>
    );
}