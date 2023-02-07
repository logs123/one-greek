import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";

export default function ChapterScreen({ route }) {

    const { org, firstName, lastName, phoneNumber, type, list } = route.params;
    const [selectedChapter, setSelectedChapter] = useState();
    
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Pick Your Chapter</Text>
            <Picker
                style={styles.picker}
                itemStyle={{ fontSize: 14}}
                selectedValue={selectedChapter}
                onValueChange={(itemValue, itemIndex) => setSelectedChapter(itemValue)}>
                {list}
            </Picker>
            <Text style={styles.bodyText}>Select your chapter.</Text>
            <NextButton
                navigateTo={"Email"}
                params={{ org, firstName, lastName, phoneNumber, type, chapter: selectedChapter }}/>
            <AlreadyExistsButton/>
        </View>
    )
}