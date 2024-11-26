/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 1:17:01 PM
 *  Last update: 26 Nov 2024, 2:14:04 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        minWidth: "85%",
        gap: 15,
        padding: 15,
    },

    containerInput: {
        width: "100%",
        gap: 8,
    },

    containerCaption: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 2,
    },

    containerBtns: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
    },

    title: {
        alignSelf: "flex-start",
        paddingBottom: 10,
        
        fontSize: 19,
        fontWeight: "600",
    },

    caption: {
        fontSize: 17,
    },

    input: {
        paddingVertical: 10,
        paddingHorizontal: 7,

        fontSize: 16,
        
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 5,
    },
    
    inputHasError: {
        borderColor: "#D00",
    },
    
    error: {
        fontSize: 17,
        color: "#D00",
    },

    button: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 5,
    },

    cancelBtn: {
        backgroundColor: "#A00",
    },

    signUpBtn: {
        backgroundColor: "#0A0",
    },

    btnCaption: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },
});