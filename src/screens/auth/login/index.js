import React, { useState } from "react";
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

import styles from "./styles";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = () => {
        dispatch(login(getAuth(), email, password))
        .then(() => {
             
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/invalid-email":
                    Alert.alert("Invalid Email", "The email that you have entered is not valid.");
                    break;
                case "auth/user-not-found":
                    Alert.alert("User Not Found", "The credentials you have entered do not match an account.");
                    break;
                case "auth/wrong-password":
                    Alert.alert("Wrong Password", "The password you have entered does not match the username.");
                    break;
                default:
                    console.log(error);
                    break;
            }
        })
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={"padding"} style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={require("../../../../assets/icon-worded.png")}/>
                </View>
                <View style={styles.centerContainer}>
                    <TextInput
                        style={styles.emailInput}
                        placeholder="Email"
                        clearButtonMode="while-editing"
                        autoCapitalize="none"
                        autoCorrect="false"
                        keyboardType="email-address"
                        spellCheck="false"
                        onChangeText={(text) => setEmail(text.trim())}/>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        clearButtonMode="while-editing"
                        autoCapitalize="none"
                        autoCorrect="false"
                        spellCheck="false"
                        secureTextEntry="true"
                        onChangeText={(text) => setPassword(text)}/>
                    <TouchableOpacity
                        style={styles.loginButton}
                        disabled={!(email && password)}
                        onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Log in</Text>
                    </TouchableOpacity>
                    <Button
                        title="Forgot Password?"
                        onPress={() => navigation.navigate("ForgotPassword")}/>
                </View>
                <View style={styles.bottomContainer}>
                    <Button
                        title="Create new account"
                        onPress={() => navigation.navigate("Auth")}/>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}