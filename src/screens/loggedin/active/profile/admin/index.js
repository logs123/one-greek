import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Unverified from "../../../../../components/admin/unverified";
import BackButton from "../../../../../components/back";
import { getUnverified } from "../../../../../redux/actions/admin";

export default function AdminScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currentUser = useSelector(state => state.auth).currentUser;
    const unverified = useSelector(state => state.admin).unverified;

    useEffect(() => {
        dispatch(getUnverified(currentUser.org, currentUser.chapter))
    }, [dispatch])

    return(
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Unverified unverified={unverified}/>
            <BackButton/>
        </SafeAreaView>
    )

}