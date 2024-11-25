/*
 *  Author: Kaleb Jubar
 *  Created: 6 Nov 2024, 10:16:55 AM
 *  Last update: 25 Nov 2024, 4:20:40 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */

/// ScreenWrapper component reused from Lab 3

import { StyleProp, ViewStyle, View } from "react-native";

import styles from "./styles";

interface Props {
    contentContainerStyle?: StyleProp<ViewStyle>,
    children?: JSX.Element | JSX.Element[],
}

export function ScreenWrapper({ contentContainerStyle, children }: Props): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar}/>
            <View style={[styles.contentContainer, contentContainerStyle]}>
                {children}
            </View>
        </View>
    );
}