/*
 *  Author: Kaleb Jubar
 *  Created: 25 Nov 2024, 7:26:19 PM
 *  Last update: 26 Nov 2024, 2:47:46 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Modal, StyleProp, View, ViewStyle } from "react-native";

import { Card } from "../Card";

import styles from "./styles";

interface Props {
    /** Content to display */
    children: JSX.Element | JSX.Element[],
    /** Whether or not the modal is shown */
    visible: boolean,
    /** Style override for the modal card */
    cardStyles?: StyleProp<ViewStyle>,
}

export function GenericModal({ children, visible, cardStyles }: Props): JSX.Element {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.background}>
                <Card style={[styles.card, cardStyles]}>
                    {children}
                </Card>
            </View>
        </Modal>
    );
}