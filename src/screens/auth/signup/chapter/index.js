import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getChapters } from "../../../../redux/actions/orgs";

export default function ChapterScreen({ route }) {

    const { org, firstName, lastName, phoneNumber, type } = route.params;
    const [selectedChapter, setSelectedChapter] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChapters(org))
    },[])

    let list = useSelector(state => state.orgs).chapters.map((myValue, myIndex) => {
        return(
            <Picker.Item label={myValue.data} value={myValue.id} key={myIndex}/>
        )
    });
    
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