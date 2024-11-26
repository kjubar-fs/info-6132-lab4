/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 7:57:27 PM
 *  Last update: 26 Nov 2024, 1:14:57 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

import { primaryColor, safeAreaPadding } from "../../util/constants";

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
        gap: 8,
    },

    containerCaption: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    title: {
        fontSize: 40,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "white",
    },

    caption: {
        padding: 2,
        fontSize: 17,
        color: "white",
    },
    
    error: {
        padding: 2,
        fontSize: 17,
        backgroundColor: "white",
        color: "#D00",
        borderRadius: 4,
    },

    input: {
        paddingVertical: 10,
        paddingHorizontal: 7,

        fontSize: 16,
        
        backgroundColor: "white",
        borderRadius: 5,
    },

    loginBtn: {
        minWidth: "50%",
        padding: 10,
        alignItems: "center",

        backgroundColor: "white",
        borderRadius: 5,
    },

    loginText: {
        fontSize: 18,
        fontWeight: "500",
    },

    logoutText: {
        fontSize: 18,
        color: "white",
        fontWeight: "500",
    },

    signUpText: {
        fontSize: 15,
        color: "#DDD",
    },
});