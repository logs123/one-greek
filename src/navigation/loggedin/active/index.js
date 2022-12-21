import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AnnouncementsScreen from "../../../screens/loggedin/active/announcements";
import MessagesScreen from "../../../screens/loggedin/active/messages";
import CalendarScreen from "../../../screens/loggedin/active/calendar";
import SearchScreen from "../../../screens/loggedin/active/search";
import ProfileScreen from "../../../screens/loggedin/active/profile";

const Tab = createBottomTabNavigator();

export default function Active() {
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === 'Announcements') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              } else if (route.name === 'Messages') {
                iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
              } else if (route.name === 'Calendar') {
                iconName = focused ? 'calendar' : 'calendar-outline';
                return <MaterialCommunityIcons name={iconName} size={36} color={color} />;
              } else if (route.name === 'Search') {
                iconName = focused ? 'ios-search-circle' : 'ios-search-circle-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
              }
              return <Ionicons name={iconName} size={36} color={color} />;
            },
            tabBarActiveTintColor: "#72AEBC",
            tabBarInactiveTintColor: "#808080",
            tabBarShowLabel: false,
            tabBarStyle: {backgroundColor: "#D2F7FF"}
          })}>
            <Tab.Screen name="Announcements" component={AnnouncementsScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
}