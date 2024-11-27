/*
 *  Author: Kaleb Jubar
 *  Created: 7 Nov 2024, 9:24:25 AM
 *  Last update: 26 Nov 2024, 10:15:35 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

import { accentColor } from "../../util/constants";

export default StyleSheet.create({
    container: {
        minWidth: "85%",
        alignItems: "flex-start",
        gap: 15,
        padding: 10,
    },

    containerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 15,
    },

    containerDateTime: {
        gap: 5,
    },

    containerActions: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        flex: 1,

        fontSize: 22,
        fontWeight: "500",
    },

    cancelBtn: {
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 7,

        backgroundColor: "#A00",
        borderRadius: 5,
    },

    cancelX: {
        fontSize: 18,
        fontWeight: "800",
        color: "white",
    },

    dateTime: {
        fontSize: 15,
        color: "#666",
    },

    location: {
        fontSize: 18,
        fontStyle: "italic",
    },

    description: {
        fontSize: 18,
    },

    favoriteBtn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 3,
        paddingRight: 8,
        gap: 5,

        borderRadius: 5,
        borderWidth: 2,
    },

    favorited: {
        backgroundColor: accentColor,
        borderColor: accentColor,
    },

    unfavorited: {
        borderColor: accentColor,
    },

    favoriteText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },

    unfavoritedText: {
        color: accentColor,
    },

    editBtn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingLeft: 8,
        gap: 5,

        backgroundColor: "#DDD",
        borderRadius: 5,
    },

    editText: {
        fontSize: 16,
        fontWeight: "500",
    },
});