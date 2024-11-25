/*
 *  Author: Kaleb Jubar
 *  Created: 7 Nov 2024, 12:13:37 AM
 *  Last update: 25 Nov 2024, 4:20:33 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */

/// LoadingIndicator component reused from Lab 3

import { View, Text, ActivityIndicator } from "react-native";

import styles from "./styles";

export function LoadingIndicator(): JSX.Element {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}