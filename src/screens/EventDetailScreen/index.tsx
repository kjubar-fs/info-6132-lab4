/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 10:40:30 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { Alert, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

import { auth, Event } from "../../data/firebase/config";
import { useAppDispatch, useFavorites } from "../../data/state/hooks";
import { addFavorite, removeFavorite, updateEvent } from "../../data";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

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

    /**
     * Cancel the pending changes to this event.
     */
    const cancelChanges = () => {
        Alert.alert("Discard Changes", "Are you sure you wish to discard your changes?", [
            {
                text: "Cancel",
                style: "cancel",
                // no onPress, since cancel does nothing
            },
            {
                text: "Discard",
                onPress: () => {
                    // close edit mode
                    setInEditMode(false);

                    // TODO: revert local editor state to current event details
                },
            },
        ]);
    };

    /**
     * Either enable edit mode or save and close edit mode.
     */
    const editPressed = async () => {
        if (!inEditMode) {
            setInEditMode(true);
            return;
        }

        await saveChanges();
    };

    /**
     * Save the pending changes to this event.
     */
    const saveChanges = async () => {
        // TODO: update with new event data from local state
        // await updateEvent(updatedEvent, dispatch);
        
        // close edit mode
        setInEditMode(false);
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
                <Text style={styles.favoriteText}>Save</Text>
                <MaterialIcons name="check" size={24} color="white" />
            </>
        ) : (
            <>
                <Text style={styles.editText}>Edit</Text>
                <MaterialIcons name="edit" size={24} color="black" />
            </>
        );
    
    // and the left action button (favorite or cancel)
    const leftActionBtn =
        inEditMode ? (
            <TouchableHighlight
                style={[styles.favoriteBtn, {backgroundColor: "#A00", borderColor: "#A00"}]}
                onPress={cancelChanges}
                underlayColor="#D00"
            >
                <>
                    <Feather name="x" size={24} color="white" />
                    <Text style={styles.favoriteText}>Cancel</Text>
                </>
            </TouchableHighlight>
        ) : (
            <TouchableOpacity
                style={[styles.favoriteBtn, eventFavorited ? styles.favorited : styles.unfavorited]}
                onPress={toggleFavorite}
            >
                {favoriteContent}
            </TouchableOpacity>
        );

    return (
        <GenericModal visible={visible} cardStyles={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{event.title}</Text>

                {!inEditMode &&
                    <TouchableHighlight
                        style={styles.cancelBtn}
                        onPress={close}
                        underlayColor="#D00"
                    >
                        <Text style={styles.cancelX}>X</Text>
                    </TouchableHighlight>}
            </View>

            <Text style={styles.location}>{event.location}</Text>

            <View style={styles.containerDateTime}>
                <Text style={styles.dateTime}>{dateStr}</Text>
                <Text style={styles.dateTime}>{timeStr}</Text>
            </View>

            <Text style={styles.description}>{event.description}</Text>

            <View style={styles.containerActions}>
                {leftActionBtn}

                {canEdit &&
                    <TouchableHighlight
                        style={inEditMode ? styles.saveBtn : styles.editBtn}
                        onPress={editPressed}
                        underlayColor={inEditMode ? "#0D0" : "#EEE"}
                    >
                        {editBtnContent}
                    </TouchableHighlight>}
            </View>
        </GenericModal>
    );
}