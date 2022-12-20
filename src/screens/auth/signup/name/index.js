import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import AlreadyExistsButton from "../../../../components/signup/exists";
import NextButton from "../../../../components/signup/next";

import styles from "./styles";

export default function NameScreen({ route }) {

    const {org} = route.params;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>What's Your Name?</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    clearButtonMode="while-editing"
                    spellCheck="false"
                    onChangeText={newText => setFirstName(newText.trim())}/>
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    clearButtonMode="while-editing"
                    spellCheck="false"
                    onChangeText={newText => setLastName(newText.trim())}/>
            </View>
            <Text style={styles.bodyText}>Use your real name for organizations to know who you are.</Text>
            <NextButton
                navigateTo={"Phone"}
                params={{org, firstName, lastName}}
                isDisabled={!(firstName && lastName)}
                bc={((firstName && lastName) ? "#72AEBC" : "#FFFFFF")}/>
            <AlreadyExistsButton/>
        </View>
    );
}