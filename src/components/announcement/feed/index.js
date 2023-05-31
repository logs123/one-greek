import React, { useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Announcement from "..";
import { getUserAnnouncements } from "../../../redux/actions";

export default function AnnouncementFeed() {

    const dispatch = useDispatch();
    const currentUserObj = useSelector(state => state.auth);
    const currentUserAnnouncements = useSelector(state => state.announcement).currentUserAnnouncements;
    const [refreshing, setRefreshing] = useState(false);

    const renderItem = ({item}) => (
        <Announcement announcement={item}/>
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
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
        />
    );
}