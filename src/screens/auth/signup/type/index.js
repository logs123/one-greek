import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RadioButton, Text as RBText } from "react-native-paper"

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";

import { CheckBox } from 'react-native-elements'

export default function TypeScreen({ route }) {
    const { org, firstName, lastName, phoneNumber } = route.params;
    const [type, setType] = useState("active"); // active || pnm
    
    return(
        <View style={styles.mainContainer}>
            <CheckBox
                containerStyle={{marginBottom: 10, minWidth: 350}}
                title='I am already a member of an organization'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={type === "active"}
                onPress={() => setType("active")}
                />
            <CheckBox
                containerStyle={{marginBottom: 10, minWidth: 350}}
                title='I am looking to join an organization'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={type === "pnm"}
                onPress={() => setType("pnm")}
            />
            <NextButton
                navigateTo={"Email"}
                params={{ org, firstName, lastName, phoneNumber, type }}
            />
            <AlreadyExistsButton/>
        </View>
    )
}