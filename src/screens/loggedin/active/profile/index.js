import React, { useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/actions";
import { saveUserProfileImage } from "../../../../services/user";
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';

import styles from "./styles";

export default function ProfileScreen() {

    const currentUserObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            saveUserProfileImage(result.assets[0].uri);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>Profile</Text>
                <View style={styles.profileContainer}>
                    <View>
                        <Button title="Press me" onPress={pickImage}/>
                        <Image source={{ uri: currentUserObj.currentUser.photoURL }} style={{ width: 200, height: 200 }}/>
                    </View>
                    <View>
                        <Text style={styles.nameText}>{currentUserObj.currentUser.firstName} {currentUserObj.currentUser.lastName}</Text>
                        <Text></Text>
                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}