/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 12:25:04 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { Timestamp } from "firebase/firestore";

import { EventDetailScreen } from "../EventDetailScreen";

export function EventListScreen(): JSX.Element {
    const [detailsShown, setDetailsShown] = useState<boolean>(false);
    const fakeEvent = {
        id: "1",
        creatorID: "108310",
        title: "Title",
        description: "Description",
        startInstant: new Timestamp(100, 0),
        location: "a place",
    };

    return (
        <View style={{flex: 1}}>
            <Text>Event list here</Text>
            <TouchableOpacity onPress={() => setDetailsShown(true)}>
                <Text>Go to detail</Text>
            </TouchableOpacity>

            <EventDetailScreen visible={detailsShown} close={() => setDetailsShown(false)} event={fakeEvent} />
        </View>
    );
}