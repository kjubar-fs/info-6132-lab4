/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 10:43:48 PM
 *  Last update: 26 Nov 2024, 11:01:49 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";

import { Platform, View, Text, TouchableOpacity } from "react-native";

import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";

import styles from "./styles";

interface Props {
    initialValue: Date,
    onChange: (date: Date) => void,
}

/// Custom DateTimePicker component, derived from a custom component I created to wrap RNDateTimePicker for our Capstone project

export function DateTimePicker({ initialValue, onChange }: Props) {
    const [dateTime, setDateTime] = useState<Date>(initialValue);

    const onChangeDateTime = (pickerEvent: DateTimePickerEvent) => {
        if (pickerEvent.type === "set") {
            const newDateTime = new Date(pickerEvent.nativeEvent.timestamp)
            setDateTime(newDateTime);
            onChange(newDateTime);
        }
    };

    // different rendering for Android and iOS
    // iOS renders the picker as an inline component, but Android launches a popup
    // so create a custom component for Android
    if (Platform.OS === "android") {
        return (
            <View style={styles.containerOuter}>
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={0.75}
                    onPress={() => {
                        DateTimePickerAndroid.open({
                            mode: "date",
                            value: dateTime,
                            onChange: onChangeDateTime,
                        })
                    }}
                >
                    <Text style={styles.timeText}>
                        {dateTime.toLocaleDateString([])}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={0.75}
                    onPress={() => {
                        DateTimePickerAndroid.open({
                            mode: "time",
                            value: dateTime,
                            onChange: onChangeDateTime,
                        })
                    }}
                >
                    <Text style={styles.timeText}>
                        {dateTime.toLocaleTimeString([], { hour12: true, hour: "numeric", minute: "2-digit" })}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <RNDateTimePicker
                mode="datetime"
                display="compact"
                value={dateTime}
                onChange={onChangeDateTime}
            />
        );
    }
}