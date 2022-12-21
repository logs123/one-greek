import React, { useState } from "react";
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import AlreadyExistsButton from "../../../../components/signup/exists";
import NextButton from "../../../../components/signup/next";

import styles from "./styles";

export default function PhoneScreen({ route }) {

    const {org, firstName, lastName} = route.params;
    const [phoneNumber, setPhoneNumber] = useState(0);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}>What's Your Mobile Number?</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your mobile number"
                        clearButtonMode="while-editing"
                        keyboardType="number-pad"
                        onChangeText={newText => setPhoneNumber(newText)}/>
                </View>
                <Text style={styles.bodyText}>This is for organizations to be able to contact you.</Text>
                <NextButton
                    navigateTo={"Email"}
                    params={{org, firstName, lastName, phoneNumber}}
                    isDisabled={!(phoneNumber.toString().length >= 10)}
                    bc={(phoneNumber.toString().length >= 10) ? "#72AEBC" : "#FFFFFF"}/>
                <AlreadyExistsButton/>
            </View>
        </TouchableWithoutFeedback>
    );
}