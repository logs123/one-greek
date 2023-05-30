import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import styles from "./styles";
import NextButton from "../../../../components/signup/next";
import AlreadyExistsButton from "../../../../components/signup/exists";
import { useDispatch, useSelector } from "react-redux";
import { getChapters, updateSelectedChapter } from "../../../../redux/actions/orgs";

export default function ChapterScreen({ route }) {

    const { org, firstName, lastName, phoneNumber, type } = route.params;
    const chapters = useSelector(state => state.orgs).chapters;
    const selectedChapter = useSelector(state => state.orgs).selectedChapter;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChapters(org));
      }, [dispatch]);

    useEffect(() => {
        if (chapters.length > 0 && !selectedChapter) {
            dispatch(updateSelectedChapter(chapters[0].id));
        }
    }, [chapters, selectedChapter, dispatch])

    const handleChapterChange = (chapter) => {
        dispatch(updateSelectedChapter(chapter));
    }
    
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Pick Your Chapter</Text>
            <Picker
                style={styles.picker}
                itemStyle={{ fontSize: 14}}
                selectedValue={selectedChapter}
                onValueChange={handleChapterChange}>
                {chapters.map((item) => (
                    <Picker.Item label={item.data} key={item.id} value={item.id}/>
                ))}
            </Picker>
            <Text style={styles.bodyText}>Select your chapter.</Text>
            <NextButton
                navigateTo={"Email"}
                params={{ org, firstName, lastName, phoneNumber, type, chapter: selectedChapter }}/>
            <AlreadyExistsButton/>
        </View>
    )
}