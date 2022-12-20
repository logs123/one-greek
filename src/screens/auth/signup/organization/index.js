import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";

export default function OrganizationScreen() {
    const [selectedOrganization, setSelectedOrganization] = useState("asu-cbo");

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Pick Your Organization</Text>
            <Picker
                style={styles.picker}
                itemStyle={{ fontSize: 14}}
                selectedValue={selectedOrganization}
                onValueChange={(itemValue, itemIndex) => setSelectedOrganization(itemValue)}>
                <Picker.Item label="ASU Culturally Based Organizations" value="asu-cbo"/>
                <Picker.Item label="ASU IFC Fraternities" value="asu-ifc"/>
                <Picker.Item label="ASU Panhellenic Sororities" value="asu-pan"/>
            </Picker>
            <Text style={styles.bodyText}>Select your school and Greek organization.</Text>
            <NextButton
                navigateTo={"Name"}
                params={{org: selectedOrganization}}/>
            <AlreadyExistsButton/>
        </View>
    )
}