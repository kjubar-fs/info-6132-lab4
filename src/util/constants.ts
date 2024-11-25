/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 3:43:02 PM
 *  Last update: 25 Nov 2024, 6:11:27 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Platform } from "react-native";

export const safeAreaPadding = Platform.OS === "ios" ? 60 : 50;

export const primaryColor = "#710627";
export const accentColor = "#9E1946";

export const dropShadowStyle = {
    // remove shadowColor on Android because it conflicts with elevation
    shadowColor: Platform.OS === "ios" ? "#666" : undefined,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
};

export const lightDropShadowStyle = {
    // remove shadowColor on Android because it conflicts with elevation
    shadowColor: Platform.OS === "ios" ? "#999" : undefined,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
};