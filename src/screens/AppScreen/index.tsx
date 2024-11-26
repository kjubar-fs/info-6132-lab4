/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 25 Nov 2024, 7:16:45 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { FavoritesScreen } from "../FavoritesScreen";
import { EventListScreen } from "../EventListScreen";

const Tab = createBottomTabNavigator();

export function AppScreen(): JSX.Element {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: Platform.OS === "android" ? {
                    height: 60,
                    paddingBottom: 8,
                } : undefined,
                tabBarLabelStyle: {
                    fontSize: 13,
                },
            }}
        >
            <Tab.Screen
                name="All Events"
                component={EventListScreen}
                options={{
                    tabBarIcon: ({ color, size }): JSX.Element => (
                        <MaterialIcons name="event" size={size} color={color} />
                    ),
                }}
            />
            
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }): JSX.Element => (
                        <MaterialCommunityIcons name={focused ? "bookmark-box-multiple" : "bookmark-box-multiple-outline"} size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}