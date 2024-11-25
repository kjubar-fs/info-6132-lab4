/*
 *  Author: Kaleb Jubar
 *  Created: 6 Nov 2024, 11:00:26 AM
 *  Last update: 25 Nov 2024, 4:14:48 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "../HomeScreen";

// generate prop types for the route object for this screen
type Props = NativeStackScreenProps<HomeStackParamList, "eventDetail">;

export function EventDetailScreen({ route }: Props): JSX.Element {
    const event = route.params.event;

    return (
        <View>
            <Text>Event details here</Text>
        </View>
    );
}