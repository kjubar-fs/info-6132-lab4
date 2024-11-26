/*
 *  Author: Kaleb Jubar
 *  Created: 29 Oct 2024, 1:48:36 PM
 *  Last update: 26 Nov 2024, 3:47:50 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, FlatList, Text } from "react-native";

import { Event } from "../../../data/firebase/config";
import { useEventList } from "../../../data/state/hooks";

import { EventListItem } from "./EventListItem";

import styles from "./styles";

interface Props {
    onPressEventItem?: (event: Event) => void,
}

export function EventList({ onPressEventItem }: Props) {
    const events = useEventList();

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <EventListItem event={item} onPress={onPressEventItem} />
                )}
                keyExtractor={(event) => event.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.empty}>No events found! Try creating your own.</Text>
                }
            />
        </View>
    );
}