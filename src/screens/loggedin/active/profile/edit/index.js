import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../../../components/back";

import styles from "./styles";

export default function EditScreen() {

    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.mainContainer}>
            <BackButton/>
            <View>
                <Text>Edit Profile</Text>
            </View>
        </SafeAreaView>
    )
}