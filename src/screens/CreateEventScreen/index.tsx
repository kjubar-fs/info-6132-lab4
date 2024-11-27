/*
 *  Author: Kaleb Jubar
 *  Created: 27 Nov 2024, 10:36:17 AM
 *  Last update: 27 Nov 2024, 11:13:30 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState, useEffect } from "react";

import { Alert, Text, TouchableHighlight, View, TextInput } from "react-native";

import { Timestamp } from "firebase/firestore";
import { useAppDispatch } from "../../data/state/hooks";
import { addEvent } from "../../data";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

import { GenericModal } from "../../components/common/GenericModal";
import { DateTimePicker } from "../../components/common/DateTimePicker";

import styles from "./styles";

interface Props {
    /** Whether or not the modal is shown */
    visible: boolean,
    /** Function to call to close the modal */
    close: () => void,
}

export function CreateEventScreen({ visible, close }: Props): JSX.Element {
    const [title, setTitle] = useState<string>("");
    const [titleHasError, setTitleHasError] = useState<boolean>(false);
    const [location, setLocation] = useState<string>("");
    const [locationHasError, setLocationHasError] = useState<boolean>(false);
    const [startDateTime, setStartDateTime] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>("");
    const [descriptionHasError, setDescriptionHasError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // revert local editor state to empty when becoming visible
    useEffect(() => {
        if (visible) {
            setTitle("");
            setTitleHasError(false);
            setLocation("");
            setLocationHasError(false);
            setStartDateTime(new Date());
            setDescription("");
            setDescriptionHasError(false);
        }
    }, [visible]);

    // combined var to determine if anything has an error
    const editHasErrors = 
        titleHasError ||
        locationHasError ||
        descriptionHasError;

    //#region callbacks
    /**
     * onChangeText handler for title editor
     * @param title new title value
     */
    const onChangeTitle = (title: string) => {
        // always update state
        setTitle(title);
        
        // set error if necessary
        if (title === "") {
            setTitleHasError(true);
        } else {
            setTitleHasError(false);
        }
    };

    /**
     * onChangeText handler for location editor
     * @param location new location value
     */
    const onChangeLocation = (location: string) => {
        // always update state
        setLocation(location);
        
        // set error if necessary
        if (location === "") {
            setLocationHasError(true);
        } else {
            setLocationHasError(false);
        }
    };

    /**
     * onChangeText handler for description editor
     * @param description new description value
     */
    const onChangeDescription = (description: string) => {
        // always update state
        setDescription(description);
        
        // set error if necessary
        if (description === "") {
            setDescriptionHasError(true);
        } else {
            setDescriptionHasError(false);
        }
    };

    /**
     * Cancel event creation.
     */
    const cancelChanges = () => {
        // if nothing changed, just close
        if (
            title.trim() === "" &&
            location.trim() === "" &&
            description.trim() === ""
        ) {
            close();
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
                    // just close on press, clearing is handled by the effect
                    close();
                },
            },
        ]);
    };

    /**
     * Save the new event.
     */
    const createEvent = async () => {
        // check if any required inputs are missing
        let errorFound = false;
        if (title.trim() === "") {
            setTitleHasError(true);
            errorFound = true;
        }
        if (location.trim() === "") {
            setLocationHasError(true);
            errorFound = true;
        }
        if (description.trim() === "") {
            setDescriptionHasError(true);
            errorFound = true;
        }
        if (errorFound) { return; }
        
        await addEvent(
            title.trim(),
            description.trim(),
            new Timestamp(startDateTime.valueOf() / 1000, 0),   // divide by 1000, since Timestamp takes seconds
            location.trim(),
            dispatch
        );
        
        // close modal
        close();
    };
    //#endregion

    return (
        <GenericModal visible={visible} cardStyles={styles.container}>
            <View style={styles.containerTitle}>
                <TextInput
                    style={[styles.title, styles.input, titleHasError ? styles.inputError : undefined]}
                    value={title}
                    onChangeText={onChangeTitle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Title"
                />
            </View>

            <TextInput
                style={[styles.location, styles.input, locationHasError ? styles.inputError : undefined]}
                value={location}
                onChangeText={onChangeLocation}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Location"
            />

            <DateTimePicker initialValue={startDateTime} onChange={setStartDateTime} />

            <TextInput
                style={[styles.description, styles.input, descriptionHasError ? styles.inputError : undefined]}
                value={description}
                onChangeText={onChangeDescription}
                autoCorrect={false}
                autoCapitalize="none"
                multiline
                placeholder="Description"
            />

            <>
            {editHasErrors &&
                <Text style={styles.error}>All fields are required.</Text>}
            </>

            <View style={styles.containerActions}>
                <TouchableHighlight
                    style={[styles.cancelBtn, {backgroundColor: "#A00", borderColor: "#A00"}]}
                    onPress={cancelChanges}
                    underlayColor="#D00"
                >
                    <>
                        <Feather name="x" size={24} color="white" />
                        <Text style={styles.btnText}>Cancel</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.saveBtn}
                    onPress={createEvent}
                    underlayColor="#0D0"
                >
                    <>
                        <Text style={styles.btnText}>Save</Text>
                        <MaterialIcons name="check" size={24} color="white" />
                    </>
                </TouchableHighlight>
            </View>
        </GenericModal>
    );
}