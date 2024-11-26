/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 26 Nov 2024, 3:42:02 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, TouchableHighlight, View } from "react-native";

import { Event } from "../../data/firebase/config";

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
        </GenericModal>
    );
}