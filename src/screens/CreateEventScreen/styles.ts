/*
 *  Author: Kaleb Jubar
 *  Created: 27 Nov 2024, 10:36:23 AM
 *  Last update: 27 Nov 2024, 11:13:38 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

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

    location: {
        fontSize: 18,
        fontStyle: "italic",
    },

    description: {
        fontSize: 18,
    },

    cancelBtn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 3,
        paddingRight: 8,
        gap: 5,

        borderRadius: 5,
        borderWidth: 2,
    },

    btnText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },

    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingLeft: 8,
        gap: 5,

        backgroundColor: "#0A0",
        borderRadius: 5,
    },

    input: {
        width: "100%",
        padding: 5,

        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 5,
    },

    inputError: {
        borderColor: "#D00",
    },

    error: {
        fontSize: 15,
        color: "#D00",
    },
});