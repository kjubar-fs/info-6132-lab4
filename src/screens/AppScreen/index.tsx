/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 7:17:31 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppLoader } from "../../components/singleton/AppLoader";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { EventListScreen } from "../EventListScreen";

const Tab = createBottomTabNavigator();

export function AppScreen(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);

    let content = <LoadingIndicator />;
    if (!loading) {
        content = (
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
                    options={{
                        tabBarIcon: ({ color, size, focused }): JSX.Element => (
                            <MaterialCommunityIcons name={focused ? "bookmark-box-multiple" : "bookmark-box-multiple-outline"} size={size} color={color} />
                        ),
                    }}
                >
                    {/* there apparently is a way to always pass a param to a tab when navigating via the listeners option,
                        as demonstrated here: https://stackoverflow.com/a/76159721, but this is a trivial situation and
                        the performance loss from using the render function is negligible for this app */}
                    {() => <EventListScreen favoritesList />}
                </Tab.Screen>
            </Tab.Navigator>
        );
    }

    return (
        <>
        <AppLoader onLoaded={() => setLoading(false)} />
        {content}
        </>
    );
}