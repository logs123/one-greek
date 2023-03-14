import React, { useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/actions";
import * as ImagePicker from 'expo-image-picker';

import styles from "./styles";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

export default function ProfileScreen() {
    
    const currentUserObj = useSelector(state => state.auth);

    const [image, setImage] = useState(currentUserObj.photoURL);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

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
            setImage(uploadURL);
            updateProfile(getAuth().currentUser, {
                photoURL: uploadURL
            })
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        } else {
            setImage(null);
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
            const storageRef = ref(getStorage(), `users/${currentUserObj.currentUser.uid}/profile.jpeg`);
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
                        <Button title="Press me" onPress={pickImage}/>
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>
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