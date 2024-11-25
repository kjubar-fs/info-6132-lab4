/*
 *  Author: Kaleb Jubar
 *  Created: 6 Nov 2024, 10:23:44 AM
 *  Last update: 25 Nov 2024, 4:15:00 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Event } from "../../data/firebase/config";

import { EventListScreen } from "../EventListScreen";
import { EventDetailScreen } from "../EventDetailScreen";

import { primaryColor } from "../../util/constants";

// type screen params
export type HomeStackParamList = {
    eventList: undefined,    // no params
    eventDetail: {
        event: Event,
    },
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeScreen(): JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="eventList"
                component={EventListScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="eventDetail"
                component={EventDetailScreen}
                options={{
                    headerTitle: "Event Details",
                    headerStyle: {
                        backgroundColor: primaryColor,
                    },
                    headerTintColor: "white",
                    headerBackTitle: "Events",
                }}
            />
        </Stack.Navigator>
    );
}