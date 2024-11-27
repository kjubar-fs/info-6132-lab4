/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 9:28:23 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

import { Event } from "../../data/firebase/config";
import { useAppDispatch, useFavorites } from "../../data/state/hooks";
import { addFavorite, removeFavorite } from "../../data";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { GenericModal } from "../../components/common/GenericModal";

import styles from "./styles";

interface Props {
    /** Whether or not the modal is shown */
    visible: boolean,
    /** Function to call to close the modal */
    close: () => void,
    /** Event to display details for */
    event?: Event,
}

export function EventDetailScreen({ visible, close, event }: Props): JSX.Element {
    // create hooks prior to any returns to avoid mismatched hook call errors
    const favorites = useFavorites();
    const dispatch = useAppDispatch();

    if (event === undefined) {
        return (
            <GenericModal visible={visible}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>No event found!</Text>

                    <TouchableHighlight style={styles.cancelBtn} onPress={close} underlayColor="#D00">
                        <Text style={styles.cancelX}>X</Text>
                    </TouchableHighlight>
                </View>
            </GenericModal>
        );
    }

    // determine if this event is favorited
    const eventFavorited = favorites.findIndex((listEvent) => listEvent.id === event.id) !== -1;

    // format event date/time for display
    const eventTime = event.startInstant.toDate();
    const dateStr = eventTime.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const timeStr = eventTime.toLocaleTimeString("en-CA", {
        hour: "numeric",
        minute: "2-digit",
    });

    /**
     * Toggle this event as a favorite.
     */
    const toggleFavorite = async () => {
        if (eventFavorited) {
            await removeFavorite(event.id, dispatch);
        } else {
            await addFavorite(event.id, dispatch);
        }
    };

    // show different content for the favorite button based on status
    const favoriteContent = 
        eventFavorited ? (
            <>
                <MaterialIcons name="star" size={24} color="white" />
                <Text style={styles.favoriteText}>Unfavorite</Text>
            </>
        ) : (
            <>
                <MaterialIcons name="star-outline" size={24} color="white" />
                <Text style={styles.favoriteText}>Favorite</Text>
            </>
        );

    return (
        <GenericModal visible={visible} cardStyles={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{event.title}</Text>

                <TouchableHighlight style={styles.cancelBtn} onPress={close} underlayColor="#D00">
                    <Text style={styles.cancelX}>X</Text>
                </TouchableHighlight>
            </View>

            <Text style={styles.location}>{event.location}</Text>

            <View style={styles.containerDateTime}>
                <Text style={styles.dateTime}>{dateStr}</Text>
                <Text style={styles.dateTime}>{timeStr}</Text>
            </View>

            <Text style={styles.description}>{event.description}</Text>

            <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
                {favoriteContent}
            </TouchableOpacity>
        </GenericModal>
    );
}