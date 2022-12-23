import React, { useState } from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import Announcement from "..";
import { getUserAnnouncements } from "../../../redux/actions";

export default function AnnouncementFeed({ currentUserObj, currentUserAnnouncements}) {

    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const renderItem = ({item}) => (
        <Announcement title={item.title} body={item.body} creator={item.creator} creatorID={item.uid} date={item.date} id={item.id} uid={currentUserObj.userID} viewer={currentUserObj.currentUser}/>
    );

    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(getUserAnnouncements(currentUserObj.currentUser.org, currentUserObj.currentUser.chapter))
        setRefreshing(false);
    }

    return(
        <FlatList
            data={currentUserAnnouncements}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
            showsVerticalScrollIndicator={false}
        />
    );
}