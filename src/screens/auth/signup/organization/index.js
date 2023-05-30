import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedOrg } from "../../../../redux/actions/orgs";

export default function OrganizationScreen() {

    const orgs = useSelector(state => state.orgs).orgs;
    const selectedOrg = useSelector(state => state.orgs).selectedOrg;

    const dispatch = useDispatch();

    const handleOrgChange = (org) => {
        dispatch(updateSelectedOrg(org));
    }
    
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Pick Your Organization</Text>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={selectedOrg}
                onValueChange={handleOrgChange}>
                {orgs.map((item) => (
                    <Picker.Item label={item.data} key={item.id} value={item.id}/>
                ))}
            </Picker>
            <Text style={styles.bodyText}>Select your school and Greek organization.</Text>
            <NextButton
                navigateTo={"Name"}
                params={{org: selectedOrg}}/>
            <AlreadyExistsButton/>
        </View>
    )
}