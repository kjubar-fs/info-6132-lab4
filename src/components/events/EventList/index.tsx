/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 3:30:44 PM
 *  Last update: 26 Nov 2024, 7:03:09 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, FlatList, Text } from "react-native";

import { Event } from "../../../data/firebase/config";
import { useEventList, useFavorites } from "../../../data/state/hooks";

import { EventListItem } from "./EventListItem";

import styles from "./styles";

interface Props {
    /** Handler for pressing on an event item */
    onPressEventItem?: (event: Event) => void,
    /** Should this list display only favorites for the current user? */
    favoritesOnly?: boolean,
}

export function EventList({ onPressEventItem, favoritesOnly = false }: Props) {
    const events = useEventList();
    const favorites = useFavorites();

    return (
        <View style={styles.container}>
            <FlatList
                data={favoritesOnly ? favorites : events}
                renderItem={({ item }) => (
                    <EventListItem event={item} onPress={onPressEventItem} />
                )}
                keyExtractor={(event) => event.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.empty}>No events found! {favoritesOnly ? "Try adding some favorites." : "Try creating your own."}</Text>
                }
            />
        </View>
    );
}