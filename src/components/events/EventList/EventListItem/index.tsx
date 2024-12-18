/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 3:30:44 PM
 *  Last update: 26 Nov 2024, 7:00:23 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, Text, TouchableHighlight } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Event } from "../../../../data/firebase/config";

import { Card } from "../../../common/Card";

import styles from "./styles";

interface Props {
    /** Event to render for */
    event: Event,
    /** Handler for pressing on this event */
    onPress?: (event: Event) => void,
}

export function EventListItem({ event, onPress }: Props) {
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
        <Card style={styles.card}>
            <TouchableHighlight
                style={styles.container}
                onPress={onPress !== undefined ?
                    () => onPress(event) :
                    undefined}
                underlayColor="#F7F7F7"
            >
                <>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        {event.title}
                    </Text>
                    
                    <Text style={styles.location}>
                        {event.location}
                    </Text>

                    <Text style={styles.detail}>
                        {timeStr}, {dateStr}
                    </Text>
                </View>

                <View style={styles.actionItems}>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={10}
                        color="#888"
                    />
                </View>
                </>
            </TouchableHighlight>
        </Card>
    );
}