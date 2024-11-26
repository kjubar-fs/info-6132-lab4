/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 12:51:28 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { useEventList } from "../../data/state/hooks";

import { EventDetailScreen } from "../EventDetailScreen";

export function EventListScreen(): JSX.Element {
    const [detailsShown, setDetailsShown] = useState<boolean>(false);
    const events = useEventList();

    return (
        <View style={{flex: 1}}>
            <Text>{events[0].title}</Text>
            <TouchableOpacity onPress={() => setDetailsShown(true)}>
                <Text>Go to detail</Text>
            </TouchableOpacity>

            <EventDetailScreen visible={detailsShown} close={() => setDetailsShown(false)} event={events[0]} />
        </View>
    );
}