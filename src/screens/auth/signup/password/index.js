import React, { useState } from "react";
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { register } from "../../../../redux/actions";
import { getAuth } from "firebase/auth";

import AlreadyExistsButton from "../../../../components/signup/exists";

import styles from "./styles";

export default function PasswordScreen({ route }) {

    const {org, firstName, lastName, phoneNumber, email} = route.params;
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSignup = () => {
        dispatch(register(getAuth(), email, password, org, firstName, lastName, phoneNumber))
        .then(() => {
            console.log("Successful signup!")
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/invalid-email":
                    Keyboard.dismiss();
                    Alert.alert("Invalid Email", "The email that you have entered is not valid.");
                    navigation.navigate("Email", {org, firstName, lastName, phoneNumber});
                    break;
                case "auth/email-already-in-use":
                    Keyboard.dismiss();
                    Alert.alert("Email Already In Use", "The email you have entered already belongs to someone.");
                    navigation.navigate("Email", {org, firstName, lastName, phoneNumber});
                    break;
                default:
                    console.log(error);
                    break;
            }
        })
    }

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Create a Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    clearButtonMode="while-editing"
                    autoCapitalize="none"
                    onChangeText={newText => setPassword(newText)}/>
            </View>
            <Text style={styles.bodyText}>Enter a combination of at least six numbers, letters, and punctuation marks (like ! and &).</Text>
            <TouchableOpacity
                disabled={!(password.length >= 6)}
                style={{
                    backgroundColor: (password.length >= 6) ? "#72AEBC" : "#FFFFFF",
                    width: 350,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5
                }}
                onPress={() => handleSignup()}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <AlreadyExistsButton/>
        </View>
    )
}