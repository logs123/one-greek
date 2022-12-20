import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View } from "react-native";

import styles from "./styles";

export default function AlreadyExistsButton() {

    const navigation = useNavigation();

    return(
        <View style={styles.mainContainer}>
            <Button
                title="Already have an account?"
                onPress={() => navigation.navigate("Auth")}/>
        </View>
    )
}