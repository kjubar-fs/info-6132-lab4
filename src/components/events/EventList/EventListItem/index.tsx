/*
 *  Author: Kaleb Jubar
 *  Created: 29 Oct 2024, 1:49:51 PM
 *  Last update: 26 Nov 2024, 3:54:20 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, Text, TouchableHighlight } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Event } from "../../../../data/firebase/config";

import { Card } from "../../../common/Card";

import styles from "./styles";

interface Props {
    event: Event,
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

                    <Text style={styles.detail}>
                        {timeStr}, {dateStr}
                    </Text>
                    
                    <Text style={styles.location}>
                        {event.location}
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