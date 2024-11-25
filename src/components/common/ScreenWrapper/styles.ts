/*
 *  Author: Kaleb Jubar
 *  Created: 6 Nov 2024, 10:16:59 AM
 *  Last update: 6 Nov 2024, 10:40:17 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { StyleSheet } from "react-native";

import { primaryColor, safeAreaPadding } from "../../../util/constants";

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    statusBar: {
        width: "100%",
        height: safeAreaPadding,
        backgroundColor: primaryColor,
    },

    contentContainer: {
        flexGrow: 1,
    },
});