import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";

import { CheckBox } from 'react-native-elements'

export default function TypeScreen({ route }) {

    const { org, firstName, lastName, phoneNumber } = route.params;
    const [type, setType] = useState("active"); // active || pnm
    const list = [];
    
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Why are you using One Greek?</Text>
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
                navigateTo={type === "active" ? "Chapter" : "Email"}
                params={{ org, firstName, lastName, phoneNumber, type, list }}
            />
            <AlreadyExistsButton/>
        </View>
    )
}