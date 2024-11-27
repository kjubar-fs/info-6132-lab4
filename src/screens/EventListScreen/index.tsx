/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 11:17:08 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { View } from "react-native";

import { Event } from "../../data/firebase/config";

import { EventList } from "../../components/events/EventList";

import { EventDetailScreen } from "../EventDetailScreen";

interface Props {
    /** Should this list display only favorites for the current user? */
    favoritesList?: boolean,
}

export function EventListScreen({ favoritesList = false }: Props): JSX.Element {
    const [detailsShown, setDetailsShown] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);

    const showEventDetails = (event: Event) => {
        setSelectedEvent(event);
        setDetailsShown(true);
    };

    const eventUpdated = (event: Event) => {
        setSelectedEvent(event);
    };

    return (
        <View style={{flex: 1}}>
            <EventList onPressEventItem={showEventDetails} favoritesOnly={favoritesList} />

            <EventDetailScreen visible={detailsShown} close={() => setDetailsShown(false)} event={selectedEvent} eventUpdated={eventUpdated} />
        </View>
    );
}