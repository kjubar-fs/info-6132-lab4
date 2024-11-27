/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 3:30:44 PM
 *  Last update: 26 Nov 2024, 9:05:54 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { View, FlatList, Text, TouchableHighlight, TouchableOpacity } from "react-native";

import { Event } from "../../../data/firebase/config";
import { useEventList, useFavorites } from "../../../data/state/hooks";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { EventListItem } from "./EventListItem";
import { GenericModal } from "../../common/GenericModal";

import styles from "./styles";

interface Props {
    /** Handler for pressing on an event item */
    onPressEventItem?: (event: Event) => void,
    /** Should this list display only favorites for the current user? */
    favoritesOnly?: boolean,
}

export function EventList({ onPressEventItem, favoritesOnly = false }: Props) {
    const [addShown, setAddShown] = useState<boolean>(false);
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
                contentContainerStyle={[styles.list, !favoritesOnly ? styles.listWithAdd : undefined]}
                ListEmptyComponent={
                    <Text style={styles.empty}>No events found! {favoritesOnly ? "Try adding some favorites." : "Try creating your own."}</Text>
                }
            />

            {!favoritesOnly &&
                <TouchableHighlight style={styles.addBtn} onPress={() => setAddShown(true)} underlayColor="#0D0">
                    <MaterialIcons name="add" size={36} color="white" />
                </TouchableHighlight>}

            <GenericModal visible={addShown}>
                <TouchableOpacity onPress={() => setAddShown(false)}><Text>Close</Text></TouchableOpacity>
            </GenericModal>
        </View>
    );
}