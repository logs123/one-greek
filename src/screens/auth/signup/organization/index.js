import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";
import { useSelector } from "react-redux";

export default function OrganizationScreen() {

    let list = useSelector(state => state.orgs).orgs.map((myValue, myIndex) => {
        return(
            <Picker.Item label={myValue.data} value={myValue.id} key={myIndex}/>
        )
    });

    const [selectedOrganization, setSelectedOrganization] = useState(useSelector(state => state.orgs).orgs[0].id);
    
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Pick Your Organization</Text>
            <Picker
                style={styles.picker}
                itemStyle={{ fontSize: 14}}
                selectedValue={selectedOrganization}
                onValueChange={(itemValue, itemIndex) => setSelectedOrganization(itemValue)}>
                {list}
            </Picker>
            <Text style={styles.bodyText}>Select your school and Greek organization.</Text>
            <NextButton
                navigateTo={"Name"}
                params={{org: selectedOrganization}}/>
            <AlreadyExistsButton/>
        </View>
    )
}