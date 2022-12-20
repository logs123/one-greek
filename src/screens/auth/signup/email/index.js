import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import AlreadyExistsButton from "../../../../components/signup/exists";
import NextButton from "../../../../components/signup/next";

import styles from "./styles";

export default function EmailScreen({ route }) {

    const {org, firstName, lastName, phoneNumber} = route.params;
    const [email, setEmail] = useState("");

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>What's Your Email Address?</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Enter your email address" clearButtonMode="while-editing" keyboardType="email-address" autoCapitalize="none" spellCheck="false" onChangeText={newText => setEmail(newText)}/>
            </View>
            <Text style={styles.bodyText}>You'll use this to log in and for organizations to contact you.</Text>
            <NextButton
                navigateTo={"Password"}
                params={{org, firstName, lastName, phoneNumber, email}}
                isDisabled={!email}
                bc={email ? "#72AEBC" : "#FFFFFF"}/>
            <AlreadyExistsButton/>
        </View>
    );
}