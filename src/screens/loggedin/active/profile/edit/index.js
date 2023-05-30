import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../../../components/back";

import styles from "./styles";

export default function EditScreen() {

    const currentUserObj = useSelector(state => state.auth);

    const [snapchat, setSnapchat] = useState(currentUserObj.currentUser.socials[0]);
    const [instagram, setInstagram] = useState(currentUserObj.currentUser.socials[1]);
    const [facebook, setFacebook] = useState(currentUserObj.currentUser.socials[2]);
    const [twitter, setTwitter] = useState(currentUserObj.currentUser.socials[3]);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSave = () => {
        dispatch(updateProfile(snapchat, instagram, twitter, facebook))
        .then(() =>
            navigation.goBack()
        )
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.mainContainer}>
            <BackButton/>
            <View>
                <Text style={styles.headerText}>Edit Profile</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="snapchat" size={36} color="#000000"/>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect="false"
                        clearButtonMode="while-editing"
                        style={styles.socialInput}
                        value={snapchat}
                        onChangeText={(text) => setSnapchat(text.trim())}
                    />
                </View>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="instagram" size={36} color="#962fbf"/>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect="false"
                        clearButtonMode="while-editing"
                        style={styles.socialInput}
                        value={instagram}
                        onChangeText={(text) => setInstagram(text.trim())}
                    />
                </View>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="twitter" size={36} color="#00acee"/>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect="false"
                        clearButtonMode="while-editing"
                        style={styles.socialInput}
                        value={facebook}
                        onChangeText={(text) => setFacebook(text.trim())}
                    />
                </View>
                <View style={styles.socialContainer}>
                    <MaterialCommunityIcons name="facebook" size={36} color="#3b5998"/>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect="false"
                        clearButtonMode="while-editing"
                        style={styles.socialInput}
                        value={twitter}
                        onChangeText={(text) => setTwitter(text.trim())}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}