import React, { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../../redux/actions";

import { getAuth } from "firebase/auth";

import styles from "./styles";

export default function ForgotPasswordScreen() {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleForgotPassword = () => {
        dispatch(forgotPassword(getAuth(), email))
        .then(() => {
            Alert.alert("Reset Email Sent!", "Password reset email has been successfully sent.");
            navigation.navigate("Auth");
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/invalid-email":
                    Alert.alert("Invalid Email", "The email that you have entered is not valid.");
                    break;
                case "auth/user-not-found":
                    Alert.alert("User Not Found", "The email you entered does not match an account.");
                default:
                    console.log(error);
            }
        })
    }

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Forgot Password?</Text>
            <TextInput
                style={styles.emailInput}
                placeholder="Email"
                clearButtonMode="while-editing"
                autoCapitalize="none"
                autoCorrect="false"
                keyboardType="email-address"
                spellCheck="false"
                onChangeText={(text) => setEmail(text.trim())}/>
            <TouchableOpacity
                style={styles.resetButton}
                disabled={!email}
                onPress={() => handleForgotPassword()}>
                <Text style={styles.resetButtonText}>Send Reset Email</Text>
            </TouchableOpacity>
            <Button 
                title="Back"
                onPress={() => navigation.goBack()}/>
        </View>
    )
}