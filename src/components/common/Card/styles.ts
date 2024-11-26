/*
 *  Author: Kaleb Jubar
 *  Created: 29 Oct 2024, 10:20:36 AM
 *  Last update: 25 Nov 2024, 7:48:02 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

import { dropShadowStyle, lightDropShadowStyle } from "../../../util/constants";

export default StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,

        borderRadius: 8,
        backgroundColor: "white",
    },

    default: dropShadowStyle,

    light: lightDropShadowStyle,
});