/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 10:14:53 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

import { auth, Event } from "../../data/firebase/config";
import { useAppDispatch, useFavorites } from "../../data/state/hooks";
import { addFavorite, removeFavorite } from "../../data";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { GenericModal } from "../../components/common/GenericModal";

import { accentColor } from "../../util/constants";
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
    // run hooks prior to any returns to avoid mismatched hook call errors
    const [inEditMode, setInEditMode] = useState<boolean>(false);
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

    // determine if the user can edit/delete
    const canEdit = auth.currentUser!.uid === event.creatorID;

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
                <MaterialIcons name="star-outline" size={24} color={accentColor} />
                <Text style={[styles.favoriteText, styles.unfavoritedText]}>Favorite</Text>
            </>
        );

    // and same for the edit button
    const editBtnContent =
        inEditMode ? (
            <>
                <Text style={styles.editText}>Save</Text>
                <MaterialIcons name="check" size={24} color="black" />
            </>
        ) : (
            <>
                <Text style={styles.editText}>Edit</Text>
                <MaterialIcons name="edit" size={24} color="black" />
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

            <View style={styles.containerActions}>
                <TouchableOpacity style={[styles.favoriteBtn, eventFavorited ? styles.favorited : styles.unfavorited]} onPress={toggleFavorite}>
                    {favoriteContent}
                </TouchableOpacity>

                {canEdit &&
                    <TouchableHighlight style={styles.editBtn} onPress={() => setInEditMode(!inEditMode)}>
                        {editBtnContent}
                    </TouchableHighlight>}
            </View>
        </GenericModal>
    );
}