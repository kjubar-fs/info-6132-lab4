/*
 *  Author: Kaleb Jubar
 *  Created: 29 Oct 2024, 10:20:36 AM
 *  Last update: 29 Oct 2024, 12:46:58 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

import { dropShadowStyle, lightDropShadowStyle } from "../../../util/constants";

export default StyleSheet.create({
    container: {
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,

        borderRadius: 8,
        backgroundColor: "white",
    },

    default: dropShadowStyle,

    light: lightDropShadowStyle,
});