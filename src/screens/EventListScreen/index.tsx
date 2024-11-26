/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 25 Nov 2024, 7:39:53 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { EventDetailScreen } from "../EventDetailScreen";

export function EventListScreen(): JSX.Element {
    const [detailsShown, setDetailsShown] = useState(false);
    const fakeEvent = {
        id: "1",
        author: "Blob",
        checkedOut: false,
        coverURL: "string",
        description: "string",
        rating: 2,
        title: "Title",
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