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
                        autoCorrect={false}
                        keyboardType="email-address"
                        spellCheck="false"
                        onChangeText={(text) => setEmail(text.trim())}/>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        clearButtonMode="while-editing"
                        autoCapitalize="none"
                        autoCorrect={false}
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