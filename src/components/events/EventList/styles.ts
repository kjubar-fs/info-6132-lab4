/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 3:30:44 PM
 *  Last update: 26 Nov 2024, 9:05:34 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

import { lightDropShadowStyle } from "../../../util/constants";

export default StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
    },

    list: {
        padding: 20,
        gap: 15,
    },

    listWithAdd: {
        paddingBottom: 75,
    },

    header: {
        fontSize: 25,
        fontWeight: "600",
    },

    empty: {
        fontSize: 18,
    },

    addBtn: {
        position: "absolute",
        bottom: 6,
        right: 20,
        padding: 12,
    
        backgroundColor: "#0A0",
        borderRadius: 360,

        ...lightDropShadowStyle,
    },
});