/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 7:57:27 PM
 *  Last update: 25 Nov 2024, 9:11:11 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

import { accentColor, primaryColor, safeAreaPadding } from "../../util/constants";

export default StyleSheet.create({
    containerOuter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: safeAreaPadding,
        gap: 100,

        backgroundColor: primaryColor,
    },

    containerInner: {
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },

    containerInput: {
        minWidth: "75%",
        gap: 5,
    },

    title: {
        fontSize: 40,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "white",
    },

    caption: {
        fontSize: 17,
        color: "white",
    },

    input: {
        paddingVertical: 10,
        paddingHorizontal: 7,

        fontSize: 16,
        
        backgroundColor: "white",
        borderRadius: 5,
    },

    loginBtn: {
        width: "50%",
        padding: 10,
        alignItems: "center",

        backgroundColor: "white",
        borderRadius: 5,
    },

    loginText: {
        fontSize: 18,
        fontWeight: "500",
        color: accentColor,
    },
});