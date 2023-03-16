import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {Dimensions} from 'react-native';

import styles from "./styles";

export default function MessagesScreen() {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return(
        <SafeAreaView edges={["top", "left","right"]} style={[styles.mainContainer]}>
            <View>
                <Text style={{ backgroundColor: "#dddddd"}}>Messages</Text>
                <FlatList
                    data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    ]}
                    renderItem={({item}) => <Text style={{ backgroundColor: "#aaaaaa", padding: 10, width: windowWidth}}>{item.key}</Text>}
                />
            </View>
        </SafeAreaView>
    );
}