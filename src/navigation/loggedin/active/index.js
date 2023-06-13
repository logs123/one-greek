import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import AnnouncementsScreen from "../../../screens/loggedin/active/announcements";
import ChatStack from "./chat";
import CalendarScreen from "../../../screens/loggedin/active/calendar";
import SearchScreen from "../../../screens/loggedin/active/search";
import Profile from "../../../screens/loggedin/active/profile";

const Tab = createBottomTabNavigator();

export default function Active() {

  return(
    <BottomSheetModalProvider>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Announcements') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'ChatStack') {
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
          <Tab.Screen name="ChatStack" component={ChatStack} options={{ headerShown: false }}/>
          <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
}