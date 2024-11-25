/*
 *  Author: Kaleb Jubar
 *  Created: 29 Oct 2024, 10:20:31 AM
 *  Last update: 25 Nov 2024, 4:20:21 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */

/// Card component reused from Lab 2/3

import { View, ViewStyle } from "react-native";

import styles from "./styles";

interface CardProps {
    children: JSX.Element | JSX.Element[],
    shadowType?: "default" | "light",
    style?: ViewStyle,
}

export function Card({ children, shadowType = "default", style }: CardProps) {
    return (
        <View style={[styles.container, styles[shadowType], style]}>
            {children}
        </View>
    );
}