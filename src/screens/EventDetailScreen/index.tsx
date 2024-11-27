/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 27 Nov 2024, 11:00:14 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState, useEffect } from "react";

import { Alert, Text, TouchableHighlight, TouchableOpacity, View, TextInput } from "react-native";

import { Timestamp } from "firebase/firestore";
import { auth, Event } from "../../data/firebase/config";
import { useAppDispatch, useFavorites } from "../../data/state/hooks";
import { addFavorite, removeFavorite, updateEvent } from "../../data";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

import { GenericModal } from "../../components/common/GenericModal";
import { DateTimePicker } from "../../components/common/DateTimePicker";

import { accentColor } from "../../util/constants";
import styles from "./styles";

interface Props {
    /** Whether or not the modal is shown */
    visible: boolean,
    /** Function to call to close the modal */
    close: () => void,
    /** Event to display details for */
    event?: Event,
    /** Callback to refresh parent when the event is updated */
    eventUpdated: (updatedEvent: Event) => void,
}

export function EventDetailScreen({ visible, close, event, eventUpdated }: Props): JSX.Element {
    // run hooks prior to any returns to avoid mismatched hook call errors
    const [inEditMode, setInEditMode] = useState<boolean>(false);

    const [newTitle, setNewTitle] = useState<string>(event?.title ?? "");
    const [newTitleHasError, setNewTitleHasError] = useState<boolean>(false);
    const [newLocation, setNewLocation] = useState<string>(event?.location ?? "");
    const [newLocationHasError, setNewLocationHasError] = useState<boolean>(false);
    const [newStartDateTime, setNewStartDateTime] = useState<Date>(event?.startInstant.toDate() ?? new Date());
    const [newDescription, setNewDescription] = useState<string>(event?.description ?? "");
    const [newDescriptionHasError, setNewDescriptionHasError] = useState<boolean>(false);

    const favorites = useFavorites();
    const dispatch = useAppDispatch();

    // refresh data upon receiving a new event param
    useEffect(() => {
        setNewTitle(event?.title ?? "");
        setNewTitleHasError(false);
        setNewLocation(event?.location ?? "");
        setNewLocationHasError(false);
        setNewStartDateTime(event?.startInstant.toDate() ?? new Date());
        setNewDescription(event?.description ?? "");
        setNewDescriptionHasError(false);
    }, [event]);

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

    //#region calculated vars
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

    // combined var to determine if anything in edit mode has an error
    const editHasErrors = 
        newTitleHasError ||
        newLocationHasError ||
        newDescriptionHasError;
    //#endregion

    //#region callbacks
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
     * onChangeText handler for title editor
     * @param title new title value
     */
    const onChangeTitle = (title: string) => {
        // always update state
        setNewTitle(title);
        
        // set error if necessary
        if (title === "") {
            setNewTitleHasError(true);
        } else {
            setNewTitleHasError(false);
        }
    };

    /**
     * onChangeText handler for location editor
     * @param location new location value
     */
    const onChangeLocation = (location: string) => {
        // always update state
        setNewLocation(location);
        
        // set error if necessary
        if (location === "") {
            setNewLocationHasError(true);
        } else {
            setNewLocationHasError(false);
        }
    };

    /**
     * onChangeText handler for description editor
     * @param description new description value
     */
    const onChangeDescription = (description: string) => {
        // always update state
        setNewDescription(description);
        
        // set error if necessary
        if (description === "") {
            setNewDescriptionHasError(true);
        } else {
            setNewDescriptionHasError(false);
        }
    };

    /**
     * Cancel the pending changes to this event.
     */
    const cancelChanges = () => {
        // if nothing changed, just close edit mode
        if (
            newTitle.trim() === event.title &&
            newLocation.trim() === event.location &&
            newStartDateTime.valueOf() === event.startInstant.toDate().valueOf() &&
            newDescription.trim() === event.description
        ) {
            setInEditMode(false);
            return;
        }

        // otherwise, confirm discard via alert
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

                    // revert local editor state to current event details
                    setNewTitle(event.title);
                    setNewTitleHasError(false);
                    setNewLocation(event.location);
                    setNewLocationHasError(false);
                    setNewStartDateTime(event.startInstant.toDate());
                    setNewDescription(event.description);
                    setNewDescriptionHasError(false);
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
        // if nothing changed, just close edit mode
        if (
            newTitle.trim() === event.title &&
            newLocation.trim() === event.location &&
            newStartDateTime.valueOf() === event.startInstant.toDate().valueOf() &&
            newDescription.trim() === event.description
        ) {
            setInEditMode(false);
            return;
        }

        // check if any required inputs are missing
        let errorFound = false;
        if (newTitle.trim() === "") {
            setNewTitleHasError(true);
            errorFound = true;
        }
        if (newLocation.trim() === "") {
            setNewLocationHasError(true);
            errorFound = true;
        }
        if (newDescription.trim() === "") {
            setNewDescriptionHasError(true);
            errorFound = true;
        }
        if (errorFound) { return; }
        
        const updatedEvent = {...event};
        updatedEvent.title = newTitle.trim();
        updatedEvent.location = newLocation.trim();
        updatedEvent.startInstant = new Timestamp(newStartDateTime.valueOf() / 1000, 0);    // divide by 1000, since Timestamp takes seconds
        updatedEvent.description = newDescription.trim();
        await updateEvent(updatedEvent, dispatch);

        eventUpdated(updatedEvent);
        
        // close edit mode
        setInEditMode(false);
    };
    //#endregion

    //#region state-dependent content
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
    
    // and the date and time
    const dateTimeContent =
        inEditMode ? (
            <DateTimePicker initialValue={newStartDateTime} onChange={setNewStartDateTime} />
        ) : (
            <>
                <Text style={styles.dateTime}>{dateStr}</Text>
                <Text style={styles.dateTime}>{timeStr}</Text>
            </>
        );

    // and the title
    const titleContent =
        inEditMode ? (
            <TextInput
                style={[styles.title, styles.input, newTitleHasError ? styles.inputError : undefined]}
                value={newTitle}
                onChangeText={onChangeTitle}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Title"
            />
        ) : (
            <Text style={styles.title}>{event.title}</Text>
        );

    // and the location
    const locationContent =
        inEditMode ? (
            <TextInput
                style={[styles.location, styles.input, newLocationHasError ? styles.inputError : undefined]}
                value={newLocation}
                onChangeText={onChangeLocation}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Location"
            />
        ) : (
            <Text style={styles.location}>{event.location}</Text>
        );
    
    // and the description
    const descriptionContent =
        inEditMode ? (
            <TextInput
                style={[styles.description, styles.input, newDescriptionHasError ? styles.inputError : undefined]}
                value={newDescription}
                onChangeText={onChangeDescription}
                autoCorrect={false}
                autoCapitalize="none"
                multiline
                placeholder="Description"
            />
        ) : (
            <Text style={styles.description}>{event.description}</Text>
        );
    //#endregion

    return (
        <GenericModal visible={visible} cardStyles={styles.container}>
            <View style={styles.containerTitle}>
                {titleContent}

                {!inEditMode &&
                    <TouchableHighlight
                        style={styles.cancelBtn}
                        onPress={close}
                        underlayColor="#D00"
                    >
                        <Text style={styles.cancelX}>X</Text>
                    </TouchableHighlight>}
            </View>

            {locationContent}

            <View style={styles.containerDateTime}>
                {dateTimeContent}
            </View>

            {descriptionContent}

            <>
            {editHasErrors &&
                <Text style={styles.error}>All fields are required.</Text>}
            </>

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