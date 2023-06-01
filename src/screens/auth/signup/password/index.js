import React, { useState } from "react";
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { register } from "../../../../redux/actions";
import { getAuth } from "firebase/auth";

import AlreadyExistsButton from "../../../../components/signup/exists";

import styles from "./styles";

export default function PasswordScreen({ route }) {

    const {org, firstName, lastName, phoneNumber, chapter, email, type} = route.params;
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSignup = () => {
        dispatch(register(getAuth(), email, password, org, firstName, lastName, chapter, phoneNumber, type));
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    onPress={handleSignup}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <AlreadyExistsButton/>
            </View>
        </TouchableWithoutFeedback>
    )
}