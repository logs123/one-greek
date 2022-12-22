import React from "react";
import { Button, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import styles from "./styles";

export default function AuthScreen() {
    
    const navigation = useNavigation();

    return(
        <View style={styles.mainContainer}>
            <StatusBar/>
            <Image style={styles.image} source={require("../../../assets/icon-worded.png")}/>
            <View style={styles.bottomContainer}>
                <Button
                    title="Log Into Existing Account"
                    onPress={() => navigation.navigate("Login")}/>
                <Button
                    title="Sign Up for One Greek"
                    onPress={() => navigation.navigate("Signup")}/>
            </View>
        </View>
    );
}