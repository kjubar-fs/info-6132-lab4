/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 3:30:44 PM
 *  Last update: 26 Nov 2024, 3:55:39 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card: {
        padding: 0,
    },

    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
        padding: 10,

        borderRadius: 5,
    },

    contentContainer: {
        flex: 1,
        gap: 5,
    },

    actionItems: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingLeft: 10,
        gap: 10
    },

    title: {
        fontWeight: "500",
        color: "#222",
        fontSize: 17,
    },

    detail: {
        fontSize: 16,
        fontWeight: "300",
    },

    location: {
        fontSize: 15,
        fontStyle: "italic",
    },
});