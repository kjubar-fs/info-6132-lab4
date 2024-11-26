/*
 *  Author: Kaleb Jubar
 *  Created: 26 Nov 2024, 1:17:01 PM
 *  Last update: 26 Nov 2024, 1:33:40 PM
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
    
    error: {
        fontSize: 17,
        color: "#D00",
    },
});