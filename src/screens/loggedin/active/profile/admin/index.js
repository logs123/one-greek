import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Unverified from "../../../../../components/admin/unverified";
import BackButton from "../../../../../components/back";

export default function AdminScreen() {

    const navigation = useNavigation();
    const currentUserObj = useSelector(state => state.auth);
    const [unverified, setUnverified] = useState([]);

    useEffect(() => {
        const list = [];
        getDocs(collection(getFirestore(), `organizations/${currentUserObj.currentUser.org}/chapters/${currentUserObj.currentUser.chapter}/unverified`))
        .then((docs) => {
            docs.forEach((doc) => {
                list.push({id: doc.id, data: doc.data()})
            });
        })
        setUnverified(list);
        
    }, [])

    return(
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text>Hello!</Text>
            <Unverified/>
            <BackButton/>
        </SafeAreaView>
    )

}