import React, { useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfileImage } from "../../../../../redux/actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';

import styles from "./styles";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
    
    const currentUserObj = useSelector(state => state.auth);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const image = useSelector(state => state.auth).photoURL;

    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        setIsLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            dispatch(updateProfileImage(uploadURL));
            updateProfile(getAuth().currentUser, {
                photoURL: uploadURL
            })
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        } else {
            dispatch(updateProfileImage(null));
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        
        try {
            const storageRef = ref(getStorage(), `organizations/${currentUserObj.currentUser.org}/users/${currentUserObj.userID}/profile.jpeg`);
            const result = await uploadBytes(storageRef, blob);

            blob.close();
            return await getDownloadURL(storageRef);
        } catch (error) {
            alert(`Error : ${error}`);
        }
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>Profile</Text>
                <View style={styles.profileContainer}>
                    <View>
                        <Image source={{ uri: image }} style={styles.profileImage}/>
                        <TouchableOpacity
                            style={styles.changePic}
                            onPress={pickImage}>
                            <MaterialCommunityIcons name={"camera-outline"} size={24} color={"#808080"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.nameText}>{currentUserObj.currentUser.firstName} {currentUserObj.currentUser.lastName}</Text>
                        <Text style={styles.chapterText}>{currentUserObj.currentUser.chapter.replace(/-/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate("EditScreen")}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="snapchat" size={36} color="#000000"/>
                    <Text style={styles.socialText}>@{currentUserObj.currentUser.socials[0]}</Text>
                </View>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="instagram" size={36} color="#962fbf"/>
                    <Text style={styles.socialText}>@{currentUserObj.currentUser.socials[1]}</Text>
                </View>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="twitter" size={36} color="#00acee"/>
                    <Text style={styles.socialText}>@{currentUserObj.currentUser.socials[2]}</Text>
                </View>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="facebook" size={36} color="#3b5998"/>
                    <Text style={styles.socialText}>@{currentUserObj.currentUser.socials[3]}</Text>
                </View>
            </View>
            <Button title="Admin Panel" onPress={() => navigation.navigate("AdminScreen")}/>
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