import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";

export default function NextButton({ navigateTo, params={}, isDisabled=false, bc="#72AEBC", onPress={}}) {

    const navigation = useNavigation();

    return(
        <View>
            <TouchableOpacity
                disabled={isDisabled}
                style={[styles.nextButton, {backgroundColor: bc}]}
                onPress={() =>navigation.navigate(navigateTo, params)}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}